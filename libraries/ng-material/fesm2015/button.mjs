import * as i0 from '@angular/core';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Optional,
  Inject,
  ViewChild,
  Input,
  NgModule,
} from '@angular/core';
import * as i2 from '@takkion/ng-material/core';
import {
  mixinColor,
  mixinDisabled,
  mixinDisableRipple,
  TakRipple,
  TakRippleModule,
  TakCommonModule,
} from '@takkion/ng-material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as i1 from '@takkion/ng-cdk/a11y';

/** Default color palette for round buttons (tak-fab and tak-mini-fab) */
const DEFAULT_ROUND_BUTTON_COLOR = 'accent';
/**
 * List of classes to add to TakButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  'tak-button',
  'tak-flat-button',
  'tak-icon-button',
  'tak-raised-button',
  'tak-stroked-button',
  'tak-mini-fab',
  'tak-fab',
];
// Boilerplate for applying mixins to TakButton.
const _TakButtonBase = mixinColor(
  mixinDisabled(
    mixinDisableRipple(
      class {
        constructor(_elementRef) {
          this._elementRef = _elementRef;
        }
      }
    )
  )
);
/**
 * Material design button.
 */
class TakButton extends _TakButtonBase {
  constructor(elementRef, _focusMonitor, _animationMode) {
    super(elementRef);
    this._focusMonitor = _focusMonitor;
    this._animationMode = _animationMode;
    /** Whether the button is round. */
    this.isRoundButton = this._hasHostAttributes('tak-fab', 'tak-mini-fab');
    /** Whether the button is icon button. */
    this.isIconButton = this._hasHostAttributes('tak-icon-button');
    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        this._getHostElement().classList.add(attr);
      }
    }
    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('tak-button-base');
    if (this.isRoundButton) {
      this.color = DEFAULT_ROUND_BUTTON_COLOR;
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Focuses the button. */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._getHostElement(), origin, options);
    } else {
      this._getHostElement().focus(options);
    }
  }
  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  /** Gets whether the button has one of the given attributes. */
  _hasHostAttributes(...attributes) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }
}
TakButton.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButton,
  deps: [
    { token: i0.ElementRef },
    { token: i1.FocusMonitor },
    { token: ANIMATION_MODULE_TYPE, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakButton.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakButton,
  selector:
    'button[tak-button], button[tak-raised-button], button[tak-icon-button],\n             button[tak-fab], button[tak-mini-fab], button[tak-stroked-button],\n             button[tak-flat-button]',
  inputs: { disabled: 'disabled', disableRipple: 'disableRipple', color: 'color' },
  host: {
    properties: {
      'attr.disabled': 'disabled || null',
      'class._tak-animation-noopable': '_animationMode === "NoopAnimations"',
      'class.tak-button-disabled': 'disabled',
    },
    classAttribute: 'tak-focus-indicator',
  },
  viewQueries: [{ propertyName: 'ripple', first: true, predicate: TakRipple, descendants: true }],
  exportAs: ['takButton'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<span class="tak-button-wrapper"><ng-content></ng-content></span>\n<span takRipple class="tak-button-ripple"\n      [class.tak-button-ripple-round]="isRoundButton || isIconButton"\n      [takRippleDisabled]="_isRippleDisabled()"\n      [takRippleCentered]="isIconButton"\n      [takRippleTrigger]="_getHostElement()"></span>\n<span class="tak-button-focus-overlay"></span>\n',
  styles: [
    '.tak-button .tak-button-focus-overlay,.tak-icon-button .tak-button-focus-overlay{opacity:0}.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:.04}@media(hover: none){.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:0}}.tak-button,.tak-icon-button,.tak-stroked-button,.tak-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-button.tak-button-disabled,.tak-icon-button.tak-button-disabled,.tak-stroked-button.tak-button-disabled,.tak-flat-button.tak-button-disabled{cursor:default}.tak-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-button.cdk-program-focused .tak-button-focus-overlay,.tak-icon-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-icon-button.cdk-program-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-program-focused .tak-button-focus-overlay,.tak-flat-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-flat-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button.tak-button-disabled{cursor:default}.tak-raised-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-raised-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button._tak-animation-noopable{transition:none !important;animation:none !important}.tak-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.tak-stroked-button .tak-button-ripple.tak-ripple,.tak-stroked-button .tak-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.tak-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.tak-fab::-moz-focus-inner{border:0}.tak-fab.tak-button-disabled{cursor:default}.tak-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-fab::-moz-focus-inner{border:0}.tak-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-fab .tak-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.tak-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab.tak-button-disabled{cursor:default}.tak-mini-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-mini-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-mini-fab .tak-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.tak-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.tak-icon-button i,.tak-icon-button .tak-icon{line-height:24px}.tak-button-ripple.tak-ripple,.tak-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.tak-button-ripple.tak-ripple:not(:empty){transform:translateZ(0)}.tak-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._tak-animation-noopable .tak-button-focus-overlay{transition:none}.tak-button-ripple-round{border-radius:50%;z-index:1}.tak-button .tak-button-wrapper>*,.tak-flat-button .tak-button-wrapper>*,.tak-stroked-button .tak-button-wrapper>*,.tak-raised-button .tak-button-wrapper>*,.tak-icon-button .tak-button-wrapper>*,.tak-fab .tak-button-wrapper>*,.tak-mini-fab .tak-button-wrapper>*{vertical-align:middle}.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-prefix .tak-icon-button,.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-suffix .tak-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.tak-flat-button::before,.tak-raised-button::before,.tak-fab::before,.tak-mini-fab::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 2px) * -1)}.tak-stroked-button::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .tak-button,.cdk-high-contrast-active .tak-flat-button,.cdk-high-contrast-active .tak-raised-button,.cdk-high-contrast-active .tak-icon-button,.cdk-high-contrast-active .tak-fab,.cdk-high-contrast-active .tak-mini-fab{outline:solid 1px}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i2.TakRipple,
      selector: '[tak-ripple], [takRipple]',
      inputs: [
        'takRippleColor',
        'takRippleUnbounded',
        'takRippleCentered',
        'takRippleRadius',
        'takRippleAnimation',
        'takRippleDisabled',
        'takRippleTrigger',
      ],
      exportAs: ['takRipple'],
    },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButton,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: `button[tak-button], button[tak-raised-button], button[tak-icon-button],
             button[tak-fab], button[tak-mini-fab], button[tak-stroked-button],
             button[tak-flat-button]`,
          exportAs: 'takButton',
          host: {
            '[attr.disabled]': 'disabled || null',
            '[class._tak-animation-noopable]': '_animationMode === "NoopAnimations"',
            // Add a class for disabled button styling instead of the using attribute
            // selector or pseudo-selector.  This allows users to create focusable
            // disabled buttons without recreating the styles.
            '[class.tak-button-disabled]': 'disabled',
            class: 'tak-focus-indicator',
          },
          inputs: ['disabled', 'disableRipple', 'color'],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<span class="tak-button-wrapper"><ng-content></ng-content></span>\n<span takRipple class="tak-button-ripple"\n      [class.tak-button-ripple-round]="isRoundButton || isIconButton"\n      [takRippleDisabled]="_isRippleDisabled()"\n      [takRippleCentered]="isIconButton"\n      [takRippleTrigger]="_getHostElement()"></span>\n<span class="tak-button-focus-overlay"></span>\n',
          styles: [
            '.tak-button .tak-button-focus-overlay,.tak-icon-button .tak-button-focus-overlay{opacity:0}.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:.04}@media(hover: none){.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:0}}.tak-button,.tak-icon-button,.tak-stroked-button,.tak-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-button.tak-button-disabled,.tak-icon-button.tak-button-disabled,.tak-stroked-button.tak-button-disabled,.tak-flat-button.tak-button-disabled{cursor:default}.tak-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-button.cdk-program-focused .tak-button-focus-overlay,.tak-icon-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-icon-button.cdk-program-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-program-focused .tak-button-focus-overlay,.tak-flat-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-flat-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button.tak-button-disabled{cursor:default}.tak-raised-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-raised-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button._tak-animation-noopable{transition:none !important;animation:none !important}.tak-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.tak-stroked-button .tak-button-ripple.tak-ripple,.tak-stroked-button .tak-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.tak-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.tak-fab::-moz-focus-inner{border:0}.tak-fab.tak-button-disabled{cursor:default}.tak-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-fab::-moz-focus-inner{border:0}.tak-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-fab .tak-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.tak-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab.tak-button-disabled{cursor:default}.tak-mini-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-mini-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-mini-fab .tak-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.tak-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.tak-icon-button i,.tak-icon-button .tak-icon{line-height:24px}.tak-button-ripple.tak-ripple,.tak-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.tak-button-ripple.tak-ripple:not(:empty){transform:translateZ(0)}.tak-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._tak-animation-noopable .tak-button-focus-overlay{transition:none}.tak-button-ripple-round{border-radius:50%;z-index:1}.tak-button .tak-button-wrapper>*,.tak-flat-button .tak-button-wrapper>*,.tak-stroked-button .tak-button-wrapper>*,.tak-raised-button .tak-button-wrapper>*,.tak-icon-button .tak-button-wrapper>*,.tak-fab .tak-button-wrapper>*,.tak-mini-fab .tak-button-wrapper>*{vertical-align:middle}.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-prefix .tak-icon-button,.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-suffix .tak-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.tak-flat-button::before,.tak-raised-button::before,.tak-fab::before,.tak-mini-fab::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 2px) * -1)}.tak-stroked-button::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .tak-button,.cdk-high-contrast-active .tak-flat-button,.cdk-high-contrast-active .tak-raised-button,.cdk-high-contrast-active .tak-icon-button,.cdk-high-contrast-active .tak-fab,.cdk-high-contrast-active .tak-mini-fab{outline:solid 1px}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i1.FocusMonitor },
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
    ];
  },
  propDecorators: {
    ripple: [
      {
        type: ViewChild,
        args: [TakRipple],
      },
    ],
  },
});
/**
 * Material design anchor button.
 */
