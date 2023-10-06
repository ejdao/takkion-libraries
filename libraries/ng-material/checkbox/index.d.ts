import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterViewInit } from '@angular/core';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanColor } from '@takkion/ng-material/core';
import { CanDisable } from '@takkion/ng-material/core';
import { CanDisableRipple } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { CheckboxRequiredValidator } from '@angular/forms';
import { _Constructor } from '@takkion/ng-material/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FocusableOption } from '@takkion/ng-cdk/a11y';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import { FocusOrigin } from '@takkion/ng-cdk/a11y';
import { HasTabIndex } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i3 from '@takkion/ng-material/core';
import * as i4 from '@takkion/ng-cdk/observers';
import { InjectionToken } from '@angular/core';
import { TakRipple } from '@takkion/ng-material/core';
import { NgZone } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Provider } from '@angular/core';
import { ThemePalette } from '@takkion/ng-material/core';

declare namespace i1 {
  export { TAK_CHECKBOX_REQUIRED_VALIDATOR, TakCheckboxRequiredValidator };
}

declare namespace i2 {
  export {
    TAK_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    TransitionCheckState,
    TakCheckboxChange,
    _TakCheckboxBase,
    TakCheckbox,
  };
}

/**
 * Provider Expression that allows tak-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export declare const TAK_CHECKBOX_CONTROL_VALUE_ACCESSOR: any;

/** Injection token to be used to override the default options for `tak-checkbox`. */
export declare const TAK_CHECKBOX_DEFAULT_OPTIONS: InjectionToken<TakCheckboxDefaultOptions>;

/** @docs-private */
export declare function TAK_CHECKBOX_DEFAULT_OPTIONS_FACTORY(): TakCheckboxDefaultOptions;

export declare const TAK_CHECKBOX_REQUIRED_VALIDATOR: Provider;

/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A TakCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://material.io/design/components/selection-controls.html
 */
