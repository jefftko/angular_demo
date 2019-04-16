import { AnimationEvent } from '@angular/animations';
import { AfterViewInit, EventEmitter, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
export declare type TagType = 'default' | 'closeable' | 'checkable';
export declare class NzTagComponent implements OnInit, OnChanges, AfterViewInit {
    private renderer;
    classMap: any;
    closed: boolean;
    private wrapperElement;
    nzMode: TagType;
    nzColor: string;
    nzChecked: boolean;
    readonly nzAfterClose: EventEmitter<void>;
    readonly nzOnClose: EventEmitter<MouseEvent>;
    readonly nzCheckedChange: EventEmitter<boolean>;
    constructor(renderer: Renderer2);
    private isPresetColor;
    private updateClassMap;
    private updateColorStatus;
    updateCheckedStatus(): void;
    closeTag(e: MouseEvent): void;
    afterAnimation(e: AnimationEvent): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
}
