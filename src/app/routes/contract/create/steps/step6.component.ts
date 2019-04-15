import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {FormBuilder} from "@angular/forms";
import {TransferService} from "./transfer.service";
import {ContextService} from "../../../context.service";
import {UrlConfig} from "../../../common/common.api";

@Component({
  selector: 'app-contract-create-step6',
  templateUrl: './step6.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step6Component implements OnInit {

  constructor(private fb: FormBuilder,
              public formData: TransferService,
              private http: _HttpClient,
              private cdr: ChangeDetectorRef,
              private ctx:ContextService) {}

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

  contactList:any[] = [];
  contactListCtrls:any[] = [
    {name : 'roleName' , label : '角色 ',  width : 100},
    {name : 'unitName' , label : '单位名称 ',  width : 200},
    {name : 'contactName' , label : '联系人 ',  width : 200},
    {name : 'contactPhone' , label : '联系电话 ',  width : 150},
    {name : 'fax' , label : '传真号 ',  width : 150},
    {name : 'tax' , label : '税号 ',  width : 200},
    {name : 'locations' , label : '单位地址 ',  width : 200},
    {name : 'payeeBanks' , label : '收款方开户银行 ',  width : 200},
    {name : 'bankNumber' , label : '开户行银行联行号 ',  width : 200},
    {name : 'state' , label : '开户行省份 ',  width : 150},
    {name : 'city' , label : '开户行城市 ',  width : 150},
    {name : 'bankName' , label : '开户名称 ',  width : 150},
    {name : 'bankAccount' , label : '银行账号 ',  width : 180},
    {name : 'purchasingType' , label : '采购类型 ',  width : 120},
  ];

  lineList:any[] = [];
  lineListCtrls:any[] = [
    {name : 'lineNum' , label : '行号 ',  width : 100},
    {name : 'itemNumber' , label : '物料编码 ',  width : 150},
    {name : 'itemDesc' , label : '物料说明 ',  width : 200},
    {name : 'itemGg' , label : '规格 ',  width : 100},
    {name : 'itemTh' , label : '图号 ',  width : 100},
    {name : 'itemCz' , label : '材质 ',  width : 100},
    {name : 'quantity' , label : '数量 ',  width : 100},
    {name : 'itemUom' , label : '单位 ',  width : 100},
    {name : 'taxUnitPrice' , label : '含税单价 ',  width : 100},
    {name : 'tax' , label : '税率(%) ',  width : 100},
    {name : 'arrivalDate' , label : '到货时间 ',  width : 200},
    {name : 'startWorkDate' , label : '开工日期 ',  width : 200},
    {name : 'completedDate' , label : '完工日期 ',  width : 200},
    {name : 'locationCode' , label : '交货地点 ',  width : 300},
    {name : 'expenditureType' , label : '支出类型 ',  width : 300},
    {name : 'comments' , label : '备注 ',  width : 200},
    {name : 'projectNum' , label : '项目编号 ',  width : 100},
    {name : 'projectName' , label : '项目名称 ',  width : 150},
    {name : 'taskName' , label : '任务 ',  width : 150},
    {name : 'deptName' , label : '预算部门 ',  width : 150},
    {name : 'account' , label : '预算科目 ',  width : 150},
    {name : 'accountDes' , label : '科目名称 ',  width : 150},
    {name : 'childAccount' , label : '预算子目 ',  width : 150},
  ];

  payList:any[] = [];
  payListCtrls:any[] = [
    {name : 'lineNum' , label : '序号 ',  width : 50},
    {name : 'clauseTypesDesc' , label : '款项类型 ',  width : 100},
    {name : 'paymentWayDesc' , label : '付款方式 ',  width : 100},
    {name : 'paymentPercent' , label : '付款比例(%) ',  width : 100},
    {name : 'tax' , label : '税率 ',  width : 100},
    {name : 'paymentAmount' , label : '付款金额 ',  width : 100},
    {name : 'schedulePaymentDate' , label : '计划付款时间 ',  width : 100},
    {name : 'projectName' , label : '项目编号 ',  width : 100},
    {name : 'taskName' , label : '项目任务 ',  width : 100},
    {name : 'comments' , label : '备注 ',  width : 100},
  ];

  clauseList:any[] = [];

  attachmentList:any[] = [];
  attachmentListCtrls:any[] = [
    {name : 'attachmentId' , label : '附件ID ',  width : 120},
    {name : 'attachmentName' , label : '附件名称 ',  width : 120},
    {name : 'fileName' , label : '文件名 ',  width : 500},
    {name : 'createPerson' , label : '上传者', type : 'text',  width : 180},
    {name : 'creationDate' , label : '上传时间', type : 'text',  width : 180},
  ];

  ngOnInit() {
    this.formData.step6FormGroup = this.fb.group({});
    this.doInitPage();
  }

  doInitPage():void {
    this.http.post(UrlConfig.InitStep6, {okcHeaderId : this.formData.okcHeaderId})
      .toPromise()
      .then((result: any) => {
        console.log('[Page Init Result]:', result);
        // this.doSetValues(data);
        this.processInitData(result.data);
        this.doGetAttachments();
      })
      .catch(error => { throw error });
  }

  processInitData(data):void {
    this.formData.contractCategoryTag = data.contractCategoryTag;
    if (data) {
      if (data.header) {
        this.formData.step6FormGroup.patchValue(data.header);
      }
      if (data.contactList) {
        this.contactList = data.contactList;
      }
      if (data.lineList) {
        this.lineList = data.lineList;
      }
      if (data.payList) {
        this.payList = data.payList;
      }
      if (data.clauseList) {
        this.clauseList = data.clauseList;
      }
    }
  }

  doGetAttachments():void {
    this.http.post(UrlConfig.InitStep5, {okcHeaderId : this.formData.okcHeaderId, sourceType : 'CUX_OKC_HEADS_ALL'})
      .toPromise()
      .then((result: any) => {
        this.attachmentList = result.data.attrList;
        this.cdr.detectChanges();
        this.ctx.spinning = false;
      })
      .catch(error => { throw error });
  }

  gotoDownLoad(i:number):void {
    location.href = UrlConfig.ContractAttachmentDownload + this.attachmentList[i].attachmentId;
  }

  doSubmit():void {

  }

}
