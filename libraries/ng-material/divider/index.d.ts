import { BooleanInput } from '@takkion/ng-cdk/coercion';
import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-material/core';

declare namespace i1 {
  export { TakDivider };
}

export declare class TakDivider {
  /** Whether the divider is vertically aligned. */
  get vertical(): boolean;
  set vertical(value: BooleanInput);
  private _vertical;
  /** Whether the divider is an inset divider. */
  get inset(): boolean;
  set inset(value: BooleanInput);
  private _inset;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakDivider, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakDivider,
    'tak-divider',
    never,
    { vertical: 'vertical'; inset: 'inset' },
    {},
    never,
    never,
    false
  >;
}

export declare class TakDividerModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakDividerModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakDividerModule,
    [typeof i1.TakDivider],
    [typeof i2.TakCommonModule],
    [typeof i1.TakDivider, typeof i2.TakCommonModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakDividerModule>;
}

export {};
