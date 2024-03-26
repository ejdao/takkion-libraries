import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterContentInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanDisableRipple } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-material/core';
import { InjectionToken } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { QueryList } from '@angular/core';

declare namespace i1 {
  export {
    ToggleType,
    TakButtonToggleAppearance,
    TakButtonToggleDefaultOptions,
    TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS,
    TAK_BUTTON_TOGGLE_GROUP,
    TAK_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
    TakButtonToggleChange,
    TakButtonToggleGroup,
    TakButtonToggle,
  };
}

/**
 * Injection token that can be used to configure the
 * default options for all button toggles within an app.
 */
export declare const TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS: InjectionToken<TakButtonToggleDefaultOptions>;

/**
 * Injection token that can be used to reference instances of `TakButtonToggleGroup`.
 * It serves as alternative token to the actual `TakButtonToggleGroup` class which
 * could cause unnecessary retention of the class and its component metadata.
 */
export declare const TAK_BUTTON_TOGGLE_GROUP: InjectionToken<TakButtonToggleGroup>;

/**
 * Provider Expression that allows tak-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export declare const TAK_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any;

/** Single button inside of a toggle group. */
export declare class TakButtonToggle
  extends _TakButtonToggleBase
  implements OnInit, AfterViewInit, CanDisableRipple, OnDestroy
{
  private _changeDetectorRef;
  private _elementRef;
  private _focusMonitor;
  private _checked;
  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  ariaLabel: string;
  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  ariaLabelledby: string | null;
  /** Underlying native `button` element. */
  _buttonElement: ElementRef<HTMLButtonElement>;
  /** The parent button toggle group (exclusive selection). Optional. */
  buttonToggleGroup: TakButtonToggleGroup;
  /** Unique ID for the underlying `button` element. */
  get buttonId(): string;
  /** The unique ID for this button toggle. */
  id: string;
  /** HTML's 'name' attribute used to group radios for unique selection. */
  name: string;
  /** TakButtonToggleGroup reads this to assign its own value. */
  value: any;
  /** Tabindex for the toggle. */
  tabIndex: number | null;
  /** The appearance style of the button. */
  get appearance(): TakButtonToggleAppearance;
  set appearance(value: TakButtonToggleAppearance);
  private _appearance;
  /** Whether the button is checked. */
  get checked(): boolean;
  set checked(value: BooleanInput);
  /** Whether the button is disabled. */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  private _disabled;
  /** Event emitted when the group value changes. */
  readonly change: EventEmitter<TakButtonToggleChange>;
  constructor(
    toggleGroup: TakButtonToggleGroup,
    _changeDetectorRef: ChangeDetectorRef,
    _elementRef: ElementRef<HTMLElement>,
    _focusMonitor: FocusMonitor,
    defaultTabIndex: string,
    defaultOptions?: TakButtonToggleDefaultOptions
  );
  ngOnInit(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  /** Focuses the button. */
  focus(options?: FocusOptions): void;
  /** Checks the button toggle due to an interaction with the underlying native button. */
  _onButtonClick(): void;
  /**
   * Marks the button toggle as needing checking for change detection.
   * This method is exposed because the parent button toggle group will directly
   * update bound properties of the radio button.
   */
  _markForCheck(): void;
  /** Gets the name that should be assigned to the inner DOM node. */
  _getButtonName(): string | null;
  /** Whether the toggle is in single selection mode. */
  private _isSingleSelector;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakButtonToggle,
    [{ optional: true }, null, null, null, { attribute: 'tabindex' }, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakButtonToggle,
    'tak-button-toggle',
    ['takButtonToggle'],
    {
      disableRipple: 'disableRipple';
      ariaLabel: 'aria-label';
      ariaLabelledby: 'aria-labelledby';
      id: 'id';
      name: 'name';
      value: 'value';
      tabIndex: 'tabIndex';
      appearance: 'appearance';
      checked: 'checked';
      disabled: 'disabled';
    },
    { change: 'change' },
    never,
    ['*'],
    false
  >;
}

/** Possible appearance styles for the button toggle. */
export declare type TakButtonToggleAppearance = 'legacy' | 'standard';

/** @docs-private */
declare const _TakButtonToggleBase: _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> & {
    new (): {};
  };

/** Change event object emitted by TakButtonToggle. */
export declare class TakButtonToggleChange {
  /** The TakButtonToggle that emits the event. */
  source: TakButtonToggle;
  /** The value assigned to the TakButtonToggle. */
  value: any;
  constructor(
    /** The TakButtonToggle that emits the event. */
    source: TakButtonToggle,
    /** The value assigned to the TakButtonToggle. */
    value: any
  );
}

/**
 * Represents the default options for the button toggle that can be configured
 * using the `TAK_BUTTON_TOGGLE_DEFAULT_OPTIONS` injection token.
 */
export declare interface TakButtonToggleDefaultOptions {
  /**
   * Default appearance to be used by button toggles. Can be overridden by explicitly
   * setting an appearance on a button toggle or group.
   */
  appearance?: TakButtonToggleAppearance;
}

/** Exclusive selection button toggle group that behaves like a radio-button group. */
export declare class TakButtonToggleGroup
  implements ControlValueAccessor, OnInit, AfterContentInit
{
  private _changeDetector;
  private _vertical;
  private _multiple;
  private _disabled;
  private _selectionModel;
  /**
   * Reference to the raw value that the consumer tried to assign. The real
   * value will exclude any values from this one that don't correspond to a
   * toggle. Useful for the cases where the value is assigned before the toggles
   * have been initialized or at the same that they're being swapped out.
   */
  private _rawValue;
  /**
   * The method to be called in order to update ngModel.
   * Now `ngModel` binding is not supported in multiple selection mode.
   */
  _controlValueAccessorChangeFn: (value: any) => void;
  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  _onTouched: () => any;
  /** Child button toggle buttons. */
  _buttonToggles: QueryList<TakButtonToggle>;
  /** The appearance for all the buttons in the group. */
  appearance: TakButtonToggleAppearance;
  /** `name` attribute for the underlying `input` element. */
  get name(): string;
  set name(value: string);
  private _name;
  /** Whether the toggle group is vertical. */
  get vertical(): boolean;
  set vertical(value: BooleanInput);
  /** Value of the toggle group. */
  get value(): any;
  set value(newValue: any);
  /**
   * Event that emits whenever the value of the group changes.
   * Used to facilitate two-way data binding.
   * @docs-private
   */
  readonly valueChange: EventEmitter<any>;
  /** Selected button toggles in the group. */
  get selected(): TakButtonToggle | TakButtonToggle[];
  /** Whether multiple button toggles can be selected. */
  get multiple(): boolean;
  set multiple(value: BooleanInput);
  /** Whether multiple button toggle group is disabled. */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  /** Event emitted when the group's value changes. */
  readonly change: EventEmitter<TakButtonToggleChange>;
  constructor(_changeDetector: ChangeDetectorRef, defaultOptions?: TakButtonToggleDefaultOptions);
  ngOnInit(): void;
  ngAfterContentInit(): void;
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value Value to be set to the model.
   */
  writeValue(value: any): void;
  registerOnChange(fn: (value: any) => void): void;
  registerOnTouched(fn: any): void;
  setDisabledState(isDisabled: boolean): void;
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(toggle: TakButtonToggle): void;
  /**
   * Syncs a button toggle's selected state with the model value.
   * @param toggle Toggle to be synced.
   * @param select Whether the toggle should be selected.
   * @param isUserInput Whether the change was a result of a user interaction.
   * @param deferEvents Whether to defer emitting the change events.
   */
  _syncButtonToggle(
    toggle: TakButtonToggle,
    select: boolean,
    isUserInput?: boolean,
    deferEvents?: boolean
  ): void;
  /** Checks whether a button toggle is selected. */
  _isSelected(toggle: TakButtonToggle): boolean;
  /** Determines whether a button toggle should be checked on init. */
  _isPrechecked(toggle: TakButtonToggle): boolean;
  /** Updates the selection state of the toggles in the group based on a value. */
  private _setSelectionByValue;
  /** Clears the selected toggles. */
  private _clearSelection;
  /** Selects a value if there's a toggle that corresponds to it. */
  private _selectValue;
  /** Syncs up the group's value with the model and emits the change event. */
  private _updateModelValue;
  /** Marks all of the child button toggles to be checked. */
  private _markButtonsForCheck;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakButtonToggleGroup, [null, { optional: true }]>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakButtonToggleGroup,
    'tak-button-toggle-group',
    ['takButtonToggleGroup'],
    {
      appearance: 'appearance';
      name: 'name';
      vertical: 'vertical';
      value: 'value';
      multiple: 'multiple';
      disabled: 'disabled';
    },
    { valueChange: 'valueChange'; change: 'change' },
    ['_buttonToggles'],
    never,
    false
  >;
}

export declare class TakButtonToggleModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakButtonToggleModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakButtonToggleModule,
    [typeof i1.TakButtonToggleGroup, typeof i1.TakButtonToggle],
    [typeof i2.TakCommonModule, typeof i2.TakRippleModule],
    [typeof i2.TakCommonModule, typeof i1.TakButtonToggleGroup, typeof i1.TakButtonToggle]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakButtonToggleModule>;
}

/**
 * @deprecated No longer used.
 * @breaking-change 11.0.0
 */
export declare type ToggleType = 'checkbox' | 'radio';

export {};
