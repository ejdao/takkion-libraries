import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AbstractControlDirective } from '@angular/forms';
import { AfterContentChecked } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanColor } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { Directionality } from '@takkion/ng-cdk/bidi';
import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i10 from '@takkion/ng-cdk/observers';
import * as i8 from '@angular/common';
import * as i9 from '@takkion/ng-material/core';
import { InjectionToken } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Platform } from '@takkion/ng-cdk/platform';
import { QueryList } from '@angular/core';
import { ThemePalette } from '@takkion/ng-material/core';

/** Possible values for the "floatLabel" form field input. */
export declare type FloatLabelType = 'always' | 'never' | 'auto';

/** @docs-private */
export declare function getTakFormFieldDuplicatedHintError(align: string): Error;

/** @docs-private */
export declare function getTakFormFieldMissingControlError(): Error;

/** @docs-private */
export declare function getTakFormFieldPlaceholderConflictError(): Error;

declare namespace i1 {
  export { TAK_ERROR, TakError };
}

declare namespace i2 {
  export {
    TakFormFieldAppearance,
    FloatLabelType,
    TakFormFieldDefaultOptions,
    TAK_FORM_FIELD_DEFAULT_OPTIONS,
    TAK_FORM_FIELD,
    TakFormField,
  };
}

declare namespace i3 {
  export { _TAK_HINT, TakHint };
}

declare namespace i4 {
  export { TakLabel };
}

declare namespace i5 {
  export { TakPlaceholder };
}

declare namespace i6 {
  export { TAK_PREFIX, TakPrefix };
}

declare namespace i7 {
  export { TAK_SUFFIX, TakSuffix };
}

/**
 * Injection token that can be used to reference instances of `TakError`. It serves as
 * alternative token to the actual `TakError` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const TAK_ERROR: InjectionToken<TakError>;

/**
 * Injection token that can be used to inject an instances of `TakFormField`. It serves
 * as alternative token to the actual `TakFormField` class which would cause unnecessary
 * retention of the `TakFormField` class and its component metadata.
 */
export declare const TAK_FORM_FIELD: InjectionToken<TakFormField>;

/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
export declare const TAK_FORM_FIELD_DEFAULT_OPTIONS: InjectionToken<TakFormFieldDefaultOptions>;

/**
 * Injection token that can be used to reference instances of `TakHint`. It serves as
 * alternative token to the actual `TakHint` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `TakHint` and we want to reduce breaking changes.
 */
export declare const _TAK_HINT: InjectionToken<TakHint>;

/**
 * Injection token that can be used to reference instances of `TakPrefix`. It serves as
 * alternative token to the actual `TakPrefix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const TAK_PREFIX: InjectionToken<TakPrefix>;

/**
 * Injection token that can be used to reference instances of `TakSuffix`. It serves as
 * alternative token to the actual `TakSuffix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const TAK_SUFFIX: InjectionToken<TakSuffix>;

/** Single error message to be shown underneath the form field. */
export declare class TakError {
  id: string;
  constructor(ariaLive: string, elementRef: ElementRef);
  static ɵfac: i0.ɵɵFactoryDeclaration<TakError, [{ attribute: 'aria-live' }, null]>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakError,
    'tak-error',
    never,
    { id: 'id' },
    {},
    never,
    never,
    false
  >;
}

