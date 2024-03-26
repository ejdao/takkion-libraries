import * as i0 from '@angular/core';
import {
  InjectionToken,
  forwardRef,
  EventEmitter,
  Directive,
  Output,
  Input,
  ContentChildren,
  ViewChild,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Optional,
  Inject,
  Attribute,
  NgModule,
} from '@angular/core';
import * as i3 from '@takkion/ng-material/core';
import {
  mixinDisableRipple,
  mixinTabIndex,
  TakRippleModule,
  TakCommonModule,
} from '@takkion/ng-material/core';
import * as i1 from '@takkion/ng-cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@takkion/ng-cdk/coercion';
import * as i2 from '@takkion/ng-cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const TAK_RADIO_DEFAULT_OPTIONS = new InjectionToken('tak-radio-default-options', {
  providedIn: 'root',
  factory: TAK_RADIO_DEFAULT_OPTIONS_FACTORY,
});
function TAK_RADIO_DEFAULT_OPTIONS_FACTORY() {
  return {
    color: 'accent',
  };
}
// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;
/**
 * Provider Expression that allows tak-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
const TAK_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TakRadioGroup),
  multi: true,
};
/** Change event object emitted by TakRadio and TakRadioGroup. */
class TakRadioChange {
  constructor(
    /** The TakRadioButton that emits the change event. */
    source,
    /** The value of the TakRadioButton. */
    value
  ) {
    this.source = source;
    this.value = value;
  }
}
/**
 * Injection token that can be used to inject instances of `TakRadioGroup`. It serves as
 * alternative token to the actual `TakRadioGroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const TAK_RADIO_GROUP = new InjectionToken('TakRadioGroup');
/**
 * Base class with all of the `TakRadioGroup` functionality.
 * @docs-private
 */
class _TakRadioGroupBase {
  constructor(_changeDetector) {
    this._changeDetector = _changeDetector;
    /** Selected value for the radio group. */
    this._value = null;
    /** The HTML name attribute applied to radio buttons in this group. */
    this._name = `tak-radio-group-${nextUniqueId++}`;
    /** The currently selected radio button. Should match value. */
    this._selected = null;
    /** Whether the `value` has been set to its initial value. */
    this._isInitialized = false;
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    this._labelPosition = 'after';
    /** Whether the radio group is disabled. */
    this._disabled = false;
    /** Whether the radio group is required. */
    this._required = false;
    /** The method to be called in order to update ngModel */
    this._controlValueAccessorChangeFn = () => {};
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @docs-private
     */
    this.onTouched = () => {};
    /**
     * Event emitted when the group value changes.
     * Change events are only emitted when the value changes due to user interaction with
     * a radio button (the same behavior as `<input type-"radio">`).
     */
    this.change = new EventEmitter();
  }
  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._updateRadioButtonNames();
  }
  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition;
  }
  set labelPosition(v) {
    this._labelPosition = v === 'before' ? 'before' : 'after';
    this._markRadiosForCheck();
  }
  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;
      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }
  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }
  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  /** Whether the radio group is disabled */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this._markRadiosForCheck();
  }
  /** Whether the radio group is required */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
    this._markRadiosForCheck();
  }
  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on TakRadioGroup, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the TakRadioGroup.
    this._isInitialized = true;
  }
  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
  _updateRadioButtonNames() {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
        radio._markForCheck();
      });
    }
  }
  /** Updates the `selected` radio button from the internal _value state. */
  _updateSelectedRadioFromValue() {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent() {
    if (this._isInitialized) {
      this.change.emit(new TakRadioChange(this._selected, this._value));
    }
  }
  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach(radio => radio._markForCheck());
    }
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value) {
    this.value = value;
    this._changeDetector.markForCheck();
  }
  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }
}
_TakRadioGroupBase.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakRadioGroupBase,
  deps: [{ token: i0.ChangeDetectorRef }],
  target: i0.ɵɵFactoryTarget.Directive,
});
_TakRadioGroupBase.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: _TakRadioGroupBase,
  inputs: {
    color: 'color',
    name: 'name',
    labelPosition: 'labelPosition',
    value: 'value',
    selected: 'selected',
    disabled: 'disabled',
    required: 'required',
  },
  outputs: { change: 'change' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakRadioGroupBase,
  decorators: [
    {
      type: Directive,
    },
  ],
  ctorParameters: function () {
    return [{ type: i0.ChangeDetectorRef }];
  },
  propDecorators: {
    change: [
      {
        type: Output,
      },
    ],
    color: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    labelPosition: [
      {
        type: Input,
      },
    ],
    value: [
      {
        type: Input,
      },
    ],
    selected: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    required: [
      {
        type: Input,
      },
    ],
  },
});
/**
 * A group of radio buttons. May contain one or more `<tak-radio-button>` elements.
 */
