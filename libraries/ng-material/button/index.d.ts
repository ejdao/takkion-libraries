import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterViewInit } from '@angular/core';
import { CanColor } from '@takkion/ng-material/core';
import { CanDisable } from '@takkion/ng-material/core';
import { CanDisableRipple } from '@takkion/ng-material/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ElementRef } from '@angular/core';
import { FocusableOption } from '@takkion/ng-cdk/a11y';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import { FocusOrigin } from '@takkion/ng-cdk/a11y';
import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-material/core';
import { TakRipple } from '@takkion/ng-material/core';
import { NgZone } from '@angular/core';
import { OnDestroy } from '@angular/core';

declare namespace i1 {
  export { TakButton, TakAnchor };
}

/**
 * Material design anchor button.
 */
export declare class TakAnchor extends TakButton implements AfterViewInit, OnDestroy {
  /** @breaking-change 14.0.0 _ngZone will be required. */
  private _ngZone?;
  /** Tabindex of the button. */
  tabIndex: number;
  constructor(
    focusMonitor: FocusMonitor,
    elementRef: ElementRef,
    animationMode: string,
    /** @breaking-change 14.0.0 _ngZone will be required. */
    _ngZone?: NgZone | undefined
  );
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  _haltDisabledEvents: (event: Event) => void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakAnchor,
    [null, null, { optional: true }, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakAnchor,
    'a[tak-button], a[tak-raised-button], a[tak-icon-button], a[tak-fab],             a[tak-mini-fab], a[tak-stroked-button], a[tak-flat-button]',
    ['takButton', 'takAnchor'],
    { disabled: 'disabled'; disableRipple: 'disableRipple'; color: 'color'; tabIndex: 'tabIndex' },
    {},
    never,
    ['*'],
    false
  >;
}

/**
 * Material design button.
 */
export declare class TakButton
  extends _TakButtonBase
  implements AfterViewInit, OnDestroy, CanDisable, CanColor, CanDisableRipple, FocusableOption
{
  private _focusMonitor;
  _animationMode: string;
  /** Whether the button is round. */
  readonly isRoundButton: boolean;
  /** Whether the button is icon button. */
  readonly isIconButton: boolean;
  /** Reference to the TakRipple instance of the button. */
  ripple: TakRipple;
  constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor, _animationMode: string);
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  /** Focuses the button. */
  focus(origin?: FocusOrigin, options?: FocusOptions): void;
  _getHostElement(): any;
  _isRippleDisabled(): boolean;
  /** Gets whether the button has one of the given attributes. */
  _hasHostAttributes(...attributes: string[]): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakButton, [null, null, { optional: true }]>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakButton,
    'button[tak-button], button[tak-raised-button], button[tak-icon-button],             button[tak-fab], button[tak-mini-fab], button[tak-stroked-button],             button[tak-flat-button]',
    ['takButton'],
    { disabled: 'disabled'; disableRipple: 'disableRipple'; color: 'color' },
    {},
    never,
    ['*'],
    false
  >;
}

declare const _TakButtonBase: _Constructor<CanColor> &
  _AbstractConstructor<CanColor> &
  _Constructor<CanDisable> &
  _AbstractConstructor<CanDisable> &
  _Constructor<CanDisableRipple> &
  _AbstractConstructor<CanDisableRipple> & {
    new (_elementRef: ElementRef): {
      _elementRef: ElementRef;
    };
  };

export declare class TakButtonModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakButtonModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakButtonModule,
    [typeof i1.TakButton, typeof i1.TakAnchor],
    [typeof i2.TakRippleModule, typeof i2.TakCommonModule],
    [typeof i1.TakButton, typeof i1.TakAnchor, typeof i2.TakCommonModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakButtonModule>;
}

export {};
