import {
  Component,
  ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges,
} from '@angular/core';
import {TransferService} from "../contract/create/steps/transfer.service";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UrlConfig} from "./common.api";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnInit, OnChanges {

  @Input() config:any

  attachmentCtrl:any = {
    name : 'attachmentName',
  };

  attachmentId:any = {
    touched : false,
    value : null
  };

  okLoading:boolean;

  constructor(private http:HttpClient,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.config.action)
      this.config.action = UrlConfig.Upload
  }

  onFileChange:any = (event) => {
    if (event.type == 'success') {
      let result = (event.file.response);
      if (!result.errcode) {
        this.attachmentId.value = result.data.attachmentId
      }
    }
  };

  doUpload(ngForm:NgForm) {
    this.attachmentId.touched = true;
    for (const i in ngForm.form.controls) {
      ngForm.form.controls[i].markAsDirty();
      ngForm.form.controls[i].updateValueAndValidity();
    }
    if (!this.attachmentId.value) return;
    if (ngForm.invalid) return;
    this.okLoading = true;
    this.http.post(this.config.url, {...this.config.params, ...ngForm.value, attachmentId : this.attachmentId.value})
      .toPromise()
      .then((result: any) => {
        console.log('[Upload OK Result]:', result);
        this.okLoading = false;
        this.handleCancel();
        this.cdr.detectChanges();
        if (this.config.callBack) {
          this.config.callBack(result);
        }
      })
      .catch(error => { throw error });
  }

  handleCancel() {
    this.config.visible = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.attachmentCtrl.value = "";
    this.attachmentId.value = "";
    this.attachmentId.touched = false;
  }
}
