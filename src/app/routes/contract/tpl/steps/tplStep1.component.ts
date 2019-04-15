import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Options} from '../../../common/common.code'
import {ContextService} from "../../../context.service";
import {GridControlComponent} from "../../../common/gridControl.component";
import {TplService} from "../tpl.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseFormComponent} from "../../../base/baseForm.component";
import {UrlConfig} from "../../../common/common.api";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-contract-tpl-step1',
  templateUrl: './tplStep1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TplStep1Component extends BaseFormComponent implements OnInit {

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

  hiddenControls:any[] = [
    {name : 'contractCategoryTag', type : 'hidden'},
    {name : 'contractType', type : 'hidden'},
    {name : 'contractStatus', type : 'hidden'},
    {name : 'orgId', type : 'hidden'},
    {name : 'responsiblePersonId', type : 'hidden'},
    {name : 'responsiblePersonNum', type : 'hidden'},
    {name : 'responsibleDeptCode', type : 'hidden'},
    {name : 'projSpecialPersonNum', type : 'hidden'},
    {name : 'projSpecialPersonId', type : 'hidden'},
    {name : 'executeDeptCode', type : 'hidden'},
    {name : 'agentNum', type : 'hidden'},
    {name : 'agentId', type : 'hidden'},
    {name : 'shipToLocationId', type : 'hidden'},
    {name : 'billToLocationId', type : 'hidden'},
    {name : 'projectId', type : 'hidden'},
    {name : 'paProjectType', type : 'hidden'},
    {name : 'paCategoryAttribute8', type : 'hidden'},
    {name : 'paCategoryAttribute12', type : 'hidden'},
    {name : 'projDepartmentCode', type : 'hidden'},
    {name : 'projSubDepartmentCode', type : 'hidden'},
    {name : 'lineType', type : 'hidden'},
    {name : 'taskId', type : 'hidden'},
    {name : 'taskName', type : 'hidden'},
  ];

  basicControls:any[] = [
    {name : "contractName", label : '合同名称', colSpan : 10, required : true},
    {name : "contractNumber", label : '合同编号', disabled : true},
    {name : "contractAmount", label : '合同总额', type : 'number', disabled : true},
    {name : "contractCategory", label : '合同分类', type : 'modal', required : true, modalId : 'ContractCategory', callBack : (data) => this.doSetValues(data)},
    {name : "contractCategoryDesc", label : '分类说明', disabled : true},
    {name : "contractTypeDesc", label : '合同类型', required : true, type : 'modal', modalId : 'ContractTypeDesc', callBack : (data) =>
        this.form.patchValue({...data, contractType : data.lookUpCode})},
    {name : "contractAmountNotax", label : '合同不含税金额', type : 'number', disabled : true},
    {name : "contractIntention", label : '合同意向', required : true, noClear : true, type : 'select', options : [{value : 'BUY', label : '购买'}, {value : 'SELL', label : '销售'}]},
    {name : "majorFlag", label : '重大合同', type : 'select', options : Options.YES_NO},
    {name : "versionNum", label : '合同版本', type : 'number', disabled : true},
    {name : "contractOrigAmount", label : '合同原始金额', type : 'number', disabled : true},
    {name : "contractStatusDesc", label : '合同状态', disabled : true},
    {name : "signLocation", label : '签订地点'},
    {name : "globalFlag", label : '全局', type : 'checkbox', noLabel : true},
    {name : "contractOrigAmountNotax", label : '合同原始不含税金额', type : 'number', disabled : true},
    {name : "orgName", label : '承办公司', disabled : true},
    {name : "responsiblePersonName", label : '承办人', type : 'modal', disabled: true},
    {name : "responsibleDeptName", label : '承办部门', type : 'modal', modalId : 'ResponsibleDept', callBack : (data) => {
        this.form.patchValue({...data, responsibleDeptName : data.deptName, responsibleDeptCode : data.deptCode})
    }},
    {name : "currencyCode", label : '币种', type : 'modal', modalId : 'Currency', callBack : (data) => this.doSetValues(data)},
    {name : "projSpecialPersonName", label : '需求人', type : 'modal', modalId : 'PersonAndDept', callBack : (data) => {
        this.form.patchValue({
          ...data,
          executeDeptCode: data.deptCode,
          executeDeptDesc : data.deptName,
          projSpecialPersonName : data.employeeName,
          projSpecialPersonId : data.employeeId,
          projSpecialPersonNum : data.employeeNum
        });
    }},
    {name : "executeDeptDesc", label : '需求部门', type : 'modal', modalId : 'ResponsibleDept'},
    {name : "agentName", label : '采购员', type : 'modal', modalId : 'PersonAndDept', callBack : (data) =>
        this.doSetValues({...data, agentName : data.employeeName, agentId : data.employeeId})
    },
    {name : "agentLevel", label : '采购层级', type : 'select', options : [{"value":"EJ","label":"二级采购"},{"value":"ZB","label":"总包配送"},{"value":"ZC","label":"自采"},{"value":"JC","label":"集团采购"}]},
    {name : "comments", label : '备注', type : 'textarea', colSpan : 16},
  ];

  relatedControls:any[] = [
    {name : "relatedContractNumber", label : '合同相关编号', type : 'modal', modalId : 'RelatedContract', callBack : (data) =>
        this.form.patchValue({relatedContractNumber : data.contract_number})
    },
    {name : "othersContractNum", label : '对方合同编号'},
    {name : "authorizedFileNumber", label : '批复文件编号'},
    {name : "shipToLocationCode", label : '收货地点', disabled : true, type : 'modal', modalId : 'ShipToLocation', callBack : (data) =>
        this.form.patchValue({shipToLocationCode : data.location_code, shipToLocationId : data.location_id})
    },
    {name : "billToLocationCode", label : '收单地点', disabled : true, type : 'modal', modalId : 'BillToLocation', callBack : (data) =>
        this.form.patchValue({billToLocationCode : data.location_code, billToLocationId : data.location_id})
    },
    {name : "templateFlag", label : '合同模板', type : 'checkbox', noLabel : true, disabled : true, value : true},
    {name : "creationDate", label : '合同创建日期', type : 'date'},
    {name : "signDate", label : '合同签订日期', type : 'date'},
    {name : "orderType", label : '单据类型', type : 'select', options : [{value : 'order', label : '订单'}, {value : 'contract', label : '合同'}]},
    {name : "effectDate", label : '合同生效日期', type : 'date'},
    {name : "endDate", label : '合同终止日期', nl : true, type : 'date'},
    {name : "endNnrmDate", label : '合同异常终止日期', type : 'date'},
    {name : "cancellDate", label : '合同取消日期', type : 'date'},
  ];

  tabControlsTpl:any[] = [
    {name : 'roleName', label :'角色', type : 'modal', width: 150, required : true, modalId : 'Role', callBack : (data, callBackOptions, i) => {
        this.grid.patchValue(i, {
          roleName : data.roleName,
          roleCode : data.lookUpCode,
          unitName : {callBackOptions : {param : {roleCode : data.lookUpCode}}}
        });
      }},
    {name : 'unitName', label :'单位名称', type : 'modal', width : 350, modalId : 'TradeDept', callBack : (data, callBackOptions, i) => {
        this.grid.patchValue(i, {
          ...data,
          purchasingType : data.vendorSiteCode,
          contactName : data.contactName,
          contactPhone : data.primaryPhoneNumber,
          tax : data.registrationNumber,
          locations : data.address,
          payeeBanks : data.bankName,
          bankNumber : data.bankAccountName,
          bankAccount : data.bankAccountNum,
        });
      }},
    {name : 'purchasingType', label :'采购类型', disabled : true, width : 120},
    {name : 'contactName', label :'联系人', type : '', width : 150, required : true},
    {name : 'contactPhone', label :'联系电话', type : '', width : 180},
    {name : 'fax', label :'传真号', type : '', width : 180},
    {name : 'tax', label :'税号', type : '', width : 220},
    {name : 'locations', label :'单位地址', type : '', width : 350},
    {name : 'payeeBanks', label :'开户银行', type : '', width : 220},
    {name : 'bankNumber', label :'开户行银行联行号', width : 220},
    {name : 'state', label :'开户行省份', width : 150},
    {name : 'city', label :'开户行城市', width : 150},
    {name : 'bankName', label :'开户名称', width : 200},
    {name : 'bankAccount', label :'银行账号', width : 240},
    {name : 'roleCode', type : 'hidden'},
    {name : 'sourceTable', type : 'hidden'},
    {name : 'sourceId', type : 'hidden'},
  ];

  @ViewChild('contacts')
  grid:GridControlComponent;

  ngOnInit() {
    if (!this.initParams.id) {
      this.tplService.getStep1InitCreateData().then(data => this.doRefreshPage(data));
    } else {
      this.tplService.getStep1UpdInitData(this.initParams.id).then(data => this.doRefreshPage(data));
    }
  }

  doRefreshPage(result:any) {
    this.isSuccess(result, (data) => {
      this.tplService.contractCategoryTag = data.contractCategoryTag;
      this.form.patchValue(data);
      if (data.okcContactsList && data.okcContactsList.length) {
        this.grid.data = data.okcContactsList;
      }
      this.hideLoading();
    });
  }

  doSubmit():void {
    if (this.validate() && this.grid.validate()) {
      this.loading();
      this.tplService.doSaveStep1({...this.getFormData(), okcHeaderId : this.initParams.id, templateFlag : true, tradeAndContact : this.grid.data}).then(result => {
        this.isSuccess(result, (data) => {
          if (!this.initParams.id) {
            this.goto(UrlConfig.Routes.TplUpd + data.okcHeaderId);
          } else {
            this.tplService.step = 2
          }
        });
      });
    } else {
      this.error('当前表单有错误，请修正后提交!');
    }
  }

  doSetValues(values):void {
    this.form.patchValue(values);
  }
}