export declare class TakCheckbox
  extends _TakCheckboxBase<TakCheckboxChange>
  implements AfterViewInit, OnDestroy
{
  private _focusMonitor;
  protected _animationClasses: {
    uncheckedToChecked: string;
    uncheckedToIndeterminate: string;
    checkedToUnchecked: string;
    checkedToIndeterminate: string;
    indeterminateToChecked: string;
    indeterminateToUnchecked: string;
  };
  constructor(
    elementRef: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef,
    _focusMonitor: FocusMonitor,
    ngZone: NgZone,
    tabIndex: string,
    animationMode?: string,
    options?: TakCheckboxDefaultOptions
  );
  protected _createChangeEvent(isChecked: boolean): TakCheckboxChange;
  protected _getAnimationTargetElement(): any;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   * Do not toggle on (change) event since IE doesn't fire change event when
   *   indeterminate checkbox is clicked.
   * @param event
   */
  _onInputClick(event: Event): void;
  /** Focuses the checkbox. */
  focus(origin?: FocusOrigin, options?: FocusOptions): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakCheckbox,
    [null, null, null, null, { attribute: 'tabindex' }, { optional: true }, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakCheckbox,
    'tak-checkbox',
    ['takCheckbox'],
    { disableRipple: 'disableRipple'; color: 'color'; tabIndex: 'tabIndex' },
    {},
    never,
    ['*'],
    false
  >;
}

export declare abstract class _TakCheckboxBase<E>
  extends _TakCheckboxMixinBase
  implements
    AfterViewInit,
    ControlValueAccessor,
    CanColor,
    CanDisable,
    HasTabIndex,
    CanDisableRipple,
    FocusableOption
{
  protected _changeDetectorRef: ChangeDetectorRef;
  protected _ngZone: NgZone;
  _animationMode?: string | undefined;
  protected _options?: TakCheckboxDefaultOptions | undefined;
  /** Focuses the checkbox. */
  abstract focus(origin?: FocusOrigin): void;
  /** Creates the change event that will be emitted by the checkbox. */
  protected abstract _createChangeEvent(isChecked: boolean): E;
  /** Gets the element on which to add the animation CSS classes. */
  protected abstract _getAnimationTargetElement(): HTMLElement | null;
  /** CSS classes to add when transitioning between the different checkbox states. */
  protected abstract _animationClasses: {
    uncheckedToChecked: string;
    uncheckedToIndeterminate: string;
    checkedToUnchecked: string;
    checkedToIndeterminate: string;
    indeterminateToChecked: string;
    indeterminateToUnchecked: string;
  };
  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  ariaLabel: string;
  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  ariaLabelledby: string | null;
  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  ariaDescribedby: string;
  private _uniqueId;
  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  id: string;
  /** Returns the unique id for the visual hidden input. */
  get inputId(): string;
  /** Whether the checkbox is required. */
  get required(): boolean;
  set required(value: BooleanInput);
  private _required;
  /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
  labelPosition: 'before' | 'after';
  /** Name value will be applied to the input element if present */
  name: string | null;
  /** Event emitted when the checkbox's `checked` value changes. */
  readonly change: EventEmitter<E>;
  /** Event emitted when the checkbox's `indeterminate` value changes. */
  readonly indeterminateChange: EventEmitter<boolean>;
  /** The value attribute of the native input element */
  value: string;
  /** The native `<input type="checkbox">` element */
  _inputElement: ElementRef<HTMLInputElement>;
  /** The native `<label>` element */
  _labelElement: ElementRef<HTMLInputElement>;
  /** Reference to the ripple instance of the checkbox. */
  ripple: TakRipple;
  /**
   * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  _onTouched: () => any;
  private _currentAnimationClass;
  private _currentCheckState;
  private _controlValueAccessorChangeFn;
  constructor(
    idPrefix: string,
    elementRef: ElementRef<HTMLElement>,
    _changeDetectorRef: ChangeDetectorRef,
    _ngZone: NgZone,
    tabIndex: string,
    _animationMode?: string | undefined,
    _options?: TakCheckboxDefaultOptions | undefined
  );
  ngAfterViewInit(): void;
  /** Whether the checkbox is checked. */
  get checked(): boolean;
  set checked(value: BooleanInput);
  private _checked;
  /**
   * Whether the checkbox is disabled. This fully overrides the implementation provided by
   * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
   */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  private _disabled;
  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  get indeterminate(): boolean;
  set indeterminate(value: BooleanInput);
  private _indeterminate;
  _isRippleDisabled(): boolean;
  /** Method being called whenever the label text changes. */
  _onLabelTextChange(): void;
  writeValue(value: any): void;
  registerOnChange(fn: (value: any) => void): void;
  registerOnTouched(fn: any): void;
  setDisabledState(isDisabled: boolean): void;
  _getAriaChecked(): 'true' | 'false' | 'mixed';
  private _transitionCheckState;
  private _emitChangeEvent;
  /** Toggles the `checked` state of the checkbox. */
  toggle(): void;
  protected _handleInputClick(): void;
  _onInteractionEvent(event: Event): void;
  _onBlur(): void;
  private _getAnimationClassForCheckStateTransition;
  /**
   * Syncs the indeterminate value with the checkbox DOM node.
   *
   * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
   * property is supported on an element boils down to `if (propName in element)`. Domino's
   * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
   * server-side rendering.
   */
  private _syncIndeterminate;
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakCheckboxBase<any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    _TakCheckboxBase<any>,
    never,
    never,
    {
      ariaLabel: 'aria-label';
      ariaLabelledby: 'aria-labelledby';
      ariaDescribedby: 'aria-describedby';
      id: 'id';
      required: 'required';
      labelPosition: 'labelPosition';
      name: 'name';
      value: 'value';
      checked: 'checked';
      disabled: 'disabled';
      indeterminate: 'indeterminate';
    },
    { change: 'change'; indeterminateChange: 'indeterminateChange' },
    never,
    never,
    false
  >;
}

/** Change event object emitted by TakCheckbox. */
export declare class TakCheckboxChange {
  /** The source TakCheckbox of the event. */
  source: TakCheckbox;
  /** The new `checked` value of the checkbox. */
  checked: boolean;
}

/**
 * Checkbox click action when user click on input element.
 * noop: Do not toggle checked or indeterminate.
 * check: Only toggle checked status, ignore indeterminate.
 * check-indeterminate: Toggle checked status, set indeterminate to false. Default behavior.
 * undefined: Same as `check-indeterminate`.
 */
export declare type TakCheckboxClickAction = 'noop' | 'check' | 'check-indeterminate' | undefined;

/** Default `tak-checkbox` options that can be overridden. */
export declare interface TakCheckboxDefaultOptions {
  /** Default theme color palette to be used for checkboxes. */
  color?: ThemePalette;
  /** Default checkbox click action for checkboxes. */
  clickAction?: TakCheckboxClickAction;
}

/** @docs-private */
declare const _TakCheckboxMixinBase: _Constructor<HasTabIndex> &
  _AbstractConstructor<HasTabIndex> &
  _Constructor<CanColor> &
  _AbstractConstructor<CanColor> &
  _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> &
  _Constructor<CanDisable> &
  _AbstractConstructor<CanDisable> & {
    new (_elementRef: ElementRef): {
      _elementRef: ElementRef;
    };
  };

export declare class TakCheckboxModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCheckboxModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakCheckboxModule,
    [typeof i2.TakCheckbox],
    [
      typeof i3.TakRippleModule,
      typeof i3.TakCommonModule,
      typeof i4.ObserversModule,
      typeof _TakCheckboxRequiredValidatorModule,
    ],
    [typeof i2.TakCheckbox, typeof i3.TakCommonModule, typeof _TakCheckboxRequiredValidatorModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakCheckboxModule>;
}

/**
 * Validator for Material checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `tak-checkbox`.
 */
export declare class TakCheckboxRequiredValidator extends CheckboxRequiredValidator {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCheckboxRequiredValidator, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCheckboxRequiredValidator,
    'tak-checkbox[required][formControlName],             tak-checkbox[required][formControl], tak-checkbox[required][ngModel]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** This module is used by both original and MDC-based checkbox implementations. */
export declare class _TakCheckboxRequiredValidatorModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakCheckboxRequiredValidatorModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    _TakCheckboxRequiredValidatorModule,
    [typeof i1.TakCheckboxRequiredValidator],
    never,
    [typeof i1.TakCheckboxRequiredValidator]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<_TakCheckboxRequiredValidatorModule>;
}

/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export declare const enum TransitionCheckState {
  /** The initial state of the component before any user interaction. */
  Init = 0,
  /** The state representing the component when it's becoming checked. */
  Checked = 1,
  /** The state representing the component when it's becoming unchecked. */
  Unchecked = 2,
  /** The state representing the component when it's becoming indeterminate. */
  Indeterminate = 3,
}

export {};
