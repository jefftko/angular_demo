/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
var NzTabBodyComponent = /** @class */ (function () {
    function NzTabBodyComponent() {
        this.active = false;
        this.forceRender = false;
    }
    NzTabBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: '[nz-tab-body]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<ng-container *ngIf=\"active || forceRender\">\n  <ng-template [ngTemplateOutlet]=\"content\"></ng-template>\n</ng-container>",
                    host: {
                        '[class.ant-tabs-tabpane-active]': 'active',
                        '[class.ant-tabs-tabpane-inactive]': '!active'
                    }
                }] }
    ];
    NzTabBodyComponent.propDecorators = {
        content: [{ type: Input }],
        active: [{ type: Input }],
        forceRender: [{ type: Input }]
    };
    return NzTabBodyComponent;
}());
export { NzTabBodyComponent };
function NzTabBodyComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzTabBodyComponent.prototype.content;
    /** @type {?} */
    NzTabBodyComponent.prototype.active;
    /** @type {?} */
    NzTabBodyComponent.prototype.forceRender;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGFiLWJvZHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbInRhYnMvbnotdGFiLWJvZHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztRQWV4RyxjQUFrQixLQUFLLENBQUM7UUFDeEIsbUJBQXVCLEtBQUssQ0FBQzs7O2dCQWQ5QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFhLGVBQWU7b0JBQ3BDLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGFBQWEsRUFBUSxpQkFBaUIsQ0FBQyxJQUFJO29CQUMzQyxlQUFlLEVBQU0sdUJBQXVCLENBQUMsTUFBTTtvQkFDbkQseUlBQW1EO29CQUNuRCxJQUFJLEVBQWlCO3dCQUNuQixpQ0FBaUMsRUFBSSxRQUFRO3dCQUM3QyxtQ0FBbUMsRUFBRSxTQUFTO3FCQUMvQztpQkFDRjs7OzBCQUVFLEtBQUs7eUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzs2QkFoQlI7O1NBYWEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ1tuei10YWItYm9keV0nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbiAgICAgIDogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uICAgIDogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei10YWItYm9keS5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3QgICAgICAgICAgICAgICA6IHtcbiAgICAnW2NsYXNzLmFudC10YWJzLXRhYnBhbmUtYWN0aXZlXScgIDogJ2FjdGl2ZScsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy10YWJwYW5lLWluYWN0aXZlXSc6ICchYWN0aXZlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFiQm9keUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgZm9yY2VSZW5kZXIgPSBmYWxzZTtcbn1cbiJdfQ==