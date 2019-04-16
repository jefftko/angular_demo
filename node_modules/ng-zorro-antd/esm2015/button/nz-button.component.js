/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, HostBinding, Inject, Input, NgZone, Optional, QueryList, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { isEmpty } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
import { findFirstNotEmptyNode, findLastNotEmptyNode } from '../core/util/dom';
import { NzWaveDirective, NZ_WAVE_GLOBAL_CONFIG } from '../core/wave/nz-wave.directive';
import { NzIconDirective } from '../icon/nz-icon.directive';
export class NzButtonComponent {
    /**
     * @param {?} elementRef
     * @param {?} cdr
     * @param {?} renderer
     * @param {?} nzUpdateHostClassService
     * @param {?} ngZone
     * @param {?} waveConfig
     */
    constructor(elementRef, cdr, renderer, nzUpdateHostClassService, ngZone, waveConfig) {
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.renderer = renderer;
        this.nzUpdateHostClassService = nzUpdateHostClassService;
        this.ngZone = ngZone;
        this.waveConfig = waveConfig;
        this.el = this.elementRef.nativeElement;
        this.nzWave = new NzWaveDirective(this.ngZone, this.elementRef, this.waveConfig);
        this._ghost = false;
        this._search = false;
        this._loading = false;
        this._block = false;
        this.iconOnly = false;
        this.prefixCls = 'ant-btn';
        this.sizeMap = { large: 'lg', small: 'sm' };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzBlock(value) {
        this._block = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzBlock() {
        return this._block;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzGhost(value) {
        this._ghost = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzGhost() {
        return this._ghost;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSearch(value) {
        this._search = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzSearch() {
        return this._search;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzType(value) {
        this._type = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzType() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzShape(value) {
        this._shape = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzShape() {
        return this._shape;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSize(value) {
        this._size = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzSize() {
        return this._size;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzLoading(value) {
        this._loading = toBoolean(value);
        this.setClassMap();
        this.updateIconDisplay(value);
    }
    /**
     * @return {?}
     */
    get nzLoading() {
        return this._loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateIconDisplay(value) {
        if (this.iconElement) {
            this.renderer.setStyle(this.iconElement, 'display', value ? 'none' : 'inline-block');
        }
    }
    /**
     * temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289
     * @return {?}
     */
    setClassMap() {
        /** @type {?} */
        const classMap = {
            [`${this.prefixCls}`]: true,
            [`${this.prefixCls}-${this.nzType}`]: this.nzType,
            [`${this.prefixCls}-${this.nzShape}`]: this.nzShape,
            [`${this.prefixCls}-${this.sizeMap[this.nzSize]}`]: this.sizeMap[this.nzSize],
            [`${this.prefixCls}-loading`]: this.nzLoading,
            [`${this.prefixCls}-icon-only`]: this.iconOnly,
            [`${this.prefixCls}-background-ghost`]: this.nzGhost,
            [`${this.prefixCls}-block`]: this.nzBlock,
            [`ant-input-search-button`]: this.nzSearch
        };
        this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
    }
    /**
     * @return {?}
     */
    checkContent() {
        /** @type {?} */
        const hasIcon = this.listOfIconElement && this.listOfIconElement.length;
        if (hasIcon) {
            this.moveIcon();
        }
        this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
        /** https://github.com/angular/angular/issues/12530 **/
        if (isEmpty(this.contentElement.nativeElement)) {
            this.renderer.setStyle(this.contentElement.nativeElement, 'display', 'none');
            this.iconOnly = !!hasIcon;
        }
        else {
            this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
            this.iconOnly = false;
        }
        this.setClassMap();
        this.updateIconDisplay(this.nzLoading);
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    moveIcon() {
        if (this.listOfIconElement && this.listOfIconElement.length) {
            /** @type {?} */
            const firstChildElement = findFirstNotEmptyNode(this.contentElement.nativeElement);
            /** @type {?} */
            const lastChildElement = findLastNotEmptyNode(this.contentElement.nativeElement);
            if (firstChildElement && (firstChildElement === this.listOfIconElement.first.nativeElement)) {
                this.renderer.insertBefore(this.el, firstChildElement, this.contentElement.nativeElement);
                this.iconElement = /** @type {?} */ (firstChildElement);
            }
            else if (lastChildElement && (lastChildElement === this.listOfIconElement.last.nativeElement)) {
                this.renderer.appendChild(this.el, lastChildElement);
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.checkContent();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setClassMap();
        this.nzWave.ngOnInit();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.nzWave.ngOnDestroy();
    }
}
NzButtonComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-button]',
                providers: [NzUpdateHostClassService],
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: "<i nz-icon type=\"loading\" *ngIf=\"nzLoading\"></i>\n<span (cdkObserveContent)=\"checkContent()\" #contentElement><ng-content></ng-content></span>"
            }] }
];
/** @nocollapse */
NzButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NzUpdateHostClassService },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_WAVE_GLOBAL_CONFIG,] }] }
];
NzButtonComponent.propDecorators = {
    contentElement: [{ type: ViewChild, args: ['contentElement',] }],
    listOfIconElement: [{ type: ContentChildren, args: [NzIconDirective, { read: ElementRef },] }],
    nzWave: [{ type: HostBinding, args: ['attr.nz-wave',] }],
    nzBlock: [{ type: Input }],
    nzGhost: [{ type: Input }],
    nzSearch: [{ type: Input }],
    nzType: [{ type: Input }],
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzLoading: [{ type: Input }]
};
function NzButtonComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzButtonComponent.prototype.el;
    /** @type {?} */
    NzButtonComponent.prototype.contentElement;
    /** @type {?} */
    NzButtonComponent.prototype.listOfIconElement;
    /** @type {?} */
    NzButtonComponent.prototype.nzWave;
    /** @type {?} */
    NzButtonComponent.prototype._ghost;
    /** @type {?} */
    NzButtonComponent.prototype._search;
    /** @type {?} */
    NzButtonComponent.prototype._type;
    /** @type {?} */
    NzButtonComponent.prototype._shape;
    /** @type {?} */
    NzButtonComponent.prototype._size;
    /** @type {?} */
    NzButtonComponent.prototype._loading;
    /** @type {?} */
    NzButtonComponent.prototype._block;
    /** @type {?} */
    NzButtonComponent.prototype.iconElement;
    /** @type {?} */
    NzButtonComponent.prototype.iconOnly;
    /** @type {?} */
    NzButtonComponent.prototype.prefixCls;
    /** @type {?} */
    NzButtonComponent.prototype.sizeMap;
    /** @type {?} */
    NzButtonComponent.prototype.elementRef;
    /** @type {?} */
    NzButtonComponent.prototype.cdr;
    /** @type {?} */
    NzButtonComponent.prototype.renderer;
    /** @type {?} */
    NzButtonComponent.prototype.nzUpdateHostClassService;
    /** @type {?} */
    NzButtonComponent.prototype.ngZone;
    /** @type {?} */
    NzButtonComponent.prototype.waveConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJidXR0b24vbnotYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVFLFFBQVEsRUFDaEIsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRXRGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0UsT0FBTyxFQUFnQixlQUFlLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFhNUQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7O0lBNkU1QixZQUFvQixVQUFzQixFQUFVLEdBQXNCLEVBQVUsUUFBbUIsRUFDbkYsMEJBQTRELE1BQWMsRUFDL0IsVUFBd0I7UUFGbkUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuRiw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQW9DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDL0IsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQTlFdkYsVUFBMkIsSUFBSSxDQUFDLFVB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QUMsYUFBYSxDQUFDLEVBQUU7Z0JBQy9GLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzthQUN0RDtTQUNGO0tBQ0Y7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDM0I7OztZQXZLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFhLGFBQWE7Z0JBQ2xDLFNBQVMsRUFBWSxDQUFFLHdCQUF3QixDQUFFO2dCQUNqRCxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQU0sdUJBQXVCLENBQUMsTUFBTTtnQkFDbkQsYUFBYSxFQUFRLGlCQUFpQixDQUFDLElBQUk7Z0JBQzNDLCtKQUFpRDthQUNsRDs7OztZQS9CQyxVQUFVO1lBSFYsaUJBQWlCO1lBV2pCLFNBQVM7WUFLRix3QkFBd0I7WUFUL0IsTUFBTTs0Q0EyR08sUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7Ozs2QkE3RXBELFNBQVMsU0FBQyxnQkFBZ0I7Z0NBQzFCLGVBQWUsU0FBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3FCQUNyRCxXQUFXLFNBQUMsY0FBYztzQkFFMUIsS0FBSztzQkFVTCxLQUFLO3VCQVVMLEtBQUs7cUJBVUwsS0FBSztzQkFVTCxLQUFLO3FCQVVMLEtBQUs7d0JBVUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LCBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56VXBkYXRlSG9zdENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdXBkYXRlLWhvc3QtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBOelNpemVMRFNUeXBlIH0gZnJvbSAnLi4vY29yZS90eXBlcy9zaXplJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuLi9jb3JlL3V0aWwvY2hlY2snO1xuaW1wb3J0IHsgdG9Cb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuaW1wb3J0IHsgZmluZEZpcnN0Tm90RW1wdHlOb2RlLCBmaW5kTGFzdE5vdEVtcHR5Tm9kZSB9IGZyb20gJy4uL2NvcmUvdXRpbC9kb20nO1xuaW1wb3J0IHsgTnpXYXZlQ29uZmlnLCBOeldhdmVEaXJlY3RpdmUsIE5aX1dBVkVfR0xPQkFMX0NPTkZJRyB9IGZyb20gJy4uL2NvcmUvd2F2ZS9uei13YXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekljb25EaXJlY3RpdmUgfSBmcm9tICcuLi9pY29uL256LWljb24uZGlyZWN0aXZlJztcblxuZXhwb3J0IHR5cGUgTnpCdXR0b25UeXBlID0gJ3ByaW1hcnknIHwgJ2Rhc2hlZCcgfCAnZGFuZ2VyJztcbmV4cG9ydCB0eXBlIE56QnV0dG9uU2hhcGUgPSAnY2lyY2xlJyB8IG51bGwgO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ1tuei1idXR0b25dJyxcbiAgcHJvdmlkZXJzICAgICAgICAgIDogWyBOelVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UgXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbiAgICA6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbiAgICAgIDogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotYnV0dG9uLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOekJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRFbGVtZW50JykgY29udGVudEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpJY29uRGlyZWN0aXZlLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgbGlzdE9mSWNvbkVsZW1lbnQ6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLm56LXdhdmUnKSBueldhdmUgPSBuZXcgTnpXYXZlRGlyZWN0aXZlKHRoaXMubmdab25lLCB0aGlzLmVsZW1lbnRSZWYsIHRoaXMud2F2ZUNvbmZpZyk7XG5cbiAgQElucHV0KClcbiAgc2V0IG56QmxvY2sodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ibG9jayA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56QmxvY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Jsb2NrO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56R2hvc3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9naG9zdCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56R2hvc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2dob3N0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56U2VhcmNoKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VhcmNoID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpTZWFyY2goKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelR5cGUodmFsdWU6IE56QnV0dG9uVHlwZSkge1xuICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpUeXBlKCk6IE56QnV0dG9uVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpTaGFwZSh2YWx1ZTogTnpCdXR0b25TaGFwZSkge1xuICAgIHRoaXMuX3NoYXBlID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56U2hhcGUoKTogTnpCdXR0b25TaGFwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NoYXBlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56U2l6ZSh2YWx1ZTogTnpTaXplTERTVHlwZSkge1xuICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpTaXplKCk6IE56U2l6ZUxEU1R5cGUge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56TG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2xvYWRpbmcgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICB0aGlzLnVwZGF0ZUljb25EaXNwbGF5KHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuekxvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIG56VXBkYXRlSG9zdENsYXNzU2VydmljZTogTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlLCBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5aX1dBVkVfR0xPQkFMX0NPTkZJRykgcHJpdmF0ZSB3YXZlQ29uZmlnOiBOeldhdmVDb25maWcpIHtcbiAgfVxuXG4gIHByaXZhdGUgX2dob3N0ID0gZmFsc2U7XG4gIHByaXZhdGUgX3NlYXJjaCA9IGZhbHNlO1xuICBwcml2YXRlIF90eXBlOiBOekJ1dHRvblR5cGU7XG4gIHByaXZhdGUgX3NoYXBlOiBOekJ1dHRvblNoYXBlO1xuICBwcml2YXRlIF9zaXplOiBOelNpemVMRFNUeXBlO1xuICBwcml2YXRlIF9sb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2Jsb2NrID0gZmFsc2U7XG4gIHByaXZhdGUgaWNvbkVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGljb25Pbmx5ID0gZmFsc2U7XG4gIHByaXZhdGUgcHJlZml4Q2xzID0gJ2FudC1idG4nO1xuICBwcml2YXRlIHNpemVNYXAgPSB7IGxhcmdlOiAnbGcnLCBzbWFsbDogJ3NtJyB9O1xuXG4gIHVwZGF0ZUljb25EaXNwbGF5KHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaWNvbkVsZW1lbnQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pY29uRWxlbWVudCwgJ2Rpc3BsYXknLCB2YWx1ZSA/ICdub25lJyA6ICdpbmxpbmUtYmxvY2snKTtcbiAgICB9XG4gIH1cblxuICAvKiogdGVtcCBzb2x1dGlvbiBzaW5jZSBubyBtZXRob2QgYWRkIGNsYXNzTWFwIHRvIGhvc3QgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzI4OSAqL1xuICBzZXRDbGFzc01hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc01hcCA9IHtcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9YCBdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LSR7dGhpcy5uelR5cGV9YCBdICAgICAgICAgICAgICAgIDogdGhpcy5uelR5cGUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS0ke3RoaXMubnpTaGFwZX1gIF0gICAgICAgICAgICAgICA6IHRoaXMubnpTaGFwZSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LSR7dGhpcy5zaXplTWFwWyB0aGlzLm56U2l6ZSBdfWAgXTogdGhpcy5zaXplTWFwWyB0aGlzLm56U2l6ZSBdLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tbG9hZGluZ2AgXSAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm56TG9hZGluZyxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWljb24tb25seWAgXSAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5pY29uT25seSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWJhY2tncm91bmQtZ2hvc3RgIF0gICAgICAgICAgICAgIDogdGhpcy5uekdob3N0LFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tYmxvY2tgIF0gICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm56QmxvY2ssXG4gICAgICBbIGBhbnQtaW5wdXQtc2VhcmNoLWJ1dHRvbmAgXSAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubnpTZWFyY2hcbiAgICB9O1xuICAgIHRoaXMubnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlLnVwZGF0ZUhvc3RDbGFzcyh0aGlzLmVsLCBjbGFzc01hcCk7XG4gIH1cblxuICBjaGVja0NvbnRlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgaGFzSWNvbiA9IHRoaXMubGlzdE9mSWNvbkVsZW1lbnQgJiYgdGhpcy5saXN0T2ZJY29uRWxlbWVudC5sZW5ndGg7XG4gICAgaWYgKGhhc0ljb24pIHtcbiAgICAgIHRoaXMubW92ZUljb24oKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmNvbnRlbnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5Jyk7XG4gICAgLyoqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEyNTMwICoqL1xuICAgIGlmIChpc0VtcHR5KHRoaXMuY29udGVudEVsZW1lbnQubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50RWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICB0aGlzLmljb25Pbmx5ID0gISFoYXNJY29uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuY29udGVudEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknKTtcbiAgICAgIHRoaXMuaWNvbk9ubHkgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIHRoaXMudXBkYXRlSWNvbkRpc3BsYXkodGhpcy5uekxvYWRpbmcpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG1vdmVJY29uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RPZkljb25FbGVtZW50ICYmIHRoaXMubGlzdE9mSWNvbkVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICBjb25zdCBmaXJzdENoaWxkRWxlbWVudCA9IGZpbmRGaXJzdE5vdEVtcHR5Tm9kZSh0aGlzLmNvbnRlbnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgY29uc3QgbGFzdENoaWxkRWxlbWVudCA9IGZpbmRMYXN0Tm90RW1wdHlOb2RlKHRoaXMuY29udGVudEVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICBpZiAoZmlyc3RDaGlsZEVsZW1lbnQgJiYgKGZpcnN0Q2hpbGRFbGVtZW50ID09PSB0aGlzLmxpc3RPZkljb25FbGVtZW50LmZpcnN0Lm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKHRoaXMuZWwsIGZpcnN0Q2hpbGRFbGVtZW50LCB0aGlzLmNvbnRlbnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmljb25FbGVtZW50ID0gZmlyc3RDaGlsZEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB9IGVsc2UgaWYgKGxhc3RDaGlsZEVsZW1lbnQgJiYgKGxhc3RDaGlsZEVsZW1lbnQgPT09IHRoaXMubGlzdE9mSWNvbkVsZW1lbnQubGFzdC5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwsIGxhc3RDaGlsZEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrQ29udGVudCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIHRoaXMubnpXYXZlLm5nT25Jbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm56V2F2ZS5uZ09uRGVzdHJveSgpO1xuICB9XG59XG4iXX0=