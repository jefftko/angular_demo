import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {TransferService } from './transfer.service';
import {Options} from '../../../common/common.code'
import {_HttpClient} from "@delon/theme";
import {HttpClient} from "@angular/common/http";
import {ContextService} from "../../../context.service";
import {UrlConfig} from "../../../common/common.api";
import {ModalConfig} from "../../../common/modal.config";

@Component({
  selector: 'app-contract-create-step1',
  templateUrl: './step1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1Component implements OnInit {

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

  isIniting:boolean = true;

  basicControls:any[] = [
    {name : "contractName", label : '合同名称', colSpan : 10},
    {name : "contractNumber", label : '合同编号'},
    {name : "contractAmount", label : '合同总额', type : 'number'},
    {name : "contractCategory", label : '合同分类', type : 'modal', modalId : 'ContractCategory', callBack : (data) => this.doSetValues(data)},
    {name : "contractCategoryDesc", label : '分类说明'},
    {name : "contractTypeDesc", label : '合同类型', type : 'modal', modalId : 'ContractTypeDesc', callBack : (data) =>
        this.doSetValues({...data, contractType : data.lookUpCode})},
    {name : "contractAmountNotax", label : '合同不含税金额', type : 'number'},
    {name : "contractIntention", label : '合同意向', noClear : true, type : 'select', options : [{value : 'BUY', label : '购买'}, {value : 'SELL', label : '销售'}]},
    {name : "buyMethod", label : '采购方式', type : 'select', options : [{"value":"BIDDING","label":"公开招标"},{"value":"BIDINVIT","label":"邀请招标"},{"value":"CONTINUE","label":"续标"},{"value":"GKZDY","label":"公开招标转单一来源"},{"value":"GKZXJ","label":"公开招标转竟询价"},{"value":"INQUIRY","label":"询价采购"},{"value":"NEGO","label":"竞争性谈判"},{"value":"ONLINE","label":"网上询价"},{"value":"POSTANDARD","label":"单一来源采购"},{"value":"RELATEDTRANSACTION","label":"关联交易"},{"value":"RLRCSG","label":"市场采购"},{"value":"RLSNZG","label":"省内直供"},{"value":"RLSWZK","label":"省外直供"},{"value":"XJZDY","label":"竞询转单一来源"}]},
    {name : "versionNum", label : '合同版本', type : 'number'},
    {name : "contractOrigAmount", label : '合同原始金额', type : 'number'},
    {name : "contractStatusDesc", label : '合同状态'},
    {name : "signLocation", label : '签订地点'},
    {name : "globalFlag", label : '协议类型', type : 'select', options : [{value : 'Y', label : '全局协议'}, {value : 'N', label : '本地协议'}]},
    {name : "contractOrigAmountNotax", label : '合同原始不含税金额', type : 'number'},
    {name : "orgName", label : '承办公司'},
    {name : "responsiblePersonName", label : '承办人', type : 'modal'},
    {name : "responsibleDeptName", label : '部门名称', type : 'modal', modalId : 'ResponsibleDept', callBack : (data) => {
        this.doSetValues({...data, responsibleDeptName : data.deptName, responsibleDeptCode : data.deptCode})
    }},
    {name : "currencyCode", label : '币种', type : 'modal', modalId : 'Currency', callBack : (data) => this.doSetValues(data)},
    {name : "projSpecialPersonName", label : '需求人', type : 'modal', modalId : 'PersonAndDept', callBack : (data) => {
        this.doSetValues({
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

    {name : "techTermsFlag", label : '是否涉外合同', type : 'select', options : Options.YES_NO},
    {name : "cancelReson", label : '取消原因', colSpan : 10},
    {name : "appendOkcFlag", label : '是否补充合同', type : 'select', options : Options.YES_NO, onChange : (change) => {
      if (!this.isIniting)
        this.relatedControls[0] = {...this.relatedControls[0], required : change.value == 'Y'};
    }},

    {name : "majorFlag", label : '重大合同', type : 'select', options : Options.YES_NO},
    {name : "buyType", label : '采购类型', type : 'select', options : [{"value":"PROJECT","label":"工程"},{"value":"SERVICE","label":"服务"},{"value":"SERVICE161","label":"服务（检修公司耗材）"},{"value":"RL","label":"燃料"},{"value":"GOODS","label":"物资"}]},
    {name : "disputeResolution", label : '争议解决方式', type : 'select', options : [{"value":"ARBITRATION","label":"仲裁"},{"value":"SUE","label":"诉讼"}]},
    {name : "disputeSettlement", label : '争议解决地点'},
    {name : "estimateTotal", label : '预估总价', type : 'number'},
    {name : "floatingProportion", label : '可浮动比例'},
    {name : "agreementExpiryDate", label : '协议过期日', type : 'date'},
    {name : "warranty", label : '质保期', type : 'number'},
    {name : "DJAmount", label : '单价合同金额', nl : true},
    {name : "comments", label : '备注', type : 'textarea', colSpan : 13},
  ];

  relatedControls:any[] = [
    {name : "relatedContractNumber", label : '合同相关编号', type : 'modal', modalId : 'RelatedContract', callBack : (data) =>
        this.doSetValues({relatedContractNumber : data.contractNumber})
    },
    {name : "othersContractNum", label : '对方合同编号'},
    {name : "authorizedFileNumber", label : '批复文件编号'},
    {name : "shipToLocationCode", label : '收货地点', type : 'modal', modalId : 'ShipToLocation', callBack : (data) =>
        this.doSetValues({shipToLocationCode : data.location_code, shipToLocationId : data.location_id})
    },
    {name : "billToLocationCode", label : '收单地点', type : 'modal', modalId : 'BillToLocation', callBack : (data) =>
        this.doSetValues({billToLocationCode : data.location_code, billToLocationId : data.location_id})
    },
    {name : "templateFlag", label : '合同模板', type : 'checkbox', noLabel : true},
    {name : "creationDate", label : '合同创建日期', type : 'date'},
    {name : "signDate", label : '合同签订日期', type : 'date'},
    {name : "orderType", label : '单据类型', type : 'select', required : true, options : [{value : 'order', label : '订单'}, {value : 'contract', label : '合同'}]},
    {name : "effectDate", label : '合同生效日期', type : 'date'},
    {name : "endDate", label : '合同终止日期', nl : true, type : 'date'},
    {name : "endNnrmDate", label : '合同异常终止日期', type : 'date'},
    {name : "cancellDate", label : '合同取消日期', type : 'date'},
  ];

  tabControlsTpl:any[] = [
    {name : 'roleName', label :'角色', type : 'modal', width: 150, modalId : 'Role', callBack : (data, callBackOptions) => {
        let rowIndex:number = callBackOptions.index;
        let row:any[] = this.tabControls[rowIndex];
        row[1] = {...row[1], callBackOptions : {
            ...row[1].callBackOptions,
            param : {roleCode : data.lookUpCode}
        }};
        this.cdr.detectChanges();
        this.formData.patchValue(this.tradeAndContact, rowIndex, {...data, roleCode : data.lookUpCode});
    }},
    {name : 'unitName', label :'单位名称', type : 'modal', width : 350, modalId : 'TradeDept', callBack : (data, callBackOptions) => {
        (this.tradeAndContact.at(callBackOptions.index) as FormGroup).patchValue({
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
    {name : 'contactName', label :'联系人', type : '', width : 150},
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

  tabControls:any[][] = [];

  tradeAndContact:FormArray;

  constructor(private fb: FormBuilder,
              public formData: TransferService,
              private http: _HttpClient,
              private cdr: ChangeDetectorRef,
              private ctx:ContextService) {}

  ngOnInit() {
    this.formData.step1FormGroup = this.fb.group({});
    this.tradeAndContact = this.fb.array([]);
    this.formData.step1FormGroup.addControl('tradeAndContact', this.tradeAndContact);
    this.doUpdateCtrls();
  }

  doUpdateCtrls() {
    let initDisabledCtrlNames = ['contractNumber', 'contractAmount', 'contractCategoryDesc',
      'contractAmountNotax', 'versionNum', 'contractOrigAmount', 'orgName', 'responsiblePersonName',
      'contractStatusDesc', 'contractOrigAmountNotax', 'cancelReson',
      'estimateTotal', 'floatingProportion', 'agreementExpiryDate', 'DJAmount'];
    this.formData.toggleControlsDisabled(this.basicControls, initDisabledCtrlNames, true);

    let initRelatedDisabledCtrlNames = ['creationDate', 'signDate', 'effectDate',
      'endDate', 'endNnrmDate', 'cancellDate'];
    this.formData.toggleControlsDisabled(this.relatedControls, initRelatedDisabledCtrlNames, true);

    let initRequiredCtrlNames = ['contractName', 'contractCategory', 'agentLevel', 'contractTypeDesc', 'contractIntention', 'buyMethod',
      'responsibleDeptName', 'currencyCode', 'buyType', 'projSpecialPersonName', 'executeDeptDesc', 'agentName',
      'disputeResolution', 'disputeSettlement'];
    this.formData.toggleControlsRequired(this.basicControls, initRequiredCtrlNames, true);

    let url:string, params:any;
    if (this.formData.okcHeaderId) {
      url = UrlConfig.InitStep1;
      params = {okcHeaderId : this.formData.okcHeaderId}
    } else {
      url = UrlConfig.Init;
    }
    console.log('[Check update or insert]', url, params);

    this.http.post(url, params)
      .toPromise()
      .then((result: any) => {
        console.log('[Page Init Result]:', result);
        if (!result.errcode) {
          this.doInitUpdateValues(result.data);
          this.ctx.spinning = false;
        }
      })
      .catch(error => { throw error });
  }

  doSetCtrlValues(ctrls:any[], values:any) {
    ctrls.forEach(ctrl => {
      if (values[ctrl.name] || values[ctrl.name] === 0) {
        ctrl.value = values[ctrl.name];
      }
    });
  }

  doAddTradeAndContactRow():void {
    let currTabIndex:number = this.tradeAndContact.controls.length;
    this.tradeAndContact.push(this.fb.group({}));
    this.tabControls = [...this.tabControls, this.duplicateTabCtrls(currTabIndex, this.tabControlsTpl)];
  }

  duplicateTabCtrls(index:number, ctrls:any[]) {
    let rowCtrls:any[] = [];
    ctrls.forEach(value => rowCtrls.push({...value,  callBackOptions : {index : index}}));
    return rowCtrls;
  }

  removeLineOfTradeAndContact(index):void {
    this.tabControls = this.tabControls.filter((value, i) => index != i);
    this.tradeAndContact.removeAt(index);
  }

  doSubmit():void {
    //TODO Process Bank Info
    let validateRes = this.validate(this.hiddenControls);
    validateRes = this.validate(this.basicControls) || validateRes;
    validateRes = this.validate(this.relatedControls) || validateRes;
    if (validateRes) return;
    this.formData.submitStep1Form();
  }

  doInitUpdateValues(values) {
    if (this.formData.createMode == 'appendOkc' || values.appendOkcFlag == 'Y') {
      this.relatedControls[0].required = true;
      values.appendOkcFlag = 'Y';
      this.basicControls[25].disabled = true;
    }
    this.formData.contractCategoryTag = values.contractCategoryTag;
    values.templateFlag = (values.templateFlag == 'Y');
    if (values.okcContactsList)
      values.tradeAndContact = values.okcContactsList;
    if (values.tradeAndContact && values.tradeAndContact.length) {
      values.tradeAndContact.forEach((row, i) => {
        this.doAddTradeAndContactRow();
        this.tabControls[i][1].callBackOptions.param = {roleCode : row.roleCode};
      });
    }
    this.doSetValues(values);
    this.isIniting = false;
  }

  doSetValues(values):void {
    // console.log('Transform value', values);
    this.formData.step1FormGroup.patchValue(values);
    this.cdr.detectChanges();
  }

  validate(ctrls:any[]):boolean {
    // console.log('**********************************************');
    let newCtrl:any = {};
    ctrls.forEach((value, i) => {
      value.index = i;
      newCtrl[value.name] = value;
    });
    let hasError:boolean = false;
    ctrls.forEach(ctrl => {
      let formItem = this.formData.step1FormGroup.controls[ctrl.name];
      if (formItem) {
        formItem.markAsDirty();
        formItem.updateValueAndValidity();
        if (formItem.status == 'INVALID') {
          hasError = true;
          ctrls[ctrl.index].error = true;
          // console.log(ctrl.index, ctrl.name, formItem.status, ctrl.label, formItem.value);
        } else {
          ctrls[ctrl.index].error = false;
        }
      }
    });
    return hasError;
  }
}
