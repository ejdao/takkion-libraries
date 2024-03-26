/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceNumberProperty } from '@takkion/ng-cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  InjectionToken,
  Input,
  NgZone,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { mixinColor } from '@takkion/ng-material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
// Boilerplate for applying mixins to TakProgressBar.
/** @docs-private */
const _TakProgressBarBase = mixinColor(
  class {
    constructor(_elementRef) {
      this._elementRef = _elementRef;
    }
  },
  'primary'
);
/**
 * Injection token used to provide the current location to `TakProgressBar`.
 * Used to handle server-side rendering and to stub out during unit tests.
 * @docs-private
 */
export const TAK_PROGRESS_BAR_LOCATION = new InjectionToken('tak-progress-bar-location', {
  providedIn: 'root',
  factory: TAK_PROGRESS_BAR_LOCATION_FACTORY,
});
/** @docs-private */
export function TAK_PROGRESS_BAR_LOCATION_FACTORY() {
  const _document = inject(DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => (_location ? _location.pathname + _location.search : ''),
  };
}
/** Injection token to be used to override the default options for `tak-progress-bar`. */
export const TAK_PROGRESS_BAR_DEFAULT_OPTIONS = new InjectionToken(
  'TAK_PROGRESS_BAR_DEFAULT_OPTIONS'
);
/** Counter used to generate unique IDs for progress bars. */
let progressbarId = 0;
/**
 * `<tak-progress-bar>` component.
 */
