import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzMessageService, NzModalService,NzTabChangeEvent } from 'ng-zorro-antd';
import CustomStore from 'devextreme/data/custom_store';
import { STColumn } from '@delon/abc';
import {ContractService} from '../contract.service';
import {APIS} from '../../../../api';

@Component({
    selector: 'app-qingye',
    templateUrl: './qingye.component.html',
    styleUrls: ['./qingye.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QingYeComponent implements OnInit {
    qing_ye:string = "QingYe"

    ngOnInit(){
    }

}
