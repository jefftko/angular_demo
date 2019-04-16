import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DxButtonModule } from 'devextreme-angular';

import { ContractRoutingModule } from './contract-routing.module';

import { DxDataGridModule,
         DxBulletModule,
         DxTemplateModule } from 'devextreme-angular';

import { InquiryComponent } from './inquiry/inquiry.component';
import { SignComponent } from './sign/sign.component';
import { CancelComponent } from './cancel/cancel.component';
import { CreateComponent } from './create/create.component';
import { Step1Component } from './create/steps/step1.component';
import { Step2Component } from './create/steps/step2.component';
import { Step3Component } from './create/steps/step3.component';
import { Step4Component } from './create/steps/step4.component';
import { Step5Component } from './create/steps/step5.component';
import { Step6Component } from './create/steps/step6.component';
import { ControlComponent } from '../common/control.component';
import { UploadComponent } from '../common/upload.component';
import {ModalComponent} from '../common/modal.component'
import {EndComponent} from './end/end.component';
import {TplComponent} from "./tpl/tpl.component";
import {GridControlComponent} from "../common/gridControl.component";
import {TplStep1Component} from "./tpl/steps/tplStep1.component";
import {TplListComponent} from "./tpl/list.component";
import {TplStep2Component} from "./tpl/steps/tplStep2.component";
import {TplStep3Component} from "./tpl/steps/tplStep3.component";
import {TplStep4Component} from "./tpl/steps/tplStep4.component";
import {TplStep5Component} from "./tpl/steps/tplStep5.component";

import { AttachListComponent } from './modal/attach-list/attach-list.component';
//import { ContractService } from './contract.service';
import {ChangeComponent } from './change/change.component';
import {ChangeDetailComponent } from './change-detail/change-detail.component';
import {QingYeComponent } from './qingye/qingye.component';


const COMPONENTS = [
  ControlComponent,
  GridControlComponent,
  ModalComponent,
  InquiryComponent,
  SignComponent,
  CancelComponent,
  CreateComponent,
  Step1Component,
  Step2Component,
  Step3Component,
  Step4Component,
  Step5Component,
  Step6Component,
  UploadComponent,
  EndComponent,
  AttachListComponent,
  ChangeComponent,
  ChangeDetailComponent,
  TplComponent,
  TplStep1Component,
  TplStep2Component,
  TplStep3Component,
  TplStep4Component,
  TplStep5Component,
  TplListComponent,
  QingYeComponent,
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, ContractRoutingModule,DxButtonModule,DxDataGridModule,DxTemplateModule,DxBulletModule],
  providers:[/*ContractService*/],
  declarations: [ ...COMPONENTS, ...COMPONENTS_NOROUNT ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ContractModule {}
