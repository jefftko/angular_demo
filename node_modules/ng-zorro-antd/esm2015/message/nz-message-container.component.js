/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { NZ_MESSAGE_CONFIG, NZ_MESSAGE_DEFAULT_CONFIG } from './nz-message-config';
export class NzMessageContainerComponent {
    /**
     * @param {?} cdr
     * @param {?} defaultConfig
     * @param {?} config
     */
    constructor(cdr, defaultConfig, config) {
        this.cdr = cdr;
        this.messages = [];
        this.config = {};
        this.setConfig(Object.assign({}, defaultConfig, config));
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        this.config = Object.assign({}, this.config, config);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    createMessage(message) {
        if (this.messages.length >= this.config.nzMaxStack) {
            this.messages.splice(0, 1);
        }
        message.options = this._mergeMessageOptions(message.options);
        this.messages.push(message);
        this.cdr.detectChanges();
    }
    /**
     * @param {?} messageId
     * @return {?}
     */
    removeMessage(messageId) {
        this.messages.some((message, index) => {
            if (message.messageId === messageId) {
                this.messages.splice(index, 1);
                this.cdr.detectChanges();
                return true;
            }
        });
    }
    /**
     * @return {?}
     */
    removeMessageAll() {
        this.messages = [];
        this.cdr.detectChanges();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    _mergeMessageOptions(options) {
        /** @type {?} */
        const defaultOptions = {
            nzDuration: this.config.nzDuration,
            nzAnimate: this.config.nzAnimate,
            nzPauseOnHover: this.config.nzPauseOnHover
        };
        return Object.assign({}, defaultOptions, options);
    }
}
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
NzMessageContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_MESSAGE_DEFAULT_CONFIG,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_MESSAGE_CONFIG,] }] }
];
function NzMessageContainerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzMessageContainerComponent.prototype.messages;
    /** @type {?} */
    NzMessageContainerComponent.prototype.config;
    /** @type {?} */
    NzMessageContainerComponent.prototype.cdr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotbWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UvbnotbWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0gsT0FBTyxFQUFtQixpQkFBaUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBVXBHLE1BQU0sT0FBTywyQkFBMkI7Ozs7OztJQUl0QyxZQUNZLEdBQXNCLEVBQ2UsYUFBOEIsRUFDdEMsTUFBdUI7UUFGcEQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFKbEMsZ0JBQWtDLEVBQUUsQ0FBQztRQUNyQyxjQUEwQixFQUFFLENBQUM7UUFPM0IsSUFBSSxDQUFDLFNBQVMsbUJBQU0sYUFBYSxFQUFLLE1BQU0sRUFBRyxDQUFDO0tBQ2pEOzs7OztJQUVELFNBQVMsQ0FBQyxNQUF1QjtRQUMvQixJQUFJLENBQUMsTUFBTSxxQkFBUSxJQUFJLENBQUMsTUFBTSxFQUFLLE1BQU0sQ0FBRSxDQUFDO0tBQzdDOzs7OztJQUdELGFBQWEsQ0FBQyxPQUE0QjtRQUN4QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCOzs7OztJQUdELGFBQWEsQ0FBQyxTQUFpQjtRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUdELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDMUI7Ozs7O0lBR1Msb0JBQW9CLENBQUMsT0FBNkI7O1FBQzFELE1BQU0sY0FBYyxHQUF5QjtZQUMzQyxVQUFVLEVBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQ3RDLFNBQVMsRUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7WUFDckMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYztTQUMzQyxDQUFDO1FBQ0YseUJBQVksY0FBYyxFQUFLLE9BQU8sRUFBRztLQUMxQzs7O1lBMURGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQU0sdUJBQXVCLENBQUMsTUFBTTtnQkFDbkQsYUFBYSxFQUFRLGlCQUFpQixDQUFDLElBQUk7Z0JBQzNDLFFBQVEsRUFBYSxzQkFBc0I7Z0JBQzNDLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLHNLQUE0RDthQUM3RDs7OztZQVhpQyxpQkFBaUI7NENBa0I5QyxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5Qjs0Q0FDNUMsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5qZWN0LCBPcHRpb25hbCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpNZXNzYWdlQ29uZmlnLCBOWl9NRVNTQUdFX0NPTkZJRywgTlpfTUVTU0FHRV9ERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vbnotbWVzc2FnZS1jb25maWcnO1xuaW1wb3J0IHsgTnpNZXNzYWdlRGF0YUZpbGxlZCwgTnpNZXNzYWdlRGF0YU9wdGlvbnMgfSBmcm9tICcuL256LW1lc3NhZ2UuZGVmaW5pdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uICAgIDogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uICAgICAgOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvciAgICAgICAgICAgOiAnbnotbWVzc2FnZS1jb250YWluZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotbWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE56TWVzc2FnZUNvbnRhaW5lckNvbXBvbmVudCB7XG4gIG1lc3NhZ2VzOiBOek1lc3NhZ2VEYXRhRmlsbGVkW10gPSBbXTtcbiAgY29uZmlnOiBOek1lc3NhZ2VDb25maWcgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5aX01FU1NBR0VfREVGQVVMVF9DT05GSUcpIGRlZmF1bHRDb25maWc6IE56TWVzc2FnZUNvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5aX01FU1NBR0VfQ09ORklHKSBjb25maWc6IE56TWVzc2FnZUNvbmZpZ1xuICApIHtcbiAgICB0aGlzLnNldENvbmZpZyh7IC4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZyB9KTtcbiAgfVxuXG4gIHNldENvbmZpZyhjb25maWc6IE56TWVzc2FnZUNvbmZpZyk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnID0geyAuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnIH07XG4gIH1cblxuICAvLyBDcmVhdGUgYSBuZXcgbWVzc2FnZVxuICBjcmVhdGVNZXNzYWdlKG1lc3NhZ2U6IE56TWVzc2FnZURhdGFGaWxsZWQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGggPj0gdGhpcy5jb25maWcubnpNYXhTdGFjaykge1xuICAgICAgdGhpcy5tZXNzYWdlcy5zcGxpY2UoMCwgMSk7XG4gICAgfVxuICAgIG1lc3NhZ2Uub3B0aW9ucyA9IHRoaXMuX21lcmdlTWVzc2FnZU9wdGlvbnMobWVzc2FnZS5vcHRpb25zKTtcbiAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGEgbWVzc2FnZSBieSBtZXNzYWdlSWRcbiAgcmVtb3ZlTWVzc2FnZShtZXNzYWdlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubWVzc2FnZXMuc29tZSgobWVzc2FnZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChtZXNzYWdlLm1lc3NhZ2VJZCA9PT0gbWVzc2FnZUlkKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBhbGwgbWVzc2FnZXNcbiAgcmVtb3ZlTWVzc2FnZUFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLy8gTWVyZ2UgZGVmYXVsdCBvcHRpb25zIGFuZCBjdXN0b20gbWVzc2FnZSBvcHRpb25zXG4gIHByb3RlY3RlZCBfbWVyZ2VNZXNzYWdlT3B0aW9ucyhvcHRpb25zOiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZURhdGFPcHRpb25zIHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogTnpNZXNzYWdlRGF0YU9wdGlvbnMgPSB7XG4gICAgICBuekR1cmF0aW9uICAgIDogdGhpcy5jb25maWcubnpEdXJhdGlvbixcbiAgICAgIG56QW5pbWF0ZSAgICAgOiB0aGlzLmNvbmZpZy5uekFuaW1hdGUsXG4gICAgICBuelBhdXNlT25Ib3ZlcjogdGhpcy5jb25maWcubnpQYXVzZU9uSG92ZXJcbiAgICB9O1xuICAgIHJldHVybiB7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH07XG4gIH1cbn1cbiJdfQ==