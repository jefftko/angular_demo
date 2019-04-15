import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {TransferService} from "./transfer.service";
import {ContextService} from "../../../context.service";
import {UrlConfig} from "../../../common/common.api";

@Component({
  selector: 'app-contract-create-step3',
  templateUrl: './step3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step3Component implements OnInit {

  taxOptions:any = [];
  rateAmountMap:any = {};
  isEventing:boolean = false;
  isAmountInvalid:boolean = false;
  errData:any = [];

  tabCtrlsTpl:any[] = [
    {name : 'clauseTypes' , label : '款项类型', type : 'select',  width : 160, noClear : true, required : true, options : [{"value":"OTHER","label":"其他"},{"value":"JUSTSETTLEMENT","label":"据实结算"},{"value":"MATERIAIS","label":"物料款"},{"value":"FINAL_ACCOUNT","label":"竣工决算款"},{"value":"ZBJ","label":"质保金"},{"value":"PROGRESS_PAY","label":"进度款"},{"value":"PREPAY","label":"预付款"}]},
    {name : 'paymentWay' , label : '付款方式', type : 'select',  width : 160, noClear : true, required : true, options : [{"value":"PERCENTAGE","label":"百分比"},{"value":"AMOUNT","label":"金额"}], onChange : (callBackOptions) => {
        if (this.isEventing) return;
        let rowIndex:number = callBackOptions.index;
        let isAmount:boolean = (callBackOptions.value == 'AMOUNT');
        let row:any[] = this.tabCtrls[rowIndex];
        row[2] = {...row[2], disabled : isAmount};
        row[3] = {...row[3], disabled : !isAmount};
        this.cdr.detectChanges();
        this.calculateAmount(rowIndex);
    }},
    {name : 'paymentPercent' , label : '付款比例', type : 'number',  width : 160, disabled : false, onChange : callBackOptions => {
        this.calculateAmount(callBackOptions.index);
    }},
    {name : 'paymentAmount' , label : '付款金额', type : 'number',  width : 160, disabled : false, onChange : callBackOptions => {
        this.calculateAmount(callBackOptions.index);
    }},
    {name : 'tax' , label : '税率', type : 'select',  width : 120, noClear : true, required : true, options : this.taxOptions, onChange : callBackOptions => {
        this.calculateAmount(callBackOptions.index);
    }},
    {name : 'norateContractAmount' , label : '不含税付款金额',  width : 180 , disabled : true},
    {name : 'schedulePaymentDate' , label : '计划付款时间', type : 'date',  width : 180},
    {name : 'comments' , label : '备注',  width : 180},
  ];

  tabForm:FormArray;
  tabCtrls:any[] = [];

  constructor(private fb: FormBuilder,
              public formData: TransferService,
              private http: _HttpClient,
              private cdr: ChangeDetectorRef,
              private ctx:ContextService) {}

  ngOnInit() {
    this.formData.step3FormGroup = this.fb.group({});
    this.tabForm = this.fb.array([]);
    this.formData.step3FormGroup.addControl('tabForm', this.tabForm);
    // this.ctx.spinning = true;
    this.http.post(UrlConfig.InitStep3, {okcHeaderId : this.formData.okcHeaderId})
      .toPromise()
      .then((result: any) => {
        console.log('[Page Init Result]:', result.data);
        // this.doSetValues(data);
        this.processInitData(result.data);
        this.ctx.spinning = false;
      })
      .catch(error => { throw error });
  }

  processInitData(data:any):void {
    if (data.initParams && data.initParams.length) {
      data.initParams.forEach(row => {
        let taxRate:string = row.tax;
        this.taxOptions.push({value : taxRate, label : taxRate});
        this.rateAmountMap[taxRate] = {amount : row.amount, amountNoTax : row.amountNoTax};
      });
    }

    if (data.reCuxOkcPaymentTermsList && data.reCuxOkcPaymentTermsList.length) {
      data.reCuxOkcPaymentTermsList.forEach((row, i) => {
        this.addRow();
        this.cdr.detectChanges();
        this.isEventing = true;
        this.tabForm.at(i).patchValue(row);
        this.isEventing = false;
      });
    }
  }

  calculateAmount(index:number):void {
    if (this.isEventing) return;
    this.isEventing = true;
    let rowFormGroup = this.tabForm.at(index);
    let paymentWay:string = rowFormGroup.get('paymentWay').value;
    let tax:number = rowFormGroup.get('tax').value;

    let amountNoTaxCtrl:FormControl = rowFormGroup.get('norateContractAmount') as FormControl;
    let paymentPercentCtrl:FormControl = rowFormGroup.get('paymentPercent') as FormControl;
    let paymentAmountCtrl:FormControl = rowFormGroup.get('paymentAmount') as FormControl;

    let paymentPercent:number = paymentPercentCtrl.value;
    let paymentAmount:number = paymentAmountCtrl.value;

    console.log('Value:', paymentWay, paymentPercent, paymentAmount, tax);

      console.log('Tax & Account Mapping', this.rateAmountMap);
      console.log('Tax', tax);
    if (paymentWay) {
      // 付款方式 - 金额
      if (paymentWay == 'AMOUNT') {
        if (tax && paymentAmount) {
          paymentPercentCtrl.setValue(Math.round(paymentAmount / this.rateAmountMap[tax].amount * 100));
          amountNoTaxCtrl.setValue(Math.round(paymentAmount / (100 + tax) * 10000) / 100);
        } else {
          paymentAmountCtrl.setValue(0);
          amountNoTaxCtrl.setValue(0);
        }
      } else {
        if (tax && paymentPercent) {
          let amount = this.rateAmountMap[tax.toFixed()].amount;
          let amountNoTax = this.rateAmountMap[tax].amountNoTax;
          paymentAmountCtrl.setValue(Math.round(amount * paymentPercent) / 100);
          amountNoTaxCtrl.setValue(Math.round(amountNoTax * paymentPercent) / 100);
        } else {
          paymentAmountCtrl.setValue(0);
          amountNoTaxCtrl.setValue(0);
        }
      }
    }
    this.isEventing = false;
  }

  addRow():void {
    let currIndex:number = this.tabForm.controls.length;
    let rowFormGroup = this.fb.group({});
    let rowCtrls = this.duplicateTabCtrls(currIndex, this.tabCtrlsTpl);
    this.tabCtrls = [...this.tabCtrls, rowCtrls];
    this.tabForm.push(rowFormGroup);
  }

  duplicateTabCtrls(index:number, ctrls:any[]) {
    let rowCtrls:any[] = [];
    ctrls.forEach(value => rowCtrls.push({...value,  callBackOptions : {index : index}}));
    return rowCtrls;
  }

  removeRow(index:number):void {
    this.tabForm.removeAt(index);
    this.tabCtrls = this.tabCtrls.filter((value, i) => i != index);
  }

  closeMessageModal():void {
    this.isAmountInvalid = false;
    this.ctx.spinning = false;
  }

  doSubmit():void {
    this.ctx.spinning = true;
    setTimeout(() => {
      let payData:any[] = [];
      let payTaxMap:any = {};

      this.tabForm.value.forEach((value, i) => {
        let tax:number = value.tax;
        let paymentAmount:number = value.paymentAmount;
        let paymentAmountNoTax:number = value.norateContractAmount;
        if (payTaxMap[tax]) {
          payTaxMap[tax].paymentAmount = payTaxMap[tax].paymentAmount + paymentAmount;
          payTaxMap[tax].paymentAmountNoTax = payTaxMap[tax].paymentAmountNoTax + paymentAmountNoTax;
          payTaxMap[tax].cnt = payTaxMap[tax].cnt + 1;
        } else {
          payTaxMap[tax] = {paymentAmount : paymentAmount, paymentAmountNoTax : paymentAmountNoTax, cnt : 1};
        }
        let payDataRow = {
          ...value,
          lineNo : i + 1,
        };
        payData.push(payDataRow);
      });
      payData.sort((a, b) => a.tax - b.tax);

      let preTax:number = null;
      let isInvalid:boolean = false;
      payData.forEach(value => {
        if (value.tax != preTax) {
          preTax = value.tax;
          value.rowSpan = payTaxMap[preTax].cnt;
          value.paymentAmountTotal = payTaxMap[preTax].paymentAmount;
          value.paymentAmountNoTaxTotal = payTaxMap[preTax].paymentAmountNoTax;
          value.paymentAmountLineTotal = this.rateAmountMap[preTax].amount;
          value.paymentAmountNoTaxLineTotal = this.rateAmountMap[preTax].amountNoTax;
          value.invalid = Math.abs(value.paymentAmountTotal - this.rateAmountMap[preTax].amount) > 2;
          isInvalid = isInvalid || value.invalid;
        }
      });

      if (isInvalid) {
        this.errData = payData;
        this.isAmountInvalid = true;
        this.ctx.spinning = false;
        this.cdr.detectChanges();
        return;
      }

      this.formData.submitStep3Form({
        okcHeaderId : this.formData.okcHeaderId,
        saveOkcTermList : this.tabForm.value
      });
    }, 200);
  }
}