class TakRadioGroup extends _TakRadioGroupBase {}
TakRadioGroup.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRadioGroup,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakRadioGroup.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakRadioGroup,
  selector: 'tak-radio-group',
  host: { attributes: { role: 'radiogroup' }, classAttribute: 'tak-radio-group' },
  providers: [
    TAK_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
    { provide: TAK_RADIO_GROUP, useExisting: TakRadioGroup },
  ],
  queries: [
    {
      propertyName: '_radios',
      predicate: i0.forwardRef(function () {
        return TakRadioButton;
      }),
      descendants: true,
    },
  ],
  exportAs: ['takRadioGroup'],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRadioGroup,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-radio-group',
          exportAs: 'takRadioGroup',
          providers: [
            TAK_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
            { provide: TAK_RADIO_GROUP, useExisting: TakRadioGroup },
          ],
          host: {
            role: 'radiogroup',
            class: 'tak-radio-group',
          },
        },
      ],
    },
  ],
  propDecorators: {
    _radios: [
      {
        type: ContentChildren,
        args: [forwardRef(() => TakRadioButton), { descendants: true }],
      },
    ],
  },
});
// Boilerplate for applying mixins to TakRadioButton.
/** @docs-private */
class TakRadioButtonBase {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}
const _TakRadioButtonMixinBase = mixinDisableRipple(mixinTabIndex(TakRadioButtonBase));
/**
 * Base class with all of the `TakRadioButton` functionality.
 * @docs-private
 */
