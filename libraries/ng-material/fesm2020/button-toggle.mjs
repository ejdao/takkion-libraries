import * as i1 from '@takkion/ng-cdk/a11y';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { SelectionModel } from '@takkion/ng-cdk/collections';
import * as i0 from '@angular/core';
import {
  InjectionToken,
  forwardRef,
  EventEmitter,
  Directive,
  Optional,
  Inject,
  ContentChildren,
  Input,
  Output,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Attribute,
  ViewChild,
  NgModule,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i2 from '@takkion/ng-material/core';
import { mixinDisableRipple, TakCommonModule, TakRippleModule } from '@takkion/ng-material/core';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to configure the
 * default options for all button toggles within an app.
 */
const TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS = new InjectionToken('TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS');
/**
 * Injection token that can be used to reference instances of `TakButtonToggleGroup`.
 * It serves as alternative token to the actual `TakButtonToggleGroup` class which
 * could cause unnecessary retention of the class and its component metadata.
 */
const TAK_BUTTON_TOGGLE_GROUP = new InjectionToken('TakButtonToggleGroup');
/**
 * Provider Expression that allows tak-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const TAK_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TakButtonToggleGroup),
  multi: true,
};
// Counter used to generate unique IDs.
let uniqueIdCounter = 0;
/** Change event object emitted by TakButtonToggle. */
class TakButtonToggleChange {
  constructor(
    /** The TakButtonToggle that emits the event. */
    source,
    /** The value assigned to the TakButtonToggle. */
    value
  ) {
    this.source = source;
    this.value = value;
  }
}
/** Exclusive selection button toggle group that behaves like a radio-button group. */
class TakButtonToggleGroup {
  constructor(_changeDetector, defaultOptions) {
    this._changeDetector = _changeDetector;
    this._vertical = false;
    this._multiple = false;
    this._disabled = false;
    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    this._controlValueAccessorChangeFn = () => {};
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    this._onTouched = () => {};
    this._name = `tak-button-toggle-group-${uniqueIdCounter++}`;
    /**
     * Event that emits whenever the value of the group changes.
     * Used to facilitate two-way data binding.
     * @docs-private
     */
    this.valueChange = new EventEmitter();
    /** Event emitted when the group's value changes. */
    this.change = new EventEmitter();
    this.appearance =
      defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : 'standard';
  }
  /** `name` attribute for the underlying `input` element. */
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._markButtonsForCheck();
  }
  /** Whether the toggle group is vertical. */
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  /** Value of the toggle group. */
  get value() {
    const selected = this._selectionModel ? this._selectionModel.selected : [];
    if (this.multiple) {
      return selected.map(toggle => toggle.value);
    }
    return selected[0] ? selected[0].value : undefined;
  }
  set value(newValue) {
    this._setSelectionByValue(newValue);
    this.valueChange.emit(this.value);
  }
  /** Selected button toggles in the group. */
  get selected() {
    const selected = this._selectionModel ? this._selectionModel.selected : [];
    return this.multiple ? selected : selected[0] || null;
  }
  /** Whether multiple button toggles can be selected. */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = coerceBooleanProperty(value);
    this._markButtonsForCheck();
  }
  /** Whether multiple button toggle group is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this._markButtonsForCheck();
  }
  ngOnInit() {
    this._selectionModel = new SelectionModel(this.multiple, undefined, false);
  }
  ngAfterContentInit() {
    this._selectionModel.select(...this._buttonToggles.filter(toggle => toggle.checked));
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value Value to be set to the model.
   */
  writeValue(value) {
    this.value = value;
    this._changeDetector.markForCheck();
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
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(toggle) {
    const event = new TakButtonToggleChange(toggle, this.value);
    this._controlValueAccessorChangeFn(event.value);
    this.change.emit(event);
  }
  /**
   * Syncs a button toggle's selected state with the model value.
   * @param toggle Toggle to be synced.
   * @param select Whether the toggle should be selected.
   * @param isUserInput Whether the change was a result of a user interaction.
   * @param deferEvents Whether to defer emitting the change events.
   */
  _syncButtonToggle(toggle, select, isUserInput = false, deferEvents = false) {
    // Deselect the currently-selected toggle, if we're in single-selection
    // mode and the button being toggled isn't selected at the moment.
    if (!this.multiple && this.selected && !toggle.checked) {
      this.selected.checked = false;
    }
    if (this._selectionModel) {
      if (select) {
        this._selectionModel.select(toggle);
      } else {
        this._selectionModel.deselect(toggle);
      }
    } else {
      deferEvents = true;
    }
    // We need to defer in some cases in order to avoid "changed after checked errors", however
    // the side-effect is that we may end up updating the model value out of sequence in others
    // The `deferEvents` flag allows us to decide whether to do it on a case-by-case basis.
    if (deferEvents) {
      Promise.resolve().then(() => this._updateModelValue(toggle, isUserInput));
    } else {
      this._updateModelValue(toggle, isUserInput);
    }
  }
  /** Checks whether a button toggle is selected. */
  _isSelected(toggle) {
    return this._selectionModel && this._selectionModel.isSelected(toggle);
  }
  /** Determines whether a button toggle should be checked on init. */
  _isPrechecked(toggle) {
    if (typeof this._rawValue === 'undefined') {
      return false;
    }
    if (this.multiple && Array.isArray(this._rawValue)) {
      return this._rawValue.some(value => toggle.value != null && value === toggle.value);
    }
    return toggle.value === this._rawValue;
  }
  /** Updates the selection state of the toggles in the group based on a value. */
  _setSelectionByValue(value) {
    this._rawValue = value;
    if (!this._buttonToggles) {
      return;
    }
    if (this.multiple && value) {
      if (!Array.isArray(value) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('Value must be an array in multiple-selection mode.');
      }
      this._clearSelection();
      value.forEach(currentValue => this._selectValue(currentValue));
    } else {
      this._clearSelection();
      this._selectValue(value);
    }
  }
  /** Clears the selected toggles. */
  _clearSelection() {
    this._selectionModel.clear();
    this._buttonToggles.forEach(toggle => (toggle.checked = false));
  }
  /** Selects a value if there's a toggle that corresponds to it. */
  _selectValue(value) {
    const correspondingOption = this._buttonToggles.find(toggle => {
      return toggle.value != null && toggle.value === value;
    });
    if (correspondingOption) {
      correspondingOption.checked = true;
      this._selectionModel.select(correspondingOption);
    }
  }
  /** Syncs up the group's value with the model and emits the change event. */
  _updateModelValue(toggle, isUserInput) {
    // Only emit the change event for user input.
    if (isUserInput) {
      this._emitChangeEvent(toggle);
    }
    // Note: we emit this one no matter whether it was a user interaction, because
    // it is used by Angular to sync up the two-way data binding.
    this.valueChange.emit(this.value);
  }
  /** Marks all of the child button toggles to be checked. */
  _markButtonsForCheck() {
    this._buttonToggles?.forEach(toggle => toggle._markForCheck());
  }
}
TakButtonToggleGroup.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonToggleGroup,
  deps: [
    { token: i0.ChangeDetectorRef },
    { token: TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakButtonToggleGroup.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakButtonToggleGroup,
  selector: 'tak-button-toggle-group',
  inputs: {
    appearance: 'appearance',
    name: 'name',
    vertical: 'vertical',
    value: 'value',
    multiple: 'multiple',
    disabled: 'disabled',
  },
  outputs: { valueChange: 'valueChange', change: 'change' },
  host: {
    attributes: { role: 'group' },
    properties: {
      'attr.aria-disabled': 'disabled',
      'class.tak-button-toggle-vertical': 'vertical',
      'class.tak-button-toggle-group-appearance-standard': 'appearance === "standard"',
    },
    classAttribute: 'tak-button-toggle-group',
  },
  providers: [
    TAK_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
    { provide: TAK_BUTTON_TOGGLE_GROUP, useExisting: TakButtonToggleGroup },
  ],
  queries: [
    {
      propertyName: '_buttonToggles',
      predicate: i0.forwardRef(function () {
        return TakButtonToggle;
      }),
      descendants: true,
    },
  ],
  exportAs: ['takButtonToggleGroup'],
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonToggleGroup,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-button-toggle-group',
          providers: [
            TAK_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
            { provide: TAK_BUTTON_TOGGLE_GROUP, useExisting: TakButtonToggleGroup },
          ],
          host: {
            role: 'group',
            class: 'tak-button-toggle-group',
            '[attr.aria-disabled]': 'disabled',
            '[class.tak-button-toggle-vertical]': 'vertical',
            '[class.tak-button-toggle-group-appearance-standard]': 'appearance === "standard"',
          },
          exportAs: 'takButtonToggleGroup',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ChangeDetectorRef },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS],
          },
        ],
      },
    ];
  },
  propDecorators: {
    _buttonToggles: [
      {
        type: ContentChildren,
        args: [
          forwardRef(() => TakButtonToggle),
          {
            // Note that this would technically pick up toggles
            // from nested groups, but that's not a case that we support.
            descendants: true,
          },
        ],
      },
    ],
    appearance: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    vertical: [
      {
        type: Input,
      },
    ],
    value: [
      {
        type: Input,
      },
    ],
    valueChange: [
      {
        type: Output,
      },
    ],
    multiple: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    change: [
      {
        type: Output,
      },
    ],
  },
});
// Boilerplate for applying mixins to the TakButtonToggle class.
/** @docs-private */
const _TakButtonToggleBase = mixinDisableRipple(class {});
/** Single button inside of a toggle group. */
class TakButtonToggle extends _TakButtonToggleBase {
  constructor(
    toggleGroup,
    _changeDetectorRef,
    _elementRef,
    _focusMonitor,
    defaultTabIndex,
    defaultOptions
  ) {
    super();
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this._focusMonitor = _focusMonitor;
    this._checked = false;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    this.ariaLabelledby = null;
    this._disabled = false;
    /** Event emitted when the group value changes. */
    this.change = new EventEmitter();
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    this.buttonToggleGroup = toggleGroup;
    this.appearance =
      defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : 'standard';
  }
  /** Unique ID for the underlying `button` element. */
  get buttonId() {
    return `${this.id}-button`;
  }
  /** The appearance style of the button. */
  get appearance() {
    return this.buttonToggleGroup ? this.buttonToggleGroup.appearance : this._appearance;
  }
  set appearance(value) {
    this._appearance = value;
  }
  /** Whether the button is checked. */
  get checked() {
    return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
  }
  set checked(value) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._checked) {
      this._checked = newValue;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  /** Whether the button is disabled. */
  get disabled() {
    return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  ngOnInit() {
    const group = this.buttonToggleGroup;
    this.id = this.id || `tak-button-toggle-${uniqueIdCounter++}`;
    if (group) {
      if (group._isPrechecked(this)) {
        this.checked = true;
      } else if (group._isSelected(this) !== this._checked) {
        // As as side effect of the circular dependency between the toggle group and the button,
        // we may end up in a state where the button is supposed to be checked on init, but it
        // isn't, because the checked value was assigned too early. This can happen when Ivy
        // assigns the static input value before the `ngOnInit` has run.
        group._syncButtonToggle(this, this._checked);
      }
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    const group = this.buttonToggleGroup;
    this._focusMonitor.stopMonitoring(this._elementRef);
    // Remove the toggle from the selection once it's destroyed. Needs to happen
    // on the next tick in order to avoid "changed after checked" errors.
    if (group && group._isSelected(this)) {
      group._syncButtonToggle(this, false, false, true);
    }
  }
  /** Focuses the button. */
  focus(options) {
    this._buttonElement.nativeElement.focus(options);
  }
  /** Checks the button toggle due to an interaction with the underlying native button. */
  _onButtonClick() {
    const newChecked = this._isSingleSelector() ? true : !this._checked;
    if (newChecked !== this._checked) {
      this._checked = newChecked;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked, true);
        this.buttonToggleGroup._onTouched();
      }
    }
    // Emit a change event when it's the single selector
    this.change.emit(new TakButtonToggleChange(this, this.value));
  }
  /**
   * Marks the button toggle as needing checking for change detection.
   * This method is exposed because the parent button toggle group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When the group value changes, the button will not be notified.
    // Use `markForCheck` to explicit update button toggle's status.
    this._changeDetectorRef.markForCheck();
  }
  /** Gets the name that should be assigned to the inner DOM node. */
  _getButtonName() {
    if (this._isSingleSelector()) {
      return this.buttonToggleGroup.name;
    }
    return this.name || null;
  }
  /** Whether the toggle is in single selection mode. */
  _isSingleSelector() {
    return this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
  }
}
TakButtonToggle.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonToggle,
  deps: [
    { token: TAK_BUTTON_TOGGLE_GROUP, optional: true },
    { token: i0.ChangeDetectorRef },
    { token: i0.ElementRef },
    { token: i1.FocusMonitor },
    { token: 'tabindex', attribute: true },
    { token: TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakButtonToggle.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakButtonToggle,
  selector: 'tak-button-toggle',
  inputs: {
    disableRipple: 'disableRipple',
    ariaLabel: ['aria-label', 'ariaLabel'],
    ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
    id: 'id',
    name: 'name',
    value: 'value',
    tabIndex: 'tabIndex',
    appearance: 'appearance',
    checked: 'checked',
    disabled: 'disabled',
  },
  outputs: { change: 'change' },
  host: {
    attributes: { role: 'presentation' },
    listeners: { focus: 'focus()' },
    properties: {
      'class.tak-button-toggle-standalone': '!buttonToggleGroup',
      'class.tak-button-toggle-checked': 'checked',
      'class.tak-button-toggle-disabled': 'disabled',
      'class.tak-button-toggle-appearance-standard': 'appearance === "standard"',
      'attr.aria-label': 'null',
      'attr.aria-labelledby': 'null',
      'attr.id': 'id',
      'attr.name': 'null',
    },
    classAttribute: 'tak-button-toggle',
  },
  viewQueries: [
    { propertyName: '_buttonElement', first: true, predicate: ['button'], descendants: true },
  ],
  exportAs: ['takButtonToggle'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<button #button class="tak-button-toggle-button tak-focus-indicator"\n        type="button"\n        [id]="buttonId"\n        [attr.tabindex]="disabled ? -1 : tabIndex"\n        [attr.aria-pressed]="checked"\n        [disabled]="disabled || null"\n        [attr.name]="_getButtonName()"\n        [attr.aria-label]="ariaLabel"\n        [attr.aria-labelledby]="ariaLabelledby"\n        (click)="_onButtonClick()">\n  <span class="tak-button-toggle-label-content">\n    <ng-content></ng-content>\n  </span>\n</button>\n\n<span class="tak-button-toggle-focus-overlay"></span>\n<span class="tak-button-toggle-ripple" takRipple\n     [takRippleTrigger]="button"\n     [takRippleDisabled]="this.disableRipple || this.disabled">\n</span>\n',
  styles: [
    '.tak-button-toggle-standalone,.tak-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;border-radius:2px;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0)}.cdk-high-contrast-active .tak-button-toggle-standalone,.cdk-high-contrast-active .tak-button-toggle-group{outline:solid 1px}.tak-button-toggle-standalone.tak-button-toggle-appearance-standard,.tak-button-toggle-group-appearance-standard{border-radius:4px}.cdk-high-contrast-active .tak-button-toggle-standalone.tak-button-toggle-appearance-standard,.cdk-high-contrast-active .tak-button-toggle-group-appearance-standard{outline:0}.tak-button-toggle-vertical{flex-direction:column}.tak-button-toggle-vertical .tak-button-toggle-label-content{display:block}.tak-button-toggle{white-space:nowrap;position:relative}.tak-button-toggle .tak-icon svg{vertical-align:top}.tak-button-toggle.cdk-keyboard-focused .tak-button-toggle-focus-overlay{opacity:1}.tak-button-toggle-appearance-standard:not(.tak-button-toggle-disabled):hover .tak-button-toggle-focus-overlay{opacity:.04}.tak-button-toggle-appearance-standard.cdk-keyboard-focused:not(.tak-button-toggle-disabled) .tak-button-toggle-focus-overlay{opacity:.12}@media(hover: none){.tak-button-toggle-appearance-standard:not(.tak-button-toggle-disabled):hover .tak-button-toggle-focus-overlay{display:none}}.tak-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;position:relative}.tak-button-toggle-appearance-standard .tak-button-toggle-label-content{padding:0 12px}.tak-button-toggle-label-content>*{vertical-align:middle}.tak-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0}.cdk-high-contrast-active .tak-button-toggle-checked .tak-button-toggle-focus-overlay{border-bottom:solid 36px;opacity:.5;height:0}.cdk-high-contrast-active .tak-button-toggle-checked:hover .tak-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .tak-button-toggle-checked.tak-button-toggle-appearance-standard .tak-button-toggle-focus-overlay{border-bottom:solid 500px}.tak-button-toggle .tak-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.tak-button-toggle-disabled .tak-button-toggle-button{cursor:default}.tak-button-toggle-button::-moz-focus-inner{border:0}',
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
  type: TakButtonToggle,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-button-toggle',
          encapsulation: ViewEncapsulation.None,
          exportAs: 'takButtonToggle',
          changeDetection: ChangeDetectionStrategy.OnPush,
          inputs: ['disableRipple'],
          host: {
            '[class.tak-button-toggle-standalone]': '!buttonToggleGroup',
            '[class.tak-button-toggle-checked]': 'checked',
            '[class.tak-button-toggle-disabled]': 'disabled',
            '[class.tak-button-toggle-appearance-standard]': 'appearance === "standard"',
            class: 'tak-button-toggle',
            '[attr.aria-label]': 'null',
            '[attr.aria-labelledby]': 'null',
            '[attr.id]': 'id',
            '[attr.name]': 'null',
            '(focus)': 'focus()',
            role: 'presentation',
          },
          template:
            '<button #button class="tak-button-toggle-button tak-focus-indicator"\n        type="button"\n        [id]="buttonId"\n        [attr.tabindex]="disabled ? -1 : tabIndex"\n        [attr.aria-pressed]="checked"\n        [disabled]="disabled || null"\n        [attr.name]="_getButtonName()"\n        [attr.aria-label]="ariaLabel"\n        [attr.aria-labelledby]="ariaLabelledby"\n        (click)="_onButtonClick()">\n  <span class="tak-button-toggle-label-content">\n    <ng-content></ng-content>\n  </span>\n</button>\n\n<span class="tak-button-toggle-focus-overlay"></span>\n<span class="tak-button-toggle-ripple" takRipple\n     [takRippleTrigger]="button"\n     [takRippleDisabled]="this.disableRipple || this.disabled">\n</span>\n',
          styles: [
            '.tak-button-toggle-standalone,.tak-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;border-radius:2px;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0)}.cdk-high-contrast-active .tak-button-toggle-standalone,.cdk-high-contrast-active .tak-button-toggle-group{outline:solid 1px}.tak-button-toggle-standalone.tak-button-toggle-appearance-standard,.tak-button-toggle-group-appearance-standard{border-radius:4px}.cdk-high-contrast-active .tak-button-toggle-standalone.tak-button-toggle-appearance-standard,.cdk-high-contrast-active .tak-button-toggle-group-appearance-standard{outline:0}.tak-button-toggle-vertical{flex-direction:column}.tak-button-toggle-vertical .tak-button-toggle-label-content{display:block}.tak-button-toggle{white-space:nowrap;position:relative}.tak-button-toggle .tak-icon svg{vertical-align:top}.tak-button-toggle.cdk-keyboard-focused .tak-button-toggle-focus-overlay{opacity:1}.tak-button-toggle-appearance-standard:not(.tak-button-toggle-disabled):hover .tak-button-toggle-focus-overlay{opacity:.04}.tak-button-toggle-appearance-standard.cdk-keyboard-focused:not(.tak-button-toggle-disabled) .tak-button-toggle-focus-overlay{opacity:.12}@media(hover: none){.tak-button-toggle-appearance-standard:not(.tak-button-toggle-disabled):hover .tak-button-toggle-focus-overlay{display:none}}.tak-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;position:relative}.tak-button-toggle-appearance-standard .tak-button-toggle-label-content{padding:0 12px}.tak-button-toggle-label-content>*{vertical-align:middle}.tak-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0}.cdk-high-contrast-active .tak-button-toggle-checked .tak-button-toggle-focus-overlay{border-bottom:solid 36px;opacity:.5;height:0}.cdk-high-contrast-active .tak-button-toggle-checked:hover .tak-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .tak-button-toggle-checked.tak-button-toggle-appearance-standard .tak-button-toggle-focus-overlay{border-bottom:solid 500px}.tak-button-toggle .tak-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.tak-button-toggle-disabled .tak-button-toggle-button{cursor:default}.tak-button-toggle-button::-moz-focus-inner{border:0}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: TakButtonToggleGroup,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_BUTTON_TOGGLE_GROUP],
          },
        ],
      },
      { type: i0.ChangeDetectorRef },
      { type: i0.ElementRef },
      { type: i1.FocusMonitor },
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
            args: [TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS],
          },
        ],
      },
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
    _buttonElement: [
      {
        type: ViewChild,
        args: ['button'],
      },
    ],
    id: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    value: [
      {
        type: Input,
      },
    ],
    tabIndex: [
      {
        type: Input,
      },
    ],
    appearance: [
      {
        type: Input,
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
    change: [
      {
        type: Output,
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
class TakButtonToggleModule {}
TakButtonToggleModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonToggleModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakButtonToggleModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonToggleModule,
  declarations: [TakButtonToggleGroup, TakButtonToggle],
  imports: [TakCommonModule, TakRippleModule],
  exports: [TakCommonModule, TakButtonToggleGroup, TakButtonToggle],
});
TakButtonToggleModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonToggleModule,
  imports: [TakCommonModule, TakRippleModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonToggleModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakCommonModule, TakRippleModule],
          exports: [TakCommonModule, TakButtonToggleGroup, TakButtonToggle],
          declarations: [TakButtonToggleGroup, TakButtonToggle],
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
  TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS,
  TAK_BUTTON_TOGGLE_GROUP,
  TAK_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
  TakButtonToggle,
  TakButtonToggleChange,
  TakButtonToggleGroup,
  TakButtonToggleModule,
};
//# sourceMappingURL=button-toggle.mjs.map
