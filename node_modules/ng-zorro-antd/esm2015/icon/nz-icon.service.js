/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export const NZ_ICONS = new InjectionToken('nz_icons');
/** @type {?} */
export const NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('nz_icon_default_twotone_color');
/** @type {?} */
export const DEFAULT_TWOTONE_COLOR = '#1890ff';
/** @type {?} */
export const NZ_ICONS_USED_BY_ZORRO = [
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
export class NzIconService extends IconService {
    /**
     * @param {?} rendererFactory
     * @param {?} handler
     * @param {?} document
     * @param {?} icons
     * @param {?} defaultColor
     */
    constructor(rendererFactory, handler, 
    // tslint:disable-next-line:no-any
    document, icons, defaultColor) {
        super(rendererFactory, handler, document);
        this.rendererFactory = rendererFactory;
        this.handler = handler;
        this.document = document;
        this.icons = icons;
        this.defaultColor = defaultColor;
        this.iconfontCache = new Set();
        this.warnedAboutAPI = false;
        this.warnedAboutCross = false;
        this.warnedAboutVertical = false;
        this.addIcon(...NZ_ICONS_USED_BY_ZORRO, ...(this.icons || []));
        /** @type {?} */
        let primaryColor = DEFAULT_TWOTONE_COLOR;
        if (this.defaultColor) {
            if (this.defaultColor.startsWith('#')) {
                primaryColor = this.defaultColor;
            }
            else {
                console.warn('[NG-ZORRO]: twotone color must be a hex color!');
            }
        }
        this.twoToneColor = { primaryColor };
    }
    /**
     * @param {?} type
     * @return {?}
     */
    warnAPI(type) {
        if (type === 'old' && !this.warnedAboutAPI) {
            console.warn(`<i class="anticon"></i> would be deprecated soon. Please use <i nz-icon type=""></i> API.`);
            this.warnedAboutAPI = true;
        }
        if (type === 'cross' && !this.warnedAboutCross) {
            console.warn(`'cross' icon is replaced by 'close' icon.`);
            this.warnedAboutCross = true;
        }
        if (type === 'vertical' && !this.warnedAboutVertical) {
            console.warn(`'verticle' is misspelled, would be corrected in the next major version.`);
            this.warnedAboutVertical = true;
        }
    }
    /**
     * @param {?} svg
     * @return {?}
     */
    normalizeSvgElement(svg) {
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
    }
    /**
     * @param {?} opt
     * @return {?}
     */
    fetchFromIconfont(opt) {
        const { scriptUrl } = opt;
        if (this.document && !this.iconfontCache.has(scriptUrl)) {
            /** @type {?} */
            const script = this._renderer.createElement('script');
            this._renderer.setAttribute(script, 'src', scriptUrl);
            this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
            this._renderer.appendChild(this.document.body, script);
            this.iconfontCache.add(scriptUrl);
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    createIconfontIcon(type) {
        return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
    }
}
NzIconService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NzIconService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: HttpBackend, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NZ_ICONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [NZ_ICON_DEFAULT_TWOTONE_COLOR,] }] }
];
/** @nocollapse */ NzIconService.ngInjectableDef = i0.defineInjectable({ factory: function NzIconService_Factory() { return new i1.NzIconService(i0.inject(i0.RendererFactory2), i0.inject(i2.HttpBackend, 8), i0.inject(i3.DOCUMENT, 8), i0.inject(i1.NZ_ICONS, 8), i0.inject(i1.NZ_ICON_DEFAULT_TWOTONE_COLOR, 8)); }, token: i1.NzIconService, providedIn: "root" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaWNvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImljb24vbnotaWNvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFrQixXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsV0FBVyxFQUNYLGVBQWUsRUFDZixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLGtCQUFrQixFQUNsQixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLHdCQUF3QixFQUN4QixVQUFVLEVBQ1YsUUFBUSxFQUNSLFdBQVcsRUFDWCxVQUFVLEVBQ1YsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixxQkFBcUIsRUFDckIsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEVBQ2IsU0FBUyxFQUNWLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBTXpDLGFBQWEsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUN2RCxhQUFhLDZCQUE2QixHQUFHLElBQUksY0FBYyxDQUFDLCtCQUErQixDQUFDLENBQUM7O0FBQ2pHLGFBQWEscUJBQXFCLEdBQUcsU0FBUyxDQUFDOztBQUMvQyxhQUFhLHNCQUFz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VSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBbEZzRCxnQkFBZ0I7WUFEOUQsV0FBVyx1QkF1SWYsUUFBUTs0Q0FFUixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7d0NBQzNCLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTt5Q0FDM0IsUUFBUSxZQUFJLE1BQU0sU0FBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQmFja2VuZCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsLCBSZW5kZXJlckZhY3RvcnkyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJY29uRGVmaW5pdGlvbiwgSWNvblNlcnZpY2UgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyJztcbmltcG9ydCB7XG4gIEJhcnNPdXRsaW5lLFxuICBDYWxlbmRhck91dGxpbmUsXG4gIENhcmV0RG93bkZpbGwsXG4gIENhcmV0RG93bk91dGxpbmUsXG4gIENoZWNrQ2lyY2xlRmlsbCxcbiAgQ2hlY2tDaXJjbGVPdXRsaW5lLFxuICBDaGVja091dGxpbmUsXG4gIENsb2NrQ2lyY2xlT3V0bGluZSxcbiAgQ2xvc2VDaXJjbGVGaWxsLFxuICBDbG9zZUNpcmNsZU91dGxpbmUsXG4gIENsb3NlT3V0bGluZSxcbiAgRG91YmxlTGVmdE91dGxpbmUsXG4gIERvdWJsZVJpZ2h0T3V0bGluZSxcbiAgRG93bk91dGxpbmUsXG4gIEVsbGlwc2lzT3V0bGluZSxcbiAgRXhjbGFtYXRpb25DaXJjbGVGaWxsLFxuICBFeGNsYW1hdGlvbkNpcmNsZU91dGxpbmUsXG4gIEV5ZU91dGxpbmUsXG4gIEZpbGVGaWxsLFxuICBGaWxlT3V0bGluZSxcbiAgRmlsdGVyRmlsbCxcbiAgSW5mb0NpcmNsZUZpbGwsXG4gIEluZm9DaXJjbGVPdXRsaW5lLFxuICBMZWZ0T3V0bGluZSxcbiAgTG9hZGluZ091dGxpbmUsXG4gIFBhcGVyQ2xpcE91dGxpbmUsXG4gIFF1ZXN0aW9uQ2lyY2xlT3V0bGluZSxcbiAgUmlnaHRPdXRsaW5lLFxuICBTZWFyY2hPdXRsaW5lLFxuICBVcGxvYWRPdXRsaW5lLFxuICBVcE91dGxpbmVcbn0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhci9pY29ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpJY29uZm9udE9wdGlvbiB7XG4gIHNjcmlwdFVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgTlpfSUNPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ256X2ljb25zJyk7XG5leHBvcnQgY29uc3QgTlpfSUNPTl9ERUZBVUxUX1RXT1RPTkVfQ09MT1IgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ256X2ljb25fZGVmYXVsdF90d290b25lX2NvbG9yJyk7XG5leHBvcnQgY29uc3QgREVGQVVMVF9UV09UT05FX0NPTE9SID0gJyMxODkwZmYnO1xuZXhwb3J0IGNvbnN0IE5aX0lDT05TX1VTRURfQllfWk9SUk86IEljb25EZWZpbml0aW9uW10gPSBbXG4gIEJhcnNPdXRsaW5lLFxuICBDYWxlbmRhck91dGxpbmUsXG4gIENhcmV0RG93bkZpbGwsXG4gIENhcmV0RG93bk91dGxpbmUsXG4gIENoZWNrQ2lyY2xlRmlsbCxcbiAgQ2hlY2tDaXJjbGVPdXRsaW5lLFxuICBDaGVja091dGxpbmUsXG4gIENsb2NrQ2lyY2xlT3V0bGluZSxcbiAgQ2xvc2VDaXJjbGVPdXRsaW5lLFxuICBDbG9zZUNpcmNsZUZpbGwsXG4gIENsb3NlT3V0bGluZSxcbiAgRG91YmxlTGVmdE91dGxpbmUsXG4gIERvdWJsZVJpZ2h0T3V0bGluZSxcbiAgRG93bk91dGxpbmUsXG4gIEVsbGlwc2lzT3V0bGluZSxcbiAgRXhjbGFtYXRpb25DaXJjbGVGaWxsLFxuICBFeGNsYW1hdGlvbkNpcmNsZU91dGxpbmUsXG4gIEV5ZU91dGxpbmUsXG4gIEZpbGVGaWxsLFxuICBGaWxlT3V0bGluZSxcbiAgRmlsdGVyRmlsbCxcbiAgSW5mb0NpcmNsZUZpbGwsXG4gIEluZm9DaXJjbGVPdXRsaW5lLFxuICBMZWZ0T3V0bGluZSxcbiAgTG9hZGluZ091dGxpbmUsXG4gIFBhcGVyQ2xpcE91dGxpbmUsXG4gIFF1ZXN0aW9uQ2lyY2xlT3V0bGluZSxcbiAgUmlnaHRPdXRsaW5lLFxuICBTZWFyY2hPdXRsaW5lLFxuICBVcGxvYWRPdXRsaW5lLFxuICBVcE91dGxpbmVcbl07XG5cbi8qKlxuICogSXQgc2hvdWxkIGJlIGEgZ2xvYmFsIHNpbmdsZXRvbiwgb3RoZXJ3aXNlIHJlZ2lzdGVyZWQgaWNvbnMgY291bGQgbm90IGJlIGZvdW5kLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekljb25TZXJ2aWNlIGV4dGVuZHMgSWNvblNlcnZpY2Uge1xuICBwcml2YXRlIGljb25mb250Q2FjaGUgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSB3YXJuZWRBYm91dEFQSSA9IGZhbHNlO1xuICBwcml2YXRlIHdhcm5lZEFib3V0Q3Jvc3MgPSBmYWxzZTtcbiAgcHJpdmF0ZSB3YXJuZWRBYm91dFZlcnRpY2FsID0gZmFsc2U7XG5cbiAgd2FybkFQSSh0eXBlOiAnb2xkJyB8ICdjcm9zcycgfCAndmVydGljYWwnKTogdm9pZCB7XG4gICAgaWYgKHR5cGUgPT09ICdvbGQnICYmICF0aGlzLndhcm5lZEFib3V0QVBJKSB7XG4gICAgICBjb25zb2xlLndhcm4oYDxpIGNsYXNzPVwiYW50aWNvblwiPjwvaT4gd291bGQgYmUgZGVwcmVjYXRlZCBzb29uLiBQbGVhc2UgdXNlIDxpIG56LWljb24gdHlwZT1cIlwiPjwvaT4gQVBJLmApO1xuICAgICAgdGhpcy53YXJuZWRBYm91dEFQSSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnY3Jvc3MnICYmICF0aGlzLndhcm5lZEFib3V0Q3Jvc3MpIHtcbiAgICAgIGNvbnNvbGUud2FybihgJ2Nyb3NzJyBpY29uIGlzIHJlcGxhY2VkIGJ5ICdjbG9zZScgaWNvbi5gKTtcbiAgICAgIHRoaXMud2FybmVkQWJvdXRDcm9zcyA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAndmVydGljYWwnICYmICF0aGlzLndhcm5lZEFib3V0VmVydGljYWwpIHtcbiAgICAgIGNvbnNvbGUud2FybihgJ3ZlcnRpY2xlJyBpcyBtaXNzcGVsbGVkLCB3b3VsZCBiZSBjb3JyZWN0ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi5gKTtcbiAgICAgIHRoaXMud2FybmVkQWJvdXRWZXJ0aWNhbCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbm9ybWFsaXplU3ZnRWxlbWVudChzdmc6IFNWR0VsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAoIXN2Zy5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ3ZpZXdCb3gnLCAnMCAwIDEwMjQgMTAyNCcpO1xuICAgIH1cbiAgICBpZiAoIXN2Zy5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgIXN2Zy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnd2lkdGgnLCAnMWVtJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnaGVpZ2h0JywgJzFlbScpO1xuICAgIH1cbiAgICBpZiAoIXN2Zy5nZXRBdHRyaWJ1dGUoJ2ZpbGwnKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ2ZpbGwnLCAnY3VycmVudENvbG9yJyk7XG4gICAgfVxuICB9XG5cbiAgZmV0Y2hGcm9tSWNvbmZvbnQob3B0OiBOekljb25mb250T3B0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgeyBzY3JpcHRVcmwgfSA9IG9wdDtcbiAgICBpZiAodGhpcy5kb2N1bWVudCAmJiAhdGhpcy5pY29uZm9udENhY2hlLmhhcyhzY3JpcHRVcmwpKSB7XG4gICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShzY3JpcHQsICdzcmMnLCBzY3JpcHRVcmwpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHNjcmlwdCwgJ2RhdGEtbmFtZXNwYWNlJywgc2NyaXB0VXJsLnJlcGxhY2UoL14oaHR0cHM/fGh0dHApOi9nLCAnJykpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBzY3JpcHQpO1xuICAgICAgdGhpcy5pY29uZm9udENhY2hlLmFkZChzY3JpcHRVcmwpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUljb25mb250SWNvbih0eXBlOiBzdHJpbmcpOiBTVkdFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlU1ZHRWxlbWVudEZyb21TdHJpbmcoYDxzdmc+PHVzZSB4bGluazpocmVmPVwiJHt0eXBlfVwiPjwvc3ZnPmApO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgaGFuZGxlcjogSHR0cEJhY2tlbmQsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBkb2N1bWVudDogYW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTlpfSUNPTlMpIHByaXZhdGUgaWNvbnM6IEljb25EZWZpbml0aW9uW10sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOWl9JQ09OX0RFRkFVTFRfVFdPVE9ORV9DT0xPUikgcHJpdmF0ZSBkZWZhdWx0Q29sb3I6IHN0cmluZ1xuICApIHtcbiAgICBzdXBlcihyZW5kZXJlckZhY3RvcnksIGhhbmRsZXIsIGRvY3VtZW50KTtcblxuICAgIHRoaXMuYWRkSWNvbiguLi5OWl9JQ09OU19VU0VEX0JZX1pPUlJPLCAuLi4odGhpcy5pY29ucyB8fCBbXSkpO1xuXG4gICAgbGV0IHByaW1hcnlDb2xvciA9IERFRkFVTFRfVFdPVE9ORV9DT0xPUjtcbiAgICBpZiAodGhpcy5kZWZhdWx0Q29sb3IpIHtcbiAgICAgIGlmICh0aGlzLmRlZmF1bHRDb2xvci5zdGFydHNXaXRoKCcjJykpIHtcbiAgICAgICAgcHJpbWFyeUNvbG9yID0gdGhpcy5kZWZhdWx0Q29sb3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1tORy1aT1JST106IHR3b3RvbmUgY29sb3IgbXVzdCBiZSBhIGhleCBjb2xvciEnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50d29Ub25lQ29sb3IgPSB7IHByaW1hcnlDb2xvciB9O1xuICB9XG59XG4iXX0=