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
  selector: 'app-contract-create-step5',
  templateUrl: './step5.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step5Component implements OnInit {

  constructor(private fb: FormBuilder,
              public formData: TransferService,
              private http: _HttpClient,
              private cdr: ChangeDetectorRef,
              private ctx:ContextService) {}

  uploadConfig:any = {
    url : UrlConfig.SubmitAttachment,
    callBack : () => {
      this.ctx.spinning = true;
      this.clearAll();
      this.doInitPage();
    }
  };

  tabForm:FormArray;

  ctrlTpl:any[] = [
    {name : 'attachmentId' , label : '附件ID', type : 'text',  width : 120},
    {name : 'attachmentName' , label : '附件名称', type : 'text',  width : 120},
    {name : 'fileName' , label : '文件名', type : 'text',  width : 500},
    {name : 'createPerson' , label : '上传者', type : 'text',  width : 180},
    {name : 'creationDate' , label : '上传时间', type : 'text',  width : 180},
  ];

  tabData:any[] = [];
  ctrls:any[] = [];

  ngOnInit() {
    this.tabForm = this.fb.array([]);
    this.formData.step5FormGroup = this.fb.group({
      tabForm : this.tabForm
    });
    this.doInitPage();
  }

  doInitPage():void {
    this.http.post(UrlConfig.InitStep5, {okcHeaderId : this.formData.okcHeaderId, sourceType : 'CUX_OKC_HEADS_ALL'})
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
    if (data && data.attrList && data.attrList.length) {
      data.attrList.forEach(row => this.addRow(row));
    }
  }

  doAddAttachment() {
    this.uploadConfig = {
      ...this.uploadConfig,
      visible : true,
      params : {okcHeaderId : this.formData.okcHeaderId}
    };
    this.cdr.detectChanges();
  }

  addRow(data:any):void {
    this.tabForm.push(this.fb.group({}));
    this.ctrls.push([...this.ctrlTpl]);
    this.tabData = [...this.tabData, data];
    this.cdr.detectChanges();
    this.tabForm.at(this.tabForm.controls.length - 1).patchValue(data);
  }

  doDeleteAttachment(i:number):void {
    console.log('Attachment ID:', this.tabForm.at(i).value.attachmentId);
    this.formData.deleteStep5(this.tabForm.at(i).value.attachmentId, () => {
      this.clearAll();
      this.doInitPage();
    });
  }

  clearAll():void {
    for (let i = this.tabForm.controls.length - 1; i >= 0; i--) {
      this.removeRow(i);
    }
  }

  removeRow(i:number):void {
    this.tabForm.removeAt(i);
    this.ctrls = this.ctrls.filter((value, index) => i != index);
    this.tabData = this.tabData.filter((value, index) => i != index);
  }

  gotoDownLoad(i:number):void {
    console.log('Attachment ID:', this.tabForm.at(i).value.attachmentId);
    location.href = UrlConfig.ContractAttachmentDownload + this.tabForm.at(i).value.attachmentId;
  }

  doSubmit():void {

  }
}
