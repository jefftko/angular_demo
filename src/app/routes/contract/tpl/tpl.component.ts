import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit, ViewChild,
} from '@angular/core';
import {TplService} from "./tpl.service";
import {ContextService} from "../../context.service";
import {TplStep1Component} from "./steps/tplStep1.component";
import {TplStep2Component} from "./steps/tplStep2.component";
import {TplStep3Component} from "./steps/tplStep3.component";
import {TplStep4Component} from "./steps/tplStep4.component";

@Component({
  selector: 'app-tpl',
  templateUrl: './tpl.component.html',
  styleUrls: ['./tpl.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers : [TplService, ContextService]
})
export class TplComponent implements OnInit {

  constructor(public ctx:ContextService,
              public cdr: ChangeDetectorRef,
              public tplService: TplService) {}

  @ViewChild(TplStep1Component) step1:TplStep1Component;
  @ViewChild(TplStep2Component) step2:TplStep2Component;
  @ViewChild(TplStep3Component) step3:TplStep3Component;
  @ViewChild(TplStep4Component) step4:TplStep4Component;

  ngOnInit(): void {}

  setStep(step):void {
    if (step == this.tplService.step) return;
    this.ctx.spinning = true;
    this.tplService.step = step;
  }

  doSave():void {
    switch (this.tplService.step) {
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
    }
  }

  goBack() {
    history.back();
  }
}
