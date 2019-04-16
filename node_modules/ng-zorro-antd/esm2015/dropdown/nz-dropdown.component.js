/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { combineLatest, merge, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mapTo, takeUntil } from 'rxjs/operators';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { DEFAULT_DROPDOWN_POSITIONS, POSITION_MAP } from '../core/overlay/overlay-position-map';
import { toBoolean } from '../core/util/convert';
import { NzMenuDirective } from '../menu/nz-menu.directive';
import { NzDropDownDirective } from './nz-dropdown.directive';
export class NzDropDownComponent {
    /**
     * @param {?} renderer
     * @param {?} changeDetector
     */
    constructor(renderer, changeDetector) {
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        this._clickHide = true;
        this._visible = false;
        this._disabled = false;
        this.unsubscribe$ = new Subject();
        this.hasFilterButton = false;
        this.triggerWidth = 0;
        this.placement = 'bottomLeft';
        this.dropDownPosition = 'bottom';
        this.positions = [...DEFAULT_DROPDOWN_POSITIONS];
        this.$subOpen = new BehaviorSubject(false);
        this.$visibleChange = new Subject();
        this.nzTrigger = 'hover';
        this.nzOverlayClassName = '';
        this.nzOverlayStyle = {};
        this.nzVisibleChange = new EventEmitter();
        this.onVisibleChange = (visible) => {
            if (visible) {
                this.setTriggerWidth();
            }
            if (this.nzVisible !== visible) {
                this.nzVisible = visible;
                this.nzVisibleChange.emit(this.nzVisible);
            }
            this.changeDetector.markForCheck();
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzClickHide(value) {
        this._clickHide = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzClickHide() {
        return this._clickHide;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDisabled(value) {
        this._disabled = toBoolean(value);
        if (this._disabled) {
            this.renderer.setAttribute(this.nzOrigin.elementRef.nativeElement, 'disabled', '');
        }
        else {
            this.renderer.removeAttribute(this.nzOrigin.elementRef.nativeElement, 'disabled');
        }
    }
    /**
     * @return {?}
     */
    get nzDisabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzVisible(value) {
        this._visible = toBoolean(value);
        /** handle nzVisible change with mouse event **/
        this.$visibleChange.next(this._visible);
    }
    /**
     * @return {?}
     */
    get nzVisible() {
        return this._visible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzPlacement(value) {
        this.placement = value;
        this.dropDownPosition = (this.nzPlacement.indexOf('top') !== -1) ? 'top' : 'bottom';
        this.positions.unshift(/** @type {?} */ (POSITION_MAP[this.placement]));
    }
    /**
     * @return {?}
     */
    get nzPlacement() {
        return this.placement;
    }
    /**
     * @return {?}
     */
    onClickEvent() {
        if (this.nzTrigger === 'click') {
            this.show();
        }
    }
    /**
     * @return {?}
     */
    onMouseEnterEvent() {
        if (this.nzTrigger === 'hover') {
            this.show();
        }
    }
    /**
     * @return {?}
     */
    onMouseLeaveEvent() {
        if (this.nzTrigger === 'hover') {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.$visibleChange.next(false);
    }
    /**
     * @return {?}
     */
    show() {
        this.$visibleChange.next(true);
    }
    /**
     * @param {?} position
     * @return {?}
     */
    onPositionChange(position) {
        this.dropDownPosition = position.connectionPair.originY;
    }
    /**
     * @return {?}
     */
    setTriggerWidth() {
        this.triggerWidth = this.nzOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        /** should remove after https://github.com/angular/material2/pull/8765 merged **/
        if (this.cdkOverlay && this.cdkOverlay.overlayRef) {
            this.cdkOverlay.overlayRef.updateSize({
                minWidth: this.triggerWidth
            });
        }
    }
    /**
     * @param {?} observable$
     * @return {?}
     */
    startSubscribe(observable$) {
        /** @type {?} */
        let $pre = observable$;
        if (this.nzClickHide && this.nzMenu) {
            /** @type {?} */
            const $menuItemClick = this.nzMenu.nzClick.asObservable().pipe(mapTo(false));
            $pre = merge($pre, $menuItemClick);
        }
        /** @type {?} */
        const final$ = combineLatest($pre, this.$subOpen).pipe(map(value => value[0] || value[1]), debounceTime(50), distinctUntilChanged());
        final$.pipe(takeUntil(this.unsubscribe$)).subscribe(this.onVisibleChange);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.nzMenu) {
            this.nzMenu.nzInDropDown = true;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        let mouse$;
        if (this.nzTrigger === 'hover') {
            /** @type {?} */
            const mouseEnterOrigin$ = this.nzOrigin.$mouseenter.pipe(mapTo(true));
            /** @type {?} */
            const mouseLeaveOrigin$ = this.nzOrigin.$mouseleave.pipe(mapTo(false));
            mouse$ = merge(mouseLeaveOrigin$, mouseEnterOrigin$);
        }
        if (this.nzTrigger === 'click') {
            mouse$ = this.nzOrigin.$click.pipe(mapTo(true));
        }
        /** @type {?} */
        const observable$ = merge(this.$visibleChange, mouse$);
        this.startSubscribe(observable$);
    }
    /**
     * @return {?}
     */
    get hasBackdrop() {
        return this.nzTrigger === 'click';
    }
}
NzDropDownComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-dropdown',
                preserveWhitespaces: false,
                animations: [
                    dropDownAnimation
                ],
                template: "<ng-content select=\"[nz-dropdown]\"></ng-content>\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n  [cdkConnectedOverlayPositions]=\"positions\"\n  [cdkConnectedOverlayOrigin]=\"nzOrigin\"\n  (backdropClick)=\"hide()\"\n  (detach)=\"hide()\"\n  [cdkConnectedOverlayMinWidth]=\"triggerWidth\"\n  (positionChange)=\"onPositionChange($event)\"\n  [cdkConnectedOverlayOpen]=\"nzVisible\">\n  <div\n    class=\"{{'ant-dropdown ant-dropdown-placement-'+nzPlacement}}\"\n    [ngClass]=\"nzOverlayClassName\" [ngStyle]=\"nzOverlayStyle\"\n    [@dropDownAnimation]=\"dropDownPosition\"\n    (mouseenter)=\"onMouseEnterEvent()\"\n    (mouseleave)=\"onMouseLeaveEvent()\"\n    [style.minWidth.px]=\"triggerWidth\">\n    <div [class.ant-table-filter-dropdown]=\"hasFilterButton\">\n      <ng-content select=\"[nz-menu]\"></ng-content>\n      <ng-content select=\".ant-table-filter-dropdown-btns\"></ng-content>\n    </div>\n    <ng-content></ng-content>\n  </div>\n</ng-template>",
                styles: [`
      .ant-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `]
            }] }
];
/** @nocollapse */
NzDropDownComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NzDropDownComponent.propDecorators = {
    hasFilterButton: [{ type: Input }],
    nzOrigin: [{ type: ContentChild, args: [NzDropDownDirective,] }],
    nzMenu: [{ type: ContentChild, args: [NzMenuDirective,] }],
    nzTrigger: [{ type: Input }],
    nzOverlayClassName: [{ type: Input }],
    nzOverlayStyle: [{ type: Input }],
    nzVisibleChange: [{ type: Output }],
    cdkOverlay: [{ type: ViewChild, args: [CdkConnectedOverlay,] }],
    nzClickHide: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzVisible: [{ type: Input }],
    nzPlacement: [{ type: Input }]
};
function NzDropDownComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzDropDownComponent.prototype._clickHide;
    /** @type {?} */
    NzDropDownComponent.prototype._visible;
    /** @type {?} */
    NzDropDownComponent.prototype._disabled;
    /** @type {?} */
    NzDropDownComponent.prototype.unsubscribe$;
    /** @type {?} */
    NzDropDownComponent.prototype.hasFilterButton;
    /** @type {?} */
    NzDropDownComponent.prototype.triggerWidth;
    /** @type {?} */
    NzDropDownComponent.prototype.placement;
    /** @type {?} */
    NzDropDownComponent.prototype.dropDownPosition;
    /** @type {?} */
    NzDropDownComponent.prototype.positions;
    /** @type {?} */
    NzDropDownComponent.prototype.$subOpen;
    /** @type {?} */
    NzDropDownComponent.prototype.$visibleChange;
    /** @type {?} */
    NzDropDownComponent.prototype.nzOrigin;
    /** @type {?} */
    NzDropDownComponent.prototype.nzMenu;
    /** @type {?} */
    NzDropDownComponent.prototype.nzTrigger;
    /** @type {?} */
    NzDropDownComponent.prototype.nzOverlayClassName;
    /** @type {?} */
    NzDropDownComponent.prototype.nzOverlayStyle;
    /** @type {?} */
    NzDropDownComponent.prototype.nzVisibleChange;
    /** @type {?} */
    NzDropDownComponent.prototype.cdkOverlay;
    /** @type {?} */
    NzDropDownComponent.prototype.onVisibleChange;
    /** @type {?} */
    NzDropDownComponent.prototype.renderer;
    /** @type {?} */
    NzDropDownComponent.prototype.changeDetector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL256LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUEwRCxNQUFNLHNCQUFzQixDQUFDO0FBQ25ILE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTVELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBeUI5RCxNQUFNLE9BQU8sbUJBQW1COzs7OztJQTRKOUIsWUFBb0IsUUFBbUIsRUFBWSxjQUFpQztRQUFoRSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVksbUJBQWMsR0FBZCxjQUFjLENBQW1COzBCQTNKL0QsSUFBSTt3QkFDTixLQUFLO3lCQUNKLEtBQUs7NEJBQ0YsSUFBSSxPQUFPLEVBQVE7UUFFMUMsdUJBQTJCLEtBQUssQ0FBQztRQUNqQyxv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QUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqRDs7UUFDRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQztLQUNuQzs7O1lBL0tGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQWEsYUFBYTtnQkFDbEMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsVUFBVSxFQUFXO29CQUNuQixpQkFBaUI7aUJBQ2xCO2dCQUNELDgvQkFBbUQ7eUJBRWpEOzs7Ozs7Ozs7S0FTQzthQUVKOzs7O1lBbkNDLFNBQVM7WUFSVCxpQkFBaUI7Ozs4QkFtRGhCLEtBQUs7dUJBT0wsWUFBWSxTQUFDLG1CQUFtQjtxQkFDaEMsWUFBWSxTQUFDLGVBQWU7d0JBQzVCLEtBQUs7aUNBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLE1BQU07eUJBQ04sU0FBUyxTQUFDLG1CQUFtQjswQkFFN0IsS0FBSzt5QkFTTCxLQUFLO3dCQWNMLEtBQUs7MEJBV0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0Nvbm5lY3RlZE92ZXJsYXksIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSwgQ29ubmVjdGlvblBvc2l0aW9uUGFpciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIG1lcmdlLCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgbWFwVG8sIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZHJvcERvd25BbmltYXRpb24gfSBmcm9tICcuLi9jb3JlL2FuaW1hdGlvbi9kcm9wZG93bi1hbmltYXRpb25zJztcbmltcG9ydCB7IERFRkFVTFRfRFJPUERPV05fUE9TSVRJT05TLCBQT1NJVElPTl9NQVAgfSBmcm9tICcuLi9jb3JlL292ZXJsYXkvb3ZlcmxheS1wb3NpdGlvbi1tYXAnO1xuaW1wb3J0IHsgdG9Cb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuaW1wb3J0IHsgTnpNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi4vbWVudS9uei1tZW51LmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7IE56RHJvcERvd25EaXJlY3RpdmUgfSBmcm9tICcuL256LWRyb3Bkb3duLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCB0eXBlIE56UGxhY2VtZW50ID0gJ2JvdHRvbUxlZnQnIHwgJ2JvdHRvbUNlbnRlcicgfCAnYm90dG9tUmlnaHQnIHwgJ3RvcExlZnQnIHwgJ3RvcENlbnRlcicgfCAndG9wUmlnaHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LWRyb3Bkb3duJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGFuaW1hdGlvbnMgICAgICAgICA6IFtcbiAgICBkcm9wRG93bkFuaW1hdGlvblxuICBdLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlcyAgICAgICAgICAgICA6IFtcbiAgICBgXG4gICAgICAuYW50LWRyb3Bkb3duIHtcbiAgICAgICAgdG9wOiAxMDAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOekRyb3BEb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF9jbGlja0hpZGUgPSB0cnVlO1xuICBwcml2YXRlIF92aXNpYmxlID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIHByaXZhdGUgdW5zdWJzY3JpYmUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBASW5wdXQoKSBoYXNGaWx0ZXJCdXR0b24gPSBmYWxzZTtcbiAgdHJpZ2dlcldpZHRoID0gMDtcbiAgcGxhY2VtZW50OiBOelBsYWNlbWVudCA9ICdib3R0b21MZWZ0JztcbiAgZHJvcERvd25Qb3NpdGlvbjogJ3RvcCcgfCAnY2VudGVyJyB8ICdib3R0b20nID0gJ2JvdHRvbSc7XG4gIHBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gWyAuLi5ERUZBVUxUX0RST1BET1dOX1BPU0lUSU9OUyBdO1xuICAkc3ViT3BlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAkdmlzaWJsZUNoYW5nZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIEBDb250ZW50Q2hpbGQoTnpEcm9wRG93bkRpcmVjdGl2ZSkgbnpPcmlnaW46IE56RHJvcERvd25EaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoTnpNZW51RGlyZWN0aXZlKSBuek1lbnU6IE56TWVudURpcmVjdGl2ZTtcbiAgQElucHV0KCkgbnpUcmlnZ2VyOiAnY2xpY2snIHwgJ2hvdmVyJyA9ICdob3Zlcic7XG4gIEBJbnB1dCgpIG56T3ZlcmxheUNsYXNzTmFtZSA9ICcnO1xuICBASW5wdXQoKSBuek92ZXJsYXlTdHlsZTogeyBbIGtleTogc3RyaW5nIF06IHN0cmluZyB9ID0ge307XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQFZpZXdDaGlsZChDZGtDb25uZWN0ZWRPdmVybGF5KSBjZGtPdmVybGF5OiBDZGtDb25uZWN0ZWRPdmVybGF5O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuekNsaWNrSGlkZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NsaWNrSGlkZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpDbGlja0hpZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWNrSGlkZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5uek9yaWdpbi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uek9yaWdpbi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuekRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92aXNpYmxlID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICAvKiogaGFuZGxlIG56VmlzaWJsZSBjaGFuZ2Ugd2l0aCBtb3VzZSBldmVudCAqKi9cbiAgICB0aGlzLiR2aXNpYmxlQ2hhbmdlLm5leHQodGhpcy5fdmlzaWJsZSk7XG4gIH1cblxuICBnZXQgbnpWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56UGxhY2VtZW50KHZhbHVlOiBOelBsYWNlbWVudCkge1xuICAgIHRoaXMucGxhY2VtZW50ID0gdmFsdWU7XG4gICAgdGhpcy5kcm9wRG93blBvc2l0aW9uID0gKHRoaXMubnpQbGFjZW1lbnQuaW5kZXhPZigndG9wJykgIT09IC0xKSA/ICd0b3AnIDogJ2JvdHRvbSc7XG4gICAgdGhpcy5wb3NpdGlvbnMudW5zaGlmdChQT1NJVElPTl9NQVBbIHRoaXMucGxhY2VtZW50IF0gYXMgQ29ubmVjdGlvblBvc2l0aW9uUGFpcik7XG4gIH1cblxuICBnZXQgbnpQbGFjZW1lbnQoKTogTnpQbGFjZW1lbnQge1xuICAgIHJldHVybiB0aGlzLnBsYWNlbWVudDtcbiAgfVxuXG4gIG9uQ2xpY2tFdmVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VFbnRlckV2ZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56VHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZUxlYXZlRXZlbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpUcmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuJHZpc2libGVDaGFuZ2UubmV4dChmYWxzZSk7XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuJHZpc2libGVDaGFuZ2UubmV4dCh0cnVlKTtcbiAgfVxuXG4gIG9uUG9zaXRpb25DaGFuZ2UocG9zaXRpb246IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgIHRoaXMuZHJvcERvd25Qb3NpdGlvbiA9IHBvc2l0aW9uLmNvbm5lY3Rpb25QYWlyLm9yaWdpblk7XG4gIH1cblxuICBzZXRUcmlnZ2VyV2lkdGgoKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyV2lkdGggPSB0aGlzLm56T3JpZ2luLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAvKiogc2hvdWxkIHJlbW92ZSBhZnRlciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC84NzY1IG1lcmdlZCAqKi9cbiAgICBpZiAodGhpcy5jZGtPdmVybGF5ICYmIHRoaXMuY2RrT3ZlcmxheS5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLmNka092ZXJsYXkub3ZlcmxheVJlZi51cGRhdGVTaXplKHtcbiAgICAgICAgbWluV2lkdGg6IHRoaXMudHJpZ2dlcldpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGFydFN1YnNjcmliZShvYnNlcnZhYmxlJDogT2JzZXJ2YWJsZTxib29sZWFuPik6IHZvaWQge1xuICAgIGxldCAkcHJlID0gb2JzZXJ2YWJsZSQ7XG4gICAgaWYgKHRoaXMubnpDbGlja0hpZGUgJiYgdGhpcy5uek1lbnUpIHtcbiAgICAgIGNvbnN0ICRtZW51SXRlbUNsaWNrID0gdGhpcy5uek1lbnUubnpDbGljay5hc09ic2VydmFibGUoKS5waXBlKG1hcFRvKGZhbHNlKSk7XG4gICAgICAkcHJlID0gbWVyZ2UoJHByZSwgJG1lbnVJdGVtQ2xpY2spO1xuICAgIH1cbiAgICBjb25zdCBmaW5hbCQgPSBjb21iaW5lTGF0ZXN0KCRwcmUsIHRoaXMuJHN1Yk9wZW4pLnBpcGUobWFwKHZhbHVlID0+IHZhbHVlWyAwIF0gfHwgdmFsdWVbIDEgXSksIGRlYm91bmNlVGltZSg1MCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgIGZpbmFsJC5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpLnN1YnNjcmliZSh0aGlzLm9uVmlzaWJsZUNoYW5nZSk7XG4gIH1cblxuICBvblZpc2libGVDaGFuZ2UgPSAodmlzaWJsZTogYm9vbGVhbikgPT4ge1xuICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICB0aGlzLnNldFRyaWdnZXJXaWR0aCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelZpc2libGUgIT09IHZpc2libGUpIHtcbiAgICAgIHRoaXMubnpWaXNpYmxlID0gdmlzaWJsZTtcbiAgICAgIHRoaXMubnpWaXNpYmxlQ2hhbmdlLmVtaXQodGhpcy5uelZpc2libGUpO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpNZW51KSB7XG4gICAgICB0aGlzLm56TWVudS5uekluRHJvcERvd24gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGxldCBtb3VzZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgaWYgKHRoaXMubnpUcmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICBjb25zdCBtb3VzZUVudGVyT3JpZ2luJCA9IHRoaXMubnpPcmlnaW4uJG1vdXNlZW50ZXIucGlwZShtYXBUbyh0cnVlKSk7XG4gICAgICBjb25zdCBtb3VzZUxlYXZlT3JpZ2luJCA9IHRoaXMubnpPcmlnaW4uJG1vdXNlbGVhdmUucGlwZShtYXBUbyhmYWxzZSkpO1xuICAgICAgbW91c2UkID0gbWVyZ2UobW91c2VMZWF2ZU9yaWdpbiQsIG1vdXNlRW50ZXJPcmlnaW4kKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpUcmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICBtb3VzZSQgPSB0aGlzLm56T3JpZ2luLiRjbGljay5waXBlKG1hcFRvKHRydWUpKTtcbiAgICB9XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSQgPSBtZXJnZSh0aGlzLiR2aXNpYmxlQ2hhbmdlLCBtb3VzZSQpO1xuICAgIHRoaXMuc3RhcnRTdWJzY3JpYmUob2JzZXJ2YWJsZSQpO1xuICB9XG5cbiAgZ2V0IGhhc0JhY2tkcm9wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56VHJpZ2dlciA9PT0gJ2NsaWNrJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG59XG4iXX0=