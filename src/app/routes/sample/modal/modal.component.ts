import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'modal-page',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
    description:string =''
  constructor(
    public msg: NzMessageService,
    private modalSrv: NzModalService,
  ) { }

  ngOnInit() {
  }

  add(tpl: TemplateRef<{}>) {
    this.modalSrv.create({
      nzTitle: '新建规则',
      nzContent: tpl,
      nzOnOk: () => {
          console.log(this.description)
      }
      
    });
  }

 
}
