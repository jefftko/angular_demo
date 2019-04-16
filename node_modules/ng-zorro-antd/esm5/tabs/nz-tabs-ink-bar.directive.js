/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, NgZone, Renderer2 } from '@angular/core';
import { InputBoolean } from '../core/util/convert';
var NzTabsInkBarDirective = /** @class */ (function () {
    function NzTabsInkBarDirective(renderer, elementRef, ngZone) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.nzAnimated = false;
        this.nzPositionMode = 'horizontal';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    NzTabsInkBarDirective.prototype.alignToElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        if (typeof requestAnimationFrame !== 'undefined') {
            this.ngZone.runOutsideAngular(function () {
                requestAnimationFrame(function () { return _this.setStyles(element); });
            });
        }
        else {
            this.setStyles(element);
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NzTabsInkBarDirective.prototype.setStyles = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** when horizontal remove height style and add transform left **/
        if (this.nzPositionMode === 'horizontal') {
            this.renderer.removeStyle(this.elementRef.nativeElement, 'height');
            this.renderer.setStyle(this.elementRef.nativeElement, 'transform', "translate3d(" + this.getLeftPosition(element) + ", 0px, 0px)");
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.getElementWidth(element));
        }
        else {
            /** when vertical remove width style and add transform top **/
            this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
            this.renderer.setStyle(this.elementRef.nativeElement, 'transform', "translate3d(0px, " + this.getTopPosition(element) + ", 0px)");
            this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.getElementHeight(element));
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NzTabsInkBarDirective.prototype.getLeftPosition = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element ? element.offsetLeft + 'px' : '0';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NzTabsInkBarDirective.prototype.getElementWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element ? element.offsetWidth + 'px' : '0';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NzTabsInkBarDirective.prototype.getTopPosition = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element ? element.offsetTop + 'px' : '0';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NzTabsInkBarDirective.prototype.getElementHeight = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element ? element.offsetHeight + 'px' : '0';
    };
    NzTabsInkBarDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nz-tabs-ink-bar]',
                    host: {
                        '[class.ant-tabs-ink-bar]': 'true',
                        '[class.ant-tabs-ink-bar-animated]': 'nzAnimated',
                        '[class.ant-tabs-ink-bar-no-animated]': '!nzAnimated'
                    }
                },] }
    ];
    /** @nocollapse */
    NzTabsInkBarDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    NzTabsInkBarDirective.propDecorators = {
        nzAnimated: [{ type: Input }],
        nzPositionMode: [{ type: Input }]
    };
    tslib_1.__decorate([
        InputBoolean(),
        tslib_1.__metadata("design:type", Object)
    ], NzTabsInkBarDirective.prototype, "nzAnimated", void 0);
    return NzTabsInkBarDirective;
}());
export { NzTabsInkBarDirective };
function NzTabsInkBarDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NzTabsInkBarDirective.prototype.nzAnimated;
    /** @type {?} */
    NzTabsInkBarDirective.prototype.nzPositionMode;
    /** @type {?} */
    NzTabsInkBarDirective.prototype.renderer;
    /** @type {?} */
    NzTabsInkBarDirective.prototype.elementRef;
    /** @type {?} */
    NzTabsInkBarDirective.prototype.ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGFicy1pbmstYmFyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJ0YWJzL256LXRhYnMtaW5rLWJhci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0lBa0JsRCwrQkFBb0IsUUFBbUIsRUFDbkIsWUFDQTtRQUZBLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsZUFBVSxHQUFWLFVBQVU7UUFDVixXQUFNLEdBQU4sTUFBTTtRQU4xQixrQkFBc0MsS0FBSyxDQUFDO1FBRTVDLHNCQUE2QyxZQUFZLENBQUM7S0FLekQ7Ozs7O0lBRUQsOENBQWM7Ozs7SUFBZCxVQUFlLE9BQW9CO1FBQW5DLGlCQVFDO1FBUEMsSUFBSSxPQUFPLHFCQUFxQixLQUFLLFdBQVcsRUFBRTtZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO2dCQUM1QixxQkFBcUIsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO2FBQ3RELENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCO0tBQ0Y7Ozs7O0lBRUQseUNBQVM7Ozs7SUFBVCxVQUFVLE9BQW9COztRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssWUFBWSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFDL0QsaUJBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsZ0JBQWEsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07O1lBRUwsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUMvRCxzQkFBb0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsV0FBUSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNuQztLQUNGOzs7OztJQUVELCtDQUFlOzs7O0lBQWYsVUFBZ0IsT0FBb0I7UUFDbEMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDbEQ7Ozs7O0lBRUQsK0NBQWU7Ozs7SUFBZixVQUFnQixPQUFvQjtRQUNsQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUNuRDs7Ozs7SUFFRCw4Q0FBYzs7OztJQUFkLFVBQWUsT0FBb0I7UUFDakMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDakQ7Ozs7O0lBRUQsZ0RBQWdCOzs7O0lBQWhCLFVBQWlCLE9BQW9CO1FBQ25DLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQ3BEOztnQkE3REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBTTt3QkFDUiwwQkFBMEIsRUFBYyxNQUFNO3dCQUM5QyxtQ0FBbUMsRUFBSyxZQUFZO3dCQUNwRCxzQ0FBc0MsRUFBRSxhQUFhO3FCQUN0RDtpQkFDRjs7OztnQkFiOEMsU0FBUztnQkFBcEMsVUFBVTtnQkFBUyxNQUFNOzs7NkJBZ0IxQyxLQUFLO2lDQUVMLEtBQUs7OztRQUZJLFlBQVksRUFBRTs7O2dDQWhCMUI7O1NBY2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgTmdab25lLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuXG5pbXBvcnQgeyBOelRhYlBvc2l0aW9uTW9kZSB9IGZyb20gJy4vbnotdGFic2V0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei10YWJzLWluay1iYXJdJyxcbiAgaG9zdCAgICA6IHtcbiAgICAnW2NsYXNzLmFudC10YWJzLWluay1iYXJdJyAgICAgICAgICAgIDogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LXRhYnMtaW5rLWJhci1hbmltYXRlZF0nICAgOiAnbnpBbmltYXRlZCcsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1pbmstYmFyLW5vLWFuaW1hdGVkXSc6ICchbnpBbmltYXRlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYnNJbmtCYXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekFuaW1hdGVkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbnpQb3NpdGlvbk1vZGU6IE56VGFiUG9zaXRpb25Nb2RlID0gJ2hvcml6b250YWwnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gIH1cblxuICBhbGlnblRvRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5zZXRTdHlsZXMoZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3R5bGVzKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0eWxlcyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIC8qKiB3aGVuIGhvcml6b250YWwgcmVtb3ZlIGhlaWdodCBzdHlsZSBhbmQgYWRkIHRyYW5zZm9ybSBsZWZ0ICoqL1xuICAgIGlmICh0aGlzLm56UG9zaXRpb25Nb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLFxuICAgICAgICBgdHJhbnNsYXRlM2QoJHt0aGlzLmdldExlZnRQb3NpdGlvbihlbGVtZW50KX0sIDBweCwgMHB4KWApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJyxcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50V2lkdGgoZWxlbWVudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiogd2hlbiB2ZXJ0aWNhbCByZW1vdmUgd2lkdGggc3R5bGUgYW5kIGFkZCB0cmFuc2Zvcm0gdG9wICoqL1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJyxcbiAgICAgICAgYHRyYW5zbGF0ZTNkKDBweCwgJHt0aGlzLmdldFRvcFBvc2l0aW9uKGVsZW1lbnQpfSwgMHB4KWApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsXG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudEhlaWdodChlbGVtZW50KSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQub2Zmc2V0TGVmdCArICdweCcgOiAnMCc7XG4gIH1cblxuICBnZXRFbGVtZW50V2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBlbGVtZW50ID8gZWxlbWVudC5vZmZzZXRXaWR0aCArICdweCcgOiAnMCc7XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyBlbGVtZW50Lm9mZnNldFRvcCArICdweCcgOiAnMCc7XG4gIH1cblxuICBnZXRFbGVtZW50SGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JyA6ICcwJztcbiAgfVxufVxuIl19