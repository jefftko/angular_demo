import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ContextService} from "../../../context.service";
import {TplService} from "../tpl.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseFormComponent} from "../../../base/baseForm.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-contract-tpl-step4',
  templateUrl: './tplStep4.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TplStep4Component extends BaseFormComponent implements OnInit {

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

  tabForm:FormArray;

  ctrlTpl:any[] = [
    {name : 'lineNum' , label : '行号', type : 'number',  width : 120 , disabled : true},
    {name : 'needMaintain' , label : '需维护', type : 'checkbox',  width : 120 , disabled : true},
    {name : 'updateState' , label : '被更新', type : 'checkbox',  width : 120 , disabled : true},
    {name : 'serialNumber' , label : '编号',  width : 120},
    {name : 'clauseTitle' , label : '条款标题', type : 'modal',  width : 600},
  ];

  clauseContentTpl:any = {name : 'clauseContent' , label : '条款内容', type : 'textarea'};

  ctrls:any[] = [];
  extendCtrls:any[] = [];
  expanding:boolean[] = [];

  ngOnInit():void {
    this.tplService.getStep4InitData(this.initParams.id).then(result =>
      this.isSuccess(result, data => this.processInitData(data))
    );
  }

  protected doAfterInstance() {
    this.tabForm = this.fb.array([]);
    this.form = this.fb.group({tabForm : this.tabForm});
  }

  processInitData(data):void {
    if (data) {
      data.forEach((row, i) => {
        this.doAdd();
        this.tabForm.at(i).patchValue(row);
      })
      this.hideLoading();
    }
  }

  doAdd():void {
    this.expanding.push(false);
    this.tabForm.push(this.fb.group({}));
    this.ctrls.push([...this.ctrlTpl]);
    this.extendCtrls.push({...this.clauseContentTpl});
    let currLength:number = this.tabForm.controls.length;
    this.cdr.detectChanges();
    this.tabForm.at(currLength - 1).patchValue({lineNum : currLength});
  }

  showClauseContent(i:number):void {
    this.expanding[i] = !this.expanding[i];
  }

  removeRow(i:number):void {
    this.tabForm.removeAt(i);
    this.ctrls = this.ctrls.filter((value, index) => i != index);
    this.extendCtrls = this.extendCtrls.filter((value, index) => i != index);
    this.expanding = this.expanding.filter((value, index) => i != index);
  }

  doSubmit():void {
    this.loading();
    this.tplService.doSaveStep4({
      okcHeaderId : this.initParams.id,
      inSaveOkcClauseDTOList : this.tabForm.value
    }).then(result => this.isSuccess(result, () => this.tplService.step = 5));
  }
}
