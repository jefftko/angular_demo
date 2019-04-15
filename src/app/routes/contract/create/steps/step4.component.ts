import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {FormArray, FormBuilder} from "@angular/forms";
import {TransferService} from "./transfer.service";
import {ContextService} from "../../../context.service";
import {UrlConfig} from "../../../common/common.api";

@Component({
  selector: 'app-contract-create-step4',
  templateUrl: './step4.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step4Component implements OnInit {


  constructor(private fb: FormBuilder,
              public formData: TransferService,
              private http: _HttpClient,
              private cdr: ChangeDetectorRef,
              private ctx:ContextService) {}

  tabForm:FormArray;

  ctrlTpl:any[] = [
    {name : 'lineNum' , label : '行号', type : 'number',  width : 120 , disabled : true},
    {name : 'needMaintain' , label : '需维护', type : 'checkbox',  width : 120 , disabled : true},
    {name : 'updateState' , label : '被更新', type : 'checkbox',  width : 120 , disabled : true},
    {name : 'serialNumber' , label : '编号',  width : 120},
    {name : 'clauseTitle' , label : '条款标题', type : 'modal',  width : 600},
  ];

  okcTplId:number;

  selectClauseFromTpl:any = {name : 'clauseTpl' , label : '条款标题', type : 'modal',  width : 600, modalId : 'ContractTpl', callBack : (data, callBackOptions) => {
    this.formData.step4FormGroup.patchValue({
      clauseTpl : data.contractName
    });
    this.okcTplId = data.okcHeaderId
  }};

  clauseContentTpl:any = {name : 'clauseContent' , label : '条款内容', type : 'textarea'};

  ctrls:any[] = [];
  extendCtrls:any[] = [];
  expanding:boolean[] = [];

  ngOnInit():void {
    this.tabForm = this.fb.array([]);
    this.formData.step4FormGroup = this.fb.group({
      tabForm : this.tabForm
    });
    this.doInitPage();
  }

  doInitPage():void {
    this.http.post(UrlConfig.InitStep4, {okcHeaderId : this.formData.okcHeaderId})
      .toPromise()
      .then((result: any) => {
        console.log('[Page Init Result]:', result);
        // this.doSetValues(data);
        this.processInitData(result.data);
        this.ctx.spinning = false;
      })
      .catch(error => { throw error });
  }

  processInitData(data):void {
    if (data) {
      data.forEach((row, i) => {
        this.doAdd();
        this.tabForm.at(i).patchValue(row);
      })
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

  doSaveClauseFromTpl():void {
    this.formData.saveStep4FromTpl({
      okcTemplateId : this.okcTplId,
      okcHeaderId : this.formData.okcHeaderId
    }, () => {
      this.clearAll();
      this.doInitPage();
    });
  }

  clearAll():void {
    for (let i = this.tabForm.controls.length - 1; i >= 0; i--) {
      this.removeRow(i);
    }
    // console.log('After Clear All', this.tabForm.controls, this.ctrls, this.extendCtrls, this.expanding);
  }

  removeRow(i:number):void {
    this.tabForm.removeAt(i);
    this.ctrls = this.ctrls.filter((value, index) => i != index);
    this.extendCtrls = this.extendCtrls.filter((value, index) => i != index);
    this.expanding = this.expanding.filter((value, index) => i != index);
  }

  doSubmit():void {
    this.formData.submitStep4Form({
      okcHeaderId : this.formData.okcHeaderId,
      inSaveOkcClauseDTOList : this.tabForm.value
    });
  }
}
