import { _AbstractConstructor } from '@takkion/ng-material/core';
import { CanColor } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-material/core';
import * as i3 from '@angular/common';
import { InjectionToken } from '@angular/core';
import { NgZone } from '@angular/core';
import { NumberInput } from '@takkion/ng-cdk/coercion';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Platform } from '@takkion/ng-cdk/platform';
import { ThemePalette } from '@takkion/ng-material/core';
import { ViewportRuler } from '@takkion/ng-cdk/scrolling';

declare namespace i1 {
  export {
    TAK_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
    ProgressSpinnerMode,
    TakProgressSpinnerDefaultOptions,
    TAK_PROGRESS_SPINNER_DEFAULT_OPTIONS,
    TakProgressSpinner,
  };
}

/** Injection token to be used to override the default options for `tak-progress-spinner`. */
export declare const TAK_PROGRESS_SPINNER_DEFAULT_OPTIONS: InjectionToken<TakProgressSpinnerDefaultOptions>;

/** @docs-private */
export declare function TAK_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY(): TakProgressSpinnerDefaultOptions;

/**
 * `<tak-progress-spinner>` component.
 */
export declare class TakProgressSpinner
  extends _TakProgressSpinnerBase
  implements OnInit, OnDestroy, CanColor
{
  private _document;
  private _diameter;
  private _value;
  private _strokeWidth;
  private _resizeSubscription;
  /**
   * Element to which we should add the generated style tags for the indeterminate animation.
   * For most elements this is the document, but for the ones in the Shadow DOM we need to
   * use the shadow root.
   */
  private _styleRoot;
  /**
   * Tracks diameters of existing instances to de-dupe generated styles (default d = 100).
   * We need to keep track of which elements the diameters were attached to, because for
   * elements in the Shadow DOM the style tags are attached to the shadow root, rather
   * than the document head.
   */
  private static _diameters;
  /** Whether the _tak-animation-noopable class should be applied, disabling animations.  */
  _noopAnimations: boolean;
  /** A string that is used for setting the spinner animation-name CSS property */
  _spinnerAnimationLabel: string;
  /** The diameter of the progress spinner (will set width and height of svg). */
  get diameter(): number;
  set diameter(size: NumberInput);
  /** Stroke width of the progress spinner. */
  get strokeWidth(): number;
  set strokeWidth(value: NumberInput);
  /** Mode of the progress circle */
  mode: ProgressSpinnerMode;
  /** Value of the progress circle. */
  get value(): number;
  set value(newValue: NumberInput);
  constructor(
    elementRef: ElementRef<HTMLElement>,
    _platform: Platform,
    _document: any,
    animationMode: string,
    defaults?: TakProgressSpinnerDefaultOptions,
    /**
     * @deprecated `changeDetectorRef`, `viewportRuler` and `ngZone`
     * parameters to become required.
     * @breaking-change 14.0.0
     */
    changeDetectorRef?: ChangeDetectorRef,
    viewportRuler?: ViewportRuler,
    ngZone?: NgZone
  );
  ngOnInit(): void;
  ngOnDestroy(): void;
  /** The radius of the spinner, adjusted for stroke width. */
  _getCircleRadius(): number;
  /** The view box of the spinner's svg element. */
  _getViewBox(): string;
  /** The stroke circumference of the svg circle. */
  _getStrokeCircumference(): number;
  /** The dash offset of the svg circle. */
  _getStrokeDashOffset(): number | null;
  /** Stroke width of the circle in percent. */
  _getCircleStrokeWidth(): number;
  /** Gets the `transform-origin` for the inner circle element. */
  _getCircleTransformOrigin(svg: HTMLElement): string;
  /** Dynamically generates a style tag containing the correct animation for this diameter. */
  private _attachStyleNode;
  /** Generates animation styles adjusted for the spinner's diameter. */
  private _getAnimationText;
  /** Returns the circle diameter formatted for use with the animation-name CSS property. */
  private _getSpinnerAnimationLabel;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakProgressSpinner,
    [null, null, { optional: true }, { optional: true }, null, null, null, null]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakProgressSpinner,
    'tak-progress-spinner, tak-spinner',
    ['takProgressSpinner'],
    {
      color: 'color';
      diameter: 'diameter';
      strokeWidth: 'strokeWidth';
      mode: 'mode';
      value: 'value';
    },
    {},
    never,
    never,
    false
  >;
}

/** @docs-private */
declare const _TakProgressSpinnerBase: _Constructor<CanColor> &
  _AbstractConstructor<CanColor> & {
    new (_elementRef: ElementRef): {
      _elementRef: ElementRef;
    };
  };

/** Default `tak-progress-spinner` options that can be overridden. */
export declare interface TakProgressSpinnerDefaultOptions {
  /** Default color of the spinner. */
  color?: ThemePalette;
  /** Diameter of the spinner. */
  diameter?: number;
  /** Width of the spinner's stroke. */
  strokeWidth?: number;
  /**
   * Whether the animations should be force to be enabled, ignoring if the current environment is
   * using NoopAnimationsModule.
   */
  _forceAnimations?: boolean;
}

export declare class TakProgressSpinnerModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakProgressSpinnerModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakProgressSpinnerModule,
    [typeof i1.TakProgressSpinner],
    [typeof i2.TakCommonModule, typeof i3.CommonModule],
    [typeof i1.TakProgressSpinner, typeof i2.TakCommonModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakProgressSpinnerModule>;
}

/**
 * @deprecated Import `TakProgressSpinner` instead. Note that the
 *    `tak-spinner` selector isn't deprecated.
 * @breaking-change 8.0.0
 */
export declare const TakSpinner: typeof TakProgressSpinner;

/** Possible mode for a progress spinner. */
export declare type ProgressSpinnerMode = 'determinate' | 'indeterminate';

export {};
