import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DebugElement
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async,ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '@shared';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DxDataGridModule,
         DxBulletModule,
         DxTemplateModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule } from 'devextreme-angular';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import {APIS} from '../../../../api';
import {ContractService,TestContractService} from '../../testing/test.contract.service';
import { InquiryComponent } from './inquiry.component';

describe('InquiryComponent', () => {

  let component: InquiryComponent;
  let fixture: ComponentFixture<InquiryComponent>;
  let http: _HttpClient
  let cdr: ChangeDetectorRef
  let fb: FormBuilder
  let form: FormGroup
  let h1:        HTMLElement;
  let contractService: ContractService;
  let router:Router;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
beforeEach(async(() => {
    TestBed.configureTestingModule({
         providers: [
    { provide: Router,      useValue: routerSpy },
    { provide:ContractService, useClass:TestContractService}
  ],
         imports: [SharedModule,DxButtonModule,DxDataGridModule,DxTemplateModule,DxBulletModule,HttpClientModule,BrowserAnimationsModule],
      declarations: [ InquiryComponent ]
    })
    .compileComponents();
  }));
  
beforeEach(() => {
    fixture = TestBed.createComponent(InquiryComponent);
    component = fixture.componentInstance;
    contractService = TestBed.get(ContractService)
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeDefined();
  });
  it('should have title  合同查询',()=>{
       h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent).toContain('合同查询');
  });
  it('should get orgId after after ngOnInit', () => {
      component.ngOnInit();
      expect(component.searchFields[5]['options']['field']).not.toEqual('')

  })


});

