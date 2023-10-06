import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import * as i0 from '@angular/core';
import {
  InjectionToken,
  forwardRef,
  EventEmitter,
  Directive,
  Input,
  Output,
  ViewChild,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Attribute,
  Optional,
  Inject,
  NgModule,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, CheckboxRequiredValidator } from '@angular/forms';
import * as i2 from '@takkion/ng-material/core';
import {
  mixinTabIndex,
  mixinColor,
  mixinDisableRipple,
  mixinDisabled,
  TakRipple,
  TakRippleModule,
  TakCommonModule,
} from '@takkion/ng-material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as i1 from '@takkion/ng-cdk/a11y';
import * as i3 from '@takkion/ng-cdk/observers';
import { ObserversModule } from '@takkion/ng-cdk/observers';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token to be used to override the default options for `tak-checkbox`. */
const TAK_CHECKBOX_DEFAULT_OPTIONS = new InjectionToken('tak-checkbox-default-options', {
  providedIn: 'root',
  factory: TAK_CHECKBOX_DEFAULT_OPTIONS_FACTORY,
});
/** @docs-private */
function TAK_CHECKBOX_DEFAULT_OPTIONS_FACTORY() {
  return {
    color: 'accent',
    clickAction: 'check-indeterminate',
  };
}

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;
// Default checkbox configuration.
const defaults = TAK_CHECKBOX_DEFAULT_OPTIONS_FACTORY();
/**
 * Provider Expression that allows tak-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const TAK_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TakCheckbox),
  multi: true,
};
/** Change event object emitted by TakCheckbox. */
class TakCheckboxChange {}
// Boilerplate for applying mixins to TakCheckbox.
/** @docs-private */
const _TakCheckboxMixinBase = mixinTabIndex(
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
class _TakCheckboxBase extends _TakCheckboxMixinBase {
  constructor(
    idPrefix,
    elementRef,
    _changeDetectorRef,
    _ngZone,
    tabIndex,
    _animationMode,
    _options
  ) {
    super(elementRef);
    this._changeDetectorRef = _changeDetectorRef;
    this._ngZone = _ngZone;
    this._animationMode = _animationMode;
    this._options = _options;
    /**
     * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
     * take precedence so this may be omitted.
     */
    this.ariaLabel = '';
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    this.ariaLabelledby = null;
    /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
    this.labelPosition = 'after';
    /** Name value will be applied to the input element if present */
    this.name = null;
    /** Event emitted when the checkbox's `checked` value changes. */
    this.change = new EventEmitter();
    /** Event emitted when the checkbox's `indeterminate` value changes. */
    this.indeterminateChange = new EventEmitter();
    /**
     * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
     * @docs-private
     */
    this._onTouched = () => {};
    this._currentAnimationClass = '';
    this._currentCheckState = 0 /* TransitionCheckState.Init */;
    this._controlValueAccessorChangeFn = () => {};
    this._checked = false;
    this._disabled = false;
    this._indeterminate = false;
    this._options = this._options || defaults;
    this.color = this.defaultColor = this._options.color || defaults.color;
    this.tabIndex = parseInt(tabIndex) || 0;
    this.id = this._uniqueId = `${idPrefix}${++nextUniqueId}`;
  }
  /** Returns the unique id for the visual hidden input. */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  /** Whether the checkbox is required. */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
  }
  ngAfterViewInit() {
    this._syncIndeterminate(this._indeterminate);
  }
  /** Whether the checkbox is checked. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    const checked = coerceBooleanProperty(value);
    if (checked != this.checked) {
      this._checked = checked;
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * Whether the checkbox is disabled. This fully overrides the implementation provided by
   * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this.disabled) {
      this._disabled = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  get indeterminate() {
    return this._indeterminate;
  }
  set indeterminate(value) {
    const changed = value != this._indeterminate;
    this._indeterminate = coerceBooleanProperty(value);
    if (changed) {
      if (this._indeterminate) {
        this._transitionCheckState(3 /* TransitionCheckState.Indeterminate */);
      } else {
        this._transitionCheckState(
          this.checked
            ? 1 /* TransitionCheckState.Checked */
            : 2 /* TransitionCheckState.Unchecked */
        );
      }
      this.indeterminateChange.emit(this._indeterminate);
    }
    this._syncIndeterminate(this._indeterminate);
  }
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  /** Method being called whenever the label text changes. */
  _onLabelTextChange() {
    // Since the event of the `cdkObserveContent` directive runs outside of the zone, the checkbox
    // component will be only marked for check, but no actual change detection runs automatically.
    // Instead of going back into the zone in order to trigger a change detection which causes
    // *all* components to be checked (if explicitly marked or not using OnPush), we only trigger
    // an explicit change detection for the checkbox view and its children.
    this._changeDetectorRef.detectChanges();
  }
  // Implemented as part of ControlValueAccessor.
  writeValue(value) {
    this.checked = !!value;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  _getAriaChecked() {
    if (this.checked) {
      return 'true';
    }
    return this.indeterminate ? 'mixed' : 'false';
  }
  _transitionCheckState(newState) {
    let oldState = this._currentCheckState;
    let element = this._getAnimationTargetElement();
    if (oldState === newState || !element) {
      return;
    }
    if (this._currentAnimationClass) {
      element.classList.remove(this._currentAnimationClass);
    }
    this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(
      oldState,
      newState
    );
    this._currentCheckState = newState;
    if (this._currentAnimationClass.length > 0) {
      element.classList.add(this._currentAnimationClass);
      // Remove the animation class to avoid animation when the checkbox is moved between containers
      const animationClass = this._currentAnimationClass;
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          element.classList.remove(animationClass);
        }, 1000);
      });
    }
  }
  _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
    // Assigning the value again here is redundant, but we have to do it in case it was
    // changed inside the `change` listener which will cause the input to be out of sync.
    if (this._inputElement) {
      this._inputElement.nativeElement.checked = this.checked;
    }
  }
  /** Toggles the `checked` state of the checkbox. */
  toggle() {
    this.checked = !this.checked;
    this._controlValueAccessorChangeFn(this.checked);
  }
  _handleInputClick() {
    var _a;
    const clickAction = (_a = this._options) === null || _a === void 0 ? void 0 : _a.clickAction;
    // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
    if (!this.disabled && clickAction !== 'noop') {
      // When user manually click on the checkbox, `indeterminate` is set to false.
      if (this.indeterminate && clickAction !== 'check') {
        Promise.resolve().then(() => {
          this._indeterminate = false;
          this.indeterminateChange.emit(this._indeterminate);
        });
      }
      this._checked = !this._checked;
      this._transitionCheckState(
        this._checked
          ? 1 /* TransitionCheckState.Checked */
          : 2 /* TransitionCheckState.Unchecked */
      );
      // Emit our custom change event if the native input emitted one.
      // It is important to only emit it, if the native input triggered one, because
      // we don't want to trigger a change event, when the `checked` variable changes for example.
      this._emitChangeEvent();
    } else if (!this.disabled && clickAction === 'noop') {
      // Reset native input when clicked with noop. The native checkbox becomes checked after
      // click, reset it to be align with `checked` value of `tak-checkbox`.
      this._inputElement.nativeElement.checked = this.checked;
      this._inputElement.nativeElement.indeterminate = this.indeterminate;
    }
  }
  _onInteractionEvent(event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }
  _onBlur() {
    // When a focused element becomes disabled, the browser *immediately* fires a blur event.
    // Angular does not expect events to be raised during change detection, so any state change
    // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
    // See https://github.com/angular/angular/issues/17793. To work around this, we defer
    // telling the form control it has been touched until the next tick.
    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }
  _getAnimationClassForCheckStateTransition(oldState, newState) {
    // Don't transition if animations are disabled.
    if (this._animationMode === 'NoopAnimations') {
      return '';
    }
    switch (oldState) {
      case 0 /* TransitionCheckState.Init */:
        // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
        // [checked] bound to it.
        if (newState === 1 /* TransitionCheckState.Checked */) {
          return this._animationClasses.uncheckedToChecked;
        } else if (newState == 3 /* TransitionCheckState.Indeterminate */) {
          return this._checked
            ? this._animationClasses.checkedToIndeterminate
            : this._animationClasses.uncheckedToIndeterminate;
        }
        break;
      case 2 /* TransitionCheckState.Unchecked */:
        return newState === 1 /* TransitionCheckState.Checked */
          ? this._animationClasses.uncheckedToChecked
          : this._animationClasses.uncheckedToIndeterminate;
      case 1 /* TransitionCheckState.Checked */:
        return newState === 2 /* TransitionCheckState.Unchecked */
          ? this._animationClasses.checkedToUnchecked
          : this._animationClasses.checkedToIndeterminate;
      case 3 /* TransitionCheckState.Indeterminate */:
        return newState === 1 /* TransitionCheckState.Checked */
          ? this._animationClasses.indeterminateToChecked
          : this._animationClasses.indeterminateToUnchecked;
    }
    return '';
  }
  /**
   * Syncs the indeterminate value with the checkbox DOM node.
   *
   * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
   * property is supported on an element boils down to `if (propName in element)`. Domino's
   * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
   * server-side rendering.
   */
  _syncIndeterminate(value) {
    const nativeCheckbox = this._inputElement;
    if (nativeCheckbox) {
      nativeCheckbox.nativeElement.indeterminate = value;
    }
  }
}
_TakCheckboxBase.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxBase,
  deps: 'invalid',
  target: i0.ɵɵFactoryTarget.Directive,
});
_TakCheckboxBase.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: _TakCheckboxBase,
  inputs: {
    ariaLabel: ['aria-label', 'ariaLabel'],
    ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
    ariaDescribedby: ['aria-describedby', 'ariaDescribedby'],
    id: 'id',
    required: 'required',
    labelPosition: 'labelPosition',
    name: 'name',
    value: 'value',
    checked: 'checked',
    disabled: 'disabled',
    indeterminate: 'indeterminate',
  },
  outputs: { change: 'change', indeterminateChange: 'indeterminateChange' },
  viewQueries: [
    { propertyName: '_inputElement', first: true, predicate: ['input'], descendants: true },
    { propertyName: '_labelElement', first: true, predicate: ['label'], descendants: true },
    { propertyName: 'ripple', first: true, predicate: TakRipple, descendants: true },
  ],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxBase,
  decorators: [
    {
      type: Directive,
    },
  ],
  ctorParameters: function () {
    return [
      { type: undefined },
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      { type: i0.NgZone },
      { type: undefined },
      { type: undefined },
      { type: undefined },
    ];
  },
  propDecorators: {
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
    id: [
      {
        type: Input,
      },
    ],
    required: [
      {
        type: Input,
      },
    ],
    labelPosition: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    change: [
      {
        type: Output,
      },
    ],
    indeterminateChange: [
      {
        type: Output,
      },
    ],
    value: [
      {
        type: Input,
      },
    ],
    _inputElement: [
      {
        type: ViewChild,
        args: ['input'],
      },
    ],
    _labelElement: [
      {
        type: ViewChild,
        args: ['label'],
      },
    ],
    ripple: [
      {
        type: ViewChild,
        args: [TakRipple],
      },
    ],
    checked: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    indeterminate: [
      {
        type: Input,
      },
    ],
  },
});
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A TakCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://material.io/design/components/selection-controls.html
 */
