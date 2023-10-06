import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterContentInit } from '@angular/core';
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
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import { FocusOrigin } from '@takkion/ng-cdk/a11y';
import { HasTabIndex } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i3 from '@takkion/ng-material/core';
import * as i4 from '@takkion/ng-cdk/observers';
import { InjectionToken } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Provider } from '@angular/core';
import { ThemePalette } from '@takkion/ng-material/core';
import { Type } from '@angular/core';

declare namespace i1 {
  export { TAK_SLIDE_TOGGLE_REQUIRED_VALIDATOR, TakSlideToggleRequiredValidator };
}

declare namespace i2 {
  export {
    TAK_SLIDE_TOGGLE_VALUE_ACCESSOR,
    TakSlideToggleChange,
    _TakSlideToggleBase,
    TakSlideToggle,
  };
}

/** Injection token to be used to override the default options for `tak-slide-toggle`. */
export declare const TAK_SLIDE_TOGGLE_DEFAULT_OPTIONS: InjectionToken<TakSlideToggleDefaultOptions>;

export declare const TAK_SLIDE_TOGGLE_REQUIRED_VALIDATOR: Provider;

/** @docs-private */
export declare const TAK_SLIDE_TOGGLE_VALUE_ACCESSOR: {
  provide: InjectionToken<readonly ControlValueAccessor[]>;
  useExisting: Type<any>;
  multi: boolean;
};

/** Represents a slidable "switch" toggle that can be moved between on and off. */
export declare class TakSlideToggle extends _TakSlideToggleBase<TakSlideToggleChange> {
  /** Reference to the underlying input element. */
  _inputElement: ElementRef<HTMLInputElement>;
  constructor(
    elementRef: ElementRef,
    focusMonitor: FocusMonitor,
    changeDetectorRef: ChangeDetectorRef,
    tabIndex: string,
    defaults: TakSlideToggleDefaultOptions,
    animationMode?: string
  );
  protected _createChangeEvent(isChecked: boolean): TakSlideToggleChange;
  /** Method being called whenever the underlying input emits a change event. */
  _onChangeEvent(event: Event): void;
  /** Method being called whenever the slide-toggle has been clicked. */
  _onInputClick(event: Event): void;
  /** Focuses the slide-toggle. */
  focus(options?: FocusOptions, origin?: FocusOrigin): void;
  /** Method being called whenever the label text changes. */
  _onLabelTextChange(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakSlideToggle,
    [null, null, null, { attribute: 'tabindex' }, null, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakSlideToggle,
    'tak-slide-toggle',
    ['takSlideToggle'],
    { disabled: 'disabled'; disableRipple: 'disableRipple'; color: 'color'; tabIndex: 'tabIndex' },
    {},
    never,
    ['*'],
    false
  >;
}

export declare abstract class _TakSlideToggleBase<T>
  extends _TakSlideToggleMixinBase
  implements
    OnDestroy,
    AfterContentInit,
    ControlValueAccessor,
    CanDisable,
    CanColor,
    HasTabIndex,
    CanDisableRipple
{
  protected _focusMonitor: FocusMonitor;
  protected _changeDetectorRef: ChangeDetectorRef;
  defaults: TakSlideToggleDefaultOptions;
  protected _onChange: (_: any) => void;
  private _onTouched;
  protected _uniqueId: string;
  private _required;
  private _checked;
  protected abstract _createChangeEvent(isChecked: boolean): T;
  abstract focus(options?: FocusOptions, origin?: FocusOrigin): void;
  /** Whether noop animations are enabled. */
  _noopAnimations: boolean;
  /** Whether the slide toggle is currently focused. */
  _focused: boolean;
  /** Name value will be applied to the input element if present. */
  name: string | null;
  /** A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
  id: string;
  /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
  labelPosition: 'before' | 'after';
  /** Used to set the aria-label attribute on the underlying input element. */
  ariaLabel: string | null;
  /** Used to set the aria-labelledby attribute on the underlying input element. */
  ariaLabelledby: string | null;
  /** Used to set the aria-describedby attribute on the underlying input element. */
  ariaDescribedby: string;
  /** Whether the slide-toggle is required. */
  get required(): boolean;
  set required(value: BooleanInput);
  /** Whether the slide-toggle element is checked or not. */
  get checked(): boolean;
  set checked(value: BooleanInput);
  /** An event will be dispatched each time the slide-toggle changes its value. */
  readonly change: EventEmitter<T>;
  /**
   * An event will be dispatched each time the slide-toggle input is toggled.
   * This event is always emitted when the user toggles the slide toggle, but this does not mean
   * the slide toggle's value has changed.
   */
  readonly toggleChange: EventEmitter<void>;
  /** Returns the unique id for the visual hidden input. */
  get inputId(): string;
  constructor(
    elementRef: ElementRef,
    _focusMonitor: FocusMonitor,
    _changeDetectorRef: ChangeDetectorRef,
    tabIndex: string,
    defaults: TakSlideToggleDefaultOptions,
    animationMode: string | undefined,
    idPrefix: string
  );
  ngAfterContentInit(): void;
  ngOnDestroy(): void;
  /** Implemented as part of ControlValueAccessor. */
  writeValue(value: any): void;
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn: any): void;
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn: any): void;
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean): void;
  /** Toggles the checked state of the slide-toggle. */
  toggle(): void;
  /**
   * Emits a change event on the `change` output. Also notifies the FormControl about the change.
   */
  protected _emitChangeEvent(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakSlideToggleBase<any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    _TakSlideToggleBase<any>,
    never,
    never,
    {
      name: 'name';
      id: 'id';
      labelPosition: 'labelPosition';
      ariaLabel: 'aria-label';
      ariaLabelledby: 'aria-labelledby';
      ariaDescribedby: 'aria-describedby';
      required: 'required';
      checked: 'checked';
    },
    { change: 'change'; toggleChange: 'toggleChange' },
    never,
    never,
    false
  >;
}

