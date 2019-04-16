/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { NzMessageComponent } from '../message/nz-message.component';
import { NzNotificationContainerComponent } from './nz-notification-container.component';
export class NzNotificationComponent extends NzMessageComponent {
    /**
     * @param {?} container
     * @param {?} cdr
     */
    constructor(container, cdr) {
        super(container, cdr);
        this.container = container;
        this.cdr = cdr;
    }
    /**
     * @return {?}
     */
    close() {
        this._destroy();
    }
    /**
     * @return {?}
     */
    get state() {
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
    }
}
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
NzNotificationComponent.ctorParameters = () => [
    { type: NzNotificationContainerComponent },
    { type: ChangeDetectorRef }
];
NzNotificationComponent.propDecorators = {
    nzMessage: [{ type: Input }]
};
function NzNotificationComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzNotificationComponent.prototype.nzMessage;
    /** @type {?} */
    NzNotificationComponent.prototype.container;
    /** @type {?} */
    NzNotificationComponent.prototype.cdr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotbm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJub3RpZmljYXRpb24vbnotbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQW9DekYsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGtCQUFrQjs7Ozs7SUFHN0QsWUFBb0IsU0FBMkMsRUFBWSxHQUFzQjtRQUMvRixLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBREosY0FBUyxHQUFULFNBQVMsQ0FBa0M7UUFBWSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtLQUVoRzs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLG9CQUFpQixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxvQkFBaUIsWUFBWSxDQUFDLEVBQUU7Z0JBQzdHLE9BQU8sV0FBVyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLE9BQU8sWUFBWSxDQUFDO2FBQ3JCO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDN0I7S0FDRjs7O1lBdERGLFNBQVMsU0FBQztnQkFDVCxhQUFhLEVBQVEsaUJBQWlCLENBQUMsSUFBSTtnQkFDM0MsUUFBUSxFQUFhLGlCQUFpQjtnQkFDdEMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsVUFBVSxFQUFXO29CQUNuQixPQUFPLENBQUMsWUFBWSxFQUFFO3dCQUNwQixLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7d0JBQ3RFLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTs0QkFDNUIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzs0QkFDbEQsT0FBTyxDQUFDLGNBQWMsQ0FBQzt5QkFDeEIsQ0FBQzt3QkFDRixLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7d0JBQ3JFLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTs0QkFDM0IsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDbkQsT0FBTyxDQUFDLGNBQWMsQ0FBQzt5QkFDeEIsQ0FBQzt3QkFDRixLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQzs0QkFDbkIsT0FBTyxFQUFVLENBQUM7NEJBQ2xCLFNBQVMsRUFBUSxhQUFhOzRCQUM5QixlQUFlLEVBQUUsT0FBTzt5QkFDekIsQ0FBQyxDQUFDO3dCQUNILFVBQVUsQ0FBQyxZQUFZLEVBQUU7NEJBQ3ZCLEtBQUssQ0FBQztnQ0FDSixPQUFPLEVBQVUsQ0FBQztnQ0FDbEIsU0FBUyxFQUFRLFdBQVc7Z0NBQzVCLGVBQWUsRUFBRSxPQUFPOzZCQUN6QixDQUFDOzRCQUNGLE9BQU8sQ0FBQyxjQUFjLENBQUM7eUJBQ3hCLENBQUM7cUJBQ0gsQ0FBQztpQkFDSDtnQkFDRCwrMERBQXVEO2FBQ3hEOzs7O1lBbkNRLGdDQUFnQztZQUpoQyxpQkFBaUI7Ozt3QkF5Q3ZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuLi9tZXNzYWdlL256LW1lc3NhZ2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTnpOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL256LW5vdGlmaWNhdGlvbi1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56Tm90aWZpY2F0aW9uRGF0YUZpbGxlZCB9IGZyb20gJy4vbnotbm90aWZpY2F0aW9uLmRlZmluaXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb24gICAgICA6IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yICAgICAgICAgICA6ICduei1ub3RpZmljYXRpb24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgYW5pbWF0aW9ucyAgICAgICAgIDogW1xuICAgIHRyaWdnZXIoJ2VudGVyTGVhdmUnLCBbXG4gICAgICBzdGF0ZSgnZW50ZXJSaWdodCcsIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScgfSkpLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiBlbnRlclJpZ2h0JywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoNSUpJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMTAwbXMgbGluZWFyJylcbiAgICAgIF0pLFxuICAgICAgc3RhdGUoJ2VudGVyTGVmdCcsIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScgfSkpLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiBlbnRlckxlZnQnLCBbXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNSUpJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMTAwbXMgbGluZWFyJylcbiAgICAgIF0pLFxuICAgICAgc3RhdGUoJ2xlYXZlJywgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5ICAgICAgICA6IDAsXG4gICAgICAgIHRyYW5zZm9ybSAgICAgIDogJ3NjYWxlWSgwLjgpJyxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgMCUnXG4gICAgICB9KSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eSAgICAgICAgOiAxLFxuICAgICAgICAgIHRyYW5zZm9ybSAgICAgIDogJ3NjYWxlWSgxKScsXG4gICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgMCUnXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKCcxMDBtcyBsaW5lYXInKVxuICAgICAgXSlcbiAgICBdKVxuICBdLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1ub3RpZmljYXRpb24uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE56Tm90aWZpY2F0aW9uQ29tcG9uZW50IGV4dGVuZHMgTnpNZXNzYWdlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpNZXNzYWdlOiBOek5vdGlmaWNhdGlvbkRhdGFGaWxsZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IE56Tm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50LCBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGNvbnRhaW5lciwgY2RyKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgfVxuXG4gIGdldCBzdGF0ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm56TWVzc2FnZS5zdGF0ZSA9PT0gJ2VudGVyJykge1xuICAgICAgaWYgKCh0aGlzLmNvbnRhaW5lci5jb25maWcubnpQbGFjZW1lbnQgPT09ICd0b3BMZWZ0JykgfHwgKHRoaXMuY29udGFpbmVyLmNvbmZpZy5uelBsYWNlbWVudCA9PT0gJ2JvdHRvbUxlZnQnKSkge1xuICAgICAgICByZXR1cm4gJ2VudGVyTGVmdCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ2VudGVyUmlnaHQnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5uek1lc3NhZ2Uuc3RhdGU7XG4gICAgfVxuICB9XG59XG4iXX0=