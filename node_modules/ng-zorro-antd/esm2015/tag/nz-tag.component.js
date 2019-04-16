/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '../core/util/convert';
export class NzTagComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
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
    isPresetColor(color) {
        if (!color) {
            return false;
        }
        return (/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
            .test(color));
    }
    /**
     * @return {?}
     */
    updateClassMap() {
        /** @type {?} */
        const isPresetColor = this.isPresetColor(this.nzColor);
        this.classMap = {
            [`ant-tag`]: true,
            [`ant-tag-has-color`]: this.nzColor && !isPresetColor,
            [`ant-tag-${this.nzColor}`]: isPresetColor,
            [`ant-tag-checkable`]: this.nzMode === 'checkable',
            [`ant-tag-checkable-checked`]: this.nzChecked
        };
    }
    /**
     * @return {?}
     */
    updateColorStatus() {
        if (this.wrapperElement && this.nzColor) {
            if (this.isPresetColor(this.nzColor)) {
                this.renderer.removeStyle(this.wrapperElement.nativeElement, 'background-color');
            }
            else {
                this.renderer.setStyle(this.wrapperElement.nativeElement, 'background-color', this.nzColor);
            }
        }
    }
    /**
     * @return {?}
     */
    updateCheckedStatus() {
        if (this.nzMode === 'checkable') {
            this.nzChecked = !this.nzChecked;
            this.nzCheckedChange.emit(this.nzChecked);
            this.updateClassMap();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    closeTag(e) {
        this.nzOnClose.emit(e);
        if (!e.defaultPrevented) {
            this.closed = true;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    afterAnimation(e) {
        if (this.closed && !e.fromState) {
            this.nzAfterClose.emit();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateClassMap();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["nzColor"]) {
            this.updateColorStatus();
        }
        this.updateClassMap();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.updateColorStatus();
    }
}
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
NzTagComponent.ctorParameters = () => [
    { type: Renderer2 }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJ0YWcvbnotdGFnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQXFCcEQsTUFBTSxPQUFPLGNBQWM7Ozs7SUFhekIsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVh2QyxjQUFTLEtBQUssQ0FBQztRQUlmLGNBQTJCLFNBQVMsQ0FBQztRQUVyQyxpQkFBOEMsS0FBSyxDQUFDO1FBQ3BELG9CQUFrQyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzNELGlCQUErQixJQUFJLFlBQVksRUFBYyxDQUFDO1FBQzlELHVCQUFxQyxJQUFJLFlBQVksRUFBVyxDQUFDO0tBRXJCOzs7OztJQUVwQyxhQUFhLENBQUMsS0FBYztRQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sQ0FDTCxpR0FBaUc7YUFDaEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNiLENBQUM7Ozs7O0lBR0ksY0FBYzs7UUFDcEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLENBQUUsU0FBUyxDQUFFLEVBQW9C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QUFNLHVCQUF1QixDQUFDLE1BQU07Z0JBQ25ELGFBQWEsRUFBUSxpQkFBaUIsQ0FBQyxJQUFJO2FBQzVDOzs7O1lBM0JDLFNBQVM7Ozs2QkFnQ1IsU0FBUyxTQUFDLGdCQUFnQjtxQkFFMUIsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsTUFBTTt3QkFDTixNQUFNOzhCQUNOLE1BQU07OztJQUhHLFlBQVksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbiAgQW5pbWF0aW9uRXZlbnRcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB0eXBlIFRhZ1R5cGUgPSAnZGVmYXVsdCcgfCAnY2xvc2VhYmxlJyB8ICdjaGVja2FibGUnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXRhZycsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBhbmltYXRpb25zICAgICAgICAgOiBbIHRyaWdnZXIoJ3RhZ0FuaW1hdGlvbicsIFtcbiAgICBzdGF0ZSgnKicsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW1xuICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxuICAgICAgYW5pbWF0ZSgnMzAwbXMgY3ViaWMtYmV6aWVyKDAuNzgsIDAuMTQsIDAuMTUsIDAuODYpJylcbiAgICBdKSxcbiAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxuICAgICAgYW5pbWF0ZSgnMzAwbXMgY3ViaWMtYmV6aWVyKDAuNzgsIDAuMTQsIDAuMTUsIDAuODYpJylcbiAgICBdKVxuICBdKSBdLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei10YWcuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb24gICAgOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb24gICAgICA6IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTnpUYWdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNsYXNzTWFwO1xuICBjbG9zZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCd3cmFwcGVyRWxlbWVudCcpIHByaXZhdGUgd3JhcHBlckVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgbnpNb2RlOiBUYWdUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuekNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56QWZ0ZXJDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hlY2tlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIHByaXZhdGUgaXNQcmVzZXRDb2xvcihjb2xvcj86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghY29sb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIC9eKHBpbmt8cmVkfHllbGxvd3xvcmFuZ2V8Y3lhbnxncmVlbnxibHVlfHB1cnBsZXxnZWVrYmx1ZXxtYWdlbnRhfHZvbGNhbm98Z29sZHxsaW1lKSgtaW52ZXJzZSk/JC9cbiAgICAgIC50ZXN0KGNvbG9yKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNsYXNzTWFwKCk6IHZvaWQge1xuICAgIGNvbnN0IGlzUHJlc2V0Q29sb3IgPSB0aGlzLmlzUHJlc2V0Q29sb3IodGhpcy5uekNvbG9yKTtcbiAgICB0aGlzLmNsYXNzTWFwID0ge1xuICAgICAgWyBgYW50LXRhZ2AgXSAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgIFsgYGFudC10YWctaGFzLWNvbG9yYCBdICAgICAgICA6IHRoaXMubnpDb2xvciAmJiAhaXNQcmVzZXRDb2xvcixcbiAgICAgIFsgYGFudC10YWctJHt0aGlzLm56Q29sb3J9YCBdICA6IGlzUHJlc2V0Q29sb3IsXG4gICAgICBbIGBhbnQtdGFnLWNoZWNrYWJsZWAgXSAgICAgICAgOiB0aGlzLm56TW9kZSA9PT0gJ2NoZWNrYWJsZScsXG4gICAgICBbIGBhbnQtdGFnLWNoZWNrYWJsZS1jaGVja2VkYCBdOiB0aGlzLm56Q2hlY2tlZFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbG9yU3RhdHVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndyYXBwZXJFbGVtZW50ICYmIHRoaXMubnpDb2xvcikge1xuICAgICAgaWYgKHRoaXMuaXNQcmVzZXRDb2xvcih0aGlzLm56Q29sb3IpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy53cmFwcGVyRWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLndyYXBwZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy5uekNvbG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVDaGVja2VkU3RhdHVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56TW9kZSA9PT0gJ2NoZWNrYWJsZScpIHtcbiAgICAgIHRoaXMubnpDaGVja2VkID0gIXRoaXMubnpDaGVja2VkO1xuICAgICAgdGhpcy5uekNoZWNrZWRDaGFuZ2UuZW1pdCh0aGlzLm56Q2hlY2tlZCk7XG4gICAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VUYWcoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMubnpPbkNsb3NlLmVtaXQoZSk7XG4gICAgaWYgKCFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBhZnRlckFuaW1hdGlvbihlOiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsb3NlZCAmJiAhZS5mcm9tU3RhdGUpIHtcbiAgICAgIHRoaXMubnpBZnRlckNsb3NlLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMubnpDb2xvcikge1xuICAgICAgdGhpcy51cGRhdGVDb2xvclN0YXR1cygpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVDb2xvclN0YXR1cygpO1xuICB9XG59XG4iXX0=