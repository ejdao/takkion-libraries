import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterViewInit } from '@angular/core';
import { CanColor } from '@takkion/ng-material/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-material/core';
import { Platform } from '@takkion/ng-cdk/platform';
import { QueryList } from '@angular/core';

declare namespace i1 {
  export { throwToolbarMixedModesError, TakToolbarRow, TakToolbar };
}

export declare class TakToolbar extends _TakToolbarBase implements CanColor, AfterViewInit {
  private _platform;
  private _document;
  /** Reference to all toolbar row elements that have been projected. */
  _toolbarRows: QueryList<TakToolbarRow>;
  constructor(elementRef: ElementRef, _platform: Platform, document?: any);
  ngAfterViewInit(): void;
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  private _checkToolbarMixedModes;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakToolbar, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakToolbar,
    'tak-toolbar',
    ['takToolbar'],
    { color: 'color' },
    {},
    ['_toolbarRows'],
    ['*', 'tak-toolbar-row'],
    false
  >;
}

/** @docs-private */
declare const _TakToolbarBase: _Constructor<CanColor> &
  _AbstractConstructor<CanColor> & {
    new (_elementRef: ElementRef): {
      _elementRef: ElementRef;
    };
  };

export declare class TakToolbarModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakToolbarModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakToolbarModule,
    [typeof i1.TakToolbar, typeof i1.TakToolbarRow],
    [typeof i2.TakCommonModule],
    [typeof i1.TakToolbar, typeof i1.TakToolbarRow, typeof i2.TakCommonModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakToolbarModule>;
}

export declare class TakToolbarRow {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakToolbarRow, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakToolbarRow,
    'tak-toolbar-row',
    ['takToolbarRow'],
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
export declare function throwToolbarMixedModesError(): void;

export {};
