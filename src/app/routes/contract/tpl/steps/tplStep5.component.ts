import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {Options} from '../../../common/common.code'
import {ContextService} from "../../../context.service";
import {GridControlComponent} from "../../../common/gridControl.component";
import {TplService} from "../tpl.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseFormComponent} from "../../../base/baseForm.component";
import {DatePipe} from "@angular/common";
import {UrlConfig} from "../../../common/common.api";

@Component({
  selector: 'app-contract-tpl-step5',
  templateUrl: './tplStep5.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TplStep5Component extends BaseFormComponent implements OnInit {

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

  basicControls:any[] = [
    {name : 'contractNumber' , label : '合同编号' , disabled : true},
    {name : 'contractName' , label : '合同名称' , disabled : true},
    {name : 'versionNum' , label : '合同版本' , disabled : true},
    {name : 'contractAmount' , label : '合同总额' , disabled : true},
    {name : 'contractAmountNotax' , label : '合同不含税额' , disabled : true},
    {name : 'currencyDesc' , label : '币种' , disabled : true},
    {name : 'orgName' , label : '承办公司' , disabled : true},
    {name : 'responsibleDeptCode' , label : '承办部门' , disabled : true},
    {name : 'executeDeptCode' , label : '需求部门' , disabled : true},
    {name : 'responsiblePersonName' , label : '承办人' , disabled : true},
    {name : 'projSpecialPersonName' , label : '需求人' , disabled : true},
    {name : 'agentName' , label : '采购员' , disabled : true},
    {name : 'contractCategory' , label : '合同分类' , disabled : true},
    {name : 'contractCategoryDesc' , label : '分类说明' , disabled : true},
    {name : 'contractStatusDesc' , label : '状态' , disabled : true},
    {name : 'contractType' , label : '合同类型' , disabled : true},
    {name : 'contractTypeDesc' , label : '类型说明' , disabled : true},
    {name : 'agentLevelDesc' , label : '采购层级' , disabled : true},
    {name : 'creationDate' , label : '创建日期' , disabled : true},
    {name : 'relatedContractNumber' , label : '相关合同编号' , disabled : true},
    {name : 'authorizedFileNumber' , label : '批复文件编号' , disabled : true},
    {name : 'contractIntention' , label : '合同意向' , disabled : true},
    {name : 'majorFlag' , label : '重大合同' , disabled : true},
    {name : 'signLocation' , label : '签订地点' , disabled : true},
    {name : 'buyType' , label : '采购类型' , disabled : true},
    {name : 'disputeResolution' , label : '争议解决方式' , disabled : true},
    {name : 'disputeSettlement' , label : '争议解决地点' , disabled : true},
    {name : 'estimateTotal' , label : '预估总价' , disabled : true},
    {name : 'floatingProportion' , label : '可浮动比例' , disabled : true},
    {name : 'agreementExpiryDate' , label : '协议过期日' , disabled : true},
    {name : 'comments' , type : 'textarea', label : '备注' , disabled : true, colSpan : 21},
  ];

  contactListCtrls:any[] = [
    {name : 'roleName' , label : '角色 ', type : 'text', width : 100},
    {name : 'unitName' , label : '单位名称 ', type : 'text', width : 200},
    {name : 'contactName' , label : '联系人 ', type : 'text', width : 200},
    {name : 'contactPhone' , label : '联系电话 ', type : 'text', width : 150},
    {name : 'fax' , label : '传真号 ', type : 'text', width : 150},
    {name : 'tax' , label : '税号 ', type : 'text', width : 200},
    {name : 'locations' , label : '单位地址 ', type : 'text', width : 200},
    {name : 'payeeBanks' , label : '收款方开户银行 ', type : 'text', width : 200},
    {name : 'bankNumber' , label : '开户行银行联行号 ', type : 'text', width : 200},
    {name : 'state' , label : '开户行省份 ', type : 'text', width : 150},
    {name : 'city' , label : '开户行城市 ', type : 'text', width : 150},
    {name : 'bankName' , label : '开户名称 ', type : 'text', width : 150},
    {name : 'bankAccount' , label : '银行账号 ', type : 'text', width : 180},
    {name : 'purchasingType' , label : '采购类型 ', type : 'text', width : 120},
  ];

  lineListCtrls:any[] = [
    {name : 'itemNumber' , label : '物料编码 ', type : 'text', width : 150},
    {name : 'itemDesc' , label : '物料说明 ', type : 'text', width : 200},
    {name : 'itemGg' , label : '规格 ', type : 'text', width : 100},
    {name : 'itemTh' , label : '图号 ', type : 'text', width : 100},
    {name : 'itemCz' , label : '材质 ', type : 'text', width : 100},
    {name : 'quantity' , label : '数量 ', type : 'text', width : 100},
    {name : 'itemUom' , label : '单位 ', type : 'text', width : 100},
    {name : 'taxUnitPrice' , label : '含税单价 ', type : 'text', width : 100},
    {name : 'tax' , label : '税率(%) ', type : 'text', width : 100},
    {name : 'arrivalDate' , label : '到货时间 ', type : 'text', width : 200},
    {name : 'startWorkDate' , label : '开工日期 ', type : 'text', width : 200},
    {name : 'completedDate' , label : '完工日期 ', type : 'text', width : 200},
    {name : 'locationCode' , label : '交货地点 ', type : 'text', width : 300},
    {name : 'expenditureType' , label : '支出类型 ', type : 'text', width : 300},
    {name : 'comments' , label : '备注 ', type : 'text', width : 200},
    {name : 'projectNum' , label : '项目编号 ', type : 'text', width : 100},
    {name : 'projectName' , label : '项目名称 ', type : 'text', width : 150},
    {name : 'taskName' , label : '任务 ', type : 'text', width : 150},
    {name : 'deptName' , label : '预算部门 ', type : 'text', width : 150},
    {name : 'account' , label : '预算科目 ', type : 'text', width : 150},
    {name : 'accountDes' , label : '科目名称 ', type : 'text', width : 150},
    {name : 'childAccount' , label : '预算子目 ', type : 'text', width : 150},
  ];

  payListCtrls:any[] = [
    {name : 'clauseTypesDesc' , label : '款项类型 ', type : 'text', width : 100},
    {name : 'paymentWayDesc' , label : '付款方式 ', type : 'text', width : 100},
    {name : 'paymentPercent' , label : '付款比例(%) ', type : 'text', width : 100},
    {name : 'tax' , label : '税率 ', type : 'text', width : 100},
    {name : 'paymentAmount' , label : '付款金额 ', type : 'text', width : 100},
    {name : 'schedulePaymentDate' , label : '计划付款时间 ', type : 'text', width : 100},
    {name : 'projectName' , label : '项目编号 ', type : 'text', width : 100},
    {name : 'taskName' , label : '项目任务 ', type : 'text', width : 100},
    {name : 'comments' , label : '备注 ', type : 'text', width : 100},
  ];

  clauseList:any[] = [];

  gridConfig:any = {index : true, tableMode : true};

  @ViewChild('grid1') grid1:GridControlComponent;
  @ViewChild('grid2') grid2:GridControlComponent;
  @ViewChild('grid3') grid3:GridControlComponent;

  ngOnInit() {
    this.tplService.getStep5InitData(this.initParams.id).then(result =>
      this.isSuccess(result, data => this.processInitData(data)));
  }

  processInitData(data):void {
    if (data) {
      this.form.patchValue(data.header);
      this.grid1.data = data.contactList;
      this.grid2.data = data.lineList;
      this.grid3.data = data.payList;
      this.clauseList = data.clauseList;
    }
    this.refreshPage();
    this.hideLoading();
  }
}
