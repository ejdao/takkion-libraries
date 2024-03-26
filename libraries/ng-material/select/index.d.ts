import { _AbstractConstructor } from '@takkion/ng-material/core';
import { ActiveDescendantKeyManager } from '@takkion/ng-cdk/a11y';
import { AfterContentInit } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanDisable } from '@takkion/ng-material/core';
import { CanDisableRipple } from '@takkion/ng-material/core';
import { CanUpdateErrorState } from '@takkion/ng-material/core';
import { CdkConnectedOverlay } from '@takkion/ng-cdk/overlay';
import { ChangeDetectorRef } from '@angular/core';
import { ConnectedPosition } from '@takkion/ng-cdk/overlay';
import { _Constructor } from '@takkion/ng-material/core';
import { ControlValueAccessor } from '@angular/forms';
import { Directionality } from '@takkion/ng-cdk/bidi';
import { DoCheck } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ErrorStateMatcher } from '@takkion/ng-material/core';
import { EventEmitter } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { HasTabIndex } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '@takkion/ng-cdk/overlay';
import * as i4 from '@takkion/ng-material/core';
import * as i5 from '@takkion/ng-cdk/scrolling';
import * as i6 from '@takkion/ng-material/form-field';
import { InjectionToken } from '@angular/core';
import { LiveAnnouncer } from '@takkion/ng-cdk/a11y';
import { TakFormField } from '@takkion/ng-material/form-field';
import { TakFormFieldControl } from '@takkion/ng-material/form-field';
import { TakOptgroup } from '@takkion/ng-material/core';
import { TakOption } from '@takkion/ng-material/core';
import { _TakOptionBase } from '@takkion/ng-material/core';
import { TakOptionSelectionChange } from '@takkion/ng-material/core';
import { NgControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgZone } from '@angular/core';
import { NumberInput } from '@takkion/ng-cdk/coercion';
import { Observable } from 'rxjs';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Overlay } from '@takkion/ng-cdk/overlay';
import { QueryList } from '@angular/core';
import { ScrollStrategy } from '@takkion/ng-cdk/overlay';
import { SelectionModel } from '@takkion/ng-cdk/collections';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewportRuler } from '@takkion/ng-cdk/scrolling';

declare namespace i1 {
  export {
    TAK_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
    SELECT_PANEL_MAX_HEIGHT,
    SELECT_PANEL_PADDING_X,
    SELECT_PANEL_INDENT_PADDING_X,
    SELECT_ITEM_HEIGHT_EM,
    SELECT_MULTIPLE_PANEL_PADDING_X,
    SELECT_PANEL_VIEWPORT_PADDING,
    TAK_SELECT_SCROLL_STRATEGY,
    TakSelectConfig,
    TAK_SELECT_CONFIG,
    TAK_SELECT_SCROLL_STRATEGY_PROVIDER,
    TakSelectChange,
    TAK_SELECT_TRIGGER,
    TakSelectTrigger,
    _TakSelectBase,
    TakSelect,
  };
}

/** Injection token that can be used to provide the default options the select module. */
export declare const TAK_SELECT_CONFIG: InjectionToken<TakSelectConfig>;

/** Injection token that determines the scroll handling while a select is open. */
export declare const TAK_SELECT_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;

/** @docs-private */
export declare const TAK_SELECT_SCROLL_STRATEGY_PROVIDER: {
  provide: InjectionToken<() => ScrollStrategy>;
  deps: (typeof Overlay)[];
  useFactory: typeof TAK_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY;
};

/** @docs-private */
export declare function TAK_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay
): () => ScrollStrategy;

