import { AnimationEvent } from '@angular/animations';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectorRef, EventEmitter, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export declare class NzToolTipComponent {
    cdr: ChangeDetectorRef;
    _hasBackdrop: boolean;
    _prefix: string;
    _positions: ConnectionPositionPair[];
    _classMap: {};
    _placement: string;
    _trigger: string;
    overlayOrigin: CdkOverlayOrigin;
    visibleSource: BehaviorSubject<boolean>;
    visible$: Observable<boolean>;
    overlay: CdkConnectedOverlay;
    nzTitle: string | TemplateRef<void>;
    nzOverlayClassName: string;
    nzOverlayStyle: {
        [key: string]: string;
    };
    nzMouseEnterDelay: number;
    nzMouseLeaveDelay: number;
    readonly nzVisibleChange: EventEmitter<boolean>;
    nzVisible: boolean;
    nzTrigger: string;
    nzPlacement: string;
    updatePosition(): void;
    onPositionChange($event: ConnectedOverlayPositionChange): void;
    show(): void;
    hide(): void;
    _afterVisibilityAnimation(e: AnimationEvent): void;
    setClassMap(): void;
    setOverlayOrigin(origin: CdkOverlayOrigin): void;
    constructor(cdr: ChangeDetectorRef);
    protected isContentEmpty(): boolean;
}