class TakCheckbox extends _TakCheckboxBase {
  constructor(
    elementRef,
    changeDetectorRef,
    _focusMonitor,
    ngZone,
    tabIndex,
    animationMode,
    options
  ) {
    super('tak-checkbox-', elementRef, changeDetectorRef, ngZone, tabIndex, animationMode, options);
    this._focusMonitor = _focusMonitor;
    this._animationClasses = {
      uncheckedToChecked: 'tak-checkbox-anim-unchecked-checked',
      uncheckedToIndeterminate: 'tak-checkbox-anim-unchecked-indeterminate',
      checkedToUnchecked: 'tak-checkbox-anim-checked-unchecked',
      checkedToIndeterminate: 'tak-checkbox-anim-checked-indeterminate',
      indeterminateToChecked: 'tak-checkbox-anim-indeterminate-checked',
      indeterminateToUnchecked: 'tak-checkbox-anim-indeterminate-unchecked',
    };
  }
  _createChangeEvent(isChecked) {
    const event = new TakCheckboxChange();
    event.source = this;
    event.checked = isChecked;
    return event;
  }
  _getAnimationTargetElement() {
    return this._elementRef.nativeElement;
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this._onBlur();
      }
    });
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   * Do not toggle on (change) event since IE doesn't fire change event when
   *   indeterminate checkbox is clicked.
   * @param event
   */
  _onInputClick(event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `checkbox` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
    super._handleInputClick();
  }
  /** Focuses the checkbox. */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._inputElement, origin, options);
    } else {
      this._inputElement.nativeElement.focus(options);
    }
  }
}
TakCheckbox.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckbox,
  deps: [
    { token: i0.ElementRef },
    { token: i0.ChangeDetectorRef },
    { token: i1.FocusMonitor },
    { token: i0.NgZone },
    { token: 'tabindex', attribute: true },
    { token: ANIMATION_MODULE_TYPE, optional: true },
    { token: TAK_CHECKBOX_DEFAULT_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCheckbox,
  selector: 'tak-checkbox',
  inputs: { disableRipple: 'disableRipple', color: 'color', tabIndex: 'tabIndex' },
  host: {
    properties: {
      id: 'id',
      'attr.tabindex': 'null',
      'attr.aria-label': 'null',
      'attr.aria-labelledby': 'null',
      'class.tak-checkbox-indeterminate': 'indeterminate',
      'class.tak-checkbox-checked': 'checked',
      'class.tak-checkbox-disabled': 'disabled',
      'class.tak-checkbox-label-before': 'labelPosition == "before"',
      'class._tak-animation-noopable': "_animationMode === 'NoopAnimations'",
    },
    classAttribute: 'tak-checkbox',
  },
  providers: [TAK_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  exportAs: ['takCheckbox'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<label [attr.for]="inputId" class="tak-checkbox-layout" #label>\n  <span class="tak-checkbox-inner-container"\n       [class.tak-checkbox-inner-container-no-side-margin]="!checkboxLabel.textContent || !checkboxLabel.textContent.trim()">\n    <input #input\n           class="tak-checkbox-input cdk-visually-hidden" type="checkbox"\n           [id]="inputId"\n           [required]="required"\n           [checked]="checked"\n           [attr.value]="value"\n           [disabled]="disabled"\n           [attr.name]="name"\n           [tabIndex]="tabIndex"\n           [attr.aria-label]="ariaLabel || null"\n           [attr.aria-labelledby]="ariaLabelledby"\n           [attr.aria-checked]="_getAriaChecked()"\n           [attr.aria-describedby]="ariaDescribedby"\n           (change)="_onInteractionEvent($event)"\n           (click)="_onInputClick($event)">\n    <span takRipple class="tak-checkbox-ripple tak-focus-indicator"\n         [takRippleTrigger]="label"\n         [takRippleDisabled]="_isRippleDisabled()"\n         [takRippleRadius]="20"\n         [takRippleCentered]="true"\n         [takRippleAnimation]="{enterDuration: _animationMode === \'NoopAnimations\' ? 0 : 150}">\n      <span class="tak-ripple-element tak-checkbox-persistent-ripple"></span>\n    </span>\n    <span class="tak-checkbox-frame"></span>\n    <span class="tak-checkbox-background">\n      <svg version="1.1"\n           focusable="false"\n           class="tak-checkbox-checkmark"\n           viewBox="0 0 24 24"\n           aria-hidden="true">\n        <path class="tak-checkbox-checkmark-path"\n              fill="none"\n              stroke="white"\n              d="M4.1,12.7 9,17.6 20.3,6.3"/>\n      </svg>\n      <!-- Element for rendering the indeterminate state checkbox. -->\n      <span class="tak-checkbox-mixedmark"></span>\n    </span>\n  </span>\n  <span class="tak-checkbox-label" #checkboxLabel (cdkObserveContent)="_onLabelTextChange()">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style="display:none">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n',
  styles: [
    '@keyframes tak-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes tak-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes tak-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes tak-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes tak-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes tak-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes tak-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes tak-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes tak-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes tak-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.tak-checkbox-background,.tak-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.tak-checkbox{display:inline-block;transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.tak-checkbox._tak-animation-noopable{transition:none !important;animation:none !important}.tak-checkbox .tak-ripple-element:not(.tak-checkbox-persistent-ripple){opacity:.16}.tak-checkbox .tak-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.tak-checkbox-layout{-webkit-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.tak-checkbox-label{-webkit-user-select:auto;user-select:auto}.tak-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .tak-checkbox-inner-container{margin-left:8px;margin-right:auto}.tak-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.tak-checkbox-frame{background-color:rgba(0,0,0,0);transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._tak-animation-noopable .tak-checkbox-frame{transition:none}.tak-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);-webkit-print-color-adjust:exact;color-adjust:exact}._tak-animation-noopable .tak-checkbox-background{transition:none}.cdk-high-contrast-active .tak-checkbox .tak-checkbox-background{background:none}.tak-checkbox-persistent-ripple{display:block;width:100%;height:100%;transform:none}.tak-checkbox-inner-container:hover .tak-checkbox-persistent-ripple{opacity:.04}.tak-checkbox.cdk-keyboard-focused .tak-checkbox-persistent-ripple{opacity:.12}.tak-checkbox-persistent-ripple,.tak-checkbox.tak-checkbox-disabled .tak-checkbox-inner-container:hover .tak-checkbox-persistent-ripple{opacity:0}@media(hover: none){.tak-checkbox-inner-container:hover .tak-checkbox-persistent-ripple{display:none}}.tak-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.tak-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .tak-checkbox-checkmark-path{stroke:#000 !important}.tak-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .tak-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.tak-checkbox-label-before .tak-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .tak-checkbox-label-before .tak-checkbox-inner-container{margin-left:auto;margin-right:8px}.tak-checkbox-checked .tak-checkbox-checkmark{opacity:1}.tak-checkbox-checked .tak-checkbox-checkmark-path{stroke-dashoffset:0}.tak-checkbox-checked .tak-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.tak-checkbox-indeterminate .tak-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.tak-checkbox-indeterminate .tak-checkbox-checkmark-path{stroke-dashoffset:0}.tak-checkbox-indeterminate .tak-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.tak-checkbox-unchecked .tak-checkbox-background{background-color:rgba(0,0,0,0)}.tak-checkbox-disabled{cursor:default}.cdk-high-contrast-active .tak-checkbox-disabled{opacity:.5}.tak-checkbox-anim-unchecked-checked .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-in-background}.tak-checkbox-anim-unchecked-checked .tak-checkbox-checkmark-path{animation:180ms linear 0ms tak-checkbox-unchecked-checked-checkmark-path}.tak-checkbox-anim-unchecked-indeterminate .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-in-background}.tak-checkbox-anim-unchecked-indeterminate .tak-checkbox-mixedmark{animation:90ms linear 0ms tak-checkbox-unchecked-indeterminate-mixedmark}.tak-checkbox-anim-checked-unchecked .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-out-background}.tak-checkbox-anim-checked-unchecked .tak-checkbox-checkmark-path{animation:90ms linear 0ms tak-checkbox-checked-unchecked-checkmark-path}.tak-checkbox-anim-checked-indeterminate .tak-checkbox-checkmark{animation:90ms linear 0ms tak-checkbox-checked-indeterminate-checkmark}.tak-checkbox-anim-checked-indeterminate .tak-checkbox-mixedmark{animation:90ms linear 0ms tak-checkbox-checked-indeterminate-mixedmark}.tak-checkbox-anim-indeterminate-checked .tak-checkbox-checkmark{animation:500ms linear 0ms tak-checkbox-indeterminate-checked-checkmark}.tak-checkbox-anim-indeterminate-checked .tak-checkbox-mixedmark{animation:500ms linear 0ms tak-checkbox-indeterminate-checked-mixedmark}.tak-checkbox-anim-indeterminate-unchecked .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-out-background}.tak-checkbox-anim-indeterminate-unchecked .tak-checkbox-mixedmark{animation:300ms linear 0ms tak-checkbox-indeterminate-unchecked-mixedmark}.tak-checkbox-input{bottom:0;left:50%}.tak-checkbox-input:focus~.tak-focus-indicator::before{content:""}',
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
  type: TakCheckbox,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-checkbox',
          exportAs: 'takCheckbox',
          host: {
            class: 'tak-checkbox',
            '[id]': 'id',
            '[attr.tabindex]': 'null',
            '[attr.aria-label]': 'null',
            '[attr.aria-labelledby]': 'null',
            '[class.tak-checkbox-indeterminate]': 'indeterminate',
            '[class.tak-checkbox-checked]': 'checked',
            '[class.tak-checkbox-disabled]': 'disabled',
            '[class.tak-checkbox-label-before]': 'labelPosition == "before"',
            '[class._tak-animation-noopable]': `_animationMode === 'NoopAnimations'`,
          },
          providers: [TAK_CHECKBOX_CONTROL_VALUE_ACCESSOR],
          inputs: ['disableRipple', 'color', 'tabIndex'],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<label [attr.for]="inputId" class="tak-checkbox-layout" #label>\n  <span class="tak-checkbox-inner-container"\n       [class.tak-checkbox-inner-container-no-side-margin]="!checkboxLabel.textContent || !checkboxLabel.textContent.trim()">\n    <input #input\n           class="tak-checkbox-input cdk-visually-hidden" type="checkbox"\n           [id]="inputId"\n           [required]="required"\n           [checked]="checked"\n           [attr.value]="value"\n           [disabled]="disabled"\n           [attr.name]="name"\n           [tabIndex]="tabIndex"\n           [attr.aria-label]="ariaLabel || null"\n           [attr.aria-labelledby]="ariaLabelledby"\n           [attr.aria-checked]="_getAriaChecked()"\n           [attr.aria-describedby]="ariaDescribedby"\n           (change)="_onInteractionEvent($event)"\n           (click)="_onInputClick($event)">\n    <span takRipple class="tak-checkbox-ripple tak-focus-indicator"\n         [takRippleTrigger]="label"\n         [takRippleDisabled]="_isRippleDisabled()"\n         [takRippleRadius]="20"\n         [takRippleCentered]="true"\n         [takRippleAnimation]="{enterDuration: _animationMode === \'NoopAnimations\' ? 0 : 150}">\n      <span class="tak-ripple-element tak-checkbox-persistent-ripple"></span>\n    </span>\n    <span class="tak-checkbox-frame"></span>\n    <span class="tak-checkbox-background">\n      <svg version="1.1"\n           focusable="false"\n           class="tak-checkbox-checkmark"\n           viewBox="0 0 24 24"\n           aria-hidden="true">\n        <path class="tak-checkbox-checkmark-path"\n              fill="none"\n              stroke="white"\n              d="M4.1,12.7 9,17.6 20.3,6.3"/>\n      </svg>\n      <!-- Element for rendering the indeterminate state checkbox. -->\n      <span class="tak-checkbox-mixedmark"></span>\n    </span>\n  </span>\n  <span class="tak-checkbox-label" #checkboxLabel (cdkObserveContent)="_onLabelTextChange()">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style="display:none">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n',
          styles: [
            '@keyframes tak-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes tak-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes tak-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes tak-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes tak-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes tak-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes tak-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes tak-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes tak-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes tak-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.tak-checkbox-background,.tak-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.tak-checkbox{display:inline-block;transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.tak-checkbox._tak-animation-noopable{transition:none !important;animation:none !important}.tak-checkbox .tak-ripple-element:not(.tak-checkbox-persistent-ripple){opacity:.16}.tak-checkbox .tak-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.tak-checkbox-layout{-webkit-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.tak-checkbox-label{-webkit-user-select:auto;user-select:auto}.tak-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .tak-checkbox-inner-container{margin-left:8px;margin-right:auto}.tak-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.tak-checkbox-frame{background-color:rgba(0,0,0,0);transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._tak-animation-noopable .tak-checkbox-frame{transition:none}.tak-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);-webkit-print-color-adjust:exact;color-adjust:exact}._tak-animation-noopable .tak-checkbox-background{transition:none}.cdk-high-contrast-active .tak-checkbox .tak-checkbox-background{background:none}.tak-checkbox-persistent-ripple{display:block;width:100%;height:100%;transform:none}.tak-checkbox-inner-container:hover .tak-checkbox-persistent-ripple{opacity:.04}.tak-checkbox.cdk-keyboard-focused .tak-checkbox-persistent-ripple{opacity:.12}.tak-checkbox-persistent-ripple,.tak-checkbox.tak-checkbox-disabled .tak-checkbox-inner-container:hover .tak-checkbox-persistent-ripple{opacity:0}@media(hover: none){.tak-checkbox-inner-container:hover .tak-checkbox-persistent-ripple{display:none}}.tak-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.tak-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .tak-checkbox-checkmark-path{stroke:#000 !important}.tak-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .tak-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.tak-checkbox-label-before .tak-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .tak-checkbox-label-before .tak-checkbox-inner-container{margin-left:auto;margin-right:8px}.tak-checkbox-checked .tak-checkbox-checkmark{opacity:1}.tak-checkbox-checked .tak-checkbox-checkmark-path{stroke-dashoffset:0}.tak-checkbox-checked .tak-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.tak-checkbox-indeterminate .tak-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.tak-checkbox-indeterminate .tak-checkbox-checkmark-path{stroke-dashoffset:0}.tak-checkbox-indeterminate .tak-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.tak-checkbox-unchecked .tak-checkbox-background{background-color:rgba(0,0,0,0)}.tak-checkbox-disabled{cursor:default}.cdk-high-contrast-active .tak-checkbox-disabled{opacity:.5}.tak-checkbox-anim-unchecked-checked .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-in-background}.tak-checkbox-anim-unchecked-checked .tak-checkbox-checkmark-path{animation:180ms linear 0ms tak-checkbox-unchecked-checked-checkmark-path}.tak-checkbox-anim-unchecked-indeterminate .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-in-background}.tak-checkbox-anim-unchecked-indeterminate .tak-checkbox-mixedmark{animation:90ms linear 0ms tak-checkbox-unchecked-indeterminate-mixedmark}.tak-checkbox-anim-checked-unchecked .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-out-background}.tak-checkbox-anim-checked-unchecked .tak-checkbox-checkmark-path{animation:90ms linear 0ms tak-checkbox-checked-unchecked-checkmark-path}.tak-checkbox-anim-checked-indeterminate .tak-checkbox-checkmark{animation:90ms linear 0ms tak-checkbox-checked-indeterminate-checkmark}.tak-checkbox-anim-checked-indeterminate .tak-checkbox-mixedmark{animation:90ms linear 0ms tak-checkbox-checked-indeterminate-mixedmark}.tak-checkbox-anim-indeterminate-checked .tak-checkbox-checkmark{animation:500ms linear 0ms tak-checkbox-indeterminate-checked-checkmark}.tak-checkbox-anim-indeterminate-checked .tak-checkbox-mixedmark{animation:500ms linear 0ms tak-checkbox-indeterminate-checked-mixedmark}.tak-checkbox-anim-indeterminate-unchecked .tak-checkbox-background{animation:180ms linear 0ms tak-checkbox-fade-out-background}.tak-checkbox-anim-indeterminate-unchecked .tak-checkbox-mixedmark{animation:300ms linear 0ms tak-checkbox-indeterminate-unchecked-mixedmark}.tak-checkbox-input{bottom:0;left:50%}.tak-checkbox-input:focus~.tak-focus-indicator::before{content:""}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      { type: i1.FocusMonitor },
      { type: i0.NgZone },
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
            args: [TAK_CHECKBOX_DEFAULT_OPTIONS],
          },
        ],
      },
    ];
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const TAK_CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => TakCheckboxRequiredValidator),
  multi: true,
};
/**
 * Validator for Material checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `tak-checkbox`.
 */