/**
 * Injection token that can be used to reference instances of `TakSelectTrigger`. It serves as
 * alternative token to the actual `TakSelectTrigger` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const TAK_SELECT_TRIGGER: InjectionToken<TakSelectTrigger>;

export declare class TakSelect extends _TakSelectBase<TakSelectChange> implements OnInit {
  /** The scroll position of the overlay panel, calculated to center the selected option. */
  private _scrollTop;
  /** The last measured value for the trigger's client bounding rect. */
  _triggerRect: ClientRect;
  /** The cached font-size of the trigger element. */
  _triggerFontSize: number;
  /** The value of the select panel's transform-origin property. */
  _transformOrigin: string;
  /**
   * The y-offset of the overlay panel in relation to the trigger's top start corner.
   * This must be adjusted to align the selected option text over the trigger text.
   * when the panel opens. Will change based on the y-position of the selected option.
   */
  _offsetY: number;
  options: QueryList<TakOption>;
  optionGroups: QueryList<TakOptgroup>;
  customTrigger: TakSelectTrigger;
  _positions: ConnectedPosition[];
  /**
   * Calculates the scroll position of the select's overlay panel.
   *
   * Attempts to center the selected option in the panel. If the option is
   * too high or too low in the panel to be scrolled to the center, it clamps the
   * scroll position to the min or max scroll positions respectively.
   */
  _calculateOverlayScroll(selectedIndex: number, scrollBuffer: number, maxScroll: number): number;
  ngOnInit(): void;
  open(): void;
  /** Scrolls the active option into view. */
  protected _scrollOptionIntoView(index: number): void;
  protected _positioningSettled(): void;
  protected _panelDoneAnitaking(isOpen: boolean): void;
  protected _getChangeEvent(value: any): TakSelectChange;
  /**
   * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
   * This must be adjusted to align the selected option text over the trigger text when
   * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
   * can't be calculated until the panel has been attached, because we need to know the
   * content width in order to constrain the panel within the viewport.
   */
  private _calculateOverlayOffsetX;
  /**
   * Calculates the y-offset of the select's overlay panel in relation to the
   * top start corner of the trigger. It has to be adjusted in order for the
   * selected option to be aligned over the trigger when the panel opens.
   */
  private _calculateOverlayOffsetY;
  /**
   * Checks that the attempted overlay position will fit within the viewport.
   * If it will not fit, tries to adjust the scroll position and the associated
   * y-offset so the panel can open fully on-screen. If it still won't fit,
   * sets the offset back to 0 to allow the fallback position to take over.
   */
  private _checkOverlayWithinViewport;
  /** Adjusts the overlay panel up to fit in the viewport. */
  private _adjustPanelUp;
  /** Adjusts the overlay panel down to fit in the viewport. */
  private _adjustPanelDown;
  /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
  private _calculateOverlayPosition;
  /** Sets the transform origin point based on the selected option. */
  private _getOriginBasedOnOption;
  /** Calculates the height of the select's options. */
  private _getItemHeight;
  /** Calculates the amount of items in the select. This includes options and group labels. */
  private _getItemCount;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakSelect, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakSelect,
    'tak-select',
    ['takSelect'],
    { disabled: 'disabled'; disableRipple: 'disableRipple'; tabIndex: 'tabIndex' },
    {},
    ['customTrigger', 'options', 'optionGroups'],
    ['tak-select-trigger', '*'],
    false
  >;
}

/**
 * The following are all the animations for the tak-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material tak-select animation.
 * @docs-private
 */
export declare const takSelectAnimations: {
  readonly transformPanelWrap: AnimationTriggerMetadata;
  readonly transformPanel: AnimationTriggerMetadata;
};