/** Change event object emitted by a TakSlideToggle. */
export declare class TakSlideToggleChange {
  /** The source TakSlideToggle of the event. */
  source: TakSlideToggle;
  /** The new `checked` value of the TakSlideToggle. */
  checked: boolean;
  constructor(
    /** The source TakSlideToggle of the event. */
    source: TakSlideToggle,
    /** The new `checked` value of the TakSlideToggle. */
    checked: boolean
  );
}

/** Default `tak-slide-toggle` options that can be overridden. */
export declare interface TakSlideToggleDefaultOptions {
  /** Whether toggle action triggers value changes in slide toggle. */
  disableToggleValue?: boolean;
  /** Default color for slide toggles. */
  color?: ThemePalette;
}

/** @docs-private */
declare const _TakSlideToggleMixinBase: _Constructor<HasTabIndex> &
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

export declare class TakSlideToggleModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakSlideToggleModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakSlideToggleModule,
    [typeof i2.TakSlideToggle],
    [
      typeof _TakSlideToggleRequiredValidatorModule,
      typeof i3.TakRippleModule,
      typeof i3.TakCommonModule,
      typeof i4.ObserversModule,
    ],
    [
      typeof _TakSlideToggleRequiredValidatorModule,
      typeof i2.TakSlideToggle,
      typeof i3.TakCommonModule,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakSlideToggleModule>;
}

/**
 * Validator for Material slide-toggle components with the required attribute in a
 * template-driven form. The default validator for required form controls asserts
 * that the control value is not undefined but that is not appropriate for a slide-toggle
 * where the value is always defined.
 *
 * Required slide-toggle form controls are valid when checked.
 */
export declare class TakSlideToggleRequiredValidator extends CheckboxRequiredValidator {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakSlideToggleRequiredValidator, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakSlideToggleRequiredValidator,
    'tak-slide-toggle[required][formControlName],             tak-slide-toggle[required][formControl], tak-slide-toggle[required][ngModel]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** This module is used by both original and MDC-based slide-toggle implementations. */
export declare class _TakSlideToggleRequiredValidatorModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakSlideToggleRequiredValidatorModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    _TakSlideToggleRequiredValidatorModule,
    [typeof i1.TakSlideToggleRequiredValidator],
    never,
    [typeof i1.TakSlideToggleRequiredValidator]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<_TakSlideToggleRequiredValidatorModule>;
}

export {};