class TakCheckboxRequiredValidator extends CheckboxRequiredValidator {}
TakCheckboxRequiredValidator.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxRequiredValidator,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCheckboxRequiredValidator.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCheckboxRequiredValidator,
  selector:
    'tak-checkbox[required][formControlName],\n             tak-checkbox[required][formControl], tak-checkbox[required][ngModel]',
  providers: [TAK_CHECKBOX_REQUIRED_VALIDATOR],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxRequiredValidator,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: `tak-checkbox[required][formControlName],
             tak-checkbox[required][formControl], tak-checkbox[required][ngModel]`,
          providers: [TAK_CHECKBOX_REQUIRED_VALIDATOR],
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
/** This module is used by both original and MDC-based checkbox implementations. */
class _TakCheckboxRequiredValidatorModule {}
_TakCheckboxRequiredValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
_TakCheckboxRequiredValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
  declarations: [TakCheckboxRequiredValidator],
  exports: [TakCheckboxRequiredValidator],
});
_TakCheckboxRequiredValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          exports: [TakCheckboxRequiredValidator],
          declarations: [TakCheckboxRequiredValidator],
        },
      ],
    },
  ],
});
class TakCheckboxModule {}
TakCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  declarations: [TakCheckbox],
  imports: [TakRippleModule, TakCommonModule, ObserversModule, _TakCheckboxRequiredValidatorModule],
  exports: [TakCheckbox, TakCommonModule, _TakCheckboxRequiredValidatorModule],
});
TakCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  imports: [
    TakRippleModule,
    TakCommonModule,
    ObserversModule,
    _TakCheckboxRequiredValidatorModule,
    TakCommonModule,
    _TakCheckboxRequiredValidatorModule,
  ],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [
            TakRippleModule,
            TakCommonModule,
            ObserversModule,
            _TakCheckboxRequiredValidatorModule,
          ],
          exports: [TakCheckbox, TakCommonModule, _TakCheckboxRequiredValidatorModule],
          declarations: [TakCheckbox],
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
  TAK_CHECKBOX_CONTROL_VALUE_ACCESSOR,
  TAK_CHECKBOX_DEFAULT_OPTIONS,
  TAK_CHECKBOX_DEFAULT_OPTIONS_FACTORY,
  TAK_CHECKBOX_REQUIRED_VALIDATOR,
  TakCheckbox,
  TakCheckboxChange,
  TakCheckboxModule,
  TakCheckboxRequiredValidator,
  _TakCheckboxBase,
  _TakCheckboxRequiredValidatorModule,
};
//# sourceMappingURL=checkbox.mjs.map
