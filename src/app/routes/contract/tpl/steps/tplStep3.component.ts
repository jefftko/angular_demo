import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Options} from '../../../common/common.code'
import {ContextService} from "../../../context.service";
import {GridControlComponent} from "../../../common/gridControl.component";
import {TplService} from "../tpl.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseFormComponent} from "../../../base/baseForm.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-contract-tpl-step3',
  templateUrl: './tplStep3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TplStep3Component extends BaseFormComponent implements OnInit {

  constructor(public ctx:ContextService,
              public cdr: ChangeDetectorRef,
              public message: NzMessageService,
              public router: Router,
              public initRoutes: ActivatedRoute,
              public fb: FormBuilder,
              public datePipe: DatePipe,
              private tplService:TplService) {
    super(ctx, cdr, message, router, initRoutes, fb, datePipe);
  }

  isEventing:boolean = false;
  taxOptions:any = [];
  rateAmountMap:any = {};
  isAmountInvalid:boolean = false;
  errData:any = [];

  tabCtrlsTpl:any[] = [
    {name : 'clauseTypes' , label : '款项类型', type : 'select',  width : 160, noClear : true, required : true, options : [{"value":"OTHER","label":"其他"},{"value":"JUSTSETTLEMENT","label":"据实结算"},{"value":"MATERIAIS","label":"物料款"},{"value":"FINAL_ACCOUNT","label":"竣工决算款"},{"value":"ZBJ","label":"质保金"},{"value":"PROGRESS_PAY","label":"进度款"},{"value":"PREPAY","label":"预付款"}]},
    {name : 'paymentWay' , label : '付款方式', type : 'select',  width : 160, noClear : true, required : true, options : [{"value":"PERCENTAGE","label":"百分比"},{"value":"AMOUNT","label":"金额"}], onChange : (callBackOptions, i) => {
        if (this.isEventing) return;
        let isAmount:boolean = (callBackOptions.value == 'AMOUNT');
        if (isAmount)
          this.grid.patchValue(i, {paymentPercent : {disabled : true}, paymentAmount : {disabled : false}});
        else
          this.grid.patchValue(i, {paymentPercent : {disabled : false}, paymentAmount : {disabled : true}});
        // this.refre;
      }},
    {name : 'paymentPercent' , label : '付款比例', type : 'number',  width : 160, disabled : true, onChange : (callBackOptions, i) =>
        this.calculateAmount(i)
    },
    {name : 'paymentAmount' , label : '付款金额', type : 'number',  width : 160, disabled : true, onChange : (callBackOptions, i) =>
        this.calculateAmount(i)
    },
    {name : 'tax' , label : '税率', type : 'select',  width : 120, noClear : true, required : true, options : this.taxOptions, onChange : (callBackOptions, i) =>
        this.calculateAmount(i)
    },
    {name : 'norateContractAmount' , label : '不含税付款金额', type : 'number',  width : 180 , disabled : true},
    {name : 'schedulePaymentDate' , label : '计划付款时间', type : 'date',  width : 180},
    {name : 'comments' , label : '备注',  width : 180},
  ];

  @ViewChild(GridControlComponent)
  grid:GridControlComponent;

  ngOnInit() {
    this.tplService.getStep3InitData(this.initParams.id).then(result =>
        this.isSuccess(result, data => this.doRefreshPage(data)));
  }

  doRefreshPage(data:any) {
    if (data.initParams && data.initParams.length) {
      data.initParams.forEach(row => {
        let taxRate:string = row.tax;
        this.taxOptions.push({value : taxRate, label : taxRate});
        this.rateAmountMap[taxRate] = {amount : row.amount, amountNoTax : row.amountNoTax};
      });
    }
    if (data.reCuxOkcPaymentTermsList && data.reCuxOkcPaymentTermsList.length)
      this.grid.data = data.reCuxOkcPaymentTermsList;
  }

  addRow() {
    this.grid.addRow();
  }

  calculateAmount(index:number):void {
    if (this.isEventing) return;
    this.isEventing = true;
    let rowData = this.grid.data[index];
    let paymentWay:string = rowData.paymentWay;
    let tax:number = rowData.tax;

    let paymentPercent:number = rowData.paymentPercent;
    let paymentAmount:number = rowData.paymentAmount;
    let norateContractAmount:number = rowData.norateContractAmount;

    let updateValues:any;

    console.log(`[Values][PaymentWay : ${paymentWay}][Tax : ${tax}][PaymentPercent : ${paymentPercent}][PaymentAmount : ${paymentAmount}]`);

    if (paymentWay && tax) {
      // 付款方式 - 金额
      if (paymentWay == 'AMOUNT') {
        if (paymentAmount) {
          updateValues = {
            paymentPercent : Math.round(paymentAmount / this.rateAmountMap[tax].amount * 100),
            norateContractAmount : Math.round(paymentAmount / (100 + tax) * 10000) / 100
          };
        }
      } else {
        if (paymentPercent) {
          let amount = this.rateAmountMap[tax.toFixed()].amount;
          let amountNoTax = this.rateAmountMap[tax].amountNoTax;
          updateValues = {
            paymentAmount : Math.round(amount *paymentPercent) / 100,
            norateContractAmount : Math.round(amountNoTax * paymentPercent) / 100
          };
        }
      }
    }
    if (!updateValues) updateValues = {paymentPercent : paymentPercent, paymentAmount : paymentAmount, norateContractAmount : norateContractAmount};
    this.grid.patchValue(index, updateValues);
    this.isEventing = false;
  }

  doSubmit() {
    if (this.grid.validate()) {
      this.loading();
      if (this.validateRate()) return;
      this.tplService.doSaveStep3({okcHeaderId : this.initParams.id, saveOkcTermList : this.grid.data}).then(result => {
        this.isSuccess(result, () => {
          this.tplService.step = 4;
        });
      });
    } else {
      this.error('当前页面有错误，请修正后提交!');
    }
  }

  closeMessageModal() {
    this.isAmountInvalid = false;
  }

  validateRate():boolean {
    let gridData = this.grid.data;
    let payData:any[] = [];
    let payTaxMap:any = {};
    gridData.forEach((value, i) => {
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

    console.log('[Check Rate]', isInvalid, payData);
    this.hideLoading();
    this.errData = payData;
    this.isAmountInvalid = isInvalid;
    this.refreshPage();
    return isInvalid;
  }
}