class TakAnchor extends TakButton {
  constructor(
    focusMonitor,
    elementRef,
    animationMode,
    /** @breaking-change 14.0.0 _ngZone will be required. */
    _ngZone
  ) {
    super(elementRef, focusMonitor, animationMode);
    this._ngZone = _ngZone;
    this._haltDisabledEvents = event => {
      // A disabled button shouldn't apply any actions
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    /** @breaking-change 14.0.0 _ngZone will be required. */
    if (this._ngZone) {
      this._ngZone.runOutsideAngular(() => {
        this._elementRef.nativeElement.addEventListener('click', this._haltDisabledEvents);
      });
    } else {
      this._elementRef.nativeElement.addEventListener('click', this._haltDisabledEvents);
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._elementRef.nativeElement.removeEventListener('click', this._haltDisabledEvents);
  }
}
TakAnchor.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakAnchor,
  deps: [
    { token: i1.FocusMonitor },
    { token: i0.ElementRef },
    { token: ANIMATION_MODULE_TYPE, optional: true },
    { token: i0.NgZone, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakAnchor.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakAnchor,
  selector:
    'a[tak-button], a[tak-raised-button], a[tak-icon-button], a[tak-fab],\n             a[tak-mini-fab], a[tak-stroked-button], a[tak-flat-button]',
  inputs: {
    disabled: 'disabled',
    disableRipple: 'disableRipple',
    color: 'color',
    tabIndex: 'tabIndex',
  },
  host: {
    properties: {
      'attr.tabindex': 'disabled ? -1 : tabIndex',
      'attr.disabled': 'disabled || null',
      'attr.aria-disabled': 'disabled.toString()',
      'class._tak-animation-noopable': '_animationMode === "NoopAnimations"',
      'class.tak-button-disabled': 'disabled',
    },
    classAttribute: 'tak-focus-indicator',
  },
  exportAs: ['takButton', 'takAnchor'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<span class="tak-button-wrapper"><ng-content></ng-content></span>\n<span takRipple class="tak-button-ripple"\n      [class.tak-button-ripple-round]="isRoundButton || isIconButton"\n      [takRippleDisabled]="_isRippleDisabled()"\n      [takRippleCentered]="isIconButton"\n      [takRippleTrigger]="_getHostElement()"></span>\n<span class="tak-button-focus-overlay"></span>\n',
  styles: [
    '.tak-button .tak-button-focus-overlay,.tak-icon-button .tak-button-focus-overlay{opacity:0}.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:.04}@media(hover: none){.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:0}}.tak-button,.tak-icon-button,.tak-stroked-button,.tak-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-button.tak-button-disabled,.tak-icon-button.tak-button-disabled,.tak-stroked-button.tak-button-disabled,.tak-flat-button.tak-button-disabled{cursor:default}.tak-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-button.cdk-program-focused .tak-button-focus-overlay,.tak-icon-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-icon-button.cdk-program-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-program-focused .tak-button-focus-overlay,.tak-flat-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-flat-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button.tak-button-disabled{cursor:default}.tak-raised-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-raised-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button._tak-animation-noopable{transition:none !important;animation:none !important}.tak-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.tak-stroked-button .tak-button-ripple.tak-ripple,.tak-stroked-button .tak-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.tak-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.tak-fab::-moz-focus-inner{border:0}.tak-fab.tak-button-disabled{cursor:default}.tak-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-fab::-moz-focus-inner{border:0}.tak-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-fab .tak-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.tak-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab.tak-button-disabled{cursor:default}.tak-mini-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-mini-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-mini-fab .tak-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.tak-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.tak-icon-button i,.tak-icon-button .tak-icon{line-height:24px}.tak-button-ripple.tak-ripple,.tak-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.tak-button-ripple.tak-ripple:not(:empty){transform:translateZ(0)}.tak-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._tak-animation-noopable .tak-button-focus-overlay{transition:none}.tak-button-ripple-round{border-radius:50%;z-index:1}.tak-button .tak-button-wrapper>*,.tak-flat-button .tak-button-wrapper>*,.tak-stroked-button .tak-button-wrapper>*,.tak-raised-button .tak-button-wrapper>*,.tak-icon-button .tak-button-wrapper>*,.tak-fab .tak-button-wrapper>*,.tak-mini-fab .tak-button-wrapper>*{vertical-align:middle}.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-prefix .tak-icon-button,.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-suffix .tak-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.tak-flat-button::before,.tak-raised-button::before,.tak-fab::before,.tak-mini-fab::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 2px) * -1)}.tak-stroked-button::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .tak-button,.cdk-high-contrast-active .tak-flat-button,.cdk-high-contrast-active .tak-raised-button,.cdk-high-contrast-active .tak-icon-button,.cdk-high-contrast-active .tak-fab,.cdk-high-contrast-active .tak-mini-fab{outline:solid 1px}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i2.TakRipple,
      selector: '[tak-ripple], [takRipple]',
      inputs: [
        'takRippleColor',
        'takRippleUnbounded',
        'takRippleCentered',
        'takRippleRadius',
        'takRippleAnimation',
        'takRippleDisabled',
        'takRippleTrigger',
      ],
      exportAs: ['takRipple'],
    },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakAnchor,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: `a[tak-button], a[tak-raised-button], a[tak-icon-button], a[tak-fab],
             a[tak-mini-fab], a[tak-stroked-button], a[tak-flat-button]`,
          exportAs: 'takButton, takAnchor',
          host: {
            // Note that we ignore the user-specified tabindex when it's disabled for
            // consistency with the `tak-button` applied on native buttons where even
            // though they have an index, they're not tabbable.
            '[attr.tabindex]': 'disabled ? -1 : tabIndex',
            '[attr.disabled]': 'disabled || null',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[class._tak-animation-noopable]': '_animationMode === "NoopAnimations"',
            '[class.tak-button-disabled]': 'disabled',
            class: 'tak-focus-indicator',
          },
          inputs: ['disabled', 'disableRipple', 'color'],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<span class="tak-button-wrapper"><ng-content></ng-content></span>\n<span takRipple class="tak-button-ripple"\n      [class.tak-button-ripple-round]="isRoundButton || isIconButton"\n      [takRippleDisabled]="_isRippleDisabled()"\n      [takRippleCentered]="isIconButton"\n      [takRippleTrigger]="_getHostElement()"></span>\n<span class="tak-button-focus-overlay"></span>\n',
          styles: [
            '.tak-button .tak-button-focus-overlay,.tak-icon-button .tak-button-focus-overlay{opacity:0}.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:.04}@media(hover: none){.tak-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay,.tak-stroked-button:hover:not(.tak-button-disabled) .tak-button-focus-overlay{opacity:0}}.tak-button,.tak-icon-button,.tak-stroked-button,.tak-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-button.tak-button-disabled,.tak-icon-button.tak-button-disabled,.tak-stroked-button.tak-button-disabled,.tak-flat-button.tak-button-disabled{cursor:default}.tak-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-button.cdk-program-focused .tak-button-focus-overlay,.tak-icon-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-icon-button.cdk-program-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-stroked-button.cdk-program-focused .tak-button-focus-overlay,.tak-flat-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-flat-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-button::-moz-focus-inner,.tak-icon-button::-moz-focus-inner,.tak-stroked-button::-moz-focus-inner,.tak-flat-button::-moz-focus-inner{border:0}.tak-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button.tak-button-disabled{cursor:default}.tak-raised-button.cdk-keyboard-focused .tak-button-focus-overlay,.tak-raised-button.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-raised-button::-moz-focus-inner{border:0}.tak-raised-button._tak-animation-noopable{transition:none !important;animation:none !important}.tak-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.tak-stroked-button .tak-button-ripple.tak-ripple,.tak-stroked-button .tak-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.tak-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.tak-fab::-moz-focus-inner{border:0}.tak-fab.tak-button-disabled{cursor:default}.tak-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-fab::-moz-focus-inner{border:0}.tak-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-fab .tak-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.tak-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab.tak-button-disabled{cursor:default}.tak-mini-fab.cdk-keyboard-focused .tak-button-focus-overlay,.tak-mini-fab.cdk-program-focused .tak-button-focus-overlay{opacity:.12}.tak-mini-fab::-moz-focus-inner{border:0}.tak-mini-fab._tak-animation-noopable{transition:none !important;animation:none !important}.tak-mini-fab .tak-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.tak-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.tak-icon-button i,.tak-icon-button .tak-icon{line-height:24px}.tak-button-ripple.tak-ripple,.tak-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.tak-button-ripple.tak-ripple:not(:empty){transform:translateZ(0)}.tak-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._tak-animation-noopable .tak-button-focus-overlay{transition:none}.tak-button-ripple-round{border-radius:50%;z-index:1}.tak-button .tak-button-wrapper>*,.tak-flat-button .tak-button-wrapper>*,.tak-stroked-button .tak-button-wrapper>*,.tak-raised-button .tak-button-wrapper>*,.tak-icon-button .tak-button-wrapper>*,.tak-fab .tak-button-wrapper>*,.tak-mini-fab .tak-button-wrapper>*{vertical-align:middle}.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-prefix .tak-icon-button,.tak-form-field:not(.tak-form-field-appearance-legacy) .tak-form-field-suffix .tak-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.tak-flat-button::before,.tak-raised-button::before,.tak-fab::before,.tak-mini-fab::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 2px) * -1)}.tak-stroked-button::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .tak-button,.cdk-high-contrast-active .tak-flat-button,.cdk-high-contrast-active .tak-raised-button,.cdk-high-contrast-active .tak-icon-button,.cdk-high-contrast-active .tak-fab,.cdk-high-contrast-active .tak-mini-fab{outline:solid 1px}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.FocusMonitor },
      { type: i0.ElementRef },
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
        type: i0.NgZone,
        decorators: [
          {
            type: Optional,
          },
        ],
      },
    ];
  },
  propDecorators: {
    tabIndex: [
      {
        type: Input,
      },
    ],
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakButtonModule {}
TakButtonModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  declarations: [TakButton, TakAnchor],
  imports: [TakRippleModule, TakCommonModule],
  exports: [TakButton, TakAnchor, TakCommonModule],
});
TakButtonModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  imports: [TakRippleModule, TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakRippleModule, TakCommonModule],
          exports: [TakButton, TakAnchor, TakCommonModule],
          declarations: [TakButton, TakAnchor],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TakAnchor, TakButton, TakButtonModule };
//# sourceMappingURL=button.mjs.map
