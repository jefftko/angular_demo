import {
  Component,
  ChangeDetectionStrategy,
  OnInit, Input, OnChanges, SimpleChanges,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalConfig} from "./modal.config";
import {DatePipe, DecimalPipe} from "@angular/common";
import {ContextService} from "../context.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers : [DecimalPipe]
})
export class ControlComponent implements OnInit, OnChanges {

  @Input() ctrl:any;

  @Input() form:FormGroup;

  @Input() tableIndex:number;

  @Input() type:string;

  @Input() modalConfig:any;

  control:FormControl;

  numberFormatter:any = (value) => {
    return this.numberPipe.transform(value);
  };

  constructor(private numberPipe:DecimalPipe,
              private ctx:ContextService) {}

  ngOnInit() {
    // console.log('Control Init:', this.ctrl);
    if (this.type)
      this.ctrl.type = this.type;
    if (this.form.controls[this.ctrl.name]) {
      console.log(`[Warn]The ctrl has exists int the form[${this.ctrl.name}]!!!`);
      this.form.removeControl(this.ctrl.name);
    }
    let validators = [];
    if (this.ctrl.required)
      validators.push(Validators.required)
    this.control = new FormControl(null, validators);
    this.form.addControl(this.ctrl.name, this.control);
    if (this.ctrl.value || this.ctrl.value === 0) {
      this.control.setValue(this.ctrl.value);
    }
    this.control.statusChanges .forEach((value) => {
      this.ctrl.error = (value == 'INVALID');
      if (this.ctrl.error) {
        if (this.control.errors && this.control.errors.required) this.ctrl.errorMsg = `${this.ctrl.label}不允许为空！`;
      }
    });
  }

  onBlur(value:string) {
    // console.log('Ctrl blur!', this.control.value);
    if (this.ctrl.onBlur)
      this.ctrl.onBlur(this.ctrl.callBackOptions);
  }

  onModelChange(value: string, formatString: string) {
    // console.log('Value change!', this.ctrl.name, value);
    if (this.ctrl.onChange) {
      if (!this.ctrl.callBackOptions) this.ctrl.callBackOptions = {};
      this.ctrl.callBackOptions.value = value;
      this.ctrl.value = value;
      this.ctrl.onChange(this.ctrl.callBackOptions);
    }
  }

  showModal() {
    if (!this.ctrl.disabled) {
      if (this.modalConfig) {
        this.modalConfig = this.ctrl.modalConfig;
      } else {
        console.log('Show Modal', this.ctrl)
        this.ctx.modalConfig = {...ModalConfig[this.ctrl.modalId],
          isVisible : true,
          callBack : this.ctrl.callBack,
          callBackOptions : this.ctrl.callBackOptions};
      }

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Show Changes!', this.ctrl.name, this.ctrl, changes);
    if (changes && changes.tableIndex) {
      if (!this.ctrl.callBackOptions) this.ctrl.callBackOptions = {};
      let callBackOptions = {...this.ctrl.callBackOptions, index : this.tableIndex};
      this.ctrl = {...this.ctrl, callBackOptions : callBackOptions};
    }
  }
}
