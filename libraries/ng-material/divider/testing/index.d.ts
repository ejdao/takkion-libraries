import { BaseHarnessFilters } from '@takkion/ng-cdk/testing';
import { ComponentHarness } from '@takkion/ng-cdk/testing';
import { HarnessPredicate } from '@takkion/ng-cdk/testing';

export declare interface DividerHarnessFilters extends BaseHarnessFilters {}

/** Harness for interacting with a `mat-divider`. */
export declare class MatDividerHarness extends ComponentHarness {
  static hostSelector: string;
  static with(options?: DividerHarnessFilters): HarnessPredicate<MatDividerHarness>;
  getOrientation(): Promise<'horizontal' | 'vertical'>;
  isInset(): Promise<boolean>;
}

export {};
