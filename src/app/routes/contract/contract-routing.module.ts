import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquiryComponent } from './inquiry/inquiry.component';
import { SignComponent } from './sign/sign.component';
import { CancelComponent } from './cancel/cancel.component';
import { EndComponent } from './end/end.component';
import { CreateComponent } from './create/create.component';
import {TplComponent} from "./tpl/tpl.component";

import {ChangeComponent } from './change/change.component';
import {TplListComponent} from "./tpl/list.component";
import {ChangeDetailComponent } from './change-detail/change-detail.component';
import {QingYeComponent } from './qingye/qingye.component';


const routes: Routes = [
  { path: 'inquiry', component: InquiryComponent },
  { path: 'sign', component: SignComponent },
  { path: 'update/:id', component: CreateComponent},
  { path: 'create', component: CreateComponent},
  { path: 'create/:createMode', component: CreateComponent},
  { path: 'cancel', component: CancelComponent },
  { path: 'change', component: ChangeComponent },
  { path: 'end', component: EndComponent},
  { path: 'tpl/list', component: TplListComponent},
  { path: 'tpl/create', component: TplComponent},
  { path: 'tpl/update/:id', component: TplComponent},
  { path: 'change-detail/:id', component: ChangeDetailComponent},
  { path: 'qing', component:QingYeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