class _TakRadioButtonBase extends _TakRadioButtonMixinBase {
  constructor(
    radioGroup,
    elementRef,
    _changeDetector,
    _focusMonitor,
    _radioDispatcher,
    animationMode,
    _providerOverride,
    tabIndex
  ) {
    super(elementRef);
    this._changeDetector = _changeDetector;
    this._focusMonitor = _focusMonitor;
    this._radioDispatcher = _radioDispatcher;
    this._providerOverride = _providerOverride;
    this._uniqueId = `tak-radio-${++nextUniqueId}`;
    /** The unique ID for the radio button. */
    this.id = this._uniqueId;
    /**
     * Event emitted when the checked state of this radio button changes.
     * Change events are only emitted when the value changes due to user interaction with
     * the radio button (the same behavior as `<input type-"radio">`).
     */
    this.change = new EventEmitter();
    /** Whether this radio is checked. */
    this._checked = false;
    /** Value assigned to this radio. */
    this._value = null;
    /** Unregister function for _radioDispatcher */
    this._removeUniqueSelectionListener = () => {};
    // Assertions. Ideally these should be stripped out by the compiler.
    // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
    this.radioGroup = radioGroup;
    this._noopAnimations = animationMode === 'NoopAnimations';
    if (tabIndex) {
      this.tabIndex = coerceNumberProperty(tabIndex, 0);
    }
    this._removeUniqueSelectionListener = _radioDispatcher.listen((id, name) => {
      if (id !== this.id && name === this.name) {
        this.checked = false;
      }
    });
  }
  /** Whether this radio button is checked. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    const newCheckedState = coerceBooleanProperty(value);
    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }
      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }
  /** The value of this radio button. */
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }
  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  /** Whether the radio button is disabled. */
  get disabled() {
    return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
  }
  set disabled(value) {
    this._setDisabled(coerceBooleanProperty(value));
  }
  /** Whether the radio button is required. */
  get required() {
    return this._required || (this.radioGroup && this.radioGroup.required);
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
  }
  /** Theme color of the radio button. */
  get color() {
    // As per Material design specifications the selection control radio should use the accent color
    // palette by default. https://material.io/guidelines/components/selection-controls.html
    return (
      this._color ||
      (this.radioGroup && this.radioGroup.color) ||
      (this._providerOverride && this._providerOverride.color) ||
      'accent'
    );
  }
  set color(newValue) {
    this._color = newValue;
  }
  /** ID of the native input element inside `<tak-radio-button>` */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  /** Focuses the radio button. */
  focus(options, origin) {
    if (origin) {
      this._focusMonitor.focusVia(this._inputElement, origin, options);
    } else {
      this._inputElement.nativeElement.focus(options);
    }
  }
  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetector.markForCheck();
  }
  ngOnInit() {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this._value;
      if (this.checked) {
        this.radioGroup.selected = this;
      }
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
  }
  ngDoCheck() {
    this._updateTabIndex();
  }
  ngAfterViewInit() {
    this._updateTabIndex();
    this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin && this.radioGroup) {
        this.radioGroup._touch();
      }
    });
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._removeUniqueSelectionListener();
  }
  /** Dispatch change event with current value. */
  _emitChangeEvent() {
    this.change.emit(new TakRadioChange(this, this._value));
  }
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  _onInputClick(event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `radio-button` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }
  /** Triggered when the radio button receives an interaction from the user. */
  _onInputInteraction(event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
    if (!this.checked && !this.disabled) {
      const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
      this.checked = true;
      this._emitChangeEvent();
      if (this.radioGroup) {
        this.radioGroup._controlValueAccessorChangeFn(this.value);
        if (groupValueChanged) {
          this.radioGroup._emitChangeEvent();
        }
      }
    }
  }
  /** Sets the disabled state and marks for check if a change occurred. */
  _setDisabled(value) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._changeDetector.markForCheck();
    }
  }
  /** Gets the tabindex for the underlying input element. */
  _updateTabIndex() {
    const group = this.radioGroup;
    let value;
    // Implement a roving tabindex if the button is inside a group. For most cases this isn't
    // necessary, because the browser handles the tab order for inputs inside a group automatically,
    // but we need an explicitly higher tabindex for the selected button in order for things like
    // the focus trap to pick it up correctly.
    if (!group || !group.selected || this.disabled) {
      value = this.tabIndex;
    } else {
      value = group.selected === this ? this.tabIndex : -1;
    }
    if (value !== this._previousTabIndex) {
      // We have to set the tabindex directly on the DOM node, because it depends on
      // the selected state which is prone to "changed after checked errors".
      const input = this._inputElement?.nativeElement;
      if (input) {
        input.setAttribute('tabindex', value + '');
        this._previousTabIndex = value;
      }
    }
  }
}
_TakRadioButtonBase.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakRadioButtonBase,
  deps: 'invalid',
  target: i0.ɵɵFactoryTarget.Directive,
});
_TakRadioButtonBase.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: _TakRadioButtonBase,
  inputs: {
    id: 'id',
    name: 'name',
    ariaLabel: ['aria-label', 'ariaLabel'],
    ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
    ariaDescribedby: ['aria-describedby', 'ariaDescribedby'],
    checked: 'checked',
    value: 'value',
    labelPosition: 'labelPosition',
    disabled: 'disabled',
    required: 'required',
    color: 'color',
  },
  outputs: { change: 'change' },
  viewQueries: [
    { propertyName: '_inputElement', first: true, predicate: ['input'], descendants: true },
  ],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakRadioButtonBase,
  decorators: [
    {
      type: Directive,
    },
  ],
  ctorParameters: function () {
    return [
      { type: _TakRadioGroupBase },
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      { type: i1.FocusMonitor },
      { type: i2.UniqueSelectionDispatcher },
      { type: undefined },
      { type: undefined },
      { type: undefined },
    ];
  },
  propDecorators: {
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
    checked: [
      {
        type: Input,
      },
    ],
    value: [
      {
        type: Input,
      },
    ],
    labelPosition: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    required: [
      {
        type: Input,
      },
    ],
    color: [
      {
        type: Input,
      },
    ],
    change: [
      {
        type: Output,
      },
    ],
    _inputElement: [
      {
        type: ViewChild,
        args: ['input'],
      },
    ],
  },
});
/**
 * A Material design radio-button. Typically placed inside of `<tak-radio-group>` elements.
 */
