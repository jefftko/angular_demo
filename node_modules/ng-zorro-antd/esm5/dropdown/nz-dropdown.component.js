/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { combineLatest, merge, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mapTo, takeUntil } from 'rxjs/operators';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { DEFAULT_DROPDOWN_POSITIONS, POSITION_MAP } from '../core/overlay/overlay-position-map';
import { toBoolean } from '../core/util/convert';
import { NzMenuDirective } from '../menu/nz-menu.directive';
import { NzDropDownDirective } from './nz-dropdown.directive';
var NzDropDownComponent = /** @class */ (function () {
    function NzDropDownComponent(renderer, changeDetector) {
        var _this = this;
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
        this.positions = tslib_1.__spread(DEFAULT_DROPDOWN_POSITIONS);
        this.$subOpen = new BehaviorSubject(false);
        this.$visibleChange = new Subject();
        this.nzTrigger = 'hover';
        this.nzOverlayClassName = '';
        this.nzOverlayStyle = {};
        this.nzVisibleChange = new EventEmitter();
        this.onVisibleChange = function (visible) {
            if (visible) {
                _this.setTriggerWidth();
            }
            if (_this.nzVisible !== visible) {
                _this.nzVisible = visible;
                _this.nzVisibleChange.emit(_this.nzVisible);
            }
            _this.changeDetector.markForCheck();
        };
    }
    Object.defineProperty(NzDropDownComponent.prototype, "nzClickHide", {
        get: /**
         * @return {?}
         */
        function () {
            return this._clickHide;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._clickHide = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDropDownComponent.prototype, "nzDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = toBoolean(value);
            if (this._disabled) {
                this.renderer.setAttribute(this.nzOrigin.elementRef.nativeElement, 'disabled', '');
            }
            else {
                this.renderer.removeAttribute(this.nzOrigin.elementRef.nativeElement, 'disabled');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDropDownComponent.prototype, "nzVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._visible = toBoolean(value);
            /** handle nzVisible change with mouse event **/
            this.$visibleChange.next(this._visible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDropDownComponent.prototype, "nzPlacement", {
        get: /**
         * @return {?}
         */
        function () {
            return this.placement;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.placement = value;
            this.dropDownPosition = (this.nzPlacement.indexOf('top') !== -1) ? 'top' : 'bottom';
            this.positions.unshift(/** @type {?} */ (POSITION_MAP[this.placement]));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.onClickEvent = /**
     * @return {?}
     */
    function () {
        if (this.nzTrigger === 'click') {
            this.show();
        }
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.onMouseEnterEvent = /**
     * @return {?}
     */
    function () {
        if (this.nzTrigger === 'hover') {
            this.show();
        }
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.onMouseLeaveEvent = /**
     * @return {?}
     */
    function () {
        if (this.nzTrigger === 'hover') {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.$visibleChange.next(false);
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.$visibleChange.next(true);
    };
    /**
     * @param {?} position
     * @return {?}
     */
    NzDropDownComponent.prototype.onPositionChange = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.dropDownPosition = position.connectionPair.originY;
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.setTriggerWidth = /**
     * @return {?}
     */
    function () {
        this.triggerWidth = this.nzOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        /** should remove after https://github.com/angular/material2/pull/8765 merged **/
        if (this.cdkOverlay && this.cdkOverlay.overlayRef) {
            this.cdkOverlay.overlayRef.updateSize({
                minWidth: this.triggerWidth
            });
        }
    };
    /**
     * @param {?} observable$
     * @return {?}
     */
    NzDropDownComponent.prototype.startSubscribe = /**
     * @param {?} observable$
     * @return {?}
     */
    function (observable$) {
        /** @type {?} */
        var $pre = observable$;
        if (this.nzClickHide && this.nzMenu) {
            /** @type {?} */
            var $menuItemClick = this.nzMenu.nzClick.asObservable().pipe(mapTo(false));
            $pre = merge($pre, $menuItemClick);
        }
        /** @type {?} */
        var final$ = combineLatest($pre, this.$subOpen).pipe(map(function (value) { return value[0] || value[1]; }), debounceTime(50), distinctUntilChanged());
        final$.pipe(takeUntil(this.unsubscribe$)).subscribe(this.onVisibleChange);
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.nzMenu) {
            this.nzMenu.nzInDropDown = true;
        }
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    };
    /**
     * @return {?}
     */
    NzDropDownComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var mouse$;
        if (this.nzTrigger === 'hover') {
            /** @type {?} */
            var mouseEnterOrigin$ = this.nzOrigin.$mouseenter.pipe(mapTo(true));
            /** @type {?} */
            var mouseLeaveOrigin$ = this.nzOrigin.$mouseleave.pipe(mapTo(false));
            mouse$ = merge(mouseLeaveOrigin$, mouseEnterOrigin$);
        }
        if (this.nzTrigger === 'click') {
            mouse$ = this.nzOrigin.$click.pipe(mapTo(true));
        }
        /** @type {?} */
        var observable$ = merge(this.$visibleChange, mouse$);
        this.startSubscribe(observable$);
    };
    Object.defineProperty(NzDropDownComponent.prototype, "hasBackdrop", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzTrigger === 'click';
        },
        enumerable: true,
        configurable: true
    });
    NzDropDownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-dropdown',
                    preserveWhitespaces: false,
                    animations: [
                        dropDownAnimation
                    ],
                    template: "<ng-content select=\"[nz-dropdown]\"></ng-content>\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n  [cdkConnectedOverlayPositions]=\"positions\"\n  [cdkConnectedOverlayOrigin]=\"nzOrigin\"\n  (backdropClick)=\"hide()\"\n  (detach)=\"hide()\"\n  [cdkConnectedOverlayMinWidth]=\"triggerWidth\"\n  (positionChange)=\"onPositionChange($event)\"\n  [cdkConnectedOverlayOpen]=\"nzVisible\">\n  <div\n    class=\"{{'ant-dropdown ant-dropdown-placement-'+nzPlacement}}\"\n    [ngClass]=\"nzOverlayClassName\" [ngStyle]=\"nzOverlayStyle\"\n    [@dropDownAnimation]=\"dropDownPosition\"\n    (mouseenter)=\"onMouseEnterEvent()\"\n    (mouseleave)=\"onMouseLeaveEvent()\"\n    [style.minWidth.px]=\"triggerWidth\">\n    <div [class.ant-table-filter-dropdown]=\"hasFilterButton\">\n      <ng-content select=\"[nz-menu]\"></ng-content>\n      <ng-content select=\".ant-table-filter-dropdown-btns\"></ng-content>\n    </div>\n    <ng-content></ng-content>\n  </div>\n</ng-template>",
                    styles: ["\n      .ant-dropdown {\n        top: 100%;\n        left: 0;\n        position: relative;\n        width: 100%;\n        margin-top: 4px;\n        margin-bottom: 4px;\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    NzDropDownComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
    return NzDropDownComponent;
}());
export { NzDropDownComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL256LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBMEQsTUFBTSxzQkFBc0IsQ0FBQztBQUNuSCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFxTDVELDZCQUFvQixRQUFtQixFQUFZLGNBQWlDO1FBQXBGLGlCQUNDO1FBRG1CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBWSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7MEJBM0ovRCxJQUFJO3dCQUNOLEtBQUs7eUJBQ0osS0FBSzs0QkFDRixJQUFJLE9BQU8sRUFBUTtRQUUxQyx1QkFBMkIsS0FBSyxDQUFDO1FBQ2pDLG9CQUFlLENBQUMsQ0FB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aUIsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRTtZQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pEOztRQUNELElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDbEM7SUFFRCxzQkFBSSw0Q0FBVzs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQztTQUNuQzs7O09BQUE7O2dCQS9LRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFhLGFBQWE7b0JBQ2xDLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFVBQVUsRUFBVzt3QkFDbkIsaUJBQWlCO3FCQUNsQjtvQkFDRCw4L0JBQW1EOzZCQUVqRCx3TEFTQztpQkFFSjs7OztnQkFuQ0MsU0FBUztnQkFSVCxpQkFBaUI7OztrQ0FtRGhCLEtBQUs7MkJBT0wsWUFBWSxTQUFDLG1CQUFtQjt5QkFDaEMsWUFBWSxTQUFDLGVBQWU7NEJBQzVCLEtBQUs7cUNBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUNMLE1BQU07NkJBQ04sU0FBUyxTQUFDLG1CQUFtQjs4QkFFN0IsS0FBSzs2QkFTTCxLQUFLOzRCQWNMLEtBQUs7OEJBV0wsS0FBSzs7OEJBdkdSOztTQWdEYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtDb25uZWN0ZWRPdmVybGF5LCBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBtZXJnZSwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIG1hcFRvLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGRyb3BEb3duQW5pbWF0aW9uIH0gZnJvbSAnLi4vY29yZS9hbmltYXRpb24vZHJvcGRvd24tYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBERUZBVUxUX0RST1BET1dOX1BPU0lUSU9OUywgUE9TSVRJT05fTUFQIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L292ZXJsYXktcG9zaXRpb24tbWFwJztcbmltcG9ydCB7IHRvQm9vbGVhbiB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcbmltcG9ydCB7IE56TWVudURpcmVjdGl2ZSB9IGZyb20gJy4uL21lbnUvbnotbWVudS5kaXJlY3RpdmUnO1xuXG5pbXBvcnQgeyBOekRyb3BEb3duRGlyZWN0aXZlIH0gZnJvbSAnLi9uei1kcm9wZG93bi5kaXJlY3RpdmUnO1xuXG5leHBvcnQgdHlwZSBOelBsYWNlbWVudCA9ICdib3R0b21MZWZ0JyB8ICdib3R0b21DZW50ZXInIHwgJ2JvdHRvbVJpZ2h0JyB8ICd0b3BMZWZ0JyB8ICd0b3BDZW50ZXInIHwgJ3RvcFJpZ2h0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgICAgICAgICA6ICduei1kcm9wZG93bicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBhbmltYXRpb25zICAgICAgICAgOiBbXG4gICAgZHJvcERvd25BbmltYXRpb25cbiAgXSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXMgICAgICAgICAgICAgOiBbXG4gICAgYFxuICAgICAgLmFudC1kcm9wZG93biB7XG4gICAgICAgIHRvcDogMTAwJTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWFyZ2luLXRvcDogNHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgTnpEcm9wRG93bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBfY2xpY2tIaWRlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfdmlzaWJsZSA9IGZhbHNlO1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIHVuc3Vic2NyaWJlJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgQElucHV0KCkgaGFzRmlsdGVyQnV0dG9uID0gZmFsc2U7XG4gIHRyaWdnZXJXaWR0aCA9IDA7XG4gIHBsYWNlbWVudDogTnpQbGFjZW1lbnQgPSAnYm90dG9tTGVmdCc7XG4gIGRyb3BEb3duUG9zaXRpb246ICd0b3AnIHwgJ2NlbnRlcicgfCAnYm90dG9tJyA9ICdib3R0b20nO1xuICBwb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFsgLi4uREVGQVVMVF9EUk9QRE9XTl9QT1NJVElPTlMgXTtcbiAgJHN1Yk9wZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgJHZpc2libGVDaGFuZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBAQ29udGVudENoaWxkKE56RHJvcERvd25EaXJlY3RpdmUpIG56T3JpZ2luOiBOekRyb3BEb3duRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKE56TWVudURpcmVjdGl2ZSkgbnpNZW51OiBOek1lbnVEaXJlY3RpdmU7XG4gIEBJbnB1dCgpIG56VHJpZ2dlcjogJ2NsaWNrJyB8ICdob3ZlcicgPSAnaG92ZXInO1xuICBASW5wdXQoKSBuek92ZXJsYXlDbGFzc05hbWUgPSAnJztcbiAgQElucHV0KCkgbnpPdmVybGF5U3R5bGU6IHsgWyBrZXk6IHN0cmluZyBdOiBzdHJpbmcgfSA9IHt9O1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBWaWV3Q2hpbGQoQ2RrQ29ubmVjdGVkT3ZlcmxheSkgY2RrT3ZlcmxheTogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcblxuICBASW5wdXQoKVxuICBzZXQgbnpDbGlja0hpZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jbGlja0hpZGUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56Q2xpY2tIaWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jbGlja0hpZGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpEaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMubnpPcmlnaW4uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMubnpPcmlnaW4uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmlzaWJsZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgLyoqIGhhbmRsZSBuelZpc2libGUgY2hhbmdlIHdpdGggbW91c2UgZXZlbnQgKiovXG4gICAgdGhpcy4kdmlzaWJsZUNoYW5nZS5uZXh0KHRoaXMuX3Zpc2libGUpO1xuICB9XG5cbiAgZ2V0IG56VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelBsYWNlbWVudCh2YWx1ZTogTnpQbGFjZW1lbnQpIHtcbiAgICB0aGlzLnBsYWNlbWVudCA9IHZhbHVlO1xuICAgIHRoaXMuZHJvcERvd25Qb3NpdGlvbiA9ICh0aGlzLm56UGxhY2VtZW50LmluZGV4T2YoJ3RvcCcpICE9PSAtMSkgPyAndG9wJyA6ICdib3R0b20nO1xuICAgIHRoaXMucG9zaXRpb25zLnVuc2hpZnQoUE9TSVRJT05fTUFQWyB0aGlzLnBsYWNlbWVudCBdIGFzIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIpO1xuICB9XG5cbiAgZ2V0IG56UGxhY2VtZW50KCk6IE56UGxhY2VtZW50IHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gIH1cblxuICBvbkNsaWNrRXZlbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpUcmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRW50ZXJFdmVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VMZWF2ZUV2ZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56VHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICB0aGlzLiR2aXNpYmxlQ2hhbmdlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLiR2aXNpYmxlQ2hhbmdlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBvblBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uOiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICB0aGlzLmRyb3BEb3duUG9zaXRpb24gPSBwb3NpdGlvbi5jb25uZWN0aW9uUGFpci5vcmlnaW5ZO1xuICB9XG5cbiAgc2V0VHJpZ2dlcldpZHRoKCk6IHZvaWQge1xuICAgIHRoaXMudHJpZ2dlcldpZHRoID0gdGhpcy5uek9yaWdpbi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgLyoqIHNob3VsZCByZW1vdmUgYWZ0ZXIgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvODc2NSBtZXJnZWQgKiovXG4gICAgaWYgKHRoaXMuY2RrT3ZlcmxheSAmJiB0aGlzLmNka092ZXJsYXkub3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5jZGtPdmVybGF5Lm92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7XG4gICAgICAgIG1pbldpZHRoOiB0aGlzLnRyaWdnZXJXaWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRTdWJzY3JpYmUob2JzZXJ2YWJsZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4pOiB2b2lkIHtcbiAgICBsZXQgJHByZSA9IG9ic2VydmFibGUkO1xuICAgIGlmICh0aGlzLm56Q2xpY2tIaWRlICYmIHRoaXMubnpNZW51KSB7XG4gICAgICBjb25zdCAkbWVudUl0ZW1DbGljayA9IHRoaXMubnpNZW51Lm56Q2xpY2suYXNPYnNlcnZhYmxlKCkucGlwZShtYXBUbyhmYWxzZSkpO1xuICAgICAgJHByZSA9IG1lcmdlKCRwcmUsICRtZW51SXRlbUNsaWNrKTtcbiAgICB9XG4gICAgY29uc3QgZmluYWwkID0gY29tYmluZUxhdGVzdCgkcHJlLCB0aGlzLiRzdWJPcGVuKS5waXBlKG1hcCh2YWx1ZSA9PiB2YWx1ZVsgMCBdIHx8IHZhbHVlWyAxIF0pLCBkZWJvdW5jZVRpbWUoNTApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICBmaW5hbCQucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKS5zdWJzY3JpYmUodGhpcy5vblZpc2libGVDaGFuZ2UpO1xuICB9XG5cbiAgb25WaXNpYmxlQ2hhbmdlID0gKHZpc2libGU6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAodmlzaWJsZSkge1xuICAgICAgdGhpcy5zZXRUcmlnZ2VyV2lkdGgoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpWaXNpYmxlICE9PSB2aXNpYmxlKSB7XG4gICAgICB0aGlzLm56VmlzaWJsZSA9IHZpc2libGU7XG4gICAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5lbWl0KHRoaXMubnpWaXNpYmxlKTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56TWVudSkge1xuICAgICAgdGhpcy5uek1lbnUubnpJbkRyb3BEb3duID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5uZXh0KCk7XG4gICAgdGhpcy51bnN1YnNjcmliZSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBsZXQgbW91c2UkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIGlmICh0aGlzLm56VHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgY29uc3QgbW91c2VFbnRlck9yaWdpbiQgPSB0aGlzLm56T3JpZ2luLiRtb3VzZWVudGVyLnBpcGUobWFwVG8odHJ1ZSkpO1xuICAgICAgY29uc3QgbW91c2VMZWF2ZU9yaWdpbiQgPSB0aGlzLm56T3JpZ2luLiRtb3VzZWxlYXZlLnBpcGUobWFwVG8oZmFsc2UpKTtcbiAgICAgIG1vdXNlJCA9IG1lcmdlKG1vdXNlTGVhdmVPcmlnaW4kLCBtb3VzZUVudGVyT3JpZ2luJCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm56VHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgbW91c2UkID0gdGhpcy5uek9yaWdpbi4kY2xpY2sucGlwZShtYXBUbyh0cnVlKSk7XG4gICAgfVxuICAgIGNvbnN0IG9ic2VydmFibGUkID0gbWVyZ2UodGhpcy4kdmlzaWJsZUNoYW5nZSwgbW91c2UkKTtcbiAgICB0aGlzLnN0YXJ0U3Vic2NyaWJlKG9ic2VydmFibGUkKTtcbiAgfVxuXG4gIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uelRyaWdnZXIgPT09ICdjbGljayc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxufVxuIl19