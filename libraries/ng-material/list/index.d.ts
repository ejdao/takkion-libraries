import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterContentInit } from '@angular/core';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanDisable } from '@takkion/ng-material/core';
import { CanDisableRipple } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FocusableOption } from '@takkion/ng-cdk/a11y';
import { FocusKeyManager } from '@takkion/ng-cdk/a11y';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import * as i0 from '@angular/core';
import * as i3 from '@takkion/ng-material/core';
import * as i4 from '@angular/common';
import * as i5 from '@takkion/ng-material/divider';
import { InjectionToken } from '@angular/core';
import { TakLine } from '@takkion/ng-material/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { QueryList } from '@angular/core';
import { SelectionModel } from '@takkion/ng-cdk/collections';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemePalette } from '@takkion/ng-material/core';

declare namespace i1 {
  export {
    TAK_LIST,
    TAK_NAV_LIST,
    TakNavList,
    TakList,
    TakListAvatarCssTakStyler,
    TakListIconCssTakStyler,
    TakListSubheaderCssTakStyler,
    TakListItem,
  };
}

declare namespace i2 {
  export {
    TAK_SELECTION_LIST_VALUE_ACCESSOR,
    TakSelectionListChange,
    TakListOptionCheckboxPosition,
    TakListOption,
    TakSelectionList,
  };
}

/**
 * Injection token that can be used to inject instances of `TakList`. It serves as
 * alternative token to the actual `TakList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export declare const TAK_LIST: InjectionToken<TakList>;

/**
 * Injection token that can be used to inject instances of `TakNavList`. It serves as
 * alternative token to the actual `TakNavList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export declare const TAK_NAV_LIST: InjectionToken<TakNavList>;

/** @docs-private */
export declare const TAK_SELECTION_LIST_VALUE_ACCESSOR: any;

