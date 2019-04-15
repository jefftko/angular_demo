import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DxButtonModule } from 'devextreme-angular';

import { SampleRoutingModule } from './sample-routing.module';
import { ModalComponent } from './modal/modal.component';


const COMPONENTS = [
    ModalComponent
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule,SampleRoutingModule,DxButtonModule,],
  declarations: [ ...COMPONENTS, ...COMPONENTS_NOROUNT ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SampleModule {}
