import {
  ChangeDetectorRef, Injectable,
} from '@angular/core';
import {ContextService} from "../context.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "./base.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Injectable()
export class BaseFormComponent extends BaseComponent {

  public form:FormGroup;

  constructor(public ctx:ContextService,
              public cdr: ChangeDetectorRef,
              public message: NzMessageService,
              public router: Router,
              public initRoutes: ActivatedRoute,
              public fb: FormBuilder,
              public datePipe: DatePipe) {
    super(ctx, cdr, message, router, initRoutes);
    this.doAfterInstance();
  }

  protected doAfterInstance() {
    this.form = this.fb.group({});
  }

  protected validate() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    return this.form.valid;
  }

  protected getFormData():any {
    let values:any = this.form.value;
    Object.keys(values).forEach(key => {
      let val:any = values[key];
      if (val && typeof val == "object" && val.getYear) {
        values[key] = this.datePipe.transform(val, 'yyyy-MM-dd HH:mm:ss');
      }
    });
    return values;
  }
}