class TakRadioButton extends _TakRadioButtonBase {
  constructor(
    radioGroup,
    elementRef,
    changeDetector,
    focusMonitor,
    radioDispatcher,
    animationMode,
    providerOverride,
    tabIndex
  ) {
    super(
      radioGroup,
      elementRef,
      changeDetector,
      focusMonitor,
      radioDispatcher,
      animationMode,
      providerOverride,
      tabIndex
    );
  }
}
TakRadioButton.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRadioButton,
  deps: [
    { token: TAK_RADIO_GROUP, optional: true },
    { token: i0.ElementRef },
    { token: i0.ChangeDetectorRef },
    { token: i1.FocusMonitor },
    { token: i2.UniqueSelectionDispatcher },
    { token: ANIMATION_MODULE_TYPE, optional: true },
    { token: TAK_RADIO_DEFAULT_OPTIONS, optional: true },
    { token: 'tabindex', attribute: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakRadioButton.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakRadioButton,
  selector: 'tak-radio-button',
  inputs: { disableRipple: 'disableRipple', tabIndex: 'tabIndex' },
  host: {
    listeners: { focus: '_inputElement.nativeElement.focus()' },
    properties: {
      'class.tak-radio-checked': 'checked',
      'class.tak-radio-disabled': 'disabled',
      'class._tak-animation-noopable': '_noopAnimations',
      'class.tak-primary': 'color === "primary"',
      'class.tak-accent': 'color === "accent"',
      'class.tak-warn': 'color === "warn"',
      'attr.tabindex': 'null',
      'attr.id': 'id',
      'attr.aria-label': 'null',
      'attr.aria-labelledby': 'null',
      'attr.aria-describedby': 'null',
    },
    classAttribute: 'tak-radio-button',
  },
  exportAs: ['takRadioButton'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<!-- TODO(jelbourn): render the radio on either side of the content -->\n<!-- TODO(mtlin): Evaluate trade-offs of using native radio vs. cost of additional bindings. -->\n<label [attr.for]="inputId" class="tak-radio-label" #label>\n  <!-- The actual \'radio\' part of the control. -->\n  <span class="tak-radio-container">\n    <span class="tak-radio-outer-circle"></span>\n    <span class="tak-radio-inner-circle"></span>\n    <input #input class="tak-radio-input" type="radio"\n        [id]="inputId"\n        [checked]="checked"\n        [disabled]="disabled"\n        [attr.name]="name"\n        [attr.value]="value"\n        [required]="required"\n        [attr.aria-label]="ariaLabel"\n        [attr.aria-labelledby]="ariaLabelledby"\n        [attr.aria-describedby]="ariaDescribedby"\n        (change)="_onInputInteraction($event)"\n        (click)="_onInputClick($event)">\n\n    <!-- The ripple comes after the input so that we can target it with a CSS\n         sibling selector when the input is focused. -->\n    <span tak-ripple class="tak-radio-ripple tak-focus-indicator"\n         [takRippleTrigger]="label"\n         [takRippleDisabled]="_isRippleDisabled()"\n         [takRippleCentered]="true"\n         [takRippleRadius]="20"\n         [takRippleAnimation]="{enterDuration: _noopAnimations ? 0 : 150}">\n\n      <span class="tak-ripple-element tak-radio-persistent-ripple"></span>\n    </span>\n  </span>\n\n  <!-- The label content for radio control. -->\n  <span class="tak-radio-label-content" [class.tak-radio-label-before]="labelPosition == \'before\'">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style="display:none">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n',
  styles: [
    '.tak-radio-button{display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.tak-radio-label{-webkit-user-select:none;user-select:none;cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle;width:100%}.tak-radio-container{box-sizing:border-box;display:inline-block;position:relative;width:20px;height:20px;flex-shrink:0}.tak-radio-outer-circle{box-sizing:border-box;display:block;height:20px;left:0;position:absolute;top:0;transition:border-color ease 280ms;width:20px;border-width:2px;border-style:solid;border-radius:50%}._tak-animation-noopable .tak-radio-outer-circle{transition:none}.tak-radio-inner-circle{border-radius:50%;box-sizing:border-box;display:block;height:20px;left:0;position:absolute;top:0;opacity:0;transition:transform ease 280ms,background-color ease 280ms,opacity linear 1ms 280ms;width:20px;transform:scale(0.001);-webkit-print-color-adjust:exact;color-adjust:exact}.tak-radio-checked .tak-radio-inner-circle{transform:scale(0.5);opacity:1;transition:transform ease 280ms,background-color ease 280ms}.cdk-high-contrast-active .tak-radio-checked .tak-radio-inner-circle{border:solid 10px}._tak-animation-noopable .tak-radio-inner-circle{transition:none}.tak-radio-label-content{-webkit-user-select:auto;user-select:auto;display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .tak-radio-label-content{padding-right:8px;padding-left:0}.tak-radio-label-content.tak-radio-label-before{order:-1;padding-left:0;padding-right:8px}[dir=rtl] .tak-radio-label-content.tak-radio-label-before{padding-right:0;padding-left:8px}.tak-radio-disabled,.tak-radio-disabled .tak-radio-label{cursor:default}.tak-radio-button .tak-radio-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.tak-radio-button .tak-radio-ripple .tak-ripple-element:not(.tak-radio-persistent-ripple){opacity:.16}.tak-radio-persistent-ripple{width:100%;height:100%;transform:none;top:0;left:0}.tak-radio-container:hover .tak-radio-persistent-ripple{opacity:.04}.tak-radio-button:not(.tak-radio-disabled).cdk-keyboard-focused .tak-radio-persistent-ripple,.tak-radio-button:not(.tak-radio-disabled).cdk-program-focused .tak-radio-persistent-ripple{opacity:.12}.tak-radio-persistent-ripple,.tak-radio-disabled .tak-radio-container:hover .tak-radio-persistent-ripple{opacity:0}@media(hover: none){.tak-radio-container:hover .tak-radio-persistent-ripple{display:none}}.tak-radio-input{opacity:0;position:absolute;top:0;left:0;margin:0;width:100%;height:100%;cursor:inherit;z-index:-1}.tak-radio-input:focus~.tak-focus-indicator::before{content:""}.cdk-high-contrast-active .tak-radio-disabled{opacity:.5}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i3.TakRipple,
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
  type: TakRadioButton,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-radio-button',
          inputs: ['disableRipple', 'tabIndex'],
          encapsulation: ViewEncapsulation.None,
          exportAs: 'takRadioButton',
          host: {
            class: 'tak-radio-button',
            '[class.tak-radio-checked]': 'checked',
            '[class.tak-radio-disabled]': 'disabled',
            '[class._tak-animation-noopable]': '_noopAnimations',
            '[class.tak-primary]': 'color === "primary"',
            '[class.tak-accent]': 'color === "accent"',
            '[class.tak-warn]': 'color === "warn"',
            // Needs to be removed since it causes some a11y issues (see #21266).
            '[attr.tabindex]': 'null',
            '[attr.id]': 'id',
            '[attr.aria-label]': 'null',
            '[attr.aria-labelledby]': 'null',
            '[attr.aria-describedby]': 'null',
            // Note: under normal conditions focus shouldn't land on this element, however it may be
            // programmatically set, for example inside of a focus trap, in this case we want to forward
            // the focus to the native element.
            '(focus)': '_inputElement.nativeElement.focus()',
          },
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<!-- TODO(jelbourn): render the radio on either side of the content -->\n<!-- TODO(mtlin): Evaluate trade-offs of using native radio vs. cost of additional bindings. -->\n<label [attr.for]="inputId" class="tak-radio-label" #label>\n  <!-- The actual \'radio\' part of the control. -->\n  <span class="tak-radio-container">\n    <span class="tak-radio-outer-circle"></span>\n    <span class="tak-radio-inner-circle"></span>\n    <input #input class="tak-radio-input" type="radio"\n        [id]="inputId"\n        [checked]="checked"\n        [disabled]="disabled"\n        [attr.name]="name"\n        [attr.value]="value"\n        [required]="required"\n        [attr.aria-label]="ariaLabel"\n        [attr.aria-labelledby]="ariaLabelledby"\n        [attr.aria-describedby]="ariaDescribedby"\n        (change)="_onInputInteraction($event)"\n        (click)="_onInputClick($event)">\n\n    <!-- The ripple comes after the input so that we can target it with a CSS\n         sibling selector when the input is focused. -->\n    <span tak-ripple class="tak-radio-ripple tak-focus-indicator"\n         [takRippleTrigger]="label"\n         [takRippleDisabled]="_isRippleDisabled()"\n         [takRippleCentered]="true"\n         [takRippleRadius]="20"\n         [takRippleAnimation]="{enterDuration: _noopAnimations ? 0 : 150}">\n\n      <span class="tak-ripple-element tak-radio-persistent-ripple"></span>\n    </span>\n  </span>\n\n  <!-- The label content for radio control. -->\n  <span class="tak-radio-label-content" [class.tak-radio-label-before]="labelPosition == \'before\'">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style="display:none">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n',
          styles: [
            '.tak-radio-button{display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.tak-radio-label{-webkit-user-select:none;user-select:none;cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle;width:100%}.tak-radio-container{box-sizing:border-box;display:inline-block;position:relative;width:20px;height:20px;flex-shrink:0}.tak-radio-outer-circle{box-sizing:border-box;display:block;height:20px;left:0;position:absolute;top:0;transition:border-color ease 280ms;width:20px;border-width:2px;border-style:solid;border-radius:50%}._tak-animation-noopable .tak-radio-outer-circle{transition:none}.tak-radio-inner-circle{border-radius:50%;box-sizing:border-box;display:block;height:20px;left:0;position:absolute;top:0;opacity:0;transition:transform ease 280ms,background-color ease 280ms,opacity linear 1ms 280ms;width:20px;transform:scale(0.001);-webkit-print-color-adjust:exact;color-adjust:exact}.tak-radio-checked .tak-radio-inner-circle{transform:scale(0.5);opacity:1;transition:transform ease 280ms,background-color ease 280ms}.cdk-high-contrast-active .tak-radio-checked .tak-radio-inner-circle{border:solid 10px}._tak-animation-noopable .tak-radio-inner-circle{transition:none}.tak-radio-label-content{-webkit-user-select:auto;user-select:auto;display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .tak-radio-label-content{padding-right:8px;padding-left:0}.tak-radio-label-content.tak-radio-label-before{order:-1;padding-left:0;padding-right:8px}[dir=rtl] .tak-radio-label-content.tak-radio-label-before{padding-right:0;padding-left:8px}.tak-radio-disabled,.tak-radio-disabled .tak-radio-label{cursor:default}.tak-radio-button .tak-radio-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.tak-radio-button .tak-radio-ripple .tak-ripple-element:not(.tak-radio-persistent-ripple){opacity:.16}.tak-radio-persistent-ripple{width:100%;height:100%;transform:none;top:0;left:0}.tak-radio-container:hover .tak-radio-persistent-ripple{opacity:.04}.tak-radio-button:not(.tak-radio-disabled).cdk-keyboard-focused .tak-radio-persistent-ripple,.tak-radio-button:not(.tak-radio-disabled).cdk-program-focused .tak-radio-persistent-ripple{opacity:.12}.tak-radio-persistent-ripple,.tak-radio-disabled .tak-radio-container:hover .tak-radio-persistent-ripple{opacity:0}@media(hover: none){.tak-radio-container:hover .tak-radio-persistent-ripple{display:none}}.tak-radio-input{opacity:0;position:absolute;top:0;left:0;margin:0;width:100%;height:100%;cursor:inherit;z-index:-1}.tak-radio-input:focus~.tak-focus-indicator::before{content:""}.cdk-high-contrast-active .tak-radio-disabled{opacity:.5}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: TakRadioGroup,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_RADIO_GROUP],
          },
        ],
      },
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      { type: i1.FocusMonitor },
      { type: i2.UniqueSelectionDispatcher },
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
            args: [TAK_RADIO_DEFAULT_OPTIONS],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Attribute,
            args: ['tabindex'],
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
class TakRadioModule {}
TakRadioModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRadioModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRadioModule,
  declarations: [TakRadioGroup, TakRadioButton],
  imports: [TakRippleModule, TakCommonModule],
  exports: [TakRadioGroup, TakRadioButton, TakCommonModule],
});
TakRadioModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRadioModule,
  imports: [TakRippleModule, TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRadioModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakRippleModule, TakCommonModule],
          exports: [TakRadioGroup, TakRadioButton, TakCommonModule],
          declarations: [TakRadioGroup, TakRadioButton],
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
  TAK_RADIO_DEFAULT_OPTIONS,
  TAK_RADIO_DEFAULT_OPTIONS_FACTORY,
  TAK_RADIO_GROUP,
  TAK_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
  TakRadioButton,
  TakRadioChange,
  TakRadioGroup,
  TakRadioModule,
  _TakRadioButtonBase,
  _TakRadioGroupBase,
};
//# sourceMappingURL=radio.mjs.map