export declare class TakList
  extends _TakListBase
  implements CanDisable, CanDisableRipple, OnChanges, OnDestroy
{
  private _elementRef;
  /** Emits when the state of the list changes. */
  readonly _stateChanges: Subject<void>;
  constructor(_elementRef: ElementRef<HTMLElement>);
  _getListType(): 'list' | 'action-list' | null;
  ngOnChanges(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakList, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakList,
    'tak-list, tak-action-list',
    ['takList'],
    { disableRipple: 'disableRipple'; disabled: 'disabled' },
    {},
    never,
    ['*'],
    false
  >;
}

/**
 * Directive whose purpose is to add the tak- CSS styling to this selector.
 * @docs-private
 */
export declare class TakListAvatarCssTakStyler {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakListAvatarCssTakStyler, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakListAvatarCssTakStyler,
    '[tak-list-avatar], [takListAvatar]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** @docs-private */
declare const _TakListBase: _Constructor<CanDisable> &
  _AbstractConstructor<CanDisable> &
  _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> & {
    new (): {};
  };

/**
 * Directive whose purpose is to add the tak- CSS styling to this selector.
 * @docs-private
 */
export declare class TakListIconCssTakStyler {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakListIconCssTakStyler, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakListIconCssTakStyler,
    '[tak-list-icon], [takListIcon]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** An item within a Material Design list. */
export declare class TakListItem
  extends _TakListItemMixinBase
  implements AfterContentInit, CanDisableRipple, OnDestroy
{
  private _element;
  private _isInteractiveList;
  private _list?;
  private readonly _destroyed;
  _lines: QueryList<TakLine>;
  _avatar: TakListAvatarCssTakStyler;
  _icon: TakListIconCssTakStyler;
  constructor(
    _element: ElementRef<HTMLElement>,
    _changeDetectorRef: ChangeDetectorRef,
    navList?: TakNavList,
    list?: TakList
  );
  /** Whether the option is disabled. */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  private _disabled;
  ngAfterContentInit(): void;
  ngOnDestroy(): void;
  /** Whether this list item should show a ripple effect when clicked. */
  _isRippleDisabled(): boolean;
  /** Retrieves the DOM element of the component host. */
  _getHostElement(): HTMLElement;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakListItem,
    [null, null, { optional: true }, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakListItem,
    'tak-list-item, a[tak-list-item], button[tak-list-item]',
    ['takListItem'],
    { disableRipple: 'disableRipple'; disabled: 'disabled' },
    {},
    ['_avatar', '_icon', '_lines'],
    [
      '[tak-list-avatar], [tak-list-icon], [takListAvatar], [takListIcon]',
      '[tak-line], [takLine]',
      '*',
    ],
    false
  >;
}

/** @docs-private */
declare const _TakListItemMixinBase: _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> & {
    new (): {};
  };

export declare class TakListModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakListModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakListModule,
    [
      typeof i1.TakList,
      typeof i1.TakNavList,
      typeof i1.TakListItem,
      typeof i1.TakListAvatarCssTakStyler,
      typeof i1.TakListIconCssTakStyler,
      typeof i1.TakListSubheaderCssTakStyler,
      typeof i2.TakSelectionList,
      typeof i2.TakListOption,
    ],
    [
      typeof i3.TakLineModule,
      typeof i3.TakRippleModule,
      typeof i3.TakCommonModule,
      typeof i3.TakPseudoCheckboxModule,
      typeof i4.CommonModule,
    ],
    [
      typeof i1.TakList,
      typeof i1.TakNavList,
      typeof i1.TakListItem,
      typeof i1.TakListAvatarCssTakStyler,
      typeof i3.TakLineModule,
      typeof i3.TakCommonModule,
      typeof i1.TakListIconCssTakStyler,
      typeof i1.TakListSubheaderCssTakStyler,
      typeof i3.TakPseudoCheckboxModule,
      typeof i2.TakSelectionList,
      typeof i2.TakListOption,
      typeof i5.TakDividerModule,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakListModule>;
}

/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export declare class TakListOption
  extends _TakListOptionBase
  implements AfterContentInit, OnDestroy, OnInit, FocusableOption, CanDisableRipple
{
  private _element;
  private _changeDetector;
  /** @docs-private */
  selectionList: TakSelectionList;
  private _selected;
  private _disabled;
  private _hasFocus;
  _avatar: TakListAvatarCssTakStyler;
  _icon: TakListIconCssTakStyler;
  _lines: QueryList<TakLine>;
  /**
   * Emits when the selected state of the option has changed.
   * Use to facilitate two-data binding to the `selected` property.
   * @docs-private
   */
  readonly selectedChange: EventEmitter<boolean>;
  /** DOM element containing the item's text. */
  _text: ElementRef;
  /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
  checkboxPosition: TakListOptionCheckboxPosition;
  /** Theme color of the list option. This sets the color of the checkbox. */
  get color(): ThemePalette;
  set color(newValue: ThemePalette);
  private _color;
  /**
   * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
   * in the first cycle.
   */
  private _inputsInitialized;
  /** Value of the option */
  get value(): any;
  set value(newValue: any);
  private _value;
  /** Whether the option is disabled. */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  /** Whether the option is selected. */
  get selected(): boolean;
  set selected(value: BooleanInput);
  constructor(
    _element: ElementRef<HTMLElement>,
    _changeDetector: ChangeDetectorRef,
    /** @docs-private */
    selectionList: TakSelectionList
  );
  ngOnInit(): void;
  ngAfterContentInit(): void;
  ngOnDestroy(): void;
  /** Toggles the selection state of the option. */
  toggle(): void;
  /** Allows for programmatic focusing of the option. */
  focus(): void;
  /**
   * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
   * @docs-private
   */
  getLabel(): any;
  /** Whether this list item should show a ripple effect when clicked. */
  _isRippleDisabled(): boolean;
  _handleClick(): void;
  _handleFocus(): void;
  _handleBlur(): void;
  /** Retrieves the DOM element of the component host. */
  _getHostElement(): HTMLElement;
  /** Sets the selected state of the option. Returns whether the value has changed. */
  _setSelected(selected: boolean): boolean;
  /**
   * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
   * used to trigger an update of the list option if the disabled state of the selection list
   * changed.
   */
  _markForCheck(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakListOption, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakListOption,
    'tak-list-option',
    ['takListOption'],
    {
      disableRipple: 'disableRipple';
      checkboxPosition: 'checkboxPosition';
      color: 'color';
      value: 'value';
      disabled: 'disabled';
      selected: 'selected';
    },
    { selectedChange: 'selectedChange' },
    ['_avatar', '_icon', '_lines'],
    ['*', '[tak-list-avatar], [tak-list-icon], [takListAvatar], [takListIcon]'],
    false
  >;
}

declare const _TakListOptionBase: _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> & {
    new (): {};
  };

/**
 * Type describing possible positions of a checkbox in a list option
 * with respect to the list item's text.
 */
export declare type TakListOptionCheckboxPosition = 'before' | 'after';

/**
 * Directive whose purpose is to add the tak- CSS styling to this selector.
 * @docs-private
 */
export declare class TakListSubheaderCssTakStyler {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakListSubheaderCssTakStyler, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakListSubheaderCssTakStyler,
    '[tak-subheader], [takSubheader]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export declare class TakNavList
  extends _TakListBase
  implements CanDisable, CanDisableRipple, OnChanges, OnDestroy
{
  /** Emits when the state of the list changes. */
  readonly _stateChanges: Subject<void>;
  ngOnChanges(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakNavList, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakNavList,
    'tak-nav-list',
    ['takNavList'],
    { disableRipple: 'disableRipple'; disabled: 'disabled' },
    {},
    never,
    ['*'],
    false
  >;
}

/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 */
export declare class TakSelectionList
  extends _TakSelectionListBase
  implements CanDisableRipple, AfterContentInit, ControlValueAccessor, OnDestroy, OnChanges
{
  private _element;
  private _changeDetector;
  private _focusMonitor;
  private _multiple;
  private _contentInitialized;
  /** The FocusKeyManager which handles focus. */
  _keyManager: FocusKeyManager<TakListOption>;
  /** The option components contained within this selection-list. */
  options: QueryList<TakListOption>;
  /** Emits a change event whenever the selected state of an option changes. */
  readonly selectionChange: EventEmitter<TakSelectionListChange>;
  /** Theme color of the selection list. This sets the checkbox color for all list options. */
  color: ThemePalette;
  /**
   * Function used for comparing an option against the selected value when determining which
   * options should appear as selected. The first argument is the value of an options. The second
   * one is a value from the selected value. A boolean must be returned.
   */
  compareWith: (o1: any, o2: any) => boolean;
  /** Whether the selection list is disabled. */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  private _disabled;
  /** Whether selection is limited to one or multiple items (default multiple). */
  get multiple(): boolean;
  set multiple(value: BooleanInput);
  /** The currently selected options. */
  selectedOptions: SelectionModel<TakListOption>;
  /** The tabindex of the selection list. */
  _tabIndex: number;
  /** View to model callback that should be called whenever the selected options change. */
  private _onChange;
  /** Keeps track of the currently-selected value. */
  _value: string[] | null;
  /** Emits when the list has been destroyed. */
  private readonly _destroyed;
  /** View to model callback that should be called if the list or its options lost focus. */
  _onTouched: () => void;
  /** Whether the list has been destroyed. */
  private _isDestroyed;
  constructor(
    _element: ElementRef<HTMLElement>,
    _changeDetector: ChangeDetectorRef,
    _focusMonitor: FocusMonitor
  );
  ngAfterContentInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  /** Focuses the selection list. */
  focus(options?: FocusOptions): void;
  /** Selects all of the options. Returns the options that changed as a result. */
  selectAll(): TakListOption[];
  /** Deselects all of the options. Returns the options that changed as a result. */
  deselectAll(): TakListOption[];
  /** Sets the focused option of the selection-list. */
  _setFocusedOption(option: TakListOption): void;
  /**
   * Removes an option from the selection list and updates the active item.
   * @returns Currently-active item.
   */
  _removeOptionFromList(option: TakListOption): TakListOption | null;
  /** Passes relevant key presses to our key manager. */
  _keydown(event: KeyboardEvent): void;
  /** Reports a value change to the ControlValueAccessor */
  _reportValueChange(): void;
  /** Emits a change event if the selected state of an option changed. */
  _emitChangeEvent(options: TakListOption[]): void;
  /** Implemented as part of ControlValueAccessor. */
  writeValue(values: string[]): void;
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean): void;
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn: (value: any) => void): void;
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn: () => void): void;
  /** Sets the selected options based on the specified values. */
  private _setOptionsFromValues;
  /** Returns the values of the selected options. */
  private _getSelectedOptionValues;
  /** Toggles the state of the currently focused option if enabled. */
  private _toggleFocusedOption;
  /**
   * Sets the selected state on all of the options
   * and emits an event if anything changed.
   */
  private _setAllOptionsSelected;
  /**
   * Utility to ensure all indexes are valid.
   * @param index The index to be checked.
   * @returns True if the index is valid for our list of options.
   */
  private _isValidIndex;
  /** Returns the index of the specified list option. */
  private _getOptionIndex;
  /** Marks all the options to be checked in the next change detection run. */
  private _markOptionsForCheck;
  /**
   * Removes the tabindex from the selection list and resets it back afterwards, allowing the user
   * to tab out of it. This prevents the list from capturing focus and redirecting it back within
   * the list, creating a focus trap if it user tries to tab away.
   */
  private _allowFocusEscape;
  /** Updates the tabindex based upon if the selection list is empty. */
  private _updateTabIndex;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakSelectionList, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakSelectionList,
    'tak-selection-list',
    ['takSelectionList'],
    {
      disableRipple: 'disableRipple';
      color: 'color';
      compareWith: 'compareWith';
      disabled: 'disabled';
      multiple: 'multiple';
    },
    { selectionChange: 'selectionChange' },
    ['options'],
    ['*'],
    false
  >;
}

declare const _TakSelectionListBase: _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> & {
    new (): {};
  };

/** Change event that is being fired whenever the selected state of an option changes. */
export declare class TakSelectionListChange {
  /** Reference to the selection list that emitted the event. */
  source: TakSelectionList;
  /** Reference to the options that have been changed. */
  options: TakListOption[];
  constructor(
    /** Reference to the selection list that emitted the event. */
    source: TakSelectionList,
    /** Reference to the options that have been changed. */
    options: TakListOption[]
  );
}

export {};
