/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { NzMessageComponent } from '../message/nz-message.component';
import { NzNotificationContainerComponent } from './nz-notification-container.component';
var NzNotificationComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NzNotificationComponent, _super);
    function NzNotificationComponent(container, cdr) {
        var _this = _super.call(this, container, cdr) || this;
        _this.container = container;
        _this.cdr = cdr;
        return _this;
    }
    /**
     * @return {?}
     */
    NzNotificationComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this._destroy();
    };
    Object.defineProperty(NzNotificationComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.nzMessage.state === 'enter') {
                if ((this.container.config["nzPlacement"] === 'topLeft') || (this.container.config["nzPlacement"] === 'bottomLeft')) {
                    return 'enterLeft';
                }
                else {
                    return 'enterRight';
                }
            }
            else {
                return this.nzMessage.state;
            }
        },
        enumerable: true,
        configurable: true
    });
    NzNotificationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-notification',
                    preserveWhitespaces: false,
                    animations: [
                        trigger('enterLeave', [
                            state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => enterRight', [
                                style({ opacity: 0, transform: 'translateX(5%)' }),
                                animate('100ms linear')
                            ]),
                            state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => enterLeft', [
                                style({ opacity: 0, transform: 'translateX(-5%)' }),
                                animate('100ms linear')
                            ]),
                            state('leave', style({
                                opacity: 0,
                                transform: 'scaleY(0.8)',
                                transformOrigin: '0% 0%'
                            })),
                            transition('* => leave', [
                                style({
                                    opacity: 1,
                                    transform: 'scaleY(1)',
                                    transformOrigin: '0% 0%'
                                }),
                                animate('100ms linear')
                            ])
                        ])
                    ],
                    template: "<div class=\"ant-notification-notice ant-notification-notice-closable\"\n  [ngStyle]=\"nzMessage.options.nzStyle\"\n  [ngClass]=\"nzMessage.options.nzClass\"\n  [@enterLeave]=\"state\"\n  (mouseenter)=\"onEnter()\"\n  (mouseleave)=\"onLeave()\">\n  <div *ngIf=\"!nzMessage.template\" class=\"ant-notification-notice-content\">\n    <div class=\"ant-notification-notice-content\" [ngClass]=\"{ 'ant-notification-notice-with-icon': nzMessage.type !== 'blank' }\">\n      <div [class.ant-notification-notice-with-icon]=\"nzMessage.type !== 'blank'\">\n        <ng-container [ngSwitch]=\"nzMessage.type\">\n          <i *ngSwitchCase=\"'success'\" nz-icon type=\"check-circle\" class=\"ant-notification-notice-icon ant-notification-notice-icon-success\"></i>\n          <i *ngSwitchCase=\"'info'\" nz-icon type=\"info-circle\" class=\"ant-notification-notice-icon ant-notification-notice-icon-info\"></i>\n          <i *ngSwitchCase=\"'warning'\" nz-icon type=\"exclamation-circle\" class=\"ant-notification-notice-icon ant-notification-notice-icon-warning\"></i>\n          <i *ngSwitchCase=\"'error'\" nz-icon type=\"close-circle\" class=\"ant-notification-notice-icon ant-notification-notice-icon-error\"></i>\n        </ng-container>\n        <div class=\"ant-notification-notice-message\" [innerHTML]=\"nzMessage.title\"></div>\n        <div class=\"ant-notification-notice-description\" [innerHTML]=\"nzMessage.content\"></div>\n      </div>\n    </div>\n  </div>\n  <ng-template [ngIf]=\"nzMessage.template\" [ngTemplateOutlet]=\"nzMessage.template\" [ngTemplateOutletContext]=\"{ $implicit: this }\"></ng-template>\n  <a tabindex=\"0\" class=\"ant-notification-notice-close\" (click)=\"close()\">\n    <span class=\"ant-notification-notice-close-x\">\n      <i nz-icon type=\"close\" class=\"ant-notification-close-icon\"></i>\n    </span>\n  </a>\n</div>"
                }] }
    ];
    /** @nocollapse */
    NzNotificationComponent.ctorParameters = function () { return [
        { type: NzNotificationContainerComponent },
        { type: ChangeDetectorRef }
    ]; };
    NzNotificationComponent.propDecorators = {
        nzMessage: [{ type: Input }]
    };
    return NzNotificationComponent;
}(NzMessageComponent));
export { NzNotificationComponent };
function NzNotificationComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzNotificationComponent.prototype.nzMessage;
    /** @type {?} */
    NzNotificationComponent.prototype.container;
    /** @type {?} */
    NzNotificationComponent.prototype.cdr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotbm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJub3RpZmljYXRpb24vbnotbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFckUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0lBb0M1QyxtREFBa0I7SUFHN0QsaUNBQW9CLFNBQTJDLEVBQVksR0FBc0I7UUFBakcsWUFDRSxrQkFBTSxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQ3RCO1FBRm1CLGVBQVMsR0FBVCxTQUFTLENBQWtDO1FBQVksU0FBRyxHQUFILEdBQUcsQ0FBbUI7O0tBRWhHOzs7O0lBRUQsdUNBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2pCO0lBRUQsc0JBQUksMENBQUs7Ozs7UUFBVDtZQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLG9CQUFpQixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxvQkFBaUIsWUFBWSxDQUFDLEVBQUU7b0JBQzdHLE9BQU8sV0FBVyxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDTCxPQUFPLFlBQVksQ0FBQztpQkFDckI7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzdCO1NBQ0Y7OztPQUFBOztnQkF0REYsU0FBUyxTQUFDO29CQUNULGFBQWEsRUFBUSxpQkFBaUIsQ0FBQyxJQUFJO29CQUMzQyxRQUFRLEVBQWEsaUJBQWlCO29CQUN0QyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixVQUFVLEVBQVc7d0JBQ25CLE9BQU8sQ0FBQyxZQUFZLEVBQUU7NEJBQ3BCLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzs0QkFDdEUsVUFBVSxDQUFDLGlCQUFpQixFQUFFO2dDQUM1QixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO2dDQUNsRCxPQUFPLENBQUMsY0FBYyxDQUFDOzZCQUN4QixDQUFDOzRCQUNGLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzs0QkFDckUsVUFBVSxDQUFDLGdCQUFnQixFQUFFO2dDQUMzQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2dDQUNuRCxPQUFPLENBQUMsY0FBYyxDQUFDOzZCQUN4QixDQUFDOzRCQUNGLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO2dDQUNuQixPQUFPLEVBQVUsQ0FBQztnQ0FDbEIsU0FBUyxFQUFRLGFBQWE7Z0NBQzlCLGVBQWUsRUFBRSxPQUFPOzZCQUN6QixDQUFDLENBQUM7NEJBQ0gsVUFBVSxDQUFDLFlBQVksRUFBRTtnQ0FDdkIsS0FBSyxDQUFDO29DQUNKLE9BQU8sRUFBVSxDQUFDO29DQUNsQixTQUFTLEVBQVEsV0FBVztvQ0FDNUIsZUFBZSxFQUFFLE9BQU87aUNBQ3pCLENBQUM7Z0NBQ0YsT0FBTyxDQUFDLGNBQWMsQ0FBQzs2QkFDeEIsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO29CQUNELCswREFBdUQ7aUJBQ3hEOzs7O2dCQW5DUSxnQ0FBZ0M7Z0JBSmhDLGlCQUFpQjs7OzRCQXlDdkIsS0FBSzs7a0NBMUNSO0VBeUM2QyxrQkFBa0I7U0FBbEQsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi4vbWVzc2FnZS9uei1tZXNzYWdlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IE56Tm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9uei1ub3RpZmljYXRpb24tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek5vdGlmaWNhdGlvbkRhdGFGaWxsZWQgfSBmcm9tICcuL256LW5vdGlmaWNhdGlvbi5kZWZpbml0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uICAgICAgOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvciAgICAgICAgICAgOiAnbnotbm90aWZpY2F0aW9uJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGFuaW1hdGlvbnMgICAgICAgICA6IFtcbiAgICB0cmlnZ2VyKCdlbnRlckxlYXZlJywgW1xuICAgICAgc3RhdGUoJ2VudGVyUmlnaHQnLCBzdHlsZSh7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gZW50ZXJSaWdodCcsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDUlKScgfSksXG4gICAgICAgIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicpXG4gICAgICBdKSxcbiAgICAgIHN0YXRlKCdlbnRlckxlZnQnLCBzdHlsZSh7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gZW50ZXJMZWZ0JywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUlKScgfSksXG4gICAgICAgIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicpXG4gICAgICBdKSxcbiAgICAgIHN0YXRlKCdsZWF2ZScsIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eSAgICAgICAgOiAwLFxuICAgICAgICB0cmFuc2Zvcm0gICAgICA6ICdzY2FsZVkoMC44KScsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzAlIDAlJ1xuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiBsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHkgICAgICAgIDogMSxcbiAgICAgICAgICB0cmFuc2Zvcm0gICAgICA6ICdzY2FsZVkoMSknLFxuICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzAlIDAlJ1xuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMTAwbXMgbGluZWFyJylcbiAgICAgIF0pXG4gICAgXSlcbiAgXSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotbm90aWZpY2F0aW9uLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOek5vdGlmaWNhdGlvbkNvbXBvbmVudCBleHRlbmRzIE56TWVzc2FnZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56TWVzc2FnZTogTnpOb3RpZmljYXRpb25EYXRhRmlsbGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBOek5vdGlmaWNhdGlvbkNvbnRhaW5lckNvbXBvbmVudCwgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihjb250YWluZXIsIGNkcik7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gIH1cblxuICBnZXQgc3RhdGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5uek1lc3NhZ2Uuc3RhdGUgPT09ICdlbnRlcicpIHtcbiAgICAgIGlmICgodGhpcy5jb250YWluZXIuY29uZmlnLm56UGxhY2VtZW50ID09PSAndG9wTGVmdCcpIHx8ICh0aGlzLmNvbnRhaW5lci5jb25maWcubnpQbGFjZW1lbnQgPT09ICdib3R0b21MZWZ0JykpIHtcbiAgICAgICAgcmV0dXJuICdlbnRlckxlZnQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdlbnRlclJpZ2h0JztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubnpNZXNzYWdlLnN0YXRlO1xuICAgIH1cbiAgfVxufVxuIl19