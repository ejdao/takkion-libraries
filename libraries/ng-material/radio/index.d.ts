import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterContentInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanDisableRipple } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ControlValueAccessor } from '@angular/forms';
import { DoCheck } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import { FocusOrigin } from '@takkion/ng-cdk/a11y';
import { HasTabIndex } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-material/core';
import { InjectionToken } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { QueryList } from '@angular/core';
import { ThemePalette } from '@takkion/ng-material/core';
import { UniqueSelectionDispatcher } from '@takkion/ng-cdk/collections';

declare namespace i1 {
  export {
    TAK_RADIO_DEFAULT_OPTIONS_FACTORY,
    TakRadioDefaultOptions,
    TAK_RADIO_DEFAULT_OPTIONS,
    TAK_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
    TakRadioChange,
    TAK_RADIO_GROUP,
    _TakRadioGroupBase,
    TakRadioGroup,
    _TakRadioButtonBase,
    TakRadioButton,
  };
}

export declare const TAK_RADIO_DEFAULT_OPTIONS: InjectionToken<TakRadioDefaultOptions>;

export declare function TAK_RADIO_DEFAULT_OPTIONS_FACTORY(): TakRadioDefaultOptions;

/**
 * Injection token that can be used to inject instances of `TakRadioGroup`. It serves as
 * alternative token to the actual `TakRadioGroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export declare const TAK_RADIO_GROUP: InjectionToken<_TakRadioGroupBase<_TakRadioButtonBase>>;

/**
 * Provider Expression that allows tak-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export declare const TAK_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any;

/**
 * A Material design radio-button. Typically placed inside of `<tak-radio-group>` elements.
 */
export declare class TakRadioButton extends _TakRadioButtonBase {
  constructor(
    radioGroup: TakRadioGroup,
    elementRef: ElementRef,
    changeDetector: ChangeDetectorRef,
    focusMonitor: FocusMonitor,
    radioDispatcher: UniqueSelectionDispatcher,
    animationMode?: string,
    providerOverride?: TakRadioDefaultOptions,
    tabIndex?: string
  );
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakRadioButton,
    [
      { optional: true },
      null,
      null,
      null,
      null,
      { optional: true },
      { optional: true },
      { attribute: 'tabindex' },
    ]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakRadioButton,
    'tak-radio-button',
    ['takRadioButton'],
    { disableRipple: 'disableRipple'; tabIndex: 'tabIndex' },
    {},
    never,
    ['*'],
    false
  >;
}

/** @docs-private */
declare abstract class TakRadioButtonBase {
  _elementRef: ElementRef;
  abstract disabled: boolean;
  constructor(_elementRef: ElementRef);
}

/**
 * Base class with all of the `TakRadioButton` functionality.
 * @docs-private
 */
export declare abstract class _TakRadioButtonBase
  extends _TakRadioButtonMixinBase
  implements OnInit, AfterViewInit, DoCheck, OnDestroy, CanDisableRipple, HasTabIndex
{
  protected _changeDetector: ChangeDetectorRef;
  private _focusMonitor;
  private _radioDispatcher;
  private _providerOverride?;
  private _uniqueId;
  /** The unique ID for the radio button. */
  id: string;
  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  name: string;
  /** Used to set the 'aria-label' attribute on the underlying input element. */
  ariaLabel: string;
  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  ariaLabelledby: string;
  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  ariaDescribedby: string;
  /** Whether this radio button is checked. */
  get checked(): boolean;
  set checked(value: BooleanInput);
  /** The value of this radio button. */
  get value(): any;
  set value(value: any);
  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  get labelPosition(): 'before' | 'after';
  set labelPosition(value: 'before' | 'after');
  private _labelPosition;
  /** Whether the radio button is disabled. */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  /** Whether the radio button is required. */
  get required(): boolean;
  set required(value: BooleanInput);
  /** Theme color of the radio button. */
  get color(): ThemePalette;
  set color(newValue: ThemePalette);
  private _color;
  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  readonly change: EventEmitter<TakRadioChange>;
  /** The parent radio group. May or may not be present. */
  radioGroup: _TakRadioGroupBase<_TakRadioButtonBase>;
  /** ID of the native input element inside `<tak-radio-button>` */
  get inputId(): string;
  /** Whether this radio is checked. */
  private _checked;
  /** Whether this radio is disabled. */
  private _disabled;
  /** Whether this radio is required. */
  private _required;
  /** Value assigned to this radio. */
  private _value;
  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener;
  /** Previous value of the input's tabindex. */
  private _previousTabIndex;
  /** The native `<input type=radio>` element */
  _inputElement: ElementRef<HTMLInputElement>;
  /** Whether animations are disabled. */
  _noopAnimations: boolean;
  constructor(
    radioGroup: _TakRadioGroupBase<_TakRadioButtonBase>,
    elementRef: ElementRef,
    _changeDetector: ChangeDetectorRef,
    _focusMonitor: FocusMonitor,
    _radioDispatcher: UniqueSelectionDispatcher,
    animationMode?: string,
    _providerOverride?: TakRadioDefaultOptions | undefined,
    tabIndex?: string
  );
  /** Focuses the radio button. */
  focus(options?: FocusOptions, origin?: FocusOrigin): void;
  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck(): void;
  ngOnInit(): void;
  ngDoCheck(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  /** Dispatch change event with current value. */
  private _emitChangeEvent;
  _isRippleDisabled(): boolean;
  _onInputClick(event: Event): void;
  /** Triggered when the radio button receives an interaction from the user. */
  _onInputInteraction(event: Event): void;
  /** Sets the disabled state and marks for check if a change occurred. */
  protected _setDisabled(value: boolean): void;
  /** Gets the tabindex for the underlying input element. */
  private _updateTabIndex;
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakRadioButtonBase, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    _TakRadioButtonBase,
    never,
    never,
    {
      id: 'id';
      name: 'name';
      ariaLabel: 'aria-label';
      ariaLabelledby: 'aria-labelledby';
      ariaDescribedby: 'aria-describedby';
      checked: 'checked';
      value: 'value';
      labelPosition: 'labelPosition';
      disabled: 'disabled';
      required: 'required';
      color: 'color';
    },
    { change: 'change' },
    never,
    never,
    false
  >;
}

declare const _TakRadioButtonMixinBase: _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> &
  _Constructor<HasTabIndex> &
  _AbstractConstructor<HasTabIndex> &
  typeof TakRadioButtonBase;

/** Change event object emitted by TakRadio and TakRadioGroup. */
export declare class TakRadioChange {
  /** The TakRadioButton that emits the change event. */
  source: _TakRadioButtonBase;
  /** The value of the TakRadioButton. */
  value: any;
  constructor(
    /** The TakRadioButton that emits the change event. */
    source: _TakRadioButtonBase,
    /** The value of the TakRadioButton. */
    value: any
  );
}

export declare interface TakRadioDefaultOptions {
  color: ThemePalette;
}

/**
 * A group of radio buttons. May contain one or more `<tak-radio-button>` elements.
 */
export declare class TakRadioGroup extends _TakRadioGroupBase<TakRadioButton> {
  _radios: QueryList<TakRadioButton>;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakRadioGroup, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakRadioGroup,
    'tak-radio-group',
    ['takRadioGroup'],
    {},
    {},
    ['_radios'],
    never,
    false
  >;
}

/**
 * Base class with all of the `TakRadioGroup` functionality.
 * @docs-private
 */
export declare abstract class _TakRadioGroupBase<T extends _TakRadioButtonBase>
  implements AfterContentInit, ControlValueAccessor
{
  private _changeDetector;
  /** Selected value for the radio group. */
  private _value;
  /** The HTML name attribute applied to radio buttons in this group. */
  private _name;
  /** The currently selected radio button. Should match value. */
  private _selected;
  /** Whether the `value` has been set to its initial value. */
  private _isInitialized;
  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  private _labelPosition;
  /** Whether the radio group is disabled. */
  private _disabled;
  /** Whether the radio group is required. */
  private _required;
  /** The method to be called in order to update ngModel */
  _controlValueAccessorChangeFn: (value: any) => void;
  /**
   * onTouch function registered via registerOnTouch (ControlValueAccessor).
   * @docs-private
   */
  onTouched: () => any;
  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  readonly change: EventEmitter<TakRadioChange>;
  /** Child radio buttons. */
  abstract _radios: QueryList<T>;
  /** Theme color for all of the radio buttons in the group. */
  color: ThemePalette;
  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  get name(): string;
  set name(value: string);
  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  get labelPosition(): 'before' | 'after';
  set labelPosition(v: 'before' | 'after');
  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  get value(): any;
  set value(newValue: any);
  _checkSelectedRadioButton(): void;
  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  get selected(): T | null;
  set selected(selected: T | null);
  /** Whether the radio group is disabled */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  /** Whether the radio group is required */
  get required(): boolean;
  set required(value: BooleanInput);
  constructor(_changeDetector: ChangeDetectorRef);
  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit(): void;
  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch(): void;
  private _updateRadioButtonNames;
  /** Updates the `selected` radio button from the internal _value state. */
  private _updateSelectedRadioFromValue;
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(): void;
  _markRadiosForCheck(): void;
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any): void;
  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void): void;
  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any): void;
  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakRadioGroupBase<any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    _TakRadioGroupBase<any>,
    never,
    never,
    {
      color: 'color';
      name: 'name';
      labelPosition: 'labelPosition';
      value: 'value';
      selected: 'selected';
      disabled: 'disabled';
      required: 'required';
    },
    { change: 'change' },
    never,
    never,
    false
  >;
}

export declare class TakRadioModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakRadioModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakRadioModule,
    [typeof i1.TakRadioGroup, typeof i1.TakRadioButton],
    [typeof i2.TakRippleModule, typeof i2.TakCommonModule],
    [typeof i1.TakRadioGroup, typeof i1.TakRadioButton, typeof i2.TakCommonModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakRadioModule>;
}

export {};