export class TakProgressBar extends _TakProgressBarBase {
  constructor(
    elementRef,
    _ngZone,
    _animationMode,
    /**
     * @deprecated `location` parameter to be made required.
     * @breaking-change 8.0.0
     */
    location,
    defaults,
    /**
     * @deprecated `_changeDetectorRef` parameter to be made required.
     * @breaking-change 11.0.0
     */
    _changeDetectorRef
  ) {
    super(elementRef);
    this._ngZone = _ngZone;
    this._animationMode = _animationMode;
    this._changeDetectorRef = _changeDetectorRef;
    /** Flag that indicates whether NoopAnimations mode is set to true. */
    this._isNoopAnimation = false;
    this._value = 0;
    this._bufferValue = 0;
    /**
     * Event emitted when animation of the primary progress bar completes. This event will not
     * be emitted when animations are disabled, nor will it be emitted for modes with continuous
     * animations (indeterminate and query).
     */
    this.animationEnd = new EventEmitter();
    /** Reference to animation end subscription to be unsubscribed on destroy. */
    this._animationEndSubscription = Subscription.EMPTY;
    /**
     * Mode of the progress bar.
     *
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
     * 'determinate'.
     * Mirrored to mode attribute.
     */
    this.mode = 'determinate';
    /** ID of the progress bar. */
    this.progressbarId = `tak-progress-bar-${progressbarId++}`;
    // We need to prefix the SVG reference with the current path, otherwise they won't work
    // in Safari if the page has a `<base>` tag. Note that we need quotes inside the `url()`,
    // because named route URLs can contain parentheses (see #12338). Also we don't use `Location`
    // since we can't tell the difference between whether the consumer is using the hash location
    // strategy or not, because `Location` normalizes both `/#/foo/bar` and `/foo/bar` to
    // the same thing.
    const path = location ? location.getPathname().split('#')[0] : '';
    this._rectangleFillValue = `url('${path}#${this.progressbarId}')`;
    this._isNoopAnimation = _animationMode === 'NoopAnimations';
    if (defaults) {
      if (defaults.color) {
        this.color = this.defaultColor = defaults.color;
      }
      this.mode = defaults.mode || this.mode;
    }
  }
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = clamp(coerceNumberProperty(v) || 0);
    // @breaking-change 11.0.0 Remove null check for _changeDetectorRef.
    this._changeDetectorRef?.markForCheck();
  }
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue() {
    return this._bufferValue;
  }
  set bufferValue(v) {
    this._bufferValue = clamp(v || 0);
    // @breaking-change 11.0.0 Remove null check for _changeDetectorRef.
    this._changeDetectorRef?.markForCheck();
  }
  /** Gets the current transform value for the progress bar's primary indicator. */
  _primaryTransform() {
    // We use a 3d transform to work around some rendering issues in iOS Safari. See #19328.
    const scale = this.value / 100;
    return { transform: `scale3d(${scale}, 1, 1)` };
  }
  /**
   * Gets the current transform value for the progress bar's buffer indicator. Only used if the
   * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
   */
  _bufferTransform() {
    if (this.mode === 'buffer') {
      // We use a 3d transform to work around some rendering issues in iOS Safari. See #19328.
      const scale = this.bufferValue / 100;
      return { transform: `scale3d(${scale}, 1, 1)` };
    }
    return null;
  }
  ngAfterViewInit() {
    // Run outside angular so change detection didn't get triggered on every transition end
    // instead only on the animation that we care about (primary value bar's transitionend)
    this._ngZone.runOutsideAngular(() => {
      const element = this._primaryValueBar.nativeElement;
      this._animationEndSubscription = fromEvent(element, 'transitionend')
        .pipe(filter(e => e.target === element))
        .subscribe(() => {
          if (this.animationEnd.observers.length === 0) {
            return;
          }
          if (this.mode === 'determinate' || this.mode === 'buffer') {
            this._ngZone.run(() => this.animationEnd.next({ value: this.value }));
          }
        });
    });
  }
  ngOnDestroy() {
    this._animationEndSubscription.unsubscribe();
  }
}
TakProgressBar.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakProgressBar,
  deps: [
    { token: i0.ElementRef },
    { token: i0.NgZone },
    { token: ANIMATION_MODULE_TYPE, optional: true },
    { token: TAK_PROGRESS_BAR_LOCATION, optional: true },
    { token: TAK_PROGRESS_BAR_DEFAULT_OPTIONS, optional: true },
    { token: i0.ChangeDetectorRef },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakProgressBar.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakProgressBar,
  selector: 'tak-progress-bar',
  inputs: { color: 'color', value: 'value', bufferValue: 'bufferValue', mode: 'mode' },
  outputs: { animationEnd: 'animationEnd' },
  host: {
    attributes: {
      role: 'progressbar',
      'aria-valuemin': '0',
      'aria-valuemax': '100',
      tabindex: '-1',
    },
    properties: {
      'attr.aria-valuenow': '(mode === "indeterminate" || mode === "query") ? null : value',
      'attr.mode': 'mode',
      'class._tak-animation-noopable': '_isNoopAnimation',
    },
    classAttribute: 'tak-progress-bar',
  },
  viewQueries: [
    {
      propertyName: '_primaryValueBar',
      first: true,
      predicate: ['primaryValueBar'],
      descendants: true,
    },
  ],
  exportAs: ['takProgressBar'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div aria-hidden="true">\n  <svg width="100%" height="4" focusable="false" class="tak-progress-bar-background tak-progress-bar-element">\n    <defs>\n      <pattern [id]="progressbarId" x="4" y="0" width="8" height="4" patternUnits="userSpaceOnUse">\n        <circle cx="2" cy="2" r="2"/>\n      </pattern>\n    </defs>\n    <rect [attr.fill]="_rectangleFillValue" width="100%" height="100%"/>\n  </svg>\n  <!--\n    The background div is named as such because it appears below the other divs and is not sized based\n    on values.\n  -->\n  <div class="tak-progress-bar-buffer tak-progress-bar-element" [ngStyle]="_bufferTransform()"></div>\n  <div class="tak-progress-bar-primary tak-progress-bar-fill tak-progress-bar-element" [ngStyle]="_primaryTransform()" #primaryValueBar></div>\n  <div class="tak-progress-bar-secondary tak-progress-bar-fill tak-progress-bar-element"></div>\n</div>\n',
  styles: [
    '.tak-progress-bar{display:block;height:4px;overflow:hidden;position:relative;transition:opacity 250ms linear;width:100%}.tak-progress-bar._tak-animation-noopable{transition:none !important;animation:none !important}.tak-progress-bar .tak-progress-bar-element,.tak-progress-bar .tak-progress-bar-fill::after{height:100%;position:absolute;width:100%}.tak-progress-bar .tak-progress-bar-background{width:calc(100% + 10px)}.cdk-high-contrast-active .tak-progress-bar .tak-progress-bar-background{display:none}.tak-progress-bar .tak-progress-bar-buffer{transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .tak-progress-bar .tak-progress-bar-buffer{border-top:solid 5px;opacity:.5}.tak-progress-bar .tak-progress-bar-secondary{display:none}.tak-progress-bar .tak-progress-bar-fill{animation:none;transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .tak-progress-bar .tak-progress-bar-fill{border-top:solid 4px}.tak-progress-bar .tak-progress-bar-fill::after{animation:none;content:"";display:inline-block;left:0}.tak-progress-bar[dir=rtl],[dir=rtl] .tak-progress-bar{transform:rotateY(180deg)}.tak-progress-bar[mode=query]{transform:rotateZ(180deg)}.tak-progress-bar[mode=query][dir=rtl],[dir=rtl] .tak-progress-bar[mode=query]{transform:rotateZ(180deg) rotateY(180deg)}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-fill,.tak-progress-bar[mode=query] .tak-progress-bar-fill{transition:none}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-primary,.tak-progress-bar[mode=query] .tak-progress-bar-primary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-primary-indeterminate-translate 2000ms infinite linear;left:-145.166611%}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-primary.tak-progress-bar-fill::after,.tak-progress-bar[mode=query] .tak-progress-bar-primary.tak-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-primary-indeterminate-scale 2000ms infinite linear}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-secondary,.tak-progress-bar[mode=query] .tak-progress-bar-secondary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-secondary-indeterminate-translate 2000ms infinite linear;left:-54.888891%;display:block}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-secondary.tak-progress-bar-fill::after,.tak-progress-bar[mode=query] .tak-progress-bar-secondary.tak-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-secondary-indeterminate-scale 2000ms infinite linear}.tak-progress-bar[mode=buffer] .tak-progress-bar-background{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-background-scroll 250ms infinite linear;display:block}.tak-progress-bar._tak-animation-noopable .tak-progress-bar-fill,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-fill::after,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-buffer,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-primary,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-primary.tak-progress-bar-fill::after,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-secondary,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-secondary.tak-progress-bar-fill::after,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-background{animation:none;transition-duration:1ms}@keyframes tak-progress-bar-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes tak-progress-bar-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes tak-progress-bar-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes tak-progress-bar-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes tak-progress-bar-background-scroll{to{transform:translateX(-8px)}}',
  ],
  dependencies: [
    { kind: 'directive', type: i1.NgStyle, selector: '[ngStyle]', inputs: ['ngStyle'] },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakProgressBar,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-progress-bar',
          exportAs: 'takProgressBar',
          host: {
            role: 'progressbar',
            'aria-valuemin': '0',
            'aria-valuemax': '100',
            // set tab index to -1 so screen readers will read the aria-label
            // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
            tabindex: '-1',
            '[attr.aria-valuenow]': '(mode === "indeterminate" || mode === "query") ? null : value',
            '[attr.mode]': 'mode',
            class: 'tak-progress-bar',
            '[class._tak-animation-noopable]': '_isNoopAnimation',
          },
          inputs: ['color'],
          changeDetection: ChangeDetectionStrategy.OnPush,
          encapsulation: ViewEncapsulation.None,
          template:
            '<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div aria-hidden="true">\n  <svg width="100%" height="4" focusable="false" class="tak-progress-bar-background tak-progress-bar-element">\n    <defs>\n      <pattern [id]="progressbarId" x="4" y="0" width="8" height="4" patternUnits="userSpaceOnUse">\n        <circle cx="2" cy="2" r="2"/>\n      </pattern>\n    </defs>\n    <rect [attr.fill]="_rectangleFillValue" width="100%" height="100%"/>\n  </svg>\n  <!--\n    The background div is named as such because it appears below the other divs and is not sized based\n    on values.\n  -->\n  <div class="tak-progress-bar-buffer tak-progress-bar-element" [ngStyle]="_bufferTransform()"></div>\n  <div class="tak-progress-bar-primary tak-progress-bar-fill tak-progress-bar-element" [ngStyle]="_primaryTransform()" #primaryValueBar></div>\n  <div class="tak-progress-bar-secondary tak-progress-bar-fill tak-progress-bar-element"></div>\n</div>\n',
          styles: [
            '.tak-progress-bar{display:block;height:4px;overflow:hidden;position:relative;transition:opacity 250ms linear;width:100%}.tak-progress-bar._tak-animation-noopable{transition:none !important;animation:none !important}.tak-progress-bar .tak-progress-bar-element,.tak-progress-bar .tak-progress-bar-fill::after{height:100%;position:absolute;width:100%}.tak-progress-bar .tak-progress-bar-background{width:calc(100% + 10px)}.cdk-high-contrast-active .tak-progress-bar .tak-progress-bar-background{display:none}.tak-progress-bar .tak-progress-bar-buffer{transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .tak-progress-bar .tak-progress-bar-buffer{border-top:solid 5px;opacity:.5}.tak-progress-bar .tak-progress-bar-secondary{display:none}.tak-progress-bar .tak-progress-bar-fill{animation:none;transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .tak-progress-bar .tak-progress-bar-fill{border-top:solid 4px}.tak-progress-bar .tak-progress-bar-fill::after{animation:none;content:"";display:inline-block;left:0}.tak-progress-bar[dir=rtl],[dir=rtl] .tak-progress-bar{transform:rotateY(180deg)}.tak-progress-bar[mode=query]{transform:rotateZ(180deg)}.tak-progress-bar[mode=query][dir=rtl],[dir=rtl] .tak-progress-bar[mode=query]{transform:rotateZ(180deg) rotateY(180deg)}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-fill,.tak-progress-bar[mode=query] .tak-progress-bar-fill{transition:none}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-primary,.tak-progress-bar[mode=query] .tak-progress-bar-primary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-primary-indeterminate-translate 2000ms infinite linear;left:-145.166611%}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-primary.tak-progress-bar-fill::after,.tak-progress-bar[mode=query] .tak-progress-bar-primary.tak-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-primary-indeterminate-scale 2000ms infinite linear}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-secondary,.tak-progress-bar[mode=query] .tak-progress-bar-secondary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-secondary-indeterminate-translate 2000ms infinite linear;left:-54.888891%;display:block}.tak-progress-bar[mode=indeterminate] .tak-progress-bar-secondary.tak-progress-bar-fill::after,.tak-progress-bar[mode=query] .tak-progress-bar-secondary.tak-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-secondary-indeterminate-scale 2000ms infinite linear}.tak-progress-bar[mode=buffer] .tak-progress-bar-background{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:tak-progress-bar-background-scroll 250ms infinite linear;display:block}.tak-progress-bar._tak-animation-noopable .tak-progress-bar-fill,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-fill::after,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-buffer,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-primary,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-primary.tak-progress-bar-fill::after,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-secondary,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-secondary.tak-progress-bar-fill::after,.tak-progress-bar._tak-animation-noopable .tak-progress-bar-background{animation:none;transition-duration:1ms}@keyframes tak-progress-bar-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes tak-progress-bar-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes tak-progress-bar-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes tak-progress-bar-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes tak-progress-bar-background-scroll{to{transform:translateX(-8px)}}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i0.NgZone },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [ANIMATION_MODULE_TYPE],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_PROGRESS_BAR_LOCATION],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_PROGRESS_BAR_DEFAULT_OPTIONS],
          },
        ],
      },
      { type: i0.ChangeDetectorRef },
    ];
  },
  propDecorators: {
    value: [
      {
        type: Input,
      },
    ],
    bufferValue: [
      {
        type: Input,
      },
    ],
    _primaryValueBar: [
      {
        type: ViewChild,
        args: ['primaryValueBar'],
      },
    ],
    animationEnd: [
      {
        type: Output,
      },
    ],
    mode: [
      {
        type: Input,
      },
    ],
  },
});
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3Byb2dyZXNzLWJhci9wcm9ncmVzcy1iYXIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxvQkFBb0IsRUFBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQVcsVUFBVSxFQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLFNBQVMsRUFBYyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7QUFVdEMscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FDcEM7SUFDRSxZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDL0MsRUFDRCxTQUFTLENBQ1YsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLGNBQWMsQ0FDekQsMkJBQTJCLEVBQzNCLEVBQUMs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Qjs7MEJBS3hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMseUJBQXlCOzswQkFDNUMsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxnQ0FBZ0M7NEVBa0N0QyxLQUFLO3NCQURSLEtBQUs7Z0JBY0YsV0FBVztzQkFEZCxLQUFLO2dCQVl3QixnQkFBZ0I7c0JBQTdDLFNBQVM7dUJBQUMsaUJBQWlCO2dCQU9ULFlBQVk7c0JBQTlCLE1BQU07Z0JBWUUsSUFBSTtzQkFBWixLQUFLOztBQXVEUixzRUFBc0U7QUFDdEUsU0FBUyxLQUFLLENBQUMsQ0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUc7SUFDMUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBpbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FuQ29sb3IsIG1peGluQ29sb3IsIFRoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogQmVuY2hwcmVzcyB0ZXN0cy5cbi8vIFRPRE8oam9zZXBocGVycm90dCk6IEFkZCBBUklBIGF0dHJpYnV0ZXMgZm9yIHByb2dyZXNzIGJhciBcImZvclwiLlxuXG4vKiogTGFzdCBhbmltYXRpb24gZW5kIGRhdGEuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZXNzQW5pbWF0aW9uRW5kIHtcbiAgdmFsdWU6IG51bWJlcjtcbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRQcm9ncmVzc0Jhci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jb25zdCBfTWF0UHJvZ3Jlc3NCYXJCYXNlID0gbWl4aW5Db2xvcihcbiAgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbiAgfSxcbiAgJ3ByaW1hcnknLFxuKTtcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBjdXJyZW50IGxvY2F0aW9uIHRvIGBNYXRQcm9ncmVzc0JhcmAuXG4gKiBVc2VkIHRvIGhhbmRsZSBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgYW5kIHRvIHN0dWIgb3V0IGR1cmluZyB1bml0IHRlc3RzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX1BST0dSRVNTX0JBUl9MT0NBVElPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRQcm9ncmVzc0JhckxvY2F0aW9uPihcbiAgJ21hdC1wcm9ncmVzcy1iYXItbG9jYXRpb24nLFxuICB7cHJvdmlkZWRJbjogJ3Jvb3QnLCBmYWN0b3J5OiBNQVRfUFJPR1JFU1NfQkFSX0xPQ0FUSU9OX0ZBQ1RPUll9LFxuKTtcblxuLyoqXG4gKiBTdHViYmVkIG91dCBsb2NhdGlvbiBmb3IgYE1hdFByb2dyZXNzQmFyYC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRQcm9ncmVzc0JhckxvY2F0aW9uIHtcbiAgZ2V0UGF0aG5hbWU6ICgpID0+IHN0cmluZztcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfUFJPR1JFU1NfQkFSX0xPQ0FUSU9OX0ZBQ1RPUlkoKTogTWF0UHJvZ3Jlc3NCYXJMb2NhdGlvbiB7XG4gIGNvbnN0IF9kb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gIGNvbnN0IF9sb2NhdGlvbiA9IF9kb2N1bWVudCA/IF9kb2N1bWVudC5sb2NhdGlvbiA6IG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLCByYXRoZXIgdGhhbiBhIHByb3BlcnR5LCBiZWNhdXNlIEFuZ3VsYXJcbiAgICAvLyB3aWxsIG9ubHkgcmVzb2x2ZSBpdCBvbmNlLCBidXQgd2Ugd2FudCB0aGUgY3VycmVudCBwYXRoIG9uIGVhY2ggY2FsbC5cbiAgICBnZXRQYXRobmFtZTogKCkgPT4gKF9sb2NhdGlvbiA/IF9sb2NhdGlvbi5wYXRobmFtZSArIF9sb2NhdGlvbi5zZWFyY2ggOiAnJyksXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZScgfCAnYnVmZmVyJyB8ICdxdWVyeSc7XG5cbi8qKiBEZWZhdWx0IGBtYXQtcHJvZ3Jlc3MtYmFyYCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFByb2dyZXNzQmFyRGVmYXVsdE9wdGlvbnMge1xuICAvKiogRGVmYXVsdCBjb2xvciBvZiB0aGUgcHJvZ3Jlc3MgYmFyLiAqL1xuICBjb2xvcj86IFRoZW1lUGFsZXR0ZTtcblxuICAvKiogRGVmYXVsdCBtb2RlIG9mIHRoZSBwcm9ncmVzcyBiYXIuICovXG4gIG1vZGU/OiBQcm9ncmVzc0Jhck1vZGU7XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWF0LXByb2dyZXNzLWJhcmAuICovXG5leHBvcnQgY29uc3QgTUFUX1BST0dSRVNTX0JBUl9ERUZBVUxUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0UHJvZ3Jlc3NCYXJEZWZhdWx0T3B0aW9ucz4oXG4gICdNQVRfUFJPR1JFU1NfQkFSX0RFRkFVTFRfT1BUSU9OUycsXG4pO1xuXG4vKiogQ291bnRlciB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMgZm9yIHByb2dyZXNzIGJhcnMuICovXG5sZXQgcHJvZ3Jlc3NiYXJJZCA9IDA7XG5cbi8qKlxuICogYDxtYXQtcHJvZ3Jlc3MtYmFyPmAgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcHJvZ3Jlc3MtYmFyJyxcbiAgZXhwb3J0QXM6ICdtYXRQcm9ncmVzc0JhcicsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdwcm9ncmVzc2JhcicsXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXG4gICAgJ2FyaWEtdmFsdWVtYXgnOiAnMTAwJyxcbiAgICAvLyBzZXQgdGFiIGluZGV4IHRvIC0xIHNvIHNjcmVlbiByZWFkZXJzIHdpbGwgcmVhZCB0aGUgYXJpYS1sYWJlbFxuICAgIC8vIE5vdGU6IHRoZXJlIGlzIGEga25vd24gaXNzdWUgd2l0aCBKQVdTIHRoYXQgZG9lcyBub3QgcmVhZCBwcm9ncmVzc2JhciBhcmlhIGxhYmVscyBvbiBGaXJlRm94XG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnKG1vZGUgPT09IFwiaW5kZXRlcm1pbmF0ZVwiIHx8IG1vZGUgPT09IFwicXVlcnlcIikgPyBudWxsIDogdmFsdWUnLFxuICAgICdbYXR0ci5tb2RlXSc6ICdtb2RlJyxcbiAgICAnY2xhc3MnOiAnbWF0LXByb2dyZXNzLWJhcicsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2lzTm9vcEFuaW1hdGlvbicsXG4gIH0sXG4gIGlucHV0czogWydjb2xvciddLFxuICB0ZW1wbGF0ZVVybDogJ3Byb2dyZXNzLWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Byb2dyZXNzLWJhci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFByb2dyZXNzQmFyXG4gIGV4dGVuZHMgX01hdFByb2dyZXNzQmFyQmFzZVxuICBpbXBsZW1lbnRzIENhbkNvbG9yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3lcbntcbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIGBsb2NhdGlvbmAgcGFyYW1ldGVyIHRvIGJlIG1hZGUgcmVxdWlyZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuICAgICAqL1xuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1BST0dSRVNTX0JBUl9MT0NBVElPTikgbG9jYXRpb24/OiBNYXRQcm9ncmVzc0JhckxvY2F0aW9uLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChNQVRfUFJPR1JFU1NfQkFSX0RFRkFVTFRfT1BUSU9OUylcbiAgICBkZWZhdWx0cz86IE1hdFByb2dyZXNzQmFyRGVmYXVsdE9wdGlvbnMsXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgYF9jaGFuZ2VEZXRlY3RvclJlZmAgcGFyYW1ldGVyIHRvIGJlIG1hZGUgcmVxdWlyZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxMS4wLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gcHJlZml4IHRoZSBTVkcgcmVmZXJlbmNlIHdpdGggdGhlIGN1cnJlbnQgcGF0aCwgb3RoZXJ3aXNlIHRoZXkgd29uJ3Qgd29ya1xuICAgIC8vIGluIFNhZmFyaSBpZiB0aGUgcGFnZSBoYXMgYSBgPGJhc2U+YCB0YWcuIE5vdGUgdGhhdCB3ZSBuZWVkIHF1b3RlcyBpbnNpZGUgdGhlIGB1cmwoKWAsXG4gICAgLy8gYmVjYXVzZSBuYW1lZCByb3V0ZSBVUkxzIGNhbiBjb250YWluIHBhcmVudGhlc2VzIChzZWUgIzEyMzM4KS4gQWxzbyB3ZSBkb24ndCB1c2UgYExvY2F0aW9uYFxuICAgIC8vIHNpbmNlIHdlIGNhbid0IHRlbGwgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB3aGV0aGVyIHRoZSBjb25zdW1lciBpcyB1c2luZyB0aGUgaGFzaCBsb2NhdGlvblxuICAgIC8vIHN0cmF0ZWd5IG9yIG5vdCwgYmVjYXVzZSBgTG9jYXRpb25gIG5vcm1hbGl6ZXMgYm90aCBgLyMvZm9vL2JhcmAgYW5kIGAvZm9vL2JhcmAgdG9cbiAgICAvLyB0aGUgc2FtZSB0aGluZy5cbiAgICBjb25zdCBwYXRoID0gbG9jYXRpb24gPyBsb2NhdGlvbi5nZXRQYXRobmFtZSgpLnNwbGl0KCcjJylbMF0gOiAnJztcbiAgICB0aGlzLl9yZWN0YW5nbGVGaWxsVmFsdWUgPSBgdXJsKCcke3BhdGh9IyR7dGhpcy5wcm9ncmVzc2JhcklkfScpYDtcbiAgICB0aGlzLl9pc05vb3BBbmltYXRpb24gPSBfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcblxuICAgIGlmIChkZWZhdWx0cykge1xuICAgICAgaWYgKGRlZmF1bHRzLmNvbG9yKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmRlZmF1bHRDb2xvciA9IGRlZmF1bHRzLmNvbG9yO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vZGUgPSBkZWZhdWx0cy5tb2RlIHx8IHRoaXMubW9kZTtcbiAgICB9XG4gIH1cblxuICAvKiogRmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIE5vb3BBbmltYXRpb25zIG1vZGUgaXMgc2V0IHRvIHRydWUuICovXG4gIF9pc05vb3BBbmltYXRpb24gPSBmYWxzZTtcblxuICAvKiogVmFsdWUgb2YgdGhlIHByb2dyZXNzIGJhci4gRGVmYXVsdHMgdG8gemVyby4gTWlycm9yZWQgdG8gYXJpYS12YWx1ZW5vdy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2OiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX3ZhbHVlID0gY2xhbXAoY29lcmNlTnVtYmVyUHJvcGVydHkodikgfHwgMCk7XG5cbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDExLjAuMCBSZW1vdmUgbnVsbCBjaGVjayBmb3IgX2NoYW5nZURldGVjdG9yUmVmLlxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmPy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyID0gMDtcblxuICAvKiogQnVmZmVyIHZhbHVlIG9mIHRoZSBwcm9ncmVzcyBiYXIuIERlZmF1bHRzIHRvIHplcm8uICovXG4gIEBJbnB1dCgpXG4gIGdldCBidWZmZXJWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9idWZmZXJWYWx1ZTtcbiAgfVxuICBzZXQgYnVmZmVyVmFsdWUodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fYnVmZmVyVmFsdWUgPSBjbGFtcCh2IHx8IDApO1xuXG4gICAgLy8gQGJyZWFraW5nLWNoYW5nZSAxMS4wLjAgUmVtb3ZlIG51bGwgY2hlY2sgZm9yIF9jaGFuZ2VEZXRlY3RvclJlZi5cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZj8ubWFya0ZvckNoZWNrKCk7XG4gIH1cbiAgcHJpdmF0ZSBfYnVmZmVyVmFsdWU6IG51bWJlciA9IDA7XG5cbiAgQFZpZXdDaGlsZCgncHJpbWFyeVZhbHVlQmFyJykgX3ByaW1hcnlWYWx1ZUJhcjogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGFuaW1hdGlvbiBvZiB0aGUgcHJpbWFyeSBwcm9ncmVzcyBiYXIgY29tcGxldGVzLiBUaGlzIGV2ZW50IHdpbGwgbm90XG4gICAqIGJlIGVtaXR0ZWQgd2hlbiBhbmltYXRpb25zIGFyZSBkaXNhYmxlZCwgbm9yIHdpbGwgaXQgYmUgZW1pdHRlZCBmb3IgbW9kZXMgd2l0aCBjb250aW51b3VzXG4gICAqIGFuaW1hdGlvbnMgKGluZGV0ZXJtaW5hdGUgYW5kIHF1ZXJ5KS5cbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBhbmltYXRpb25FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFByb2dyZXNzQW5pbWF0aW9uRW5kPigpO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gYW5pbWF0aW9uIGVuZCBzdWJzY3JpcHRpb24gdG8gYmUgdW5zdWJzY3JpYmVkIG9uIGRlc3Ryb3kuICovXG4gIHByaXZhdGUgX2FuaW1hdGlvbkVuZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKlxuICAgKiBNb2RlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIElucHV0IG11c3QgYmUgb25lIG9mIHRoZXNlIHZhbHVlczogZGV0ZXJtaW5hdGUsIGluZGV0ZXJtaW5hdGUsIGJ1ZmZlciwgcXVlcnksIGRlZmF1bHRzIHRvXG4gICAqICdkZXRlcm1pbmF0ZScuXG4gICAqIE1pcnJvcmVkIHRvIG1vZGUgYXR0cmlidXRlLlxuICAgKi9cbiAgQElucHV0KCkgbW9kZTogUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJztcblxuICAvKiogSUQgb2YgdGhlIHByb2dyZXNzIGJhci4gKi9cbiAgcHJvZ3Jlc3NiYXJJZCA9IGBtYXQtcHJvZ3Jlc3MtYmFyLSR7cHJvZ3Jlc3NiYXJJZCsrfWA7XG5cbiAgLyoqIEF0dHJpYnV0ZSB0byBiZSB1c2VkIGZvciB0aGUgYGZpbGxgIGF0dHJpYnV0ZSBvbiB0aGUgaW50ZXJuYWwgYHJlY3RgIGVsZW1lbnQuICovXG4gIF9yZWN0YW5nbGVGaWxsVmFsdWU6IHN0cmluZztcblxuICAvKiogR2V0cyB0aGUgY3VycmVudCB0cmFuc2Zvcm0gdmFsdWUgZm9yIHRoZSBwcm9ncmVzcyBiYXIncyBwcmltYXJ5IGluZGljYXRvci4gKi9cbiAgX3ByaW1hcnlUcmFuc2Zvcm0oKSB7XG4gICAgLy8gV2UgdXNlIGEgM2QgdHJhbnNmb3JtIHRvIHdvcmsgYXJvdW5kIHNvbWUgcmVuZGVyaW5nIGlzc3VlcyBpbiBpT1MgU2FmYXJpLiBTZWUgIzE5MzI4LlxuICAgIGNvbnN0IHNjYWxlID0gdGhpcy52YWx1ZSAvIDEwMDtcbiAgICByZXR1cm4ge3RyYW5zZm9ybTogYHNjYWxlM2QoJHtzY2FsZX0sIDEsIDEpYH07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCB0cmFuc2Zvcm0gdmFsdWUgZm9yIHRoZSBwcm9ncmVzcyBiYXIncyBidWZmZXIgaW5kaWNhdG9yLiBPbmx5IHVzZWQgaWYgdGhlXG4gICAqIHByb2dyZXNzIG1vZGUgaXMgc2V0IHRvIGJ1ZmZlciwgb3RoZXJ3aXNlIHJldHVybnMgYW4gdW5kZWZpbmVkLCBjYXVzaW5nIG5vIHRyYW5zZm9ybWF0aW9uLlxuICAgKi9cbiAgX2J1ZmZlclRyYW5zZm9ybSgpIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnYnVmZmVyJykge1xuICAgICAgLy8gV2UgdXNlIGEgM2QgdHJhbnNmb3JtIHRvIHdvcmsgYXJvdW5kIHNvbWUgcmVuZGVyaW5nIGlzc3VlcyBpbiBpT1MgU2FmYXJpLiBTZWUgIzE5MzI4LlxuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmJ1ZmZlclZhbHVlIC8gMTAwO1xuICAgICAgcmV0dXJuIHt0cmFuc2Zvcm06IGBzY2FsZTNkKCR7c2NhbGV9LCAxLCAxKWB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBSdW4gb3V0c2lkZSBhbmd1bGFyIHNvIGNoYW5nZSBkZXRlY3Rpb24gZGlkbid0IGdldCB0cmlnZ2VyZWQgb24gZXZlcnkgdHJhbnNpdGlvbiBlbmRcbiAgICAvLyBpbnN0ZWFkIG9ubHkgb24gdGhlIGFuaW1hdGlvbiB0aGF0IHdlIGNhcmUgYWJvdXQgKHByaW1hcnkgdmFsdWUgYmFyJ3MgdHJhbnNpdGlvbmVuZClcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX3ByaW1hcnlWYWx1ZUJhci5uYXRpdmVFbGVtZW50O1xuXG4gICAgICB0aGlzLl9hbmltYXRpb25FbmRTdWJzY3JpcHRpb24gPSAoXG4gICAgICAgIGZyb21FdmVudChlbGVtZW50LCAndHJhbnNpdGlvbmVuZCcpIGFzIE9ic2VydmFibGU8VHJhbnNpdGlvbkV2ZW50PlxuICAgICAgKVxuICAgICAgICAucGlwZShmaWx0ZXIoKGU6IFRyYW5zaXRpb25FdmVudCkgPT4gZS50YXJnZXQgPT09IGVsZW1lbnQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb25FbmQub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkZXRlcm1pbmF0ZScgfHwgdGhpcy5tb2RlID09PSAnYnVmZmVyJykge1xuICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLmFuaW1hdGlvbkVuZC5uZXh0KHt2YWx1ZTogdGhpcy52YWx1ZX0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuLyoqIENsYW1wcyBhIHZhbHVlIHRvIGJlIGJldHdlZW4gdHdvIG51bWJlcnMsIGJ5IGRlZmF1bHQgMCBhbmQgMTAwLiAqL1xuZnVuY3Rpb24gY2xhbXAodjogbnVtYmVyLCBtaW4gPSAwLCBtYXggPSAxMDApIHtcbiAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2KSk7XG59XG4iLCI8IS0tXG4gIEFsbCBjaGlsZHJlbiBuZWVkIHRvIGJlIGhpZGRlbiBmb3Igc2NyZWVuIHJlYWRlcnMgaW4gb3JkZXIgdG8gc3VwcG9ydCBDaHJvbWVWb3guXG4gIE1vcmUgY29udGV4dCBpbiB0aGUgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzIyMTY1LlxuLS0+XG48ZGl2IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjRcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGNsYXNzPVwibWF0LXByb2dyZXNzLWJhci1iYWNrZ3JvdW5kIG1hdC1wcm9ncmVzcy1iYXItZWxlbWVudFwiPlxuICAgIDxkZWZzPlxuICAgICAgPHBhdHRlcm4gW2lkXT1cInByb2dyZXNzYmFySWRcIiB4PVwiNFwiIHk9XCIwXCIgd2lkdGg9XCI4XCIgaGVpZ2h0PVwiNFwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIyXCIgY3k9XCIyXCIgcj1cIjJcIi8+XG4gICAgICA8L3BhdHRlcm4+XG4gICAgPC9kZWZzPlxuICAgIDxyZWN0IFthdHRyLmZpbGxdPVwiX3JlY3RhbmdsZUZpbGxWYWx1ZVwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIi8+XG4gIDwvc3ZnPlxuICA8IS0tXG4gICAgVGhlIGJhY2tncm91bmQgZGl2IGlzIG5hbWVkIGFzIHN1Y2ggYmVjYXVzZSBpdCBhcHBlYXJzIGJlbG93IHRoZSBvdGhlciBkaXZzIGFuZCBpcyBub3Qgc2l6ZWQgYmFzZWRcbiAgICBvbiB2YWx1ZXMuXG4gIC0tPlxuICA8ZGl2IGNsYXNzPVwibWF0LXByb2dyZXNzLWJhci1idWZmZXIgbWF0LXByb2dyZXNzLWJhci1lbGVtZW50XCIgW25nU3R5bGVdPVwiX2J1ZmZlclRyYW5zZm9ybSgpXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtYXQtcHJvZ3Jlc3MtYmFyLXByaW1hcnkgbWF0LXByb2dyZXNzLWJhci1maWxsIG1hdC1wcm9ncmVzcy1iYXItZWxlbWVudFwiIFtuZ1N0eWxlXT1cIl9wcmltYXJ5VHJhbnNmb3JtKClcIiAjcHJpbWFyeVZhbHVlQmFyPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWF0LXByb2dyZXNzLWJhci1zZWNvbmRhcnkgbWF0LXByb2dyZXNzLWJhci1maWxsIG1hdC1wcm9ncmVzcy1iYXItZWxlbWVudFwiPjwvZGl2PlxuPC9kaXY+XG4iXX0=