/** Base class with all of the `TakSelect` functionality. */
export declare abstract class _TakSelectBase<C>
  extends _TakSelectMixinBase
  implements
    AfterContentInit,
    OnChanges,
    OnDestroy,
    OnInit,
    DoCheck,
    ControlValueAccessor,
    CanDisable,
    HasTabIndex,
    TakFormFieldControl<any>,
    CanUpdateErrorState,
    CanDisableRipple
{
  protected _viewportRuler: ViewportRuler;
  protected _changeDetectorRef: ChangeDetectorRef;
  protected _ngZone: NgZone;
  private _dir;
  protected _parentFormField: TakFormField;
  private _liveAnnouncer;
  private _defaultOptions?;
  /** All of the defined select options. */
  abstract options: QueryList<_TakOptionBase>;
  /** All of the defined groups of options. */
  abstract optionGroups: QueryList<TakOptgroup>;
  /** User-supplied override of the trigger element. */
  abstract customTrigger: {};
  /**
   * This position config ensures that the top "start" corner of the overlay
   * is aligned with with the top "start" of the origin by default (overlapping
   * the trigger completely). If the panel cannot fit below the trigger, it
   * will fall back to a position above the trigger.
   */
  abstract _positions: ConnectedPosition[];
  /** Scrolls a particular option into the view. */
  protected abstract _scrollOptionIntoView(index: number): void;
  /** Called when the panel has been opened and the overlay has settled on its final position. */
  protected abstract _positioningSettled(): void;
  /** Creates a change event object that should be emitted by the select. */
  protected abstract _getChangeEvent(value: any): C;
  /** Factory function used to create a scroll strategy for this select. */
  private _scrollStrategyFactory;
  /** Whether or not the overlay panel is open. */
  private _panelOpen;
  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith;
  /** Unique id for this input. */
  private _uid;
  /** Current `aria-labelledby` value for the select trigger. */
  private _triggerAriaLabelledBy;
  /**
   * Keeps track of the previous form control assigned to the select.
   * Used to detect if it has changed.
   */
  private _previousControl;
  /** Emits whenever the component is destroyed. */
  protected readonly _destroy: Subject<void>;
  /**
   * Implemented as part of TakFormFieldControl.
   * @docs-private
   */
  userAriaDescribedBy: string;
  /** Deals with the selection logic. */
  _selectionModel: SelectionModel<TakOption>;
  /** Manages keyboard events for options in the panel. */
  _keyManager: ActiveDescendantKeyManager<TakOption>;
  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void;
  /** `View -> model callback called when select has been touched` */
  _onTouched: () => void;
  /** ID for the DOM node containing the select's value. */
  _valueId: string;
  /** Emits when the panel element is finished transforming in. */
  readonly _panelDoneAnitakingStream: Subject<string>;
  /** Strategy that will be used to handle scrolling while the select panel is open. */
  _scrollStrategy: ScrollStrategy;
  _overlayPanelClass: string | string[];
  /** Whether the select is focused. */
  get focused(): boolean;
  private _focused;
  /** A name for this control that can be used by `tak-form-field`. */
  controlType: string;
  /** Trigger that opens the select. */
  trigger: ElementRef;
  /** Panel containing the select options. */
  panel: ElementRef;
  /** Overlay pane containing the options. */
  protected _overlayDir: CdkConnectedOverlay;
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  panelClass:
    | string
    | string[]
    | Set<string>
    | {
        [key: string]: any;
      };
  /** Placeholder to be shown if no value has been selected. */
  get placeholder(): string;
  set placeholder(value: string);
  private _placeholder;
  /** Whether the component is required. */
  get required(): boolean;
  set required(value: BooleanInput);
  private _required;
  /** Whether the user should be allowed to select multiple options. */
  get multiple(): boolean;
  set multiple(value: BooleanInput);
  private _multiple;
  /** Whether to center the active option over the trigger. */
  get disableOptionCentering(): boolean;
  set disableOptionCentering(value: BooleanInput);
  private _disableOptionCentering;
  /**
   * Function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  get compareWith(): (o1: any, o2: any) => boolean;
  set compareWith(fn: (o1: any, o2: any) => boolean);
  /** Value of the select control. */
  get value(): any;
  set value(newValue: any);
  private _value;
  /** Aria label of the select. */
  ariaLabel: string;
  /** Input that can be used to specify the `aria-labelledby` attribute. */
  ariaLabelledby: string;
  /** Object used to control when error messages are shown. */
  errorStateMatcher: ErrorStateMatcher;
  /** Time to wait in milliseconds after the last keystroke before moving focus to an item. */
  get typeaheadDebounceInterval(): number;
  set typeaheadDebounceInterval(value: NumberInput);
  private _typeaheadDebounceInterval;
  /**
   * Function used to sort the values in a select in multiple mode.
   * Follows the same logic as `Array.prototype.sort`.
   */
  sortComparator: (a: TakOption, b: TakOption, options: TakOption[]) => number;
  /** Unique id of the element. */
  get id(): string;
  set id(value: string);
  private _id;
  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<TakOptionSelectionChange>;
  /** Event emitted when the select panel has been toggled. */
  readonly openedChange: EventEmitter<boolean>;
  /** Event emitted when the select has been opened. */
  readonly _openedStream: Observable<void>;
  /** Event emitted when the select has been closed. */
  readonly _closedStream: Observable<void>;
  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange: EventEmitter<C>;
  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   * @docs-private
   */
  readonly valueChange: EventEmitter<any>;
  constructor(
    _viewportRuler: ViewportRuler,
    _changeDetectorRef: ChangeDetectorRef,
    _ngZone: NgZone,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    elementRef: ElementRef,
    _dir: Directionality,
    _parentForm: NgForm,
    _parentFormGroup: FormGroupDirective,
    _parentFormField: TakFormField,
    ngControl: NgControl,
    tabIndex: string,
    scrollStrategyFactory: any,
    _liveAnnouncer: LiveAnnouncer,
    _defaultOptions?: TakSelectConfig | undefined
  );
  ngOnInit(): void;
  ngAfterContentInit(): void;
  ngDoCheck(): void;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  /** Toggles the overlay panel open or closed. */
  toggle(): void;
  /** Opens the overlay panel. */
  open(): void;
  /** Closes the overlay panel and focuses the host element. */
  close(): void;
  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: any): void;
  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: (value: any) => void): void;
  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: () => {}): void;
  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void;
  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean;
  /** The currently selected option. */
  get selected(): TakOption | TakOption[];
  /** The value displayed in the trigger. */
  get triggerValue(): string;
  /** Whether the element is in RTL mode. */
  _isRtl(): boolean;
  /** Handles all keydown events on the select. */
  _handleKeydown(event: KeyboardEvent): void;
  /** Handles keyboard events while the select is closed. */
  private _handleClosedKeydown;
  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown;
  _onFocus(): void;
  /**
   * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
   * "blur" to the panel when it opens, causing a false positive.
   */
  _onBlur(): void;
  /**
   * Callback that is invoked when the overlay panel has been attached.
   */
  _onAttached(): void;
  /** Returns the theme to be used on the panel. */
  _getPanelTheme(): string;
  /** Whether the select has a value. */
  get empty(): boolean;
  private _initializeSelection;
  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue;
  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  private _selectOptionByValue;
  /** Assigns a specific value to the select. Returns whether the value has changed. */
  private _assignValue;
  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager;
  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions;
  /** Invoked when an option is clicked. */
  private _onSelect;
  /** Sorts the selected values in the selected based on their order in the panel. */
  private _sortValues;
  /** Emits change event to set the model value. */
  private _propagateChanges;
  /**
   * Highlights the selected item. If no option is selected, it will highlight
   * the first item instead.
   */
  private _highlightCorrectOption;
  /** Whether the panel is allowed to open. */
  protected _canOpen(): boolean;
  /** Focuses the select element. */
  focus(options?: FocusOptions): void;
  /** Gets the aria-labelledby for the select panel. */
  _getPanelAriaLabelledby(): string | null;
  /** Determines the `aria-activedescendant` to be set on the host. */
  _getAriaActiveDescendant(): string | null;
  /** Gets the aria-labelledby of the select component trigger. */
  private _getTriggerAriaLabelledby;
  /** Called when the overlay panel is done animating. */
  protected _panelDoneAnitaking(isOpen: boolean): void;
  /**
   * Implemented as part of TakFormFieldControl.
   * @docs-private
   */
  setDescribedByIds(ids: string[]): void;
  /**
   * Implemented as part of TakFormFieldControl.
   * @docs-private
   */
  onContainerClick(): void;
  /**
   * Implemented as part of TakFormFieldControl.
   * @docs-private
   */
  get shouldLabelFloat(): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    _TakSelectBase<any>,
    [
      null,
      null,
      null,
      null,
      null,
      { optional: true },
      { optional: true },
      { optional: true },
      { optional: true },
      { optional: true; self: true },
      { attribute: 'tabindex' },
      null,
      null,
      { optional: true },
    ]
  >;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    _TakSelectBase<any>,
    never,
    never,
    {
      userAriaDescribedBy: 'aria-describedby';
      panelClass: 'panelClass';
      placeholder: 'placeholder';
      required: 'required';
      multiple: 'multiple';
      disableOptionCentering: 'disableOptionCentering';
      compareWith: 'compareWith';
      value: 'value';
      ariaLabel: 'aria-label';
      ariaLabelledby: 'aria-labelledby';
      errorStateMatcher: 'errorStateMatcher';
      typeaheadDebounceInterval: 'typeaheadDebounceInterval';
      sortComparator: 'sortComparator';
      id: 'id';
    },
    {
      openedChange: 'openedChange';
      _openedStream: 'opened';
      _closedStream: 'closed';
      selectionChange: 'selectionChange';
      valueChange: 'valueChange';
    },
    never,
    never,
    false
  >;
}

