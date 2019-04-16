/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { NZ_MESSAGE_CONFIG, NZ_MESSAGE_DEFAULT_CONFIG } from './nz-message-config';
var NzMessageContainerComponent = /** @class */ (function () {
    function NzMessageContainerComponent(cdr, defaultConfig, config) {
        this.cdr = cdr;
        this.messages = [];
        this.config = {};
        this.setConfig(tslib_1.__assign({}, defaultConfig, config));
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NzMessageContainerComponent.prototype.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.config = tslib_1.__assign({}, this.config, config);
    };
    // Create a new message
    /**
     * @param {?} message
     * @return {?}
     */
    NzMessageContainerComponent.prototype.createMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        if (this.messages.length >= this.config.nzMaxStack) {
            this.messages.splice(0, 1);
        }
        message.options = this._mergeMessageOptions(message.options);
        this.messages.push(message);
        this.cdr.detectChanges();
    };
    // Remove a message by messageId
    /**
     * @param {?} messageId
     * @return {?}
     */
    NzMessageContainerComponent.prototype.removeMessage = /**
     * @param {?} messageId
     * @return {?}
     */
    function (messageId) {
        var _this = this;
        this.messages.some(function (message, index) {
            if (message.messageId === messageId) {
                _this.messages.splice(index, 1);
                _this.cdr.detectChanges();
                return true;
            }
        });
    };
    // Remove all messages
    /**
     * @return {?}
     */
    NzMessageContainerComponent.prototype.removeMessageAll = /**
     * @return {?}
     */
    function () {
        this.messages = [];
        this.cdr.detectChanges();
    };
    // Merge default options and custom message options
    /**
     * @param {?} options
     * @return {?}
     */
    NzMessageContainerComponent.prototype._mergeMessageOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var defaultOptions = {
            nzDuration: this.config.nzDuration,
            nzAnimate: this.config.nzAnimate,
            nzPauseOnHover: this.config.nzPauseOnHover
        };
        return tslib_1.__assign({}, defaultOptions, options);
    };
    NzMessageContainerComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-message-container',
                    preserveWhitespaces: false,
                    template: "<div class=\"ant-message\">\n  <nz-message *ngFor=\"let message of messages; let i = index\" [nzMessage]=\"message\" [nzIndex]=\"i\"></nz-message>\n</div>"
                }] }
    ];
    /** @nocollapse */
    NzMessageContainerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_MESSAGE_DEFAULT_CONFIG,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_MESSAGE_CONFIG,] }] }
    ]; };
    return NzMessageContainerComponent;
}());
export { NzMessageContainerComponent };
function NzMessageContainerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzMessageContainerComponent.prototype.messages;
    /** @type {?} */
    NzMessageContainerComponent.prototype.config;
    /** @type {?} */
    NzMessageContainerComponent.prototype.cdr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotbWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UvbnotbWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNILE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFjbEcscUNBQ1ksR0FBc0IsRUFDZSxhQUE4QixFQUN0QyxNQUF1QjtRQUZwRCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUpsQyxnQkFBa0MsRUFBRSxDQUFDO1FBQ3JDLGNBQTBCLEVBQUUsQ0FBQztRQU8zQixJQUFJLENBQUMsU0FBUyxzQkFBTSxhQUFhLEVBQUssTUFBTSxFQUFHLENBQUM7S0FDakQ7Ozs7O0lBRUQsK0NBQVM7Ozs7SUFBVCxVQUFVLE1BQXVCO1FBQy9CLElBQUksQ0FBQyxNQUFNLHdCQUFRLElBQUksQ0FBQyxNQUFNLEVBQUssTUFBTSxDQUFFLENBQUM7S0FDN0M7SUFFRCx1QkFBdUI7Ozs7O0lBQ3ZCLG1EQUFhOzs7O0lBQWIsVUFBYyxPQUE0QjtRQUN4QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCO0lBRUQsZ0NBQWdDOzs7OztJQUNoQyxtREFBYTs7OztJQUFiLFVBQWMsU0FBaUI7UUFBL0IsaUJBUUM7UUFQQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLO1lBQ2hDLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ25DLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGLENBQUMsQ0FBQztLQUNKO0lBRUQsc0JBQXNCOzs7O0lBQ3RCLHNEQUFnQjs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMxQjtJQUVELG1EQUFtRDs7Ozs7SUFDekMsMERBQW9COzs7O0lBQTlCLFVBQStCLE9BQTZCOztRQUMxRCxJQUFNLGNBQWMsR0FBeUI7WUFDM0MsVUFBVSxFQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVTtZQUN0QyxTQUFTLEVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQ3JDLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWM7U0FDM0MsQ0FBQztRQUNGLDRCQUFZLGNBQWMsRUFBSyxPQUFPLEVBQUc7S0FDMUM7O2dCQTFERixTQUFTLFNBQUM7b0JBQ1QsZUFBZSxFQUFNLHVCQUF1QixDQUFDLE1BQU07b0JBQ25ELGFBQWEsRUFBUSxpQkFBaUIsQ0FBQyxJQUFJO29CQUMzQyxRQUFRLEVBQWEsc0JBQXNCO29CQUMzQyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixzS0FBNEQ7aUJBQzdEOzs7O2dCQVhpQyxpQkFBaUI7Z0RBa0I5QyxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5QjtnREFDNUMsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQkFBaUI7O3NDQW5CekM7O1NBWWEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEluamVjdCwgT3B0aW9uYWwsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56TWVzc2FnZUNvbmZpZywgTlpfTUVTU0FHRV9DT05GSUcsIE5aX01FU1NBR0VfREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL256LW1lc3NhZ2UtY29uZmlnJztcbmltcG9ydCB7IE56TWVzc2FnZURhdGFGaWxsZWQsIE56TWVzc2FnZURhdGFPcHRpb25zIH0gZnJvbSAnLi9uei1tZXNzYWdlLmRlZmluaXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbiAgICA6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbiAgICAgIDogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LW1lc3NhZ2UtY29udGFpbmVyJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LW1lc3NhZ2UtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOek1lc3NhZ2VDb250YWluZXJDb21wb25lbnQge1xuICBtZXNzYWdlczogTnpNZXNzYWdlRGF0YUZpbGxlZFtdID0gW107XG4gIGNvbmZpZzogTnpNZXNzYWdlQ29uZmlnID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOWl9NRVNTQUdFX0RFRkFVTFRfQ09ORklHKSBkZWZhdWx0Q29uZmlnOiBOek1lc3NhZ2VDb25maWcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOWl9NRVNTQUdFX0NPTkZJRykgY29uZmlnOiBOek1lc3NhZ2VDb25maWdcbiAgKSB7XG4gICAgdGhpcy5zZXRDb25maWcoeyAuLi5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWcgfSk7XG4gIH1cblxuICBzZXRDb25maWcoY29uZmlnOiBOek1lc3NhZ2VDb25maWcpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZyA9IHsgLi4udGhpcy5jb25maWcsIC4uLmNvbmZpZyB9O1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IG1lc3NhZ2VcbiAgY3JlYXRlTWVzc2FnZShtZXNzYWdlOiBOek1lc3NhZ2VEYXRhRmlsbGVkKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoID49IHRoaXMuY29uZmlnLm56TWF4U3RhY2spIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuc3BsaWNlKDAsIDEpO1xuICAgIH1cbiAgICBtZXNzYWdlLm9wdGlvbnMgPSB0aGlzLl9tZXJnZU1lc3NhZ2VPcHRpb25zKG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBhIG1lc3NhZ2UgYnkgbWVzc2FnZUlkXG4gIHJlbW92ZU1lc3NhZ2UobWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm1lc3NhZ2VzLnNvbWUoKG1lc3NhZ2UsIGluZGV4KSA9PiB7XG4gICAgICBpZiAobWVzc2FnZS5tZXNzYWdlSWQgPT09IG1lc3NhZ2VJZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZW1vdmUgYWxsIG1lc3NhZ2VzXG4gIHJlbW92ZU1lc3NhZ2VBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8vIE1lcmdlIGRlZmF1bHQgb3B0aW9ucyBhbmQgY3VzdG9tIG1lc3NhZ2Ugb3B0aW9uc1xuICBwcm90ZWN0ZWQgX21lcmdlTWVzc2FnZU9wdGlvbnMob3B0aW9uczogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VEYXRhT3B0aW9ucyB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6IE56TWVzc2FnZURhdGFPcHRpb25zID0ge1xuICAgICAgbnpEdXJhdGlvbiAgICA6IHRoaXMuY29uZmlnLm56RHVyYXRpb24sXG4gICAgICBuekFuaW1hdGUgICAgIDogdGhpcy5jb25maWcubnpBbmltYXRlLFxuICAgICAgbnpQYXVzZU9uSG92ZXI6IHRoaXMuY29uZmlnLm56UGF1c2VPbkhvdmVyXG4gICAgfTtcbiAgICByZXR1cm4geyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICB9XG59XG4iXX0=