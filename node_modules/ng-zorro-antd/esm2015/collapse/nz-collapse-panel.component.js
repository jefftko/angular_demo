/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Host, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '../core/util/convert';
import { NzCollapseComponent } from './nz-collapse.component';
export class NzCollapsePanelComponent {
    /**
     * @param {?} cdr
     * @param {?} nzCollapseComponent
     */
    constructor(cdr, nzCollapseComponent) {
        this.cdr = cdr;
        this.nzCollapseComponent = nzCollapseComponent;
        this.nzActive = false;
        this.nzDisabled = false;
        this.nzShowArrow = true;
        this.nzActiveChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    clickHeader() {
        if (!this.nzDisabled) {
            this.nzCollapseComponent.click(this);
        }
    }
    /**
     * @return {?}
     */
    markForCheck() {
        this.cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.nzCollapseComponent.addPanel(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.nzCollapseComponent.removePanel(this);
    }
}
NzCollapsePanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-collapse-panel',
                template: "<div role=\"tab\" [attr.aria-expanded]=\"nzActive\" class=\"ant-collapse-header\" (click)=\"clickHeader()\">\n  <i nz-icon type=\"right\" class=\"arrow anticon-right\" *ngIf=\"nzShowArrow\"></i>\n  <ng-container *nzStringTemplateOutlet=\"nzHeader\">{{ nzHeader }}</ng-container>\n</div>\n<div class=\"ant-collapse-content\"\n  [class.ant-collapse-content-active]=\"nzActive\"\n  [@collapseState]=\"nzActive?'active':'inactive'\">\n  <div class=\"ant-collapse-content-box\">\n    <ng-content></ng-content>\n  </div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                animations: [
                    trigger('collapseState', [
                        state('inactive', style({
                            opacity: '0',
                            height: 0
                        })),
                        state('active', style({
                            opacity: '1',
                            height: '*'
                        })),
                        transition('inactive => active', animate('150ms ease-in')),
                        transition('active => inactive', animate('150ms ease-out'))
                    ])
                ],
                host: {
                    '[class.ant-collapse-item]': 'true',
                    '[class.ant-collapse-no-arrow]': '!nzShowArrow'
                },
                styles: [` nz-collapse-panel {
      display: block
    }`]
            }] }
];
/** @nocollapse */
NzCollapsePanelComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzCollapseComponent, decorators: [{ type: Host }] }
];
NzCollapsePanelComponent.propDecorators = {
    nzActive: [{ type: Input }, { type: HostBinding, args: ['class.ant-collapse-item-active',] }],
    nzDisabled: [{ type: Input }, { type: HostBinding, args: ['class.ant-collapse-item-disabled',] }],
    nzShowArrow: [{ type: Input }],
    nzHeader: [{ type: Input }],
    nzActiveChange: [{ type: Output }]
};
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Object)
], NzCollapsePanelComponent.prototype, "nzActive", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Object)
], NzCollapsePanelComponent.prototype, "nzDisabled", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Object)
], NzCollapsePanelComponent.prototype, "nzShowArrow", void 0);
function NzCollapsePanelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzCollapsePanelComponent.prototype.nzActive;
    /** @type {?} */
    NzCollapsePanelComponent.prototype.nzDisabled;
    /** @type {?} */
    NzCollapsePanelComponent.prototype.nzShowArrow;
    /** @type {?} */
    NzCollapsePanelComponent.prototype.nzHeader;
    /** @type {?} */
    NzCollapsePanelComponent.prototype.nzActiveChange;
    /** @type {?} */
    NzCollapsePanelComponent.prototype.cdr;
    /** @type {?} */
    NzCollapsePanelComponent.prototype.nzCollapseComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY29sbGFwc2UtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL256LWNvbGxhcHNlLXBhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFBRSxJQUFJLEVBQ2xCLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFnQzlELE1BQU0sT0FBTyx3QkFBd0I7Ozs7O0lBaUJuQyxZQUFvQixHQUFzQixFQUFrQixtQkFBd0M7UUFBaEYsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBa0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQWhCcEcsZ0JBQW1GLEtBQUssQ0FBQztRQUN6RixrQkFBdUYsS0FBSyxDQUFDO1FBQzdGLG1CQUF1QyxJQUFJLENBQUM7UUFFNUMsc0JBQW9DLElBQUksWUFBWSxFQUFXLENBQUM7S0FhL0Q7Ozs7SUFYRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztLQUNGOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDekI7Ozs7SUFLRCxRQUFRO1FBQ04sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVDOzs7WUF4REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBUyxtQkFBbUI7Z0JBQ3BDLHNoQkFBcUQ7Z0JBQ3JELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUksaUJBQWlCLENBQUMsSUFBSTtnQkFDdkMsVUFBVSxFQUFPO29CQUNmLE9BQU8sQ0FBQyxlQUFlLEVBQUU7d0JBQ3ZCLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDOzRCQUN0QixPQUFPLEVBQUUsR0FBRzs0QkFDWixNQUFNLEVBQUcsQ0FBQzt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7NEJBQ3BCLE9BQU8sRUFBRSxHQUFHOzRCQUNaLE1BQU0sRUFBRyxHQUFHO3lCQUNiLENBQUMsQ0FBQzt3QkFDSCxVQUFVLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUMxRCxVQUFVLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQzVELENBQUM7aUJBQ0g7Z0JBTUQsSUFBSSxFQUFhO29CQUNmLDJCQUEyQixFQUFNLE1BQU07b0JBQ3ZDLCtCQUErQixFQUFFLGNBQWM7aUJBQ2hEO3lCQVBHOztNQUVBO2FBTUw7Ozs7WUF6Q0MsaUJBQWlCO1lBV1YsbUJBQW1CLHVCQWlEbUIsSUFBSTs7O3VCQWhCaEQsS0FBSyxZQUFvQixXQUFXLFNBQUMsZ0NBQWdDO3lCQUNyRSxLQUFLLFlBQW9CLFdBQVcsU0FBQyxrQ0FBa0M7MEJBQ3ZFLEtBQUs7dUJBQ0wsS0FBSzs2QkFDTCxNQUFNOzs7SUFKRyxZQUFZLEVBQUU7Ozs7SUFDZCxZQUFZLEVBQUU7Ozs7SUFDZCxZQUFZLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsIEhvc3QsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5pbXBvcnQgeyBOekNvbGxhcHNlQ29tcG9uZW50IH0gZnJvbSAnLi9uei1jb2xsYXBzZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgOiAnbnotY29sbGFwc2UtcGFuZWwnLFxuICB0ZW1wbGF0ZVVybCAgICA6ICcuL256LWNvbGxhcHNlLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb24gIDogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgYW5pbWF0aW9ucyAgICAgOiBbXG4gICAgdHJpZ2dlcignY29sbGFwc2VTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdpbmFjdGl2ZScsIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eTogJzAnLFxuICAgICAgICBoZWlnaHQgOiAwXG4gICAgICB9KSksXG4gICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiAnMScsXG4gICAgICAgIGhlaWdodCA6ICcqJ1xuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gYWN0aXZlJywgYW5pbWF0ZSgnMTUwbXMgZWFzZS1pbicpKSxcbiAgICAgIHRyYW5zaXRpb24oJ2FjdGl2ZSA9PiBpbmFjdGl2ZScsIGFuaW1hdGUoJzE1MG1zIGVhc2Utb3V0JykpXG4gICAgXSlcbiAgXSxcbiAgc3R5bGVzICAgICAgICAgOiBbXG4gICAgICBgIG56LWNvbGxhcHNlLXBhbmVsIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrXG4gICAgfWBcbiAgXSxcbiAgaG9zdCAgICAgICAgICAgOiB7XG4gICAgJ1tjbGFzcy5hbnQtY29sbGFwc2UtaXRlbV0nICAgIDogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LWNvbGxhcHNlLW5vLWFycm93XSc6ICchbnpTaG93QXJyb3cnXG4gIH1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOekNvbGxhcHNlUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1jb2xsYXBzZS1pdGVtLWFjdGl2ZScpIG56QWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1jb2xsYXBzZS1pdGVtLWRpc2FibGVkJykgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93QXJyb3cgPSB0cnVlO1xuICBASW5wdXQoKSBuekhlYWRlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjbGlja0hlYWRlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5uekNvbGxhcHNlQ29tcG9uZW50LmNsaWNrKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQEhvc3QoKSBwcml2YXRlIG56Q29sbGFwc2VDb21wb25lbnQ6IE56Q29sbGFwc2VDb21wb25lbnQpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpDb2xsYXBzZUNvbXBvbmVudC5hZGRQYW5lbCh0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubnpDb2xsYXBzZUNvbXBvbmVudC5yZW1vdmVQYW5lbCh0aGlzKTtcbiAgfVxufVxuIl19