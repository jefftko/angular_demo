import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'header-menu',
  template: `
     <ul class="top-menu">
        <li *ngFor="let item of menus">
         <a routerLink="{{item.link}}">{{item.text}}</a>
         </li>
     </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMenuComponent {
   public menus =[
       {'text':'主页','link':'/'},
       {'text':'查询','link':'/contract/inquiry'},
       {'text':'模板','link':'/contract/tpl/list'},
       {'text':'创建','link':'/contract/create'},
       {'text':'签订生效','link':'/contract/sign'},
       {'text':'履约履历','link':'#'},
       {'text':'合同中止','link':'/contract/cancel'},
       {'text':'合同终止/竣工','link':'/contract/end'},
       {'text':'变更','link':'/contract/change'},
       {'text':'报表','link':'#'},
       {'text':'返回主页','link':'#'},
   ]
  constructor(
  ) {}

 }
