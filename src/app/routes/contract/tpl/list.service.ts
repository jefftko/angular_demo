import {Injectable} from '@angular/core';
import {UrlConfig} from "../../common/common.api";
import {BaseService} from "../../base/base.service";

@Injectable()
export class TplListService extends BaseService {

  getTplList(params:any) {
    return this.post(UrlConfig.TplList, params);
  }

  createTplVersion(okcHeaderId:number) {
    return this.post(UrlConfig.TplApproveEdit, {okcHeaderId});
  }

  gotoApprove(okcHeaderId:number) {
    return this.post(UrlConfig.TplApprove, {okcHeaderId});
  }

  getHistory(okcHeaderId:number) {
    return this.post(UrlConfig.TplHistory, {okcHeaderId});
  }
}
