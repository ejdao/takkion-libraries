import * as i3 from '@takkion/ng-cdk/observers';
import { ObserversModule } from '@takkion/ng-cdk/observers';
import * as i0 from '@angular/core';
import {
  InjectionToken,
  forwardRef,
  EventEmitter,
  Directive,
  Input,
  Output,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Attribute,
  Inject,
  Optional,
  ViewChild,
  NgModule,
} from '@angular/core';
import * as i2 from '@takkion/ng-material/core';
import {
  mixinTabIndex,
  mixinColor,
  mixinDisableRipple,
  mixinDisabled,
  TakRippleModule,
  TakCommonModule,
} from '@takkion/ng-material/core';
import * as i1 from '@takkion/ng-cdk/a11y';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, CheckboxRequiredValidator } from '@angular/forms';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token to be used to override the default options for `tak-slide-toggle`. */
const TAK_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken('tak-slide-toggle-default-options', {
  providedIn: 'root',
  factory: () => ({ disableToggleValue: false }),
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Increasing integer for generating unique ids for slide-toggle components.
let nextUniqueId = 0;
/** @docs-private */
const TAK_SLIDE_TOGGLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TakSlideToggle),
  multi: true,
};
/** Change event object emitted by a TakSlideToggle. */
class TakSlideToggleChange {
  constructor(
    /** The source TakSlideToggle of the event. */
    source,
    /** The new `checked` value of the TakSlideToggle. */
    checked
  ) {
    this.source = source;
    this.checked = checked;
  }
}
// Boilerplate for applying mixins to TakSlideToggle.
/** @docs-private */
const _TakSlideToggleMixinBase = mixinTabIndex(
  mixinColor(
    mixinDisableRipple(
      mixinDisabled(
        class {
          constructor(_elementRef) {
            this._elementRef = _elementRef;
          }
        }
      )
    )
  )
);
class _TakSlideToggleBase extends _TakSlideToggleMixinBase {
  constructor(
    elementRef,
    _focusMonitor,
    _changeDetectorRef,
    tabIndex,
    defaults,
    animationMode,
    idPrefix
  ) {
    super(elementRef);
    this._focusMonitor = _focusMonitor;
    this._changeDetectorRef = _changeDetectorRef;
    this.defaults = defaults;
    this._onChange = _ => {};
    this._onTouched = () => {};
    this._required = false;
    this._checked = false;
    /** Name value will be applied to the input element if present. */
    this.name = null;
    /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
    this.labelPosition = 'after';
    /** Used to set the aria-label attribute on the underlying input element. */
    this.ariaLabel = null;
    /** Used to set the aria-labelledby attribute on the underlying input element. */
    this.ariaLabelledby = null;
    /** An event will be dispatched each time the slide-toggle changes its value. */
    this.change = new EventEmitter();
    /**
     * An event will be dispatched each time the slide-toggle input is toggled.
     * This event is always emitted when the user toggles the slide toggle, but this does not mean
     * the slide toggle's value has changed.
     */
    this.toggleChange = new EventEmitter();
    this.tabIndex = parseInt(tabIndex) || 0;
    this.color = this.defaultColor = defaults.color || 'accent';
    this._noopAnimations = animationMode === 'NoopAnimations';
    this.id = this._uniqueId = `${idPrefix}${++nextUniqueId}`;
  }
  /** Whether the slide-toggle is required. */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
  }
  /** Whether the slide-toggle element is checked or not. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  /** Returns the unique id for the visual hidden input. */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
      if (focusOrigin === 'keyboard' || focusOrigin === 'program') {
        this._focused = true;
      } else if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state
        // change (such as a form control's ng-touched) will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => {
          this._focused = false;
          this._onTouched();
          this._changeDetectorRef.markForCheck();
        });
      }
    });
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(value) {
    this.checked = !!value;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  /** Toggles the checked state of the slide-toggle. */
  toggle() {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }
  /**
   * Emits a change event on the `change` output. Also notifies the FormControl about the change.
   */
  _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
  }
}
_TakSlideToggleBase.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakSlideToggleBase,
  deps: 'invalid',
  target: i0.ɵɵFactoryTarget.Directive,
});
_TakSlideToggleBase.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: _TakSlideToggleBase,
  inputs: {
    name: 'name',
    id: 'id',
    labelPosition: 'labelPosition',
    ariaLabel: ['aria-label', 'ariaLabel'],
    ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
    ariaDescribedby: ['aria-describedby', 'ariaDescribedby'],
    required: 'required',
    checked: 'checked',
  },
  outputs: { change: 'change', toggleChange: 'toggleChange' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakSlideToggleBase,
  decorators: [
    {
      type: Directive,
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i1.FocusMonitor },
      { type: i0.ChangeDetectorRef },
      { type: undefined },
      { type: undefined },
      { type: undefined },
      { type: undefined },
    ];
  },
  propDecorators: {
    name: [
      {
        type: Input,
      },
    ],
    id: [
      {
        type: Input,
      },
    ],
    labelPosition: [
      {
        type: Input,
      },
    ],
    ariaLabel: [
      {
        type: Input,
        args: ['aria-label'],
      },
    ],
    ariaLabelledby: [
      {
        type: Input,
        args: ['aria-labelledby'],
      },
    ],
    ariaDescribedby: [
      {
        type: Input,
        args: ['aria-describedby'],
      },
    ],
    required: [
      {
        type: Input,
      },
    ],
    checked: [
      {
        type: Input,
      },
    ],
    change: [
      {
        type: Output,
      },
    ],
    toggleChange: [
      {
        type: Output,
      },
    ],
  },
});
/** Represents a slidable "switch" toggle that can be moved between on and off. */
class TakSlideToggle extends _TakSlideToggleBase {
  constructor(elementRef, focusMonitor, changeDetectorRef, tabIndex, defaults, animationMode) {
    super(
      elementRef,
      focusMonitor,
      changeDetectorRef,
      tabIndex,
      defaults,
      animationMode,
      'tak-slide-toggle-'
    );
  }
  _createChangeEvent(isChecked) {
    return new TakSlideToggleChange(this, isChecked);
  }
  /** Method being called whenever the underlying input emits a change event. */
  _onChangeEvent(event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the component's `change` output.
    event.stopPropagation();
    this.toggleChange.emit();
    // When the slide toggle's config disables toggle change event by setting
    // `disableToggleValue: true`, the slide toggle's value does not change, and the
    // checked state of the underlying input needs to be changed back.
    if (this.defaults.disableToggleValue) {
      this._inputElement.nativeElement.checked = this.checked;
      return;
    }
    // Sync the value from the underlying input element with the component instance.
    this.checked = this._inputElement.nativeElement.checked;
    // Emit our custom change event only if the underlying input emitted one. This ensures that
    // there is no change event, when the checked state changes programmatically.
    this._emitChangeEvent();
  }
  /** Method being called whenever the slide-toggle has been clicked. */
  _onInputClick(event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `slide-toggle` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }
  /** Focuses the slide-toggle. */
  focus(options, origin) {
    if (origin) {
      this._focusMonitor.focusVia(this._inputElement, origin, options);
    } else {
      this._inputElement.nativeElement.focus(options);
    }
  }
  /** Method being called whenever the label text changes. */
  _onLabelTextChange() {
    // Since the event of the `cdkObserveContent` directive runs outside of the zone, the
    // slide-toggle component will be only marked for check, but no actual change detection runs
    // automatically. Instead of going back into the zone in order to trigger a change detection
    // which causes *all* components to be checked (if explicitly marked or not using OnPush),
    // we only trigger an explicit change detection for the slide-toggle view and its children.
    this._changeDetectorRef.detectChanges();
  }
}
TakSlideToggle.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggle,
  deps: [
    { token: i0.ElementRef },
    { token: i1.FocusMonitor },
    { token: i0.ChangeDetectorRef },
    { token: 'tabindex', attribute: true },
    { token: TAK_SLIDE_TOGGLE_DEFAULT_OPTIONS },
    { token: ANIMATION_MODULE_TYPE, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakSlideToggle.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakSlideToggle,
  selector: 'tak-slide-toggle',
  inputs: {
    disabled: 'disabled',
    disableRipple: 'disableRipple',
    color: 'color',
    tabIndex: 'tabIndex',
  },
  host: {
    properties: {
      id: 'id',
      'attr.tabindex': 'null',
      'attr.aria-label': 'null',
      'attr.aria-labelledby': 'null',
      'attr.name': 'null',
      'class.tak-checked': 'checked',
      'class.tak-disabled': 'disabled',
      'class.tak-slide-toggle-label-before': 'labelPosition == "before"',
      'class._tak-animation-noopable': '_noopAnimations',
    },
    classAttribute: 'tak-slide-toggle',
  },
  providers: [TAK_SLIDE_TOGGLE_VALUE_ACCESSOR],
  viewQueries: [
    { propertyName: '_inputElement', first: true, predicate: ['input'], descendants: true },
  ],
  exportAs: ['takSlideToggle'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<label [attr.for]="inputId" class="tak-slide-toggle-label" #label>\n  <span class="tak-slide-toggle-bar"\n       [class.tak-slide-toggle-bar-no-side-margin]="!labelContent.textContent || !labelContent.textContent.trim()">\n\n    <input #input class="tak-slide-toggle-input cdk-visually-hidden" type="checkbox"\n           role="switch"\n           [id]="inputId"\n           [required]="required"\n           [tabIndex]="tabIndex"\n           [checked]="checked"\n           [disabled]="disabled"\n           [attr.name]="name"\n           [attr.aria-checked]="checked"\n           [attr.aria-label]="ariaLabel"\n           [attr.aria-labelledby]="ariaLabelledby"\n           [attr.aria-describedby]="ariaDescribedby"\n           (change)="_onChangeEvent($event)"\n           (click)="_onInputClick($event)">\n\n    <span class="tak-slide-toggle-thumb-container">\n      <span class="tak-slide-toggle-thumb"></span>\n      <span class="tak-slide-toggle-ripple tak-focus-indicator" tak-ripple\n           [takRippleTrigger]="label"\n           [takRippleDisabled]="disableRipple || disabled"\n           [takRippleCentered]="true"\n           [takRippleRadius]="20"\n           [takRippleAnimation]="{enterDuration: _noopAnimations ? 0 : 150}">\n\n        <span class="tak-ripple-element tak-slide-toggle-persistent-ripple"></span>\n      </span>\n    </span>\n\n  </span>\n\n  <span class="tak-slide-toggle-content" #labelContent (cdkObserveContent)="_onLabelTextChange()">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style="display:none">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n',
  styles: [
    '.tak-slide-toggle{display:inline-block;height:24px;max-width:100%;line-height:24px;white-space:nowrap;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-slide-toggle.tak-checked .tak-slide-toggle-thumb-container{transform:translate3d(16px, 0, 0)}[dir=rtl] .tak-slide-toggle.tak-checked .tak-slide-toggle-thumb-container{transform:translate3d(-16px, 0, 0)}.tak-slide-toggle.tak-disabled{opacity:.38}.tak-slide-toggle.tak-disabled .tak-slide-toggle-label,.tak-slide-toggle.tak-disabled .tak-slide-toggle-thumb-container{cursor:default}.tak-slide-toggle-label{-webkit-user-select:none;user-select:none;display:flex;flex:1;flex-direction:row;align-items:center;height:inherit;cursor:pointer}.tak-slide-toggle-content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tak-slide-toggle-label-before .tak-slide-toggle-label{order:1}.tak-slide-toggle-label-before .tak-slide-toggle-bar{order:2}[dir=rtl] .tak-slide-toggle-label-before .tak-slide-toggle-bar,.tak-slide-toggle-bar{margin-right:8px;margin-left:0}[dir=rtl] .tak-slide-toggle-bar,.tak-slide-toggle-label-before .tak-slide-toggle-bar{margin-left:8px;margin-right:0}.tak-slide-toggle-bar-no-side-margin{margin-left:0;margin-right:0}.tak-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0, 0, 0);transition:all 80ms linear;transition-property:transform}._tak-animation-noopable .tak-slide-toggle-thumb-container{transition:none}[dir=rtl] .tak-slide-toggle-thumb-container{left:auto;right:0}.tak-slide-toggle-thumb{height:20px;width:20px;border-radius:50%;display:block}.tak-slide-toggle-bar{position:relative;width:36px;height:14px;flex-shrink:0;border-radius:8px}.tak-slide-toggle-input{bottom:0;left:10px}[dir=rtl] .tak-slide-toggle-input{left:auto;right:10px}.tak-slide-toggle-bar,.tak-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}._tak-animation-noopable .tak-slide-toggle-bar,._tak-animation-noopable .tak-slide-toggle-thumb{transition:none}.tak-slide-toggle .tak-slide-toggle-ripple{position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.tak-slide-toggle .tak-slide-toggle-ripple .tak-ripple-element:not(.tak-slide-toggle-persistent-ripple){opacity:.12}.tak-slide-toggle-persistent-ripple{width:100%;height:100%;transform:none}.tak-slide-toggle-bar:hover .tak-slide-toggle-persistent-ripple{opacity:.04}.tak-slide-toggle:not(.tak-disabled).cdk-keyboard-focused .tak-slide-toggle-persistent-ripple{opacity:.12}.tak-slide-toggle-persistent-ripple,.tak-slide-toggle.tak-disabled .tak-slide-toggle-bar:hover .tak-slide-toggle-persistent-ripple{opacity:0}@media(hover: none){.tak-slide-toggle-bar:hover .tak-slide-toggle-persistent-ripple{display:none}}.tak-slide-toggle-input:focus~.tak-slide-toggle-thumb-container .tak-focus-indicator::before{content:""}.cdk-high-contrast-active .tak-slide-toggle-thumb,.cdk-high-contrast-active .tak-slide-toggle-bar{border:1px solid}',
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
    {
      kind: 'directive',
      type: i3.CdkObserveContent,
      selector: '[cdkObserveContent]',
      inputs: ['cdkObserveContentDisabled', 'debounce'],
      outputs: ['cdkObserveContent'],
      exportAs: ['cdkObserveContent'],
    },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggle,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-slide-toggle',
          exportAs: 'takSlideToggle',
          host: {
            class: 'tak-slide-toggle',
            '[id]': 'id',
            // Needs to be removed since it causes some a11y issues (see #21266).
            '[attr.tabindex]': 'null',
            '[attr.aria-label]': 'null',
            '[attr.aria-labelledby]': 'null',
            '[attr.name]': 'null',
            '[class.tak-checked]': 'checked',
            '[class.tak-disabled]': 'disabled',
            '[class.tak-slide-toggle-label-before]': 'labelPosition == "before"',
            '[class._tak-animation-noopable]': '_noopAnimations',
          },
          providers: [TAK_SLIDE_TOGGLE_VALUE_ACCESSOR],
          inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<label [attr.for]="inputId" class="tak-slide-toggle-label" #label>\n  <span class="tak-slide-toggle-bar"\n       [class.tak-slide-toggle-bar-no-side-margin]="!labelContent.textContent || !labelContent.textContent.trim()">\n\n    <input #input class="tak-slide-toggle-input cdk-visually-hidden" type="checkbox"\n           role="switch"\n           [id]="inputId"\n           [required]="required"\n           [tabIndex]="tabIndex"\n           [checked]="checked"\n           [disabled]="disabled"\n           [attr.name]="name"\n           [attr.aria-checked]="checked"\n           [attr.aria-label]="ariaLabel"\n           [attr.aria-labelledby]="ariaLabelledby"\n           [attr.aria-describedby]="ariaDescribedby"\n           (change)="_onChangeEvent($event)"\n           (click)="_onInputClick($event)">\n\n    <span class="tak-slide-toggle-thumb-container">\n      <span class="tak-slide-toggle-thumb"></span>\n      <span class="tak-slide-toggle-ripple tak-focus-indicator" tak-ripple\n           [takRippleTrigger]="label"\n           [takRippleDisabled]="disableRipple || disabled"\n           [takRippleCentered]="true"\n           [takRippleRadius]="20"\n           [takRippleAnimation]="{enterDuration: _noopAnimations ? 0 : 150}">\n\n        <span class="tak-ripple-element tak-slide-toggle-persistent-ripple"></span>\n      </span>\n    </span>\n\n  </span>\n\n  <span class="tak-slide-toggle-content" #labelContent (cdkObserveContent)="_onLabelTextChange()">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style="display:none">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n',
          styles: [
            '.tak-slide-toggle{display:inline-block;height:24px;max-width:100%;line-height:24px;white-space:nowrap;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-slide-toggle.tak-checked .tak-slide-toggle-thumb-container{transform:translate3d(16px, 0, 0)}[dir=rtl] .tak-slide-toggle.tak-checked .tak-slide-toggle-thumb-container{transform:translate3d(-16px, 0, 0)}.tak-slide-toggle.tak-disabled{opacity:.38}.tak-slide-toggle.tak-disabled .tak-slide-toggle-label,.tak-slide-toggle.tak-disabled .tak-slide-toggle-thumb-container{cursor:default}.tak-slide-toggle-label{-webkit-user-select:none;user-select:none;display:flex;flex:1;flex-direction:row;align-items:center;height:inherit;cursor:pointer}.tak-slide-toggle-content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tak-slide-toggle-label-before .tak-slide-toggle-label{order:1}.tak-slide-toggle-label-before .tak-slide-toggle-bar{order:2}[dir=rtl] .tak-slide-toggle-label-before .tak-slide-toggle-bar,.tak-slide-toggle-bar{margin-right:8px;margin-left:0}[dir=rtl] .tak-slide-toggle-bar,.tak-slide-toggle-label-before .tak-slide-toggle-bar{margin-left:8px;margin-right:0}.tak-slide-toggle-bar-no-side-margin{margin-left:0;margin-right:0}.tak-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0, 0, 0);transition:all 80ms linear;transition-property:transform}._tak-animation-noopable .tak-slide-toggle-thumb-container{transition:none}[dir=rtl] .tak-slide-toggle-thumb-container{left:auto;right:0}.tak-slide-toggle-thumb{height:20px;width:20px;border-radius:50%;display:block}.tak-slide-toggle-bar{position:relative;width:36px;height:14px;flex-shrink:0;border-radius:8px}.tak-slide-toggle-input{bottom:0;left:10px}[dir=rtl] .tak-slide-toggle-input{left:auto;right:10px}.tak-slide-toggle-bar,.tak-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}._tak-animation-noopable .tak-slide-toggle-bar,._tak-animation-noopable .tak-slide-toggle-thumb{transition:none}.tak-slide-toggle .tak-slide-toggle-ripple{position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.tak-slide-toggle .tak-slide-toggle-ripple .tak-ripple-element:not(.tak-slide-toggle-persistent-ripple){opacity:.12}.tak-slide-toggle-persistent-ripple{width:100%;height:100%;transform:none}.tak-slide-toggle-bar:hover .tak-slide-toggle-persistent-ripple{opacity:.04}.tak-slide-toggle:not(.tak-disabled).cdk-keyboard-focused .tak-slide-toggle-persistent-ripple{opacity:.12}.tak-slide-toggle-persistent-ripple,.tak-slide-toggle.tak-disabled .tak-slide-toggle-bar:hover .tak-slide-toggle-persistent-ripple{opacity:0}@media(hover: none){.tak-slide-toggle-bar:hover .tak-slide-toggle-persistent-ripple{display:none}}.tak-slide-toggle-input:focus~.tak-slide-toggle-thumb-container .tak-focus-indicator::before{content:""}.cdk-high-contrast-active .tak-slide-toggle-thumb,.cdk-high-contrast-active .tak-slide-toggle-bar{border:1px solid}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i1.FocusMonitor },
      { type: i0.ChangeDetectorRef },
      {
        type: undefined,
        decorators: [
          {
            type: Attribute,
            args: ['tabindex'],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [TAK_SLIDE_TOGGLE_DEFAULT_OPTIONS],
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
            args: [ANIMATION_MODULE_TYPE],
          },
        ],
      },
    ];
  },
  propDecorators: {
    _inputElement: [
      {
        type: ViewChild,
        args: ['input'],
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
const TAK_SLIDE_TOGGLE_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => TakSlideToggleRequiredValidator),
  multi: true,
};
/**
 * Validator for Material slide-toggle components with the required attribute in a
 * template-driven form. The default validator for required form controls asserts
 * that the control value is not undefined but that is not appropriate for a slide-toggle
 * where the value is always defined.
 *
 * Required slide-toggle form controls are valid when checked.
 */
class TakSlideToggleRequiredValidator extends CheckboxRequiredValidator {}
TakSlideToggleRequiredValidator.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggleRequiredValidator,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakSlideToggleRequiredValidator.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakSlideToggleRequiredValidator,
  selector:
    'tak-slide-toggle[required][formControlName],\n             tak-slide-toggle[required][formControl], tak-slide-toggle[required][ngModel]',
  providers: [TAK_SLIDE_TOGGLE_REQUIRED_VALIDATOR],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggleRequiredValidator,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: `tak-slide-toggle[required][formControlName],
             tak-slide-toggle[required][formControl], tak-slide-toggle[required][ngModel]`,
          providers: [TAK_SLIDE_TOGGLE_REQUIRED_VALIDATOR],
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
/** This module is used by both original and MDC-based slide-toggle implementations. */
class _TakSlideToggleRequiredValidatorModule {}
_TakSlideToggleRequiredValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakSlideToggleRequiredValidatorModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
_TakSlideToggleRequiredValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakSlideToggleRequiredValidatorModule,
  declarations: [TakSlideToggleRequiredValidator],
  exports: [TakSlideToggleRequiredValidator],
});
_TakSlideToggleRequiredValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakSlideToggleRequiredValidatorModule,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakSlideToggleRequiredValidatorModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          exports: [TakSlideToggleRequiredValidator],
          declarations: [TakSlideToggleRequiredValidator],
        },
      ],
    },
  ],
});
class TakSlideToggleModule {}
TakSlideToggleModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggleModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakSlideToggleModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggleModule,
  declarations: [TakSlideToggle],
  imports: [
    _TakSlideToggleRequiredValidatorModule,
    TakRippleModule,
    TakCommonModule,
    ObserversModule,
  ],
  exports: [_TakSlideToggleRequiredValidatorModule, TakSlideToggle, TakCommonModule],
});
TakSlideToggleModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggleModule,
  imports: [
    _TakSlideToggleRequiredValidatorModule,
    TakRippleModule,
    TakCommonModule,
    ObserversModule,
    _TakSlideToggleRequiredValidatorModule,
    TakCommonModule,
  ],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSlideToggleModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [
            _TakSlideToggleRequiredValidatorModule,
            TakRippleModule,
            TakCommonModule,
            ObserversModule,
          ],
          exports: [_TakSlideToggleRequiredValidatorModule, TakSlideToggle, TakCommonModule],
          declarations: [TakSlideToggle],
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

export {
  TAK_SLIDE_TOGGLE_DEFAULT_OPTIONS,
  TAK_SLIDE_TOGGLE_REQUIRED_VALIDATOR,
  TAK_SLIDE_TOGGLE_VALUE_ACCESSOR,
  TakSlideToggle,
  TakSlideToggleChange,
  TakSlideToggleModule,
  TakSlideToggleRequiredValidator,
  _TakSlideToggleBase,
  _TakSlideToggleRequiredValidatorModule,
};
//# sourceMappingURL=slide-toggle.mjs.map
