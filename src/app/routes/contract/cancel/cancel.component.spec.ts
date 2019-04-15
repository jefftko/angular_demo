import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DebugElement,
  Input,
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
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule } from 'devextreme-angular';
import { _HttpClient } from '@delon/theme';
import {APIS} from '../../../../api';
import { CancelComponent } from './cancel.component';
import {ContractService,TestContractService} from '../../testing/test.contract.service';
@Component({selector: 'app-upload', template: ''})
class UploadComponent {
      @Input() config: any;
}
@Component({selector: 'app-attach-list', template: ''})
class AttachListComponent {
      @Input() config: any;
}

describe('CancelComponent', () => {
   let component: CancelComponent;
  let fixture: ComponentFixture<CancelComponent>;
  let http: _HttpClient
  let cdr: ChangeDetectorRef
  let fb: FormBuilder
  let form: FormGroup
  let h1:        HTMLElement;
  let contractService: ContractService;

beforeEach(async(() => {
    TestBed.configureTestingModule({
         imports: [SharedModule,DxButtonModule,DxDataGridModule,DxTemplateModule,DxBulletModule,HttpClientModule,BrowserAnimationsModule],
      declarations: [ CancelComponent,UploadComponent,AttachListComponent  ],
       providers: [
      { provide: ContractService,    useClass: TestContractService },
        ]

    })
    .compileComponents();
  }));
  
beforeEach(() => {
    fixture = TestBed.createComponent(CancelComponent);
    component = fixture.componentInstance;
    contractService = TestBed.get(ContractService)
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeDefined();
  });
  it('should have title  合同中止',()=>{
       h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent).toContain('合同中止');
  });
  it('should get orgId after after ngOnInit', () => {
      component.ngOnInit();
      expect(component.searchFields[4]['options']['field']).not.toEqual('')

  })


});

