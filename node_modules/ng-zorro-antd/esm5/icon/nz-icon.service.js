/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional, RendererFactory2 } from '@angular/core';
import { IconService } from '@ant-design/icons-angular';
import { BarsOutline, CalendarOutline, CaretDownFill, CaretDownOutline, CheckCircleFill, CheckCircleOutline, CheckOutline, ClockCircleOutline, CloseCircleFill, CloseCircleOutline, CloseOutline, DoubleLeftOutline, DoubleRightOutline, DownOutline, EllipsisOutline, ExclamationCircleFill, ExclamationCircleOutline, EyeOutline, FileFill, FileOutline, FilterFill, InfoCircleFill, InfoCircleOutline, LeftOutline, LoadingOutline, PaperClipOutline, QuestionCircleOutline, RightOutline, SearchOutline, UploadOutline, UpOutline } from '@ant-design/icons-angular/icons';
import * as i0 from "@angular/core";
import * as i1 from "./public-api";
import * as i2 from "@angular/common/http";
import * as i3 from "@angular/common";
/**
 * @record
 */
export function NzIconfontOption() { }
function NzIconfontOption_tsickle_Closure_declarations() {
    /** @type {?} */
    NzIconfontOption.prototype.scriptUrl;
}
/** @type {?} */
export var NZ_ICONS = new InjectionToken('nz_icons');
/** @type {?} */
export var NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('nz_icon_default_twotone_color');
/** @type {?} */
export var DEFAULT_TWOTONE_COLOR = '#1890ff';
/** @type {?} */
export var NZ_ICONS_USED_BY_ZORRO = [
    BarsOutline,
    CalendarOutline,
    CaretDownFill,
    CaretDownOutline,
    CheckCircleFill,
    CheckCircleOutline,
    CheckOutline,
    ClockCircleOutline,
    CloseCircleOutline,
    CloseCircleFill,
    CloseOutline,
    DoubleLeftOutline,
    DoubleRightOutline,
    DownOutline,
    EllipsisOutline,
    ExclamationCircleFill,
    ExclamationCircleOutline,
    EyeOutline,
    FileFill,
    FileOutline,
    FilterFill,
    InfoCircleFill,
    InfoCircleOutline,
    LeftOutline,
    LoadingOutline,
    PaperClipOutline,
    QuestionCircleOutline,
    RightOutline,
    SearchOutline,
    UploadOutline,
    UpOutline
];
/**
 * It should be a global singleton, otherwise registered icons could not be found.
 */
