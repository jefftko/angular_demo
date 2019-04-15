import {ChangeDetectorRef, Injectable} from '@angular/core';
import {_HttpClient} from "@delon/theme";

@Injectable()
export class ContextService {
  private _spinning:boolean = true;
  modalConfig:any = {visible : false};


  constructor(private cdr: ChangeDetectorRef) {}

  get spinning(): boolean {
    return this._spinning;
  }

  set spinning(value: boolean) {
    this._spinning = value;
    this.cdr.detectChanges();
  }
}
