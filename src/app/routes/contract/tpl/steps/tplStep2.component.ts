import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Options} from '../../../common/common.code'
import {ContextService} from "../../../context.service";
import {GridControlComponent} from "../../../common/gridControl.component";
import {TplService} from "../tpl.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseFormComponent} from "../../../base/baseForm.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-contract-tpl-step2',
  templateUrl: './tplStep2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TplStep2Component extends BaseFormComponent implements OnInit {

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

  tabIndex:number = 0;
  taxOptions:any[] = Options.TAX;
  isEventing:boolean = false;

  serviceLineTypeOptions:any[] = [{"value":1022,"label":"服务"}];
  otherLineTypeOptions:any[] = [{"value":1,"label":"货物"}];

  step2GridConfig:any;

  pubCtrlTpl:any[] = [
    {name : 'lineTypeId', width: 150, label : '标的类别', type : 'select', required : true, onChange : (callBackOptions, i) => {
        if (this.isEventing) return;
        this.isEventing = true;
        if (this.tabIndex == 0) {
          this.grid2.patchValue(i, {lineTypeId : callBackOptions.value});
        } else
          this.grid1.patchValue(i, {lineTypeId : callBackOptions.value});
        this.isEventing = false;
      }},
    {name : 'itemNumber', width: 240, label : '物料编码', type : 'modal', required : true, modalId : 'ItemNumber', callBack : (data, callBackOptions, i) => {
        let settingData = {
          itemNumber : data.segment1,
          itemDescription : data.description,
          inventoryItemId : data.inventoryItemId,
          itemUom : data.itemUom,
          itemGg : data.attribute1,
          itemTh : data.attribute3,
          itemCz : data.attribute2,
        };
        this.grid1.patchValue(i, settingData);
        this.grid2.patchValue(i, settingData);
      }},
    {name : 'itemDescription', width: 180, label : '物料说明', disabled : true},
  ];

  serviceTab1CtrlTpl:any[] = [
    {name : 'taxUnitPrice' , label : '含税单价', type : 'number',  width : 120 , required : true, onChange : (callBackOptions, i) =>
        this.updatePrice(i, 'taxUnitPrice')
    },
    {name : 'taxAmount' , label : '含税总价',  width : 150 , disabled : true},
    {name : 'tax' , label : '税率（%）', type : 'select',  width : 100 , required : true, options : Options.TAX, onChange : (callBackOptions, i) =>
        this.updatePrice(i, 'tax')
    },
    {name : 'unitPrice' , label : '不含税单价', type : 'number',  width : 150 , required : true, onChange : (callBackOptions, i) =>
        this.updatePrice(i, 'unitPrice')
    },
    {name : 'countNoTax' , label : '不含税总价',  width : 180 , disabled : true},
    {name : 'quantity' , label : '数量', type : 'number',  width : 120 , required : true, onChange : (callBackOptions, i) =>
        this.updatePrice(i, 'quantity')
    },
    {name : 'itemUom' , label : '单位', type : 'modal',  width : 120 , required : true, modalId : 'ItemUom', callBack : (data, callBackOptions, i) =>
        this.grid1.patchValue(i, {
          itemUom: data.uomCode
        })
    },
    {name : 'arrivalDate' , label : '到货时间', type : 'date',  width : 150},
    {name : 'startWorkDate' , label : '开工时间', type : 'date',  width : 150 , required : true},
    {name : 'completedDate' , label : '完工时间', type : 'date',  width : 150 , required : true},
    {name : 'locationCode' , label : '交货地点', type : 'modal',  width : 180, modalId : 'DelieveLocation', callBack : (data, callBackOptions, i) =>
        this.grid1.patchValue(i, {
          ...data,
          shipToLocation : data.locationCode
        })
    },
    {name : 'comments' , label : '备注',  width : 220},
  ];
  serviceTab2CtrlTpl:any[] = [];

  @ViewChild("grid1") grid1:GridControlComponent;
  @ViewChild("grid2") grid2:GridControlComponent;

  tab1CtrlTpl:any[] = [];
  tab2CtrlTpl:any[] = [];

  protected doAfterInstance() {
    this.form = this.fb.group({
      taxRate : null,
      deliveryDate : null
    });
  }

  protected initTabControls() {
    this.step2GridConfig = {...this.EDIT_GRID_CFG, onRemoveRow : i => {
        if (this.tabIndex == 0)
          this.grid2.removeRow(i);
        else
          this.grid1.removeRow(i);
    }};
    this.pubCtrlTpl[1].callBackOptions = {param : {contractCategoryTag : this.tplService.contractCategoryTag}};
    if (this.tplService.contractCategoryTag == 'SERVICE') {
      this.pubCtrlTpl[0].options = this.serviceLineTypeOptions;
      this.tab1CtrlTpl = [...this.pubCtrlTpl, ...this.serviceTab1CtrlTpl];
      this.tab2CtrlTpl = [...this.pubCtrlTpl, ...this.serviceTab2CtrlTpl];
    } else {

    }
  }

  ngOnInit() {
    this.initTabControls();
    this.tplService.getStep2InitData(this.initParams.id).then(result => {
        this.isSuccess(result, data => this.doRefreshPage(data));
    });
  }

  doRefreshPage(data:any) {
    if (data && data.length) {
      this.grid1.data = data;
      this.grid2.data = data;
      data.forEach((row, i) => {
        this.updatePrice(i, null);
      });
    }
  }

  switchTab(index) {
    this.tabIndex = index;
  }

  addRow() {
    this.grid1.addRow();
    this.grid2.addRow();
  }

  doUpdateDate() {
    this.grid2.patchValue(0, {lineTypeId : 1022});
  }

  updatePrice(index:number, srcFieldName:string) {
    console.log(index);
    if (this.isEventing) return;
    this.isEventing = true;
    let rowData = this.grid1.data[index];
    console.log(rowData);
    let taxUnitPrice:number = rowData['taxUnitPrice'];
    let taxAmount:number = rowData['taxAmount'];
    let unitPrice:number = rowData['unitPrice'];
    let countNoTax:number = rowData['countNoTax'];
    let quantity:number = rowData['quantity'];
    let tax:number = rowData['tax'];

    console.log(`[Before Update][Source: ${srcFieldName}][taxUnitPrice:${taxUnitPrice}][taxAmount:${taxAmount}][unitPrice:${unitPrice}][countNoTax:${countNoTax}][quantity:${quantity}][tax:${tax}]`);
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
    this.grid1.patchValue(index, {
      ...newVal,
      taxAmount : taxAmount,
      countNoTax : countNoTax
    });
    console.log(`[After  Update][Source: ${srcFieldName}][taxUnitPrice:${taxUnitPrice}][taxAmount:${taxAmount}][unitPrice:${unitPrice}][countNoTax:${countNoTax}][quantity:${quantity}][tax:${tax}]`);
    console.log('*******************************************');
    this.isEventing = false;
  }

  doSubmit() {
    if (this.grid1.validate() && this.grid1.validate()) {
      this.loading();
      let grid1Data = this.grid1.data;
      let grid2Data = this.grid2.data;
      let cuxOkcLinesAllList = [];
      grid1Data.forEach((row, i) => cuxOkcLinesAllList.push({lineNum : i + 1, ...row, ...grid2Data[i]}));
      let submitValues = {okcHeaderId : this.initParams.id, cuxOkcLinesAllList};
      this.tplService.doSaveStep2(submitValues).then(result => {
        this.isSuccess(result, () => {
          this.tplService.step = 3;
        });
      });
    } else {
      this.error('当前页面有错误，请修正后提交!');
    }
  }

  onTaxChange() {

  }
}
