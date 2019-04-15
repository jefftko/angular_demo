import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DebugElement,
  Injectable 
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async,ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DxDataGridModule,
         DxBulletModule,
         DxTemplateModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular';
import {APIS} from '../../../../api';
import {ContractService,TestContractService} from '../../testing/test.contract.service';
import { ChangeComponent } from './change.component';

describe('ChangeComponent', () => {

  let component: ChangeComponent;
  let fixture: ComponentFixture<ChangeComponent>;
  let cdr: ChangeDetectorRef
  let fb: FormBuilder
  let form: FormGroup
  let h1: HTMLElement;
  let contractService: ContractService;

beforeEach(async(() => {
    TestBed.configureTestingModule({
         imports: [SharedModule,DxButtonModule,DxDataGridModule,DxTemplateModule,DxBulletModule,BrowserAnimationsModule],
      declarations: [ ChangeComponent ],
       providers: [
            { provide: ContractService, useClass: TestContractService },
        ]


    })
    .compileComponents();
  }));
  
beforeEach(() => {
    fixture = TestBed.createComponent(ChangeComponent);
    component = fixture.componentInstance;
    contractService = TestBed.get(ContractService)
        fixture.detectChanges();
  });

 it('should create', () => {
     spyOn(contractService, '_get').and.returnValue({})
     console.log('ss')
   expect(component).toBeDefined();
  });
  it('should have title  合同变更',()=>{
       h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent).toContain('合同变更');
  });
  it('should get orgId after after ngOnInit', () => {
      component.ngOnInit();
      expect(component.searchFields[4]['options']['field']).not.toEqual('')

  })


});