/** Change event object that is emitted when the select value has changed. */
export declare class TakSelectChange {
  /** Reference to the select that emitted the change event. */
  source: TakSelect;
  /** Current value of the select that emitted the event. */
  value: any;
  constructor(
    /** Reference to the select that emitted the change event. */
    source: TakSelect,
    /** Current value of the select that emitted the event. */
    value: any
  );
}

/** Object that can be used to configure the default options for the select module. */
export declare interface TakSelectConfig {
  /** Whether option centering should be disabled. */
  disableOptionCentering?: boolean;
  /** Time to wait in milliseconds after the last keystroke before moving focus to an item. */
  typeaheadDebounceInterval?: number;
  /** Class or list of classes to be applied to the menu's overlay panel. */
  overlayPanelClass?: string | string[];
}

/** @docs-private */
declare const _TakSelectMixinBase: _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> &
  _Constructor<HasTabIndex> &
  _AbstractConstructor<HasTabIndex> &
  _Constructor<CanDisable> &
  _AbstractConstructor<CanDisable> &
  _Constructor<CanUpdateErrorState> &
  _AbstractConstructor<CanUpdateErrorState> & {
    new (
      _elementRef: ElementRef,
      _defaultErrorStateMatcher: ErrorStateMatcher,
      _parentForm: NgForm,
      _parentFormGroup: FormGroupDirective,
      ngControl: NgControl
    ): {
      /**
       * Emits whenever the component state changes and should cause the parent
       * form-field to update. Implemented as part of `TakFormFieldControl`.
       * @docs-private
       */
      readonly stateChanges: Subject<void>;
      _elementRef: ElementRef;
      _defaultErrorStateMatcher: ErrorStateMatcher;
      _parentForm: NgForm;
      _parentFormGroup: FormGroupDirective;
      /**
       * Form control bound to the component.
       * Implemented as part of `TakFormFieldControl`.
       * @docs-private
       */
      ngControl: NgControl;
    };
  };

