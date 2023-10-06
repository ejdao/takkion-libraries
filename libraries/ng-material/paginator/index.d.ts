import { _AbstractConstructor } from '@takkion/ng-material/core';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanDisable } from '@takkion/ng-material/core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { EventEmitter } from '@angular/core';
import { HasInitialized } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '@takkion/ng-material/button';
import * as i4 from '@takkion/ng-material/select';
import * as i5 from '@takkion/ng-material/tooltip';
import * as i6 from '@takkion/ng-material/core';
import { InjectionToken } from '@angular/core';
import { TakFormFieldAppearance } from '@takkion/ng-material/form-field';
import { NumberInput } from '@takkion/ng-cdk/coercion';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemePalette } from '@takkion/ng-material/core';

declare namespace i1 {
  export {
    PageEvent,
    TakPaginatorDefaultOptions,
    TAK_PAGINATOR_DEFAULT_OPTIONS,
    TakPaginatorSelectConfig,
    _TakPaginatorBase,
    TakPaginator,
  };
}

/** Injection token that can be used to provide the default options for the paginator module. */
export declare const TAK_PAGINATOR_DEFAULT_OPTIONS: InjectionToken<TakPaginatorDefaultOptions>;

/** @docs-private */
export declare const TAK_PAGINATOR_INTL_PROVIDER: {
  provide: typeof TakPaginatorIntl;
  deps: Optional[][];
  useFactory: typeof TAK_PAGINATOR_INTL_PROVIDER_FACTORY;
};

/** @docs-private */
export declare function TAK_PAGINATOR_INTL_PROVIDER_FACTORY(
  parentIntl: TakPaginatorIntl
): TakPaginatorIntl;

/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
export declare class TakPaginator extends _TakPaginatorBase<TakPaginatorDefaultOptions> {
  /** If set, styles the "page size" form field with the designated style. */
  _formFieldAppearance?: TakFormFieldAppearance;
  constructor(
    intl: TakPaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    defaults?: TakPaginatorDefaultOptions
  );
  static ɵfac: i0.ɵɵFactoryDeclaration<TakPaginator, [null, null, { optional: true }]>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakPaginator,
    'tak-paginator',
    ['takPaginator'],
    { disabled: 'disabled' },
    {},
    never,
    never,
    false
  >;
}

/**
 * Base class with all of the `TakPaginator` functionality.
 * @docs-private
 */
export declare abstract class _TakPaginatorBase<
    O extends {
      pageSize?: number;
      pageSizeOptions?: number[];
      hidePageSize?: boolean;
      showFirstLastButtons?: boolean;
    },
  >
  extends _TakPaginatorMixinBase
  implements OnInit, OnDestroy, CanDisable, HasInitialized
{
  _intl: TakPaginatorIntl;
  private _changeDetectorRef;
  private _initialized;
  private _intlChanges;
  /** Theme color to be used for the underlying form controls. */
  color: ThemePalette;
  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  get pageIndex(): number;
  set pageIndex(value: NumberInput);
  private _pageIndex;
  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  get length(): number;
  set length(value: NumberInput);
  private _length;
  /** Number of items to display on a page. By default set to 50. */
  get pageSize(): number;
  set pageSize(value: NumberInput);
  private _pageSize;
  /** The set of provided page size options to display to the user. */
  get pageSizeOptions(): number[];
  set pageSizeOptions(value: number[] | readonly number[]);
  private _pageSizeOptions;
  /** Whether to hide the page size selection UI from the user. */
  get hidePageSize(): boolean;
  set hidePageSize(value: BooleanInput);
  private _hidePageSize;
  /** Whether to show the first/last buttons UI to the user. */
  get showFirstLastButtons(): boolean;
  set showFirstLastButtons(value: BooleanInput);
  private _showFirstLastButtons;
  /** Used to configure the underlying `TakSelect` inside the paginator. */
  selectConfig: TakPaginatorSelectConfig;
  /** Event emitted when the paginator changes the page size or page index. */
  readonly page: EventEmitter<PageEvent>;
  /** Displayed set of page size options. Will be sorted and include current page size. */
  _displayedPageSizeOptions: number[];
  constructor(_intl: TakPaginatorIntl, _changeDetectorRef: ChangeDetectorRef, defaults?: O);
  ngOnInit(): void;
  ngOnDestroy(): void;
  /** Advances to the next page if it exists. */
  nextPage(): void;
  /** Move back to the previous page if it exists. */
  previousPage(): void;
  /** Move to the first page if not already there. */
  firstPage(): void;
  /** Move to the last page if not already there. */
  lastPage(): void;
  /** Whether there is a previous page. */
  hasPreviousPage(): boolean;
  /** Whether there is a next page. */
  hasNextPage(): boolean;
  /** Calculate the number of pages */
  getNumberOfPages(): number;
  /**
   * Changes the page size so that the first item displayed on the page will still be
   * displayed using the new page size.
   *
   * For example, if the page size is 10 and on the second page (items indexed 10-19) then
   * switching so that the page size is 5 will set the third page as the current page so
   * that the 10th item will still be displayed.
   */
  _changePageSize(pageSize: number): void;
  /** Checks whether the buttons for going forwards should be disabled. */
  _nextButtonsDisabled(): boolean;
  /** Checks whether the buttons for going backwards should be disabled. */
  _previousButtonsDisabled(): boolean;
  /**
   * Updates the list of page size options to display to the user. Includes making sure that
   * the page size is an option and that the list is sorted.
   */
  private _updateDisplayedPageSizeOptions;
  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private _emitPageEvent;
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakPaginatorBase<any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    _TakPaginatorBase<any>,
    never,
    never,
    {
      color: 'color';
      pageIndex: 'pageIndex';
      length: 'length';
      pageSize: 'pageSize';
      pageSizeOptions: 'pageSizeOptions';
      hidePageSize: 'hidePageSize';
      showFirstLastButtons: 'showFirstLastButtons';
      selectConfig: 'selectConfig';
    },
    { page: 'page' },
    never,
    never,
    false
  >;
}

