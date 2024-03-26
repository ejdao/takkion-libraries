import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterViewInit } from '@angular/core';
import { CanColor } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '@takkion/ng-material/core';
import { InjectionToken } from '@angular/core';
import { NgZone } from '@angular/core';
import { NumberInput } from '@takkion/ng-cdk/coercion';
import { OnDestroy } from '@angular/core';
import { ThemePalette } from '@takkion/ng-material/core';

declare namespace i1 {
  export {
    TAK_PROGRESS_BAR_LOCATION_FACTORY,
    ProgressAnimationEnd,
    TAK_PROGRESS_BAR_LOCATION,
    TakProgressBarLocation,
    ProgressBarMode,
    TakProgressBarDefaultOptions,
    TAK_PROGRESS_BAR_DEFAULT_OPTIONS,
    TakProgressBar,
  };
}

/** Injection token to be used to override the default options for `tak-progress-bar`. */
export declare const TAK_PROGRESS_BAR_DEFAULT_OPTIONS: InjectionToken<TakProgressBarDefaultOptions>;

/**
 * Injection token used to provide the current location to `TakProgressBar`.
 * Used to handle server-side rendering and to stub out during unit tests.
 * @docs-private
 */
export declare const TAK_PROGRESS_BAR_LOCATION: InjectionToken<TakProgressBarLocation>;

/** @docs-private */
export declare function TAK_PROGRESS_BAR_LOCATION_FACTORY(): TakProgressBarLocation;

/**
 * `<tak-progress-bar>` component.
 */
export declare class TakProgressBar
  extends _TakProgressBarBase
  implements CanColor, AfterViewInit, OnDestroy
{
  private _ngZone;
  _animationMode?: string | undefined;
  /**
   * @deprecated `_changeDetectorRef` parameter to be made required.
   * @breaking-change 11.0.0
   */
  private _changeDetectorRef?;
  constructor(
    elementRef: ElementRef,
    _ngZone: NgZone,
    _animationMode?: string | undefined,
    /**
     * @deprecated `location` parameter to be made required.
     * @breaking-change 8.0.0
     */
    location?: TakProgressBarLocation,
    defaults?: TakProgressBarDefaultOptions,
    /**
     * @deprecated `_changeDetectorRef` parameter to be made required.
     * @breaking-change 11.0.0
     */
    _changeDetectorRef?: ChangeDetectorRef | undefined
  );
  /** Flag that indicates whether NoopAnimations mode is set to true. */
  _isNoopAnimation: boolean;
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value(): number;
  set value(v: NumberInput);
  private _value;
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue(): number;
  set bufferValue(v: number);
  private _bufferValue;
  _primaryValueBar: ElementRef;
  /**
   * Event emitted when animation of the primary progress bar completes. This event will not
   * be emitted when animations are disabled, nor will it be emitted for modes with continuous
   * animations (indeterminate and query).
   */
  readonly animationEnd: EventEmitter<ProgressAnimationEnd>;
  /** Reference to animation end subscription to be unsubscribed on destroy. */
  private _animationEndSubscription;
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  mode: ProgressBarMode;
  /** ID of the progress bar. */
  progressbarId: string;
  /** Attribute to be used for the `fill` attribute on the internal `rect` element. */
  _rectangleFillValue: string;
  /** Gets the current transform value for the progress bar's primary indicator. */
  _primaryTransform(): {
    transform: string;
  };
  /**
   * Gets the current transform value for the progress bar's buffer indicator. Only used if the
   * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
   */
  _bufferTransform(): {
    transform: string;
  } | null;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakProgressBar,
    [null, null, { optional: true }, { optional: true }, { optional: true }, null]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakProgressBar,
    'tak-progress-bar',
    ['takProgressBar'],
    { color: 'color'; value: 'value'; bufferValue: 'bufferValue'; mode: 'mode' },
    { animationEnd: 'animationEnd' },
    never,
    never,
    false
  >;
}

/** @docs-private */
declare const _TakProgressBarBase: _Constructor<CanColor> &
  _AbstractConstructor<CanColor> & {
    new (_elementRef: ElementRef): {
      _elementRef: ElementRef;
    };
  };

/** Default `tak-progress-bar` options that can be overridden. */
export declare interface TakProgressBarDefaultOptions {
  /** Default color of the progress bar. */
  color?: ThemePalette;
  /** Default mode of the progress bar. */
  mode?: ProgressBarMode;
}

/**
 * Stubbed out location for `TakProgressBar`.
 * @docs-private
 */
export declare interface TakProgressBarLocation {
  getPathname: () => string;
}

export declare class TakProgressBarModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakProgressBarModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakProgressBarModule,
    [typeof i1.TakProgressBar],
    [typeof i2.CommonModule, typeof i3.TakCommonModule],
    [typeof i1.TakProgressBar, typeof i3.TakCommonModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakProgressBarModule>;
}

/** Last animation end data. */
export declare interface ProgressAnimationEnd {
  value: number;
}

export declare type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export {};
