import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit, ViewChild,
} from '@angular/core';
import {ContextService} from "../../context.service";
import {TplListService} from "./list.service";
import {GridControlComponent} from "../../common/gridControl.component";
import {BaseComponent} from "../../base/base.component";
import {UrlConfig} from "../../common/common.api";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-tpl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers : [TplListService, ContextService]
})
export class TplListComponent extends BaseComponent implements OnInit {

  constructor(public ctx:ContextService,
              public cdr: ChangeDetectorRef,
              public message: NzMessageService,
              public router: Router,
              public initRoutes: ActivatedRoute,
              private tplListService:TplListService,) {
    super(ctx, cdr, message, router, initRoutes);
  }

  gridTpl: any[] = [
    {name : 'contractName' , label : '模板名称', type : 'text'},
    {name : 'contractNumber' , label : '模板编号', type : 'text'},
    {name : 'contractCategoryDesc' , label : '合同分类', type : 'text'},
    {name : 'contractTypeDesc' , label : '合同类型', type : 'text'},
    {name : 'contractStatusDesc' , label : '合同状态', type : 'text'},
    {name : 'contractStatus' , label : '合同状态Code', type : 'hidden'},
    {name : 'creationDate' , label : '创建时间', type : 'text'},
    {name : 'okcHeaderId' , label : 'okcHeaderId', type : 'hidden'},
  ];

  @ViewChild(GridControlComponent)
  grid:GridControlComponent;

  ngOnInit() {
    this.grid.store = (loadOptions: any) => {
      return this.tplListService.getTplList(loadOptions).then((result) => {
          this.hideLoading();
          if (this.isSuccess(result)) {
            return this.getPageData(result.data);
          }
      });
    }
  }

  gotoCreate():void {
    this.goto(UrlConfig.Routes.TplCreate);
  }

  doUpdate():void {
    this.checkRowSelect(rowData => {
      let contractStatus = rowData.contractStatus;
      if (contractStatus == 'YPZ') {
        this.loading();
        this.tplListService.createTplVersion(rowData['okcHeaderId']).then(result =>
          this.isSuccess(result, () =>
            this.goto(UrlConfig.Routes.TplUpd + rowData['okcHeaderId'])
          )
        );
      } else if (contractStatus == 'ND') {
        this.goto(UrlConfig.Routes.TplUpd + rowData['okcHeaderId']);
      } else {
        this.info('当前模板不可编辑！');
      }
    });
  }

  gotoApprove():void {
    this.checkRowSelect(rowData => {
      let contractStatus = rowData.contractStatus;
      if (contractStatus == 'ND') {
        this.loading();
        this.tplListService.gotoApprove(rowData['okcHeaderId']).then(result =>
          this.isSuccess(result, () => this.grid.reload())
        );
      } else {
        this.info('当前模板不能审批！');
      }
    });
  }

  historyVisible:boolean = false;
  contractHistory:any[] = [];

  showHistory():void {
    this.loading();
    this.checkRowSelect(rowData => {
      this.tplListService.getHistory(rowData['okcHeaderId']).then(result =>
        this.isSuccess(result, data => {
          this.historyVisible = true;
          this.contractHistory = result.data.contractHistory;
          this.refreshPage();
        })
      );
    });
  }

  private checkRowSelect(callBack:any) {
    let rowData = this.grid.selectionData;
    // console.log('[Select Row]', rowData);
    if (rowData) {
      callBack(rowData);
      return;
    }
    this.error('您没有选择任何数据！');
  }

}
