import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit, ViewChild,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import CustomStore from "devextreme/data/custom_store";

import {
  FormBuilder, FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {TransferService} from "./steps/transfer.service";
import {Step1Component} from "./steps/step1.component";
import {ActivatedRoute} from "@angular/router";
import {Step2Component} from "./steps/step2.component";
import {Step3Component} from "./steps/step3.component";
import {Step4Component} from "./steps/step4.component";
import {Step5Component} from "./steps/step5.component";
import {Step6Component} from "./steps/step6.component";
import {HttpClient} from "@angular/common/http";
import {ContextService} from "../../context.service";
import {UrlConfig} from "../../common/common.api";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  providers: [TransferService, ContextService],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CreateComponent implements OnInit {

  pageTitle:string = '创建空白合同';
  contractStepHeader:string;

  @ViewChild(Step1Component)
  private step1:Step1Component;
  @ViewChild(Step2Component)
  private step2:Step2Component;
  @ViewChild(Step3Component)
  private step3:Step3Component;
  @ViewChild(Step4Component)
  private step4:Step4Component;
  @ViewChild(Step5Component)
  private step5:Step5Component;
  @ViewChild(Step6Component)
  private step6:Step6Component;

  constructor(public formData:TransferService,
              private route: ActivatedRoute,
              private http:HttpClient,
              public ctx:ContextService) {
    this.route.params.subscribe(value => {
      this.formData.okcHeaderId = value.id;
      this.formData.createMode = value.createMode;
    });
  }

  ngOnInit() {
    this.contractStepHeader = this.formData.stepTitles[this.formData.step - 1];
  }

  nextStep():void {
    this.setStep(this.formData.step + 1);
  }

  prevStep():void {
    this.setStep(this.formData.step - 1);
  }

  setStep(step):void {
    if (step == this.formData.step) return;
    this.ctx.spinning = true;
    this.formData.step = step;
  }

  doSave():void {
    switch (this.formData.step) {
      case 1:
        this.step1.doSubmit();
        break;
      case 2:
        this.step2.doSubmit()
        break;
      case 3:
        this.step3.doSubmit()
        break;
      case 4:
        this.step4.doSubmit()
        break;
      case 5:
        this.step5.doSubmit()
        break;
      case 6:
        this.step6.doSubmit()
        break;
    }
  }

  gotoApprove():void {
    this.formData.doApprove();
  }

  historyVisible:boolean;
  contractHistory:any[] = [];

  showHistory():void {
    this.historyVisible = true;
    this.http.post(UrlConfig.ContractHistory, {okcHeaderId : this.formData.okcHeaderId})
      .toPromise()
      .then((result: any) => {
        this.contractHistory = result.data.contractHistory;
      })
      .catch(error => { throw error });
  }
}
