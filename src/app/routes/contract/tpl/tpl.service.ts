import {ChangeDetectorRef, Injectable} from '@angular/core';
import {BaseService} from "../../base/base.service";
import {UrlConfig} from "../../common/common.api";
import {_HttpClient} from "@delon/theme";
import {ContextService} from "../../context.service";

@Injectable()
export class TplService extends BaseService {


  constructor(protected http: _HttpClient,
              protected ctx:ContextService,
              public cdr: ChangeDetectorRef) {
    super(http, ctx);
  }

  _step:number = 1;
  contractCategoryTag:string = 'SERVICE';
  stepTitles:string[] = ['合同基本信息', '合同行信息', '合同付款条件信息', '合同条款信息', '合同预览和提交'];

  set step(step:number) {
    this._step = step;
    this.cdr.detectChanges();
  }

  get step():number {
    return this._step;
  }

  public getStep1InitCreateData() {
    return this.post(UrlConfig.Init, null);
  }

  public getStep1UpdInitData(okcHeaderId:number) {
    return this.post(UrlConfig.TplUpdInitStep1, {okcHeaderId});
  }

  public doSaveStep1(data:any) {
    data.globalFlag = (data.globalFlag ? 'Y' : 'N');
    return this.post(UrlConfig.TplCreateSave, data);
  }

  public getStep2InitData(okcHeaderId:number) {
    return this.post(UrlConfig.TplUpdInitStep2, {okcHeaderId});
  }

  public doSaveStep2(data:any) {
    return this.post(UrlConfig.TplSaveStep2, data);
  }

  public getStep3InitData(okcHeaderId:number) {
    return this.post(UrlConfig.TplUpdInitStep3, {okcHeaderId});
  }

  public doSaveStep3(data:any) {
    return this.post(UrlConfig.TplSaveStep3, data);
  }

  public getStep4InitData(okcHeaderId:number) {
    return this.post(UrlConfig.TplUpdInitStep4, {okcHeaderId});
  }

  public doSaveStep4(data:any) {
    return this.post(UrlConfig.TplSaveStep4, data);
  }

  public getStep5InitData(okcHeaderId:number) {
    return this.post(UrlConfig.TplUpdInitStep5, {okcHeaderId});
  }

}
