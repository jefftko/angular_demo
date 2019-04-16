/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '../core/util/convert';
var NzTagComponent = /** @class */ (function () {
    function NzTagComponent(renderer) {
        this.renderer = renderer;
        this.closed = false;
        this.nzMode = 'default';
        this.nzChecked = false;
        this.nzAfterClose = new EventEmitter();
        this.nzOnClose = new EventEmitter();
        this.nzCheckedChange = new EventEmitter();
    }
    /**
     * @param {?=} color
     * @return {?}
     */
    NzTagComponent.prototype.isPresetColor = /**
     * @param {?=} color
     * @return {?}
     */
    function (color) {
        if (!color) {
            return false;
        }
        return (/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
            .test(color));
    };
    /**
     * @return {?}
     */
    NzTagComponent.prototype.updateClassMap = /**
     * @return {?}
     */
    function () {
        var _a;
        /** @type {?} */
        var isPresetColor = this.isPresetColor(this.nzColor);
        this.classMap = (_a = {},
            _a["ant-tag"] = true,
            _a["ant-tag-has-color"] = this.nzColor && !isPresetColor,
            _a["ant-tag-" + this.nzColor] = isPresetColor,
            _a["ant-tag-checkable"] = this.nzMode === 'checkable',
            _a["ant-tag-checkable-checked"] = this.nzChecked,
            _a);
    };
    /**
     * @return {?}
     */
    NzTagComponent.prototype.updateColorStatus = /**
     * @return {?}
     */
    function () {
        if (this.wrapperElement && this.nzColor) {
            if (this.isPresetColor(this.nzColor)) {
                this.renderer.removeStyle(this.wrapperElement.nativeElement, 'background-color');
            }
            else {
                this.renderer.setStyle(this.wrapperElement.nativeElement, 'background-color', this.nzColor);
            }
        }
    };
    /**
     * @return {?}
     */
    NzTagComponent.prototype.updateCheckedStatus = /**
     * @return {?}
     */
    function () {
        if (this.nzMode === 'checkable') {
            this.nzChecked = !this.nzChecked;
            this.nzCheckedChange.emit(this.nzChecked);
            this.updateClassMap();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzTagComponent.prototype.closeTag = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.nzOnClose.emit(e);
        if (!e.defaultPrevented) {
            this.closed = true;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzTagComponent.prototype.afterAnimation = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.closed && !e.fromState) {
            this.nzAfterClose.emit();
        }
    };
    /**
     * @return {?}
     */
    NzTagComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateClassMap();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTagComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["nzColor"]) {
            this.updateColorStatus();
        }
        this.updateClassMap();
    };
    /**
     * @return {?}
     */
    NzTagComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.updateColorStatus();
    };
    NzTagComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-tag',
                    preserveWhitespaces: false,
                    animations: [trigger('tagAnimation', [
                            state('*', style({ opacity: 1 })),
                            transition('void => *', [
                                style({ opacity: 0 }),
                                animate('300ms cubic-bezier(0.78, 0.14, 0.15, 0.86)')
                            ]),
                            state('void', style({ opacity: 0 })),
                            transition('* => void', [
                                style({ opacity: 1 }),
                                animate('300ms cubic-bezier(0.78, 0.14, 0.15, 0.86)')
                            ])
                        ])],
                    template: "<div\n  *ngIf=\"!closed\"\n  [ngClass]=\"classMap\"\n  #wrapperElement\n  [@tagAnimation]\n  (@tagAnimation.done)=\"afterAnimation($event)\"\n  (click)=\"updateCheckedStatus()\">\n  <ng-content></ng-content>\n  <i nz-icon type=\"close\" *ngIf=\"nzMode==='closeable'\" (click)=\"closeTag($event)\"></i>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    NzTagComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    NzTagComponent.propDecorators = {
        wrapperElement: [{ type: ViewChild, args: ['wrapperElement',] }],
        nzMode: [{ type: Input }],
        nzColor: [{ type: Input }],
        nzChecked: [{ type: Input }],
        nzAfterClose: [{ type: Output }],
        nzOnClose: [{ type: Output }],
        nzCheckedChange: [{ type: Output }]
    };
    tslib_1.__decorate([
        InputBoolean(),
        tslib_1.__metadata("design:type", Boolean)
    ], NzTagComponent.prototype, "nzChecked", void 0);
    return NzTagComponent;
}());
export { NzTagComponent };
function NzTagComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzTagComponent.prototype.classMap;
    /** @type {?} */
    NzTagComponent.prototype.closed;
    /** @type {?} */
    NzTagComponent.prototype.wrapperElement;
    /** @type {?} */
    NzTagComponent.prototype.nzMode;
    /** @type {?} */
    NzTagComponent.prototype.nzColor;
    /** @type {?} */
    NzTagComponent.prototype.nzChecked;
    /** @type {?} */
    NzTagComponent.prototype.nzAfterClose;
    /** @type {?} */
    NzTagComponent.prototype.nzOnClose;
    /** @type {?} */
    NzTagComponent.prototype.nzCheckedChange;
    /** @type {?} */
    NzTagComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJ0YWcvbnotdGFnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUFrQ2xELHdCQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBWHZDLGNBQVMsS0FBSyxDQUFDO1FBSWYsY0FBMkIsU0FBUyxDQUFDO1FBRXJDLGlCQUE4QyxLQUFLLENBQUM7UUFDcEQsb0JBQWtDLElBQUksWUFBWSxFQUFRLENBQUM7UUFDM0QsaUJBQStCLElBQUksWUFBWSxFQUFjLENBQUM7UUFDOUQsdUJBQXFDLElBQUksWUFBWSxFQUFXLENBQUM7S0FFckI7Ozs7O0lBRXBDLHNDQUFhOzs7O2NBQUMsS0FBYztRQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sQ0FDTCxpR0FBaUc7YUFDaEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNiLENBQUM7Ozs7O0lBR0ksdUNBQWM7Ozs7OztRQUNwQixJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUTtZQUNYLEdBQUUsU0FBUyxJQUFzQixJQUFJO1lBQ3JDLEdBQUUsbUJBQW1C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QUFlLEVBQU0sdUJBQXVCLENBQUMsTUFBTTtvQkFDbkQsYUFBYSxFQUFRLGlCQUFpQixDQUFDLElBQUk7aUJBQzVDOzs7O2dCQTNCQyxTQUFTOzs7aUNBZ0NSLFNBQVMsU0FBQyxnQkFBZ0I7eUJBRTFCLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLOytCQUNMLE1BQU07NEJBQ04sTUFBTTtrQ0FDTixNQUFNOzs7UUFIRyxZQUFZLEVBQUU7Ozt5QkF0RDFCOztTQThDYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBBbmltYXRpb25FdmVudFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IHR5cGUgVGFnVHlwZSA9ICdkZWZhdWx0JyB8ICdjbG9zZWFibGUnIHwgJ2NoZWNrYWJsZSc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgICAgICAgICAgOiAnbnotdGFnJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGFuaW1hdGlvbnMgICAgICAgICA6IFsgdHJpZ2dlcigndGFnQW5pbWF0aW9uJywgW1xuICAgIHN0YXRlKCcqJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gICAgICBhbmltYXRlKCczMDBtcyBjdWJpYy1iZXppZXIoMC43OCwgMC4xNCwgMC4xNSwgMC44NiknKVxuICAgIF0pLFxuICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICBzdHlsZSh7IG9wYWNpdHk6IDEgfSksXG4gICAgICBhbmltYXRlKCczMDBtcyBjdWJpYy1iZXppZXIoMC43OCwgMC4xNCwgMC4xNSwgMC44NiknKVxuICAgIF0pXG4gIF0pIF0sXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LXRhZy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbiAgICA6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbiAgICAgIDogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOelRhZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgY2xhc3NNYXA7XG4gIGNsb3NlZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ3dyYXBwZXJFbGVtZW50JykgcHJpdmF0ZSB3cmFwcGVyRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBuek1vZGU6IFRhZ1R5cGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIG56Q29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpBZnRlckNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGVja2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgcHJpdmF0ZSBpc1ByZXNldENvbG9yKGNvbG9yPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCFjb2xvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgL14ocGlua3xyZWR8eWVsbG93fG9yYW5nZXxjeWFufGdyZWVufGJsdWV8cHVycGxlfGdlZWtibHVlfG1hZ2VudGF8dm9sY2Fub3xnb2xkfGxpbWUpKC1pbnZlcnNlKT8kL1xuICAgICAgLnRlc3QoY29sb3IpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2xhc3NNYXAoKTogdm9pZCB7XG4gICAgY29uc3QgaXNQcmVzZXRDb2xvciA9IHRoaXMuaXNQcmVzZXRDb2xvcih0aGlzLm56Q29sb3IpO1xuICAgIHRoaXMuY2xhc3NNYXAgPSB7XG4gICAgICBbIGBhbnQtdGFnYCBdICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgYW50LXRhZy1oYXMtY29sb3JgIF0gICAgICAgIDogdGhpcy5uekNvbG9yICYmICFpc1ByZXNldENvbG9yLFxuICAgICAgWyBgYW50LXRhZy0ke3RoaXMubnpDb2xvcn1gIF0gIDogaXNQcmVzZXRDb2xvcixcbiAgICAgIFsgYGFudC10YWctY2hlY2thYmxlYCBdICAgICAgICA6IHRoaXMubnpNb2RlID09PSAnY2hlY2thYmxlJyxcbiAgICAgIFsgYGFudC10YWctY2hlY2thYmxlLWNoZWNrZWRgIF06IHRoaXMubnpDaGVja2VkXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29sb3JTdGF0dXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud3JhcHBlckVsZW1lbnQgJiYgdGhpcy5uekNvbG9yKSB7XG4gICAgICBpZiAodGhpcy5pc1ByZXNldENvbG9yKHRoaXMubnpDb2xvcikpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLndyYXBwZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMud3JhcHBlckVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtY29sb3InLCB0aGlzLm56Q29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNoZWNrZWRTdGF0dXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpNb2RlID09PSAnY2hlY2thYmxlJykge1xuICAgICAgdGhpcy5uekNoZWNrZWQgPSAhdGhpcy5uekNoZWNrZWQ7XG4gICAgICB0aGlzLm56Q2hlY2tlZENoYW5nZS5lbWl0KHRoaXMubnpDaGVja2VkKTtcbiAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVRhZyhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5uek9uQ2xvc2UuZW1pdChlKTtcbiAgICBpZiAoIWUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGFmdGVyQW5pbWF0aW9uKGU6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xvc2VkICYmICFlLmZyb21TdGF0ZSkge1xuICAgICAgdGhpcy5uekFmdGVyQ2xvc2UuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uekNvbG9yKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbG9yU3RhdHVzKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNvbG9yU3RhdHVzKCk7XG4gIH1cbn1cbiJdfQ==