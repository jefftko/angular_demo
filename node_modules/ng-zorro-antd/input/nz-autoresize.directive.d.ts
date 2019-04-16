import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
export declare class NzAutoResizeDirective implements AfterViewInit, OnDestroy {
    private elementRef;
    private ngZone;
    ngControl: NgControl;
    private platform;
    private _autosize;
    private el;
    private cachedLineHeight;
    private previousValue;
    private previousMinRows;
    private minRows;
    private maxRows;
    private destroy$;
    private inputGap;
    nzAutosize: string | boolean | AutoSizeType;
    resizeToFitContent(force?: boolean): void;
    private cacheTextareaLineHeight;
    setMinHeight(): void;
    setMaxHeight(): void;
    constructor(elementRef: ElementRef, ngZone: NgZone, ngControl: NgControl, platform: Platform);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
