import {
  ChangeDetectorRef, Injectable,
} from '@angular/core';
import {ContextService} from "../context.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {UrlConfig} from "../common/common.api";

@Injectable()
export class BaseComponent{

  protected initParams:any = {};

  public EDIT_GRID_CFG = {index : true, canDelete : true, tableMode : true};

  constructor(public ctx:ContextService,
              public cdr: ChangeDetectorRef,
              public message: NzMessageService,
              public router: Router,
              public initRoutes: ActivatedRoute) {
    this.initRoutes.params.subscribe(value => {
      this.initParams = value;
      console.log('[Page Init Parameters]', this.initParams);
    });
  }

  protected refreshPage() {
    this.cdr.detectChanges();
  }

  protected loading() {
    this.ctx.spinning = true;
  }

  protected hideLoading() {
    this.ctx.spinning = false;
  }

  protected success(msg:string) {
    this.message.success(msg);
  }

  protected error(msg:string) {
    this.message.error(msg);
  }

  protected info(msg:string) {
    this.message.info(msg);
  }

  protected isSuccess(result:any, callBack:any = null):boolean {
    this.hideLoading();
    if (!result.errcode && result.code != 100) {
      if (callBack) {
       callBack(result.data);
      }
      return true;
    }
    this.error(result.errmsg)
    return false;
  }

  protected getPageData(src:any) {
    return {
      data : src.list,
      totalCount : src.total
    }
  }

  protected goto(url:string) {
    this.router.navigateByUrl(url);
  }
}