/** Container for form controls that applies Material Design styling and behavior. */
export declare class TakFormField
  extends _TakFormFieldBase
  implements AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy, CanColor
{
  private _changeDetectorRef;
  private _dir;
  private _defaults;
  private _platform;
  private _ngZone;
  /**
   * Whether the outline gap needs to be calculated
   * immediately on the next change detection run.
   */
  private _outlineGapCalculationNeededImmediately;
  /** Whether the outline gap needs to be calculated next time the zone has stabilized. */
  private _outlineGapCalculationNeededOnStable;
  private readonly _destroyed;
  /** The form field appearance style. */
  get appearance(): TakFormFieldAppearance;
  set appearance(value: TakFormFieldAppearance);
  _appearance: TakFormFieldAppearance;
  /** Whether the required marker should be hidden. */
  get hideRequiredMarker(): boolean;
  set hideRequiredMarker(value: BooleanInput);
  private _hideRequiredMarker;
  /** Override for the logic that disables the label animation in certain cases. */
  private _showAlwaysAnimate;
  /** Whether the floating label should always float or not. */
  _shouldAlwaysFloat(): boolean;
  /** Whether the label can float or not. */
  _canLabelFloat(): boolean;
  /** State of the tak-hint and tak-error animations. */
  _subscriptAnimationState: string;
  /** Text for the form field hint. */
  get hintLabel(): string;
  set hintLabel(value: string);
  private _hintLabel;
  readonly _hintLabelId: string;
  readonly _labelId: string;
  /**
   * Whether the label should always float, never float or float as the user types.
   *
   * Note: only the legacy appearance supports the `never` option. `never` was originally added as a
   * way to make the floating label emulate the behavior of a standard input placeholder. However
   * the form field now supports both floating labels and placeholders. Therefore in the non-legacy
   * appearances the `never` option has been disabled in favor of just using the placeholder.
   */
  get floatLabel(): FloatLabelType;
  set floatLabel(value: FloatLabelType);
  private _floatLabel;
  /** Whether the Angular animations are enabled. */
  _animationsEnabled: boolean;
  _connectionContainerRef: ElementRef;
  _inputContainerRef: ElementRef;
  private _label;
  _controlNonStatic: TakFormFieldControl<any>;
  _controlStatic: TakFormFieldControl<any>;
  get _control(): TakFormFieldControl<any>;
  set _control(value: TakFormFieldControl<any>);
  private _explicitFormFieldControl;
  _labelChildNonStatic: TakLabel;
  _labelChildStatic: TakLabel;
  _placeholderChild: TakPlaceholder;
  _errorChildren: QueryList<TakError>;
  _hintChildren: QueryList<TakHint>;
  _prefixChildren: QueryList<TakPrefix>;
  _suffixChildren: QueryList<TakSuffix>;
  constructor(
    elementRef: ElementRef,
    _changeDetectorRef: ChangeDetectorRef,
    _dir: Directionality,
    _defaults: TakFormFieldDefaultOptions,
    _platform: Platform,
    _ngZone: NgZone,
    _animationMode: string
  );
  /**
   * Gets the id of the label element. If no label is present, returns `null`.
   */
  getLabelId(): string | null;
  /**
   * Gets an ElementRef for the element that a overlay attached to the form field should be
   * positioned relative to.
   */
  getConnectedOverlayOrigin(): ElementRef;
  ngAfterContentInit(): void;
  ngAfterContentChecked(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  /**
   * Determines whether a class from the AbstractControlDirective
   * should be forwarded to the host element.
   */
  _shouldForward(prop: keyof AbstractControlDirective): boolean;
  _hasPlaceholder(): boolean;
  _hasLabel(): boolean;
  _shouldLabelFloat(): boolean;
  _hideControlPlaceholder(): boolean;
  _hasFloatingLabel(): boolean;
  /** Determines whether to display hints or errors. */
  _getDisplayedMessages(): 'error' | 'hint';
  /** Animates the placeholder up and locks it in position. */
  _animateAndLockLabel(): void;
  /**
   * Ensure that there is only one placeholder (either `placeholder` attribute on the child control
   * or child element with the `tak-placeholder` directive).
   */
  private _validatePlaceholders;
  /** Does any extra processing that is required when handling the hints. */
  private _processHints;
  /**
   * Ensure that there is a maximum of one of each `<tak-hint>` alignment specified, with the
   * attribute being considered as `align="start"`.
   */
  private _validateHints;
  /** Gets the default float label state. */
  private _getDefaultFloatLabelState;
  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  private _syncDescribedByIds;
  /** Throws an error if the form field's control is missing. */
  protected _validateControlChild(): void;
  /**
   * Updates the width and position of the gap in the outline. Only relevant for the outline
   * appearance.
   */
  updateOutlineGap(): void;
  /** Gets the start end of the rect considering the current directionality. */
  private _getStartEnd;
  /** Checks whether the form field is attached to the DOM. */
  private _isAttachedToDOM;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakFormField,
    [null, null, { optional: true }, { optional: true }, null, null, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakFormField,
    'tak-form-field',
    ['takFormField'],
    {
      color: 'color';
      appearance: 'appearance';
      hideRequiredMarker: 'hideRequiredMarker';
      hintLabel: 'hintLabel';
      floatLabel: 'floatLabel';
    },
    {},
    [
      '_controlNonStatic',
      '_controlStatic',
      '_labelChildNonStatic',
      '_labelChildStatic',
      '_placeholderChild',
      '_errorChildren',
      '_hintChildren',
      '_prefixChildren',
      '_suffixChildren',
    ],
    [
      '[takPrefix]',
      '*',
      'tak-placeholder',
      'tak-label',
      '[takSuffix]',
      'tak-error',
      "tak-hint:not([align='end'])",
      "tak-hint[align='end']",
    ],
    false
  >;
}

/**
 * Animations used by the TakFormField.
 * @docs-private
 */
export declare const takFormFieldAnimations: {
  readonly transitionMessages: AnimationTriggerMetadata;
};

/** Possible appearance styles for the form field. */
export declare type TakFormFieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline';

/**
 * Boilerplate for applying mixins to TakFormField.
 * @docs-private
 */
declare const _TakFormFieldBase: _Constructor<CanColor> &
  _AbstractConstructor<CanColor> & {
    new (_elementRef: ElementRef): {
      _elementRef: ElementRef;
    };
  };

/** An interface which allows a control to work inside of a `TakFormField`. */
export declare abstract class TakFormFieldControl<T> {
  /** The value of the control. */
  value: T | null;
  /**
   * Stream that emits whenever the state of the control changes such that the parent `TakFormField`
   * needs to run change detection.
   */
  readonly stateChanges: Observable<void>;
  /** The element ID for this control. */
  readonly id: string;
  /** The placeholder for this control. */
  readonly placeholder: string;
  /** Gets the AbstractControlDirective for this control. */
  readonly ngControl: NgControl | AbstractControlDirective | null;
  /** Whether the control is focused. */
  readonly focused: boolean;
  /** Whether the control is empty. */
  readonly empty: boolean;
  /** Whether the `TakFormField` label should try to float. */
  readonly shouldLabelFloat: boolean;
  /** Whether the control is required. */
  readonly required: boolean;
  /** Whether the control is disabled. */
  readonly disabled: boolean;
  /** Whether the control is in an error state. */
  readonly errorState: boolean;
  /**
   * An optional name for the control type that can be used to distinguish `tak-form-field` elements
   * based on their control type. The form field will add a class,
   * `tak-form-field-type-{{controlType}}` to its root element.
   */
  readonly controlType?: string;
  /**
   * Whether the input is currently in an autofilled state. If property is not present on the
   * control it is assumed to be false.
   */
  readonly autofilled?: boolean;
  /**
   * Value of `aria-describedby` that should be merged with the described-by ids
   * which are set by the form-field.
   */
  readonly userAriaDescribedBy?: string;
  /** Sets the list of element IDs that currently describe this control. */
  abstract setDescribedByIds(ids: string[]): void;
  /** Handles a click on the control's container. */
  abstract onContainerClick(event: MouseEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakFormFieldControl<any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakFormFieldControl<any>,
    never,
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Represents the default options for the form field that can be configured
 * using the `TAK_FORM_FIELD_DEFAULT_OPTIONS` injection token.
 */
export declare interface TakFormFieldDefaultOptions {
  /** Default form field appearance style. */
  appearance?: TakFormFieldAppearance;
  /** Default color of the form field. */
  color?: ThemePalette;
  /** Whether the required marker should be hidden by default. */
  hideRequiredMarker?: boolean;
  /**
   * Whether the label for form fields should by default float `always`,
   * `never`, or `auto` (only when necessary).
   */
  floatLabel?: FloatLabelType;
}

export declare class TakFormFieldModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakFormFieldModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakFormFieldModule,
    [
      typeof i1.TakError,
      typeof i2.TakFormField,
      typeof i3.TakHint,
      typeof i4.TakLabel,
      typeof i5.TakPlaceholder,
      typeof i6.TakPrefix,
      typeof i7.TakSuffix,
    ],
    [typeof i8.CommonModule, typeof i9.TakCommonModule, typeof i10.ObserversModule],
    [
      typeof i9.TakCommonModule,
      typeof i1.TakError,
      typeof i2.TakFormField,
      typeof i3.TakHint,
      typeof i4.TakLabel,
      typeof i5.TakPlaceholder,
      typeof i6.TakPrefix,
      typeof i7.TakSuffix,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakFormFieldModule>;
}

/** Hint text to be shown underneath the form field control. */
export declare class TakHint {
  /** Whether to align the hint label at the start or end of the line. */
  align: 'start' | 'end';
  /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
  id: string;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakHint, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakHint,
    'tak-hint',
    never,
    { align: 'align'; id: 'id' },
    {},
    never,
    never,
    false
  >;
}

/** The floating label for a `tak-form-field`. */
export declare class TakLabel {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakLabel, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<TakLabel, 'tak-label', never, {}, {}, never, never, false>;
}

/**
 * The placeholder text for an `TakFormField`.
 * @deprecated Use `<tak-label>` to specify the label and the `placeholder` attribute to specify the
 *     placeholder.
 * @breaking-change 8.0.0
 */
export declare class TakPlaceholder {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakPlaceholder, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakPlaceholder,
    'tak-placeholder',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** Prefix to be placed in front of the form field. */
export declare class TakPrefix {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakPrefix, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakPrefix,
    '[takPrefix]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** Suffix to be placed at the end of the form field. */
export declare class TakSuffix {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakSuffix, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakSuffix,
    '[takSuffix]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export {};
