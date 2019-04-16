import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';
export declare class NzPopconfirmComponent extends NzToolTipComponent {
    _prefix: string;
    _trigger: string;
    _hasBackdrop: boolean;
    nzOkText: string;
    nzOkType: string;
    nzCancelText: string;
    nzCondition: boolean;
    readonly nzOnCancel: EventEmitter<void>;
    readonly nzOnConfirm: EventEmitter<void>;
    constructor(cdr: ChangeDetectorRef);
    show(): void;
    onCancel(): void;
    onConfirm(): void;
}
