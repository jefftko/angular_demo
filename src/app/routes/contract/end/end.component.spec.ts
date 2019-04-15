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
import { DxButtonModule } from 'devextreme-angular';
import {ContractService,TestContractService} from '../../testing/test.contract.service';
import {APIS} from '../../../../api';
import { EndComponent } from './end.component';

@Component({selector: 'app-upload', template: ''})
class UploadComponent {
    @Input() config: any;

}
@Component({selector: 'app-attach-list', template: ''})
class AttachListComponent {
    @Input() config: any;

}


describe('EndComponent', () => {

  let component: EndComponent;
  let fixture: ComponentFixture<EndComponent>;
  let cdr: ChangeDetectorRef
  let fb: FormBuilder
  let form: FormGroup
  let h1:        HTMLElement;
  let contractService: ContractService;

beforeEach(async(() => {
    TestBed.configureTestingModule({
         imports: [SharedModule,DxButtonModule,DxDataGridModule,DxTemplateModule,DxBulletModule,BrowserAnimationsModule],
      declarations: [ EndComponent,UploadComponent,AttachListComponent  ],
      providers: [
            { provide: ContractService,    useClass: TestContractService },

           
        ]

    })
    .compileComponents();
  }));
  
beforeEach(() => {
    fixture = TestBed.createComponent(EndComponent);
    component = fixture.componentInstance;
    contractService = TestBed.get(ContractService)
    fixture.detectChanges();
  });
 afterEach(() => {
      component = null
  })

  it('should create', () => {
       spyOn(contractService, '_get').and.returnValue({})
    expect(component).toBeDefined();
  });
  it('should have title  合同异常终止/竣工',()=>{
       h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent).toContain('合同异常终止/竣工');
  });
  it('should get orgId after after ngOnInit', () => {
      component.ngOnInit();
      expect(component.searchFields[4]['options']['field']).not.toEqual('')

  })


});

