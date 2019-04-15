import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit, SimpleChanges,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {Options} from '../../../common/common.code'
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {TransferService} from "./transfer.service";
import {Utils} from "../../../common/common.utils";
import {HttpClient} from "@angular/common/http";
import {ContextService} from "../../../context.service";
import {UrlConfig} from "../../../common/common.api";

@Component({
  selector: 'app-contract-create-step2',
  templateUrl: './step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step2Component implements OnInit {

  tabIndex:number;
  tabWidth:number;
  taxOptions:any[] = Options.TAX;

  serviceLineTypeOptions:any[] = [{"value":1022,"label":"服务"}];
  otherLineTypeOptions:any[] = [{"value":1,"label":"货物"}];

  tabPubCtrls:any[] = [
    {name : 'lineTypeId', width: 100, label : '标的类别', type : 'select', required : true, onChange : (callBackOptions) => {
      if (this.isEventing) return;
        console.log('Do set Control Value~');
      this.isEventing = true;
      if (callBackOptions.from == 'tab1')
        this.tab2FormArray.at(callBackOptions.index).patchValue({lineTypeId : callBackOptions.value});
      else
        this.tab1FormArray.at(callBackOptions.index).patchValue({lineTypeId : callBackOptions.value});
      this.isEventing = false;
    }},
    {name : 'itemNumber', width: 240, label : '物料编码', type : 'modal', required : true, modalId : 'ItemNumber', callBack : (data, callBackOptions) => {
      let settingData = {
        itemNumber : data.segment1,
        itemDescription : data.description,
        inventoryItemId : data.inventoryItemId,
        itemUom : data.itemUom,
        itemGg : data.attribute1,
        itemTh : data.attribute3,
        itemCz : data.attribute2,
      };
      (this.tab1FormArray.at(callBackOptions.index) as FormGroup).patchValue(settingData);
      (this.tab2FormArray.at(callBackOptions.index) as FormGroup).patchValue(settingData);
    }},
    {name : 'itemDescription', width: 180, label : '物料说明', disabled : true},
  ];

  tab1RowCtrls:any[][] = [];
  tab2RowCtrls:any[][] = [];

  tab1Controls:any[] = [];
  tab2Controls:any[] = [];
  tab1HiddenCtrls:any[] = [];
  tab2HiddenCtrls:any[] = [];

  tab1FormArray:FormArray;
  tab2FormArray:FormArray;

  tab1Width:number;
  tab2Width:number;

  serviceTab1Width:number = 2560
  serviceTab2Width:number = 3560;

  serviceTab1Controls:any[] = [
    {name : 'taxUnitPrice' , label : '含税单价', type : 'number',  width : 120 , required : true, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'taxUnitPrice');
        this.isEventing = false;
      }
    },
    {name : 'taxAmount' , label : '含税总价',  width : 150 , disabled : true},
    {name : 'tax' , label : '税率（%）', type : 'select',  width : 100 , required : true, options : Options.TAX, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'tax');
        this.isEventing = false;
    }},
    {name : 'unitPrice' , label : '不含税单价', type : 'number',  width : 150 , required : true, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'unitPrice');
        this.isEventing = false;
      }
    },
    {name : 'countNoTax' , label : '不含税总价',  width : 180 , disabled : true},
    {name : 'quantity' , label : '数量', type : 'number',  width : 120 , required : true, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'quantity');
        this.isEventing = false;
    }},
    {name : 'itemUom' , label : '单位', type : 'modal',  width : 120 , required : true, modalId : 'ItemUom', callBack : (data, callBackOptions) => {
        (this.tab1FormArray.at(callBackOptions.index) as FormGroup).patchValue({
          itemUom : data.uomCode
        });
      }},
    {name : 'arrivalDate' , label : '到货时间', type : 'date',  width : 150},
    {name : 'startWorkDate' , label : '开工时间', type : 'date',  width : 150 , required : true},
    {name : 'completedDate' , label : '完工时间', type : 'date',  width : 150 , required : true},
    {name : 'locationCode' , label : '交货地点', type : 'modal',  width : 180, modalId : 'DelieveLocation', callBack : (data, callBackOptions) =>
        (this.tab1FormArray.at(callBackOptions.index) as FormGroup).patchValue({
          ...data,
          shipToLocation : data.locationCode
        })
    },
    {name : 'comments' , label : '备注',  width : 220},
  ];

  serviceTab1HiddenCtrls:any[] = [
    {name : 'inventoryItemId', type : 'hidden'},
    {name : 'shipToLocation', type : 'hidden'},
  ];

  serviceTab2Controls:any[] = [
    {name : 'projectNum' , label : '项目编号', type : 'modal',  width : 180, modalId : 'ProjectCode', callBack : (data, callBackOptions) =>
        (this.tab2FormArray.at(callBackOptions.index) as FormGroup).patchValue({
          projectNum : data.projectnumber,
          projectName : data.projectname,
          projectId : data.projectid,
          taskId : data.taskid,
          taskName : data.taskname,
          expenditureType : data.pa_project_type,
          expenditureTypeId : data.department_code
        })
    },
    {name : 'projectName' , label : '项目名称',  width : 180 , disabled : true},
    {name : 'taskName' , label : '任务', type : 'modal',  width : 180},
    {name : 'expenditureType' , label : '支出类型', type : 'modal',  width : 180},
    {name : 'deptName' , label : '预算部门', type : 'modal',  width : 180, modalId : 'ResponsibleDept', callBack : (data, callBackOptions) => {

        (this.tab2FormArray.at(callBackOptions.index) as FormGroup).patchValue({
        })
      }
    },
    {name : 'account' , label : '预算科目', type : 'modal',  width : 180},
    {name : 'accountDes' , label : '科目名称',  width : 180 , disabled : true},
    {name : 'childAccountDes' , label : '预算子目', type : 'modal',  width : 180},
    {name : 'requisitionNumber' , label : '采购计划单号',  width : 180 , disabled : true},
    {name : 'requisitionLineNum' , label : '计划行号',  width : 180 , disabled : true},
    {name : 'requisitionComments' , label : '需求计划备注',  width : 180 , disabled : true},
    {name : 'documentNumber' , label : '定价单号',  width : 180 , disabled : true},
    {name : 'auctionLineNum' , label : '定价单行',  width : 180 , disabled : true},
    {name : 'auctionComments' , label : '定价单备注',  width : 180 , disabled : true},
    {name : 'poNumber' , label : '采购订单编号',  width : 180 , disabled : true},
    {name : 'poLineNum' , label : '订单行号',  width : 180 , disabled : true},
  ];

  serviceTab2HiddenCtrls:any[] = [
    {name : 'projectId', type : 'hidden'},
    {name : 'accountId', type : 'hidden'},
    {name : 'taskId', type : 'hidden'},
    {name : 'deptCode', type : 'hidden'},
    {name : 'childAccount', type : 'hidden'},
    {name : 'requisitionHeaderId', type : 'hidden'},
    {name : 'requisitionLineId', type : 'hidden'},
    {name : 'auctionHeaderId', type : 'hidden'},
    {name : 'poHeaderId', type : 'hidden'},
    {name : 'poLineId', type : 'hidden'},
    {name : 'expenditureTypeId', type : 'hidden'},
  ];

  otherTab1Controls:any[] = [
    {name : 'itemGg' , label : '规格',  width : 150 , disabled : true},
    {name : 'itemUom' , label : '单位', type : 'modal',  width : 120, modalId : 'ItemUom' , required : true},
    {name : 'quantity' , label : '数量', type : 'number',  width : 120 , required : true, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'quantity')
        this.isEventing = false;
      }},
    {name : 'tax' , label : '税率(%)', type : 'select',  width : 100 , required : true, options : Options.TAX, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'tax')
        this.isEventing = false;
      }},
    {name : 'taxUnitPrice' , label : '含税单价', type : 'number',  width : 120 , required : true, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'taxUnitPrice')
        this.isEventing = false;
      }
    },
    {name : 'taxAmount' , label : '含税总价',  width : 150 , disabled : true},
    {name : 'unitPrice' , label : '不含税单价', type : 'number',  width : 150 , required : true, onChange : (callBackOptions) => {
        if (this.isEventing) return;
        this.isEventing = true;
        this.updatePrice(callBackOptions.index, 'unitPrice')
        this.isEventing = false;
      }
    },
    {name : 'countNoTax' , label : '不含税总价',  width : 180 , disabled : true},
    {name : 'arrivalDate' , label : '到货时间', type : 'date',  width : 160, required : true},
    {name : 'startWorkDate' , label : '开工时间', type : 'date',  width : 160},
    {name : 'completedDate' , label : '完工时间', type : 'date',  width : 160},
    {name : 'locationCode' , label : '交货地点', type : 'modal',  width : 220, modalId : 'DelieveLocation'},
    {name : 'shipAlertDay' , label : '发货提醒',  width : 120},
    {name : 'itemCharacterDesc' , label : '物资性质', type : 'modal',  width : 120, modalId : 'ItemCharacter'},
    {name : 'usedPersonName' , label : '用料人',  width : 120},
    {name : 'comments' , label : '备注',  width : 220},
    {name : 'itemTh' , label : '图号',  width : 180 , disabled : true},
    {name : 'itemCz' , label : '材质',  width : 180 , disabled : true},
    {name : 'brandTrader' , label : '品牌',  width : 180},

  ];
  otherTab1HiddenControls:any[] = [
    {name : 'itemCharacter', type : 'hidden'},
    {name : 'usedPersonId', type : 'hidden'},
  ];
  otherTab2Controls:any[] = [
    {name : 'projectNum' , label : '项目编号', type : 'modal',  width : 180, modalId : 'ProjectCode', callBack : (data, callBackOptions) =>
        (this.tab2FormArray.at(callBackOptions.index) as FormGroup).patchValue({
          projectNum : data.projectnumber,
          projectName : data.projectname,
          projectId : data.projectid,
          taskId : data.taskid,
          taskName : data.taskname,
          expenditureType : data.pa_project_type,
          expenditureTypeId : data.department_code
        })
    },
    {name : 'projectName' , label : '项目名称',  width : 180 , disabled : true},
    {name : 'taskName' , label : '任务', type : 'modal',  width : 140, modalId : 'Task'},
    {name : 'expenditureType' , label : '支出类型', type : 'modal',  width : 140, modalId : 'ExpenditureType'},
    {name : 'requisitionNumber' , label : '采购计划单号',  width : 180 , disabled : true},
    {name : 'requisitionLineNum' , label : '计划行号',  width : 180 , disabled : true},
    {name : 'requisitionComments' , label : '需求计划备注',  width : 180 , disabled : true},
    {name : 'poHeaderId' , label : '采购订单编号',  width : 180 , disabled : true},
    {name : 'documentNumber' , label : '订单行号',  width : 180 , disabled : true},
    // {name : 'documentNumber' , label : '定价单号',  width : 180 , disabled : true}, TODO To Check
    {name : 'auctionLineNum' , label : '定价单行',  width : 180 , disabled : true},
    {name : 'auctionComments' , label : '定价单备注',  width : 180 , disabled : true},
  ];
  otherTab2HiddenControls:any[] = [
    {name : 'projectId', type : 'hidden'},
    {name : 'accountId', type : 'hidden'},
    {name : 'taskId', type : 'hidden'},
    {name : 'deptCode', type : 'hidden'},
    {name : 'childAccount', type : 'hidden'},
    {name : 'requisitionHeaderId', type : 'hidden'},
    {name : 'requisitionLineId', type : 'hidden'},
    {name : 'auctionHeaderId', type : 'hidden'},
    // {name : 'poHeaderId', type : 'hidden'},
    {name : 'poLineId', type : 'hidden'},
    {name : 'expenditureTypeId', type : 'hidden'},
  ];
  otherTab1Width:number = 3590
  otherTab2Width:number = 2600;

  constructor(private fb: FormBuilder,
              public formData: TransferService,
              private cdr: ChangeDetectorRef,
              private http: _HttpClient,
              private ctx:ContextService) {}

  ngOnInit() {
    if (this.formData.contractCategoryTag == 'SERVICE') {
      this.tab1Controls = this.serviceTab1Controls;
      this.tab2Controls = this.serviceTab2Controls;
      this.tab1HiddenCtrls = this.serviceTab1HiddenCtrls;
      this.tab2HiddenCtrls = this.serviceTab2HiddenCtrls;
      this.tab1Width = this.serviceTab1Width;
      this.tab2Width = this.serviceTab2Width;
      this.tabPubCtrls[0].options = this.serviceLineTypeOptions;
    } else {
      this.tab1Controls = this.otherTab1Controls;
      this.tab2Controls = this.otherTab2Controls;
      this.tab1HiddenCtrls = this.otherTab1HiddenControls;
      this.tab2HiddenCtrls = this.otherTab2HiddenControls;
      this.tab1Width = this.otherTab1Width;
      this.tab2Width = this.otherTab2Width;
      this.tabPubCtrls[0].options = this.otherLineTypeOptions;
    }
    this.formData.step2FormGroup = this.fb.group({
      taxRate : [null],
      deliveryDate : [null],
    });
    this.tab1FormArray = this.fb.array([]);
    this.tab2FormArray = this.fb.array([]);

    this.formData.step2FormGroup.addControl('tab1', this.tab1FormArray);
    this.formData.step2FormGroup.addControl('tab2', this.tab2FormArray);
    this.switchTab(0);
    this.doGetInitData();
  }

  switchTab(index):void {
    this.tabIndex = index;
    if (this.tabIndex == 0)
      this.tabWidth = this.tab1Width;
    else
      this.tabWidth = this.tab2Width;
  }

  doSubmit() {
    let submitValues = {okcHeaderId : this.formData.okcHeaderId, cuxOkcLinesAllList : []};
    let tab1RowSubmitFields:string[] = ['lineTypeId', 'inventoryItemId',
      'itemNumber', 'itemDescription', 'itemUom', 'quantity', 'changeQuantity',
      'unitPrice', 'taxUnitPrice', 'countNoTax', 'taxAmount', 'tax', 'unitPrice', 'arrivalDate', 'startWorkDate', 'completedDate', 'shipToLocation',
      'comments'];
    let tab2RowSubmitFields:string[] = ['projectId', 'taskId', 'expenditureTypeId', 'requisitionHeaderId', 'requisitionLineId',
      'poHeaderId', 'poLineId', 'requisitionComments', 'auctionHeaderId', 'auctionLineNum',
      'auctionComments', 'accountId', 'itemCharacter', 'brandTrader', 'usedPersonId', 'usedPersonName',
      'shipAlertDay', 'deptCode', 'account', 'childAccount'];
    this.tab1FormArray.controls.forEach((value, i) => {
      let rowVal = Utils.getValueFrom(tab1RowSubmitFields, this.tab1FormArray.at(i).value);
      rowVal = Object.assign(rowVal, Utils.getValueFrom(tab2RowSubmitFields, this.tab2FormArray.at(i).value));
      rowVal.lineNum = (i + 1);
      rowVal.versionNum = this.formData.versionNum;
      console.log('Before', rowVal);
      rowVal = this.formData.processDateValue(rowVal);
      console.log('After', rowVal);
      submitValues.cuxOkcLinesAllList.push(rowVal);
    });
    this.formData.submitStep2Form(submitValues, () => {
      console.log('Refresh Page!');
      this.clearAll();
      this.doGetInitData();
    });
  }

  clearAll():void {
    for (let i = this.tab1FormArray.controls.length - 1; i >= 0; i--) {
      this.removeTab1Line(i);
    }
  }

  doGetInitData():void {
    this.ctx.spinning = true;
    this.http.post(UrlConfig.InitStep2, {okcHeaderId : this.formData.okcHeaderId})
      .toPromise()
      .then((result: any) => {
        console.log('[Page Init Result]:', result);
        this.doSetValues(result.data);
        this.ctx.spinning = false;
      })
      .catch(error => { throw error });
  }

  doSetValues(data:any) {
    if (data) {
      data.forEach((row, i) => {
        this.addRow();
        this.cdr.detectChanges();
        this.isEventing = true;
        this.tab1FormArray.at(i).patchValue(row);
        this.tab2FormArray.at(i).patchValue(row);
        this.isEventing = false;
        this.updatePrice(i, null);
      });
    }
  }

  addRow():void {
    this.addTab1Row();
    this.addTab2Row();
  }

  addTab1Row():void {
    let currIndex:number = this.tab1FormArray.controls.length;
    let rowFormGroup = this.fb.group({});
    let rowCtrls = [...this.tabPubCtrls, ...this.tab1Controls, ...this.tab1HiddenCtrls];
    rowCtrls[0]= {...rowCtrls[0], callBackOptions : {index : currIndex, from : 'tab1'}};
    rowCtrls[1]= {...rowCtrls[1], callBackOptions : {index : currIndex, param : {contractCategoryTag : this.formData.contractCategoryTag}}};
    rowCtrls[3]= {...rowCtrls[3], callBackOptions : {index : currIndex}};
    rowCtrls[5]= {...rowCtrls[5], callBackOptions : {index : currIndex}};
    rowCtrls[6]= {...rowCtrls[6], callBackOptions : {index : currIndex}};
    rowCtrls[8]= {...rowCtrls[8], callBackOptions : {index : currIndex}};
    rowCtrls[9]= {...rowCtrls[9], callBackOptions : {index : currIndex}};
    rowCtrls[13]= {...rowCtrls[13], callBackOptions : {index : currIndex}};
    this.tab1RowCtrls = [...this.tab1RowCtrls, rowCtrls];
    this.tab1FormArray.push(rowFormGroup);
  }

  addTab2Row():void {
    let currIndex:number = this.tab1FormArray.controls.length;
    let rowFormGroup = this.fb.group({});
    let rowCtrls = [...this.tabPubCtrls, ...this.tab2Controls, ...this.tab2HiddenCtrls];
    rowCtrls[0]= {...rowCtrls[0], callBackOptions : {index : currIndex, from : 'tab2'}};
    rowCtrls[1]= {...rowCtrls[1], callBackOptions : {index : currIndex, param : {contractCategoryTag : this.formData.contractCategoryTag}}};
    rowCtrls[2]= {...rowCtrls[2], callBackOptions : {index : currIndex}};
    rowCtrls[3]= {...rowCtrls[3], callBackOptions : {index : currIndex}};
    rowCtrls[5]= {...rowCtrls[5], callBackOptions : {index : currIndex}};
    rowCtrls[7]= {...rowCtrls[7], callBackOptions : {index : currIndex}};
    this.tab2RowCtrls = [...this.tab2RowCtrls, rowCtrls];
    this.tab2FormArray.push(rowFormGroup);
  }

  isEventing:boolean;

  onTaxChange():void {
    let value:string = this.formData.step2FormGroup.controls['taxRate'].value;
    this.tab1FormArray.controls.forEach((item, i) => {
      item.patchValue({tax : value});
    });
  }

  updatePrice(index:number, srcFieldName:string) {
    console.log(index);
    let rowFormGroup = this.tab1FormArray.at(index);
    let taxUnitPrice:number = rowFormGroup.get('taxUnitPrice').value;
    let taxAmount:number = rowFormGroup.get('taxAmount').value;
    let unitPrice:number = rowFormGroup.get('unitPrice').value;
    let countNoTax:number = rowFormGroup.get('countNoTax').value;
    let quantity:number = rowFormGroup.get('quantity').value;
    let tax:number = rowFormGroup.get('tax').value;

    console.log('Before', srcFieldName, taxUnitPrice, taxAmount, unitPrice, countNoTax, quantity, tax);
    if (srcFieldName == 'tax') {
      if (taxUnitPrice) srcFieldName = 'taxUnitPrice';
      else if (unitPrice) srcFieldName = 'unitPrice';
    }
    let newVal:any = {};
    if (srcFieldName == 'unitPrice') {
      if (tax && unitPrice) {
        taxUnitPrice = unitPrice + unitPrice * tax / 100;
        newVal.taxUnitPrice = taxUnitPrice;
      }
    } else if (srcFieldName == 'taxUnitPrice') {
      if (tax && taxUnitPrice) {
        unitPrice = Math.round(taxUnitPrice / (1 + tax / 100) * 100) / 100;
        newVal.unitPrice = unitPrice;
      }
    }
    taxAmount = Math.round(taxUnitPrice * quantity * 100) / 100;
    countNoTax = Math.round(unitPrice * quantity * 100) / 100;
    rowFormGroup.patchValue({
      ...newVal,
      taxAmount : taxAmount,
      countNoTax : countNoTax
    });
    console.log('After', srcFieldName, taxUnitPrice, taxAmount, unitPrice, countNoTax, quantity, tax);
    console.log('*******************************************');
    this.isEventing = false;
  }

  removeTab1Line(index):void {
    this.tab1RowCtrls = this.tab1RowCtrls.filter((value, i) => i != index);
    this.tab2RowCtrls = this.tab2RowCtrls.filter((value, i) => i != index);
    this.tab1FormArray.removeAt(index);
    this.tab2FormArray.removeAt(index);
  }
}