var NzIconService = /** @class */ (function (_super) {
    tslib_1.__extends(NzIconService, _super);
    function NzIconService(rendererFactory, handler, 
    // tslint:disable-next-line:no-any
    document, icons, defaultColor) {
        var _this = _super.call(this, rendererFactory, handler, document) || this;
        _this.rendererFactory = rendererFactory;
        _this.handler = handler;
        _this.document = document;
        _this.icons = icons;
        _this.defaultColor = defaultColor;
        _this.iconfontCache = new Set();
        _this.warnedAboutAPI = false;
        _this.warnedAboutCross = false;
        _this.warnedAboutVertical = false;
        _this.addIcon.apply(_this, tslib_1.__spread(NZ_ICONS_USED_BY_ZORRO, (_this.icons || [])));
        /** @type {?} */
        var primaryColor = DEFAULT_TWOTONE_COLOR;
        if (_this.defaultColor) {
            if (_this.defaultColor.startsWith('#')) {
                primaryColor = _this.defaultColor;
            }
            else {
                console.warn('[NG-ZORRO]: twotone color must be a hex color!');
            }
        }
        _this.twoToneColor = { primaryColor: primaryColor };
        return _this;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    NzIconService.prototype.warnAPI = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'old' && !this.warnedAboutAPI) {
            console.warn("<i class=\"anticon\"></i> would be deprecated soon. Please use <i nz-icon type=\"\"></i> API.");
            this.warnedAboutAPI = true;
        }
        if (type === 'cross' && !this.warnedAboutCross) {
            console.warn("'cross' icon is replaced by 'close' icon.");
            this.warnedAboutCross = true;
        }
        if (type === 'vertical' && !this.warnedAboutVertical) {
            console.warn("'verticle' is misspelled, would be corrected in the next major version.");
            this.warnedAboutVertical = true;
        }
    };
    /**
     * @param {?} svg
     * @return {?}
     */
    NzIconService.prototype.normalizeSvgElement = /**
     * @param {?} svg
     * @return {?}
     */
    function (svg) {
        if (!svg.getAttribute('viewBox')) {
            this._renderer.setAttribute(svg, 'viewBox', '0 0 1024 1024');
        }
        if (!svg.getAttribute('width') || !svg.getAttribute('height')) {
            this._renderer.setAttribute(svg, 'width', '1em');
            this._renderer.setAttribute(svg, 'height', '1em');
        }
        if (!svg.getAttribute('fill')) {
            this._renderer.setAttribute(svg, 'fill', 'currentColor');
        }
    };
    /**
     * @param {?} opt
     * @return {?}
     */
    NzIconService.prototype.fetchFromIconfont = /**
     * @param {?} opt
     * @return {?}
     */
    function (opt) {
        var scriptUrl = opt.scriptUrl;
        if (this.document && !this.iconfontCache.has(scriptUrl)) {
            /** @type {?} */
            var script = this._renderer.createElement('script');
            this._renderer.setAttribute(script, 'src', scriptUrl);
            this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
            this._renderer.appendChild(this.document.body, script);
            this.iconfontCache.add(scriptUrl);
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NzIconService.prototype.createIconfontIcon = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this._createSVGElementFromString("<svg><use xlink:href=\"" + type + "\"></svg>");
    };
    NzIconService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NzIconService.ctorParameters = function () { return [
        { type: RendererFactory2 },
        { type: HttpBackend, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NZ_ICONS,] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [NZ_ICON_DEFAULT_TWOTONE_COLOR,] }] }
    ]; };
    /** @nocollapse */ NzIconService.ngInjectableDef = i0.defineInjectable({ factory: function NzIconService_Factory() { return new i1.NzIconService(i0.inject(i0.RendererFactory2), i0.inject(i2.HttpBackend, 8), i0.inject(i3.DOCUMENT, 8), i0.inject(i1.NZ_ICONS, 8), i0.inject(i1.NZ_ICON_DEFAULT_TWOTONE_COLOR, 8)); }, token: i1.NzIconService, providedIn: "root" });
    return NzIconService;
}(IconService));
export { NzIconService };
function NzIconService_tsickle_Closure_declarations() {
    /** @type {?} */
    NzIconService.prototype.iconfontCache;
    /** @type {?} */
    NzIconService.prototype.warnedAboutAPI;
    /** @type {?} */
    NzIconService.prototype.warnedAboutCross;
    /** @type {?} */
    NzIconService.prototype.warnedAboutVertical;
    /** @type {?} */
    NzIconService.prototype.rendererFactory;
    /** @type {?} */
    NzIconService.prototype.handler;
    /** @type {?} */
    NzIconService.prototype.document;
    /** @type {?} */
    NzIconService.prototype.icons;
    /** @type {?} */
    NzIconService.prototype.defaultColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaWNvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImljb24vbnotaWNvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBa0IsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUNMLFdBQVcsRUFDWCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsZUFBZSxFQUNmLHFCQUFxQixFQUNyQix3QkFBd0IsRUFDeEIsVUFBVSxFQUNWLFFBQVEsRUFDUixXQUFXLEVBQ1gsVUFBVSxFQUNWLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsV0FBVyxFQUNYLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLFNBQVMsRUFDVixNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQU16QyxXQUFhLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFDdkQsV0FBYSw2QkFBNkIsR0FBRyxJQUFJLGNBQWMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDOztBQUNqRyxXQUFhLHFCQUFxQixHQUFHLFNBQVMsQ0FBQzs7QUFDL0MsV0FBYSxzQkFB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QUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWxGc0QsZ0JBQWdCO2dCQUQ5RCxXQUFXLHVCQXVJZixRQUFRO2dEQUVSLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTs0Q0FDM0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFROzZDQUMzQixRQUFRLFlBQUksTUFBTSxTQUFDLDZCQUE2Qjs7O3dCQTVJckQ7RUFxRm1DLFdBQVc7U0FBakMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBCYWNrZW5kIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uLCBJY29uU2VydmljZSB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuaW1wb3J0IHtcbiAgQmFyc091dGxpbmUsXG4gIENhbGVuZGFyT3V0bGluZSxcbiAgQ2FyZXREb3duRmlsbCxcbiAgQ2FyZXREb3duT3V0bGluZSxcbiAgQ2hlY2tDaXJjbGVGaWxsLFxuICBDaGVja0NpcmNsZU91dGxpbmUsXG4gIENoZWNrT3V0bGluZSxcbiAgQ2xvY2tDaXJjbGVPdXRsaW5lLFxuICBDbG9zZUNpcmNsZUZpbGwsXG4gIENsb3NlQ2lyY2xlT3V0bGluZSxcbiAgQ2xvc2VPdXRsaW5lLFxuICBEb3VibGVMZWZ0T3V0bGluZSxcbiAgRG91YmxlUmlnaHRPdXRsaW5lLFxuICBEb3duT3V0bGluZSxcbiAgRWxsaXBzaXNPdXRsaW5lLFxuICBFeGNsYW1hdGlvbkNpcmNsZUZpbGwsXG4gIEV4Y2xhbWF0aW9uQ2lyY2xlT3V0bGluZSxcbiAgRXllT3V0bGluZSxcbiAgRmlsZUZpbGwsXG4gIEZpbGVPdXRsaW5lLFxuICBGaWx0ZXJGaWxsLFxuICBJbmZvQ2lyY2xlRmlsbCxcbiAgSW5mb0NpcmNsZU91dGxpbmUsXG4gIExlZnRPdXRsaW5lLFxuICBMb2FkaW5nT3V0bGluZSxcbiAgUGFwZXJDbGlwT3V0bGluZSxcbiAgUXVlc3Rpb25DaXJjbGVPdXRsaW5lLFxuICBSaWdodE91dGxpbmUsXG4gIFNlYXJjaE91dGxpbmUsXG4gIFVwbG9hZE91dGxpbmUsXG4gIFVwT3V0bGluZVxufSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyL2ljb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBOekljb25mb250T3B0aW9uIHtcbiAgc2NyaXB0VXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBOWl9JQ09OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbignbnpfaWNvbnMnKTtcbmV4cG9ydCBjb25zdCBOWl9JQ09OX0RFRkFVTFRfVFdPVE9ORV9DT0xPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbignbnpfaWNvbl9kZWZhdWx0X3R3b3RvbmVfY29sb3InKTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RXT1RPTkVfQ09MT1IgPSAnIzE4OTBmZic7XG5leHBvcnQgY29uc3QgTlpfSUNPTlNfVVNFRF9CWV9aT1JSTzogSWNvbkRlZmluaXRpb25bXSA9IFtcbiAgQmFyc091dGxpbmUsXG4gIENhbGVuZGFyT3V0bGluZSxcbiAgQ2FyZXREb3duRmlsbCxcbiAgQ2FyZXREb3duT3V0bGluZSxcbiAgQ2hlY2tDaXJjbGVGaWxsLFxuICBDaGVja0NpcmNsZU91dGxpbmUsXG4gIENoZWNrT3V0bGluZSxcbiAgQ2xvY2tDaXJjbGVPdXRsaW5lLFxuICBDbG9zZUNpcmNsZU91dGxpbmUsXG4gIENsb3NlQ2lyY2xlRmlsbCxcbiAgQ2xvc2VPdXRsaW5lLFxuICBEb3VibGVMZWZ0T3V0bGluZSxcbiAgRG91YmxlUmlnaHRPdXRsaW5lLFxuICBEb3duT3V0bGluZSxcbiAgRWxsaXBzaXNPdXRsaW5lLFxuICBFeGNsYW1hdGlvbkNpcmNsZUZpbGwsXG4gIEV4Y2xhbWF0aW9uQ2lyY2xlT3V0bGluZSxcbiAgRXllT3V0bGluZSxcbiAgRmlsZUZpbGwsXG4gIEZpbGVPdXRsaW5lLFxuICBGaWx0ZXJGaWxsLFxuICBJbmZvQ2lyY2xlRmlsbCxcbiAgSW5mb0NpcmNsZU91dGxpbmUsXG4gIExlZnRPdXRsaW5lLFxuICBMb2FkaW5nT3V0bGluZSxcbiAgUGFwZXJDbGlwT3V0bGluZSxcbiAgUXVlc3Rpb25DaXJjbGVPdXRsaW5lLFxuICBSaWdodE91dGxpbmUsXG4gIFNlYXJjaE91dGxpbmUsXG4gIFVwbG9hZE91dGxpbmUsXG4gIFVwT3V0bGluZVxuXTtcblxuLyoqXG4gKiBJdCBzaG91bGQgYmUgYSBnbG9iYWwgc2luZ2xldG9uLCBvdGhlcndpc2UgcmVnaXN0ZXJlZCBpY29ucyBjb3VsZCBub3QgYmUgZm91bmQuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE56SWNvblNlcnZpY2UgZXh0ZW5kcyBJY29uU2VydmljZSB7XG4gIHByaXZhdGUgaWNvbmZvbnRDYWNoZSA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBwcml2YXRlIHdhcm5lZEFib3V0QVBJID0gZmFsc2U7XG4gIHByaXZhdGUgd2FybmVkQWJvdXRDcm9zcyA9IGZhbHNlO1xuICBwcml2YXRlIHdhcm5lZEFib3V0VmVydGljYWwgPSBmYWxzZTtcblxuICB3YXJuQVBJKHR5cGU6ICdvbGQnIHwgJ2Nyb3NzJyB8ICd2ZXJ0aWNhbCcpOiB2b2lkIHtcbiAgICBpZiAodHlwZSA9PT0gJ29sZCcgJiYgIXRoaXMud2FybmVkQWJvdXRBUEkpIHtcbiAgICAgIGNvbnNvbGUud2FybihgPGkgY2xhc3M9XCJhbnRpY29uXCI+PC9pPiB3b3VsZCBiZSBkZXByZWNhdGVkIHNvb24uIFBsZWFzZSB1c2UgPGkgbnotaWNvbiB0eXBlPVwiXCI+PC9pPiBBUEkuYCk7XG4gICAgICB0aGlzLndhcm5lZEFib3V0QVBJID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdjcm9zcycgJiYgIXRoaXMud2FybmVkQWJvdXRDcm9zcykge1xuICAgICAgY29uc29sZS53YXJuKGAnY3Jvc3MnIGljb24gaXMgcmVwbGFjZWQgYnkgJ2Nsb3NlJyBpY29uLmApO1xuICAgICAgdGhpcy53YXJuZWRBYm91dENyb3NzID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICd2ZXJ0aWNhbCcgJiYgIXRoaXMud2FybmVkQWJvdXRWZXJ0aWNhbCkge1xuICAgICAgY29uc29sZS53YXJuKGAndmVydGljbGUnIGlzIG1pc3NwZWxsZWQsIHdvdWxkIGJlIGNvcnJlY3RlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLmApO1xuICAgICAgdGhpcy53YXJuZWRBYm91dFZlcnRpY2FsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBub3JtYWxpemVTdmdFbGVtZW50KHN2ZzogU1ZHRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICghc3ZnLmdldEF0dHJpYnV0ZSgndmlld0JveCcpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAndmlld0JveCcsICcwIDAgMTAyNCAxMDI0Jyk7XG4gICAgfVxuICAgIGlmICghc3ZnLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCAhc3ZnLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShzdmcsICd3aWR0aCcsICcxZW0nKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShzdmcsICdoZWlnaHQnLCAnMWVtJyk7XG4gICAgfVxuICAgIGlmICghc3ZnLmdldEF0dHJpYnV0ZSgnZmlsbCcpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnZmlsbCcsICdjdXJyZW50Q29sb3InKTtcbiAgICB9XG4gIH1cblxuICBmZXRjaEZyb21JY29uZm9udChvcHQ6IE56SWNvbmZvbnRPcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCB7IHNjcmlwdFVybCB9ID0gb3B0O1xuICAgIGlmICh0aGlzLmRvY3VtZW50ICYmICF0aGlzLmljb25mb250Q2FjaGUuaGFzKHNjcmlwdFVybCkpIHtcbiAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHNjcmlwdCwgJ3NyYycsIHNjcmlwdFVybCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc2NyaXB0LCAnZGF0YS1uYW1lc3BhY2UnLCBzY3JpcHRVcmwucmVwbGFjZSgvXihodHRwcz98aHR0cCk6L2csICcnKSk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHNjcmlwdCk7XG4gICAgICB0aGlzLmljb25mb250Q2FjaGUuYWRkKHNjcmlwdFVybCk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlSWNvbmZvbnRJY29uKHR5cGU6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVTVkdFbGVtZW50RnJvbVN0cmluZyhgPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIke3R5cGV9XCI+PC9zdmc+YCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBoYW5kbGVyOiBIdHRwQmFja2VuZCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIGRvY3VtZW50OiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOWl9JQ09OUykgcHJpdmF0ZSBpY29uczogSWNvbkRlZmluaXRpb25bXSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5aX0lDT05fREVGQVVMVF9UV09UT05FX0NPTE9SKSBwcml2YXRlIGRlZmF1bHRDb2xvcjogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKHJlbmRlcmVyRmFjdG9yeSwgaGFuZGxlciwgZG9jdW1lbnQpO1xuXG4gICAgdGhpcy5hZGRJY29uKC4uLk5aX0lDT05TX1VTRURfQllfWk9SUk8sIC4uLih0aGlzLmljb25zIHx8IFtdKSk7XG5cbiAgICBsZXQgcHJpbWFyeUNvbG9yID0gREVGQVVMVF9UV09UT05FX0NPTE9SO1xuICAgIGlmICh0aGlzLmRlZmF1bHRDb2xvcikge1xuICAgICAgaWYgKHRoaXMuZGVmYXVsdENvbG9yLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgICBwcmltYXJ5Q29sb3IgPSB0aGlzLmRlZmF1bHRDb2xvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignW05HLVpPUlJPXTogdHdvdG9uZSBjb2xvciBtdXN0IGJlIGEgaGV4IGNvbG9yIScpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnR3b1RvbmVDb2xvciA9IHsgcHJpbWFyeUNvbG9yIH07XG4gIH1cbn1cbiJdfQ==