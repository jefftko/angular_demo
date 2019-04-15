import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async,ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared';
import { DxDataGridModule,
         DxBulletModule,
         DxTemplateModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule } from 'devextreme-angular';



import { _HttpClient } from '@delon/theme';
import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let http: _HttpClient
  let cdr: ChangeDetectorRef

/*beforeEach(async(() => {
    TestBed.configureTestingModule({
         imports: [SharedModule,DxButtonModule,DxDataGridModule,DxTemplateModule,DxBulletModule,HttpClientModule,BrowserAnimationsModule],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  }));*/

  beforeEach(() => {
   /* fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/
   component = new DashboardComponent(http,cdr);
  });



    afterEach(() => {
        component = null;
    });

 it('should create', () => {
    expect(component).toBeDefined();
  });

 it('should be defined fields', () => {
       expect(component.paymentField).toBeDefined();
       expect(component.approvalField).toBeDefined();
});
it('should be empty with datasource', () => {
    expect(component.paymentSource).toEqual({});
    expect(component.approvalSource).toEqual({});
});

});