export declare class TakSelectModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakSelectModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakSelectModule,
    [typeof i1.TakSelect, typeof i1.TakSelectTrigger],
    [
      typeof i2.CommonModule,
      typeof i3.OverlayModule,
      typeof i4.TakOptionModule,
      typeof i4.TakCommonModule,
    ],
    [
      typeof i5.CdkScrollableModule,
      typeof i6.TakFormFieldModule,
      typeof i1.TakSelect,
      typeof i1.TakSelectTrigger,
      typeof i4.TakOptionModule,
      typeof i4.TakCommonModule,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakSelectModule>;
}

/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
export declare class TakSelectTrigger {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakSelectTrigger, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakSelectTrigger,
    'tak-select-trigger',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** The height of the select items in `em` units. */
declare const SELECT_ITEM_HEIGHT_EM = 3;

/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * Calculated as:
 * (SELECT_PANEL_PADDING_X * 1.5) + 16 = 40
 * The padding is multiplied by 1.5 because the checkbox's margin is half the padding.
 * The checkbox width is 16px.
 */
declare const SELECT_MULTIPLE_PANEL_PADDING_X: number;

/** The panel's x axis padding if it is indented (e.g. there is an option group). */
declare const SELECT_PANEL_INDENT_PADDING_X: number;

/** The max height of the select's overlay panel. */
declare const SELECT_PANEL_MAX_HEIGHT = 256;

/** The panel's padding on the x-axis. */
declare const SELECT_PANEL_PADDING_X = 16;

/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
declare const SELECT_PANEL_VIEWPORT_PADDING = 8;

export {};
