import { EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
export declare class NzTabComponent implements OnChanges, OnDestroy {
    position: number;
    origin: number;
    isActive: boolean;
    readonly stateChanges: Subject<void>;
    private content;
    nzTitle: string | TemplateRef<void>;
    nzForceRender: boolean;
    nzDisabled: boolean;
    readonly nzClick: EventEmitter<void>;
    readonly nzSelect: EventEmitter<void>;
    readonly nzDeselect: EventEmitter<void>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
