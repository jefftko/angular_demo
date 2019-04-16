import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';
export declare class NzPopoverComponent extends NzToolTipComponent {
    _prefix: string;
    nzTitle: string | TemplateRef<void>;
    nzContent: string | TemplateRef<void>;
    constructor(cdr: ChangeDetectorRef);
    protected isContentEmpty(): boolean;
}
