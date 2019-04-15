import {Injectable} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {_HttpClient} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd";
import {DatePipe} from "@angular/common";
import {ContextService} from "../../../context.service";
import {UrlConfig} from "../../../common/common.api";

@Injectable()
export class TransferService {
  step:number = 1;
  versionNum:number = 0;

  okcHeaderId:number = 0;
  createMode:string = '';
  contractCategoryTag:string = 'SERVICE_A';


  stepTitles : string[] = ['合同基本信息', '合同行信息', '合同付款条件信息', '合同条款信息', '附件信息', '合同预览和提交'];

  step1FormGroup : FormGroup;
  step2FormGroup : FormGroup;
  step3FormGroup : FormGroup;
  step4FormGroup : FormGroup;
  step5FormGroup : FormGroup;
  step6FormGroup : FormGroup;

  constructor(private http: _HttpClient,
              private message: NzMessageService,
              private datePipe:DatePipe,
              private ctx:ContextService) {}

  public success(msg:string) {
    this.message.success(msg);
  }

  public error(msg:string) {
    this.message.error(msg);
  }

  public doApprove():void {
    this.http.post(UrlConfig.Approve, {okcHeaderId : this.okcHeaderId})
      .toPromise()
      .then((data: any) => {
        console.log('[Save Result]:', data);
        if (data) {
          if (!data.errcode) {
            this.success('保存成功！');
          } else {
            this.error(data.msg);
          }
        }
        this.ctx.spinning = false;
      })
      .catch(error => { throw error });
  }

  public submitStep1Form() {
    this.ctx.spinning = true;
    console.log('****************************Submit Step 1*********************************');
    let contractToSaveItems = [
      'contractNumber',
      'contractName',
      'orgId',
      'contractCategory',
      'contractCategoryTag',
      'contractType',
      'contractIntention',
      'majorFlag',
      'versionNum',
      'signLocation',
      'globalFlag',
      'contractStatus',
      'currencyCode',
      'contractAmount',
      'contractAmountNotax',
      'contractOrigAmount',
      'contractOrigAmountNotax',
      'responsiblePersonId',
      'responsibleDeptCode',
      'projSpecialPersonId',
      'executeDeptCode',
      'agentId',
      'agentLevel',
      'disputeSettlement',
      'appendOkcFlag',
      'comments',
      'relatedContractNumber',
      'othersContractNum',
      'authorizedFileNumber',
      'shipToLocationId',
      'billToLocationId',
      'projectId',
      'taskId',
      'projectTypeCode',
      'templateFlag',
      'signDate',
      'effectDate',
      'signComments',
      'endDate',
      'endNnrmDate',
      'endStatus',
      'endComments',
      'cancellDate',
      'discontinueDate',
      'finalCloseDate',
      'completeDate',
      'buyType',
      'buyMethod',
      'disputeResolution',
      'orderType',
    ];

    let pageValues = this.step1FormGroup.value;
    let submitValues = this.getValueFrom(contractToSaveItems, pageValues);

    let contractHeaderContactToSaveItems = [
      'roleCode',
      'sourceId',
      'sourceTable',
      'contactName',
      'contactPhone',
      'payeeBanks',
      'bankNumber',
      'bankName',
      'bankAccount',
      'state',
      'city',
      'purchasingType',
      'fax',
      'tax',
      'locations',
    ];
    console.log('*************************************************************');

    let contactValues:any[] = pageValues['tradeAndContact'];
    if (contactValues && contactValues.length) {
      submitValues.tradeAndContact = [];
      contactValues.forEach(value =>
        submitValues.tradeAndContact.push(
          this.getValueFrom(contractHeaderContactToSaveItems, value))
      );
    }

    let isCreateMode:boolean = true;
    if (this.okcHeaderId && this.okcHeaderId != 0) {
      isCreateMode = false;
      submitValues.okcHeaderId = this.okcHeaderId;
    }

    console.log(`Submit Values:[IS_CREATE: ${isCreateMode}][okcHeaderId: ${this.okcHeaderId}]`, submitValues);
    console.log(`Submit Values: [Stringify]${JSON.stringify(submitValues)}`);

    this.http.post(UrlConfig.Save, this.processDateValue(submitValues))
      .toPromise()
      .then((result: any) => {
        console.log('[Save Result]:', result);
        if (result) {
          if (!result.errcode) {
            this.success('保存成功！');
            this.okcHeaderId = result.data.okcHeaderId;
            if (isCreateMode) {
              location.href = `#/contract/update/${this.okcHeaderId}`;
            }
            this.step = 2;
          } else {
            this.ctx.spinning = false;
            this.error(result.msg);
          }
        }
      })
      .catch(error => { throw error });
  }

