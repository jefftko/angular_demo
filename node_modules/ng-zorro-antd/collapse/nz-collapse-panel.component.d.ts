import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NzCollapseComponent } from './nz-collapse.component';
export declare class NzCollapsePanelComponent implements OnInit, OnDestroy {
    private cdr;
    private nzCollapseComponent;
    nzActive: boolean;
    nzDisabled: boolean;
    nzShowArrow: boolean;
    nzHeader: string | TemplateRef<void>;
    readonly nzActiveChange: EventEmitter<boolean>;
    clickHeader(): void;
    markForCheck(): void;
    constructor(cdr: ChangeDetectorRef, nzCollapseComponent: NzCollapseComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