/** Object that can be used to configure the default options for the paginator module. */
export declare interface TakPaginatorDefaultOptions {
  /** Number of items to display on a page. By default set to 50. */
  pageSize?: number;
  /** The set of provided page size options to display to the user. */
  pageSizeOptions?: number[];
  /** Whether to hide the page size selection UI from the user. */
  hidePageSize?: boolean;
  /** Whether to show the first/last buttons UI to the user. */
  showFirstLastButtons?: boolean;
  /** The default form-field appearance to apply to the page size options selector. */
  formFieldAppearance?: TakFormFieldAppearance;
}

/**
 * To modify the labels and text displayed, create a new instance of TakPaginatorIntl and
 * include it in a custom provider
 */
export declare class TakPaginatorIntl {
  /**
   * Stream to emit from when labels are changed. Use this to notify components when the labels have
   * changed after initialization.
   */
  readonly changes: Subject<void>;
  /** A label for the page size selector. */
  itemsPerPageLabel: string;
  /** A label for the button that increments the current page. */
  nextPageLabel: string;
  /** A label for the button that decrements the current page. */
  previousPageLabel: string;
  /** A label for the button that moves to the first page. */
  firstPageLabel: string;
  /** A label for the button that moves to the last page. */
  lastPageLabel: string;
  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel: (page: number, pageSize: number, length: number) => string;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakPaginatorIntl, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<TakPaginatorIntl>;
}

/** @docs-private */
declare const _TakPaginatorMixinBase: _Constructor<CanDisable> &
  _AbstractConstructor<CanDisable> &
  (new (...args: any[]) => HasInitialized) & {
    new (): {};
  };

export declare class TakPaginatorModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakPaginatorModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakPaginatorModule,
    [typeof i1.TakPaginator],
    [
      typeof i2.CommonModule,
      typeof i3.TakButtonModule,
      typeof i4.TakSelectModule,
      typeof i5.TakTooltipModule,
      typeof i6.TakCommonModule,
    ],
    [typeof i1.TakPaginator]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakPaginatorModule>;
}

/** Object that can used to configure the underlying `TakSelect` inside a `TakPaginator`. */
export declare interface TakPaginatorSelectConfig {
  /** Whether to center the active option over the trigger. */
  disableOptionCentering?: boolean;
  /** Classes to be passed to the select panel. */
  panelClass?:
    | string
    | string[]
    | Set<string>
    | {
        [key: string]: any;
      };
}

/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export declare class PageEvent {
  /** The current page index. */
  pageIndex: number;
  /**
   * Index of the page that was selected previously.
   * @breaking-change 8.0.0 To be made into a required property.
   */
  previousPageIndex?: number;
  /** The current page size */
  pageSize: number;
  /** The current total number of items being paged */
  length: number;
}

export {};