  public submitStep2Form(submitValues:any, callBack:any) {
    this.ctx.spinning = true;
    console.log('Do submit step2', submitValues);
    this.http.post(UrlConfig.SaveStep2, submitValues)
      .toPromise()
      .then((data: any) => {
        console.log('[Save Result]:', data);
        if (data) {
          if (!data.errcode) {
            this.success('保存成功！');
            // callBack();
            this.step = 3;
          } else {
            this.error(data.msg);
          }
        }
        this.ctx.spinning = false;
      })
      .catch(error => { throw error });
  }

  public submitStep3Form(submitValues) {
    this.ctx.spinning = true;
    console.log('Do submit step3', submitValues);
    this.http.post(UrlConfig.SaveStep3, this.processDateValue(submitValues))
      .toPromise()
      .then((data: any) => {
        console.log('[Save Result]:', data);
        if (data) {
          if (!data.errcode) {
            this.success('保存成功！');
            this.step = 4;
          } else {
            this.error(data.msg);
          }
        }
      })
      .catch(error => { throw error });
  }

  public submitStep4Form(submitValues) {
    console.log('Save step4', submitValues);
    this.ctx.spinning = true;
    this.http.post(UrlConfig.SaveStep4, this.processDateValue(submitValues))
      .toPromise()
      .then((data: any) => {
        console.log('[Save Result]:', data);
        if (data) {
          if (!data.errcode) {
            this.success('保存成功！');
            this.step = 5;
          } else {
            this.error(data.msg);
            this.ctx.spinning = false;
          }
        }
      })
      .catch(error => { throw error });
  }

  public saveStep4FromTpl(submitValues, callBack) {
    this.ctx.spinning = true;
    console.log('Do save from template', submitValues);
    this.http.post(UrlConfig.SaveStep4FromTpl, this.processDateValue(submitValues))
      .toPromise()
      .then((data: any) => {
        console.log('[Save Result]:', data);
        if (data) {
          if (!data.errcode) {
            this.success('保存成功！');
            callBack();
          } else {
            this.error(data.msg);
          }
        }
      })
      .catch(error => { throw error });
  }

  public deleteStep5(attachmentId:number, callBack:any):void {
    this.http.post(UrlConfig.DeleteStep5, {attachmentId : attachmentId})
      .toPromise()
      .then((data: any) => {
        console.log('[Page Init Result]:', data);
        if (data) {
          if (!data.errcode) {
            this.success('保存成功！');
            callBack();
          } else {
            this.error(data.msg);
          }
        }
      })
      .catch(error => { throw error });
  }

  public processDateValue(data:any) {
    if (data) {
      switch (typeof data) {
        case 'string':
          return data;
        case 'number':
          return data;
        case 'object':
          if (Array.isArray(data)) {
            data.forEach(value => this.processDateValue(value));
            return data;
          } else if (data.getYear) {
            return this.datePipe.transform(data, 'yyyy-MM-dd hh:mm:ss');
          } else {
            Object.keys(data).forEach(key => {
              let type = typeof data[key];
              let before = data[key];
              data[key] = this.processDateValue(data[key]);
              // console.log('Convert:', key, type, before, data[key]);
            });
            return data;
          }
      }
    }
    return data;
  }

  private getValueFrom(keys:string[], from:any):any {
    let target:any = {};
    let outputLog:string = '';
    keys.forEach(value => {
      target[value] = from[value]
      outputLog += `${value} \t ${target[value]}\n`;
    });
    console.log(outputLog);
    console.log('*************************************************************');
    return target;
  }

  public toggleControlsDisabled(ctrls:any[], ctrlNames:string[], disabled:boolean):void {
    this.doSetControlsAttribute(ctrls, ctrlNames, 'disabled', disabled);
  }

  public toggleControlsReadonly(ctrls:any[], ctrlNames:string[], readonly:boolean):void {
    this.doSetControlsAttribute(ctrls, ctrlNames, 'readonly', readonly);
  }

  public toggleControlsRequired(ctrls:any[], ctrlNames:string[], required:boolean):void {
    this.doSetControlsAttribute(ctrls, ctrlNames, 'required', required);
  }

  private doSetControlsAttribute(ctrls:any[], ctrlNames:string[], attrName:string, tf:boolean):void {
    let ctrlIndexs:any = {};
    ctrls.forEach((value, i) => ctrlIndexs[value.name] = i);
    ctrlNames.forEach(value =>
      ctrls[ctrlIndexs[value]] = {...ctrls[ctrlIndexs[value]], [attrName] : tf}
    );
  }

  public patchValue(formArray:FormArray, row:number, value:any):void {
    (formArray.at(row) as FormGroup).patchValue(value);
  }
}
