import { BehaviorSubject } from 'rxjs';
import { CdkCell } from '@takkion/ng-cdk/table';
import { CdkCellDef } from '@takkion/ng-cdk/table';
import { CdkColumnDef } from '@takkion/ng-cdk/table';
import { CdkFooterCell } from '@takkion/ng-cdk/table';
import { CdkFooterCellDef } from '@takkion/ng-cdk/table';
import { CdkFooterRow } from '@takkion/ng-cdk/table';
import { CdkFooterRowDef } from '@takkion/ng-cdk/table';
import { CdkHeaderCell } from '@takkion/ng-cdk/table';
import { CdkHeaderCellDef } from '@takkion/ng-cdk/table';
import { CdkHeaderRow } from '@takkion/ng-cdk/table';
import { CdkHeaderRowDef } from '@takkion/ng-cdk/table';
import { CdkNoDataRow } from '@takkion/ng-cdk/table';
import { CdkRow } from '@takkion/ng-cdk/table';
import { CdkRowDef } from '@takkion/ng-cdk/table';
import { CdkTable } from '@takkion/ng-cdk/table';
import { CdkTextColumn } from '@takkion/ng-cdk/table';
import { DataSource } from '@takkion/ng-cdk/table';
import * as i0 from '@angular/core';
import * as i5 from '@takkion/ng-cdk/table';
import * as i6 from '@takkion/ng-material/core';
import { TakPaginator } from '@takkion/ng-material/paginator';
import { TakSort } from '@takkion/ng-material/sort';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

declare namespace i1 {
  export { TakRecycleRows, TakTable };
}

declare namespace i2 {
  export {
    TakCellDef,
    TakHeaderCellDef,
    TakFooterCellDef,
    TakColumnDef,
    TakHeaderCell,
    TakFooterCell,
    TakCell,
  };
}

declare namespace i3 {
  export {
    TakHeaderRowDef,
    TakFooterRowDef,
    TakRowDef,
    TakHeaderRow,
    TakFooterRow,
    TakRow,
    TakNoDataRow,
  };
}

declare namespace i4 {
  export { TakTextColumn };
}

/** Cell template container that adds the right classes and role. */
export declare class TakCell extends CdkCell {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCell, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCell,
    'tak-cell, td[tak-cell]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Cell definition for the tak-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export declare class TakCellDef extends CdkCellDef {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCellDef, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCellDef,
    '[takCellDef]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Column definition for the tak-table.
 * Defines a set of cells available for a table column.
 */
export declare class TakColumnDef extends CdkColumnDef {
  /** Unique name for this column. */
  get name(): string;
  set name(name: string);
  /**
   * Add "tak-column-" prefix in addition to "cdk-column-" prefix.
   * In the future, this will only add "tak-column-" and columnCssClassName
   * will change from type string[] to string.
   * @docs-private
   */
  protected _updateColumnCssClassName(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakColumnDef, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakColumnDef,
    '[takColumnDef]',
    never,
    { sticky: 'sticky'; name: 'takColumnDef' },
    {},
    never,
    never,
    false
  >;
}

/** Footer cell template container that adds the right classes and role. */
export declare class TakFooterCell extends CdkFooterCell {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakFooterCell, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakFooterCell,
    'tak-footer-cell, td[tak-footer-cell]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Footer cell definition for the tak-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
export declare class TakFooterCellDef extends CdkFooterCellDef {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakFooterCellDef, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakFooterCellDef,
    '[takFooterCellDef]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
export declare class TakFooterRow extends CdkFooterRow {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakFooterRow, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakFooterRow,
    'tak-footer-row, tr[tak-footer-row]',
    ['takFooterRow'],
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Footer row definition for the tak-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
export declare class TakFooterRowDef extends CdkFooterRowDef {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakFooterRowDef, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakFooterRowDef,
    '[takFooterRowDef]',
    never,
    { columns: 'takFooterRowDef'; sticky: 'takFooterRowDefSticky' },
    {},
    never,
    never,
    false
  >;
}

/** Header cell template container that adds the right classes and role. */
export declare class TakHeaderCell extends CdkHeaderCell {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakHeaderCell, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakHeaderCell,
    'tak-header-cell, th[tak-header-cell]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Header cell definition for the tak-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
export declare class TakHeaderCellDef extends CdkHeaderCellDef {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakHeaderCellDef, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakHeaderCellDef,
    '[takHeaderCellDef]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** Header template container that contains the cell outlet. Adds the right class and role. */
export declare class TakHeaderRow extends CdkHeaderRow {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakHeaderRow, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakHeaderRow,
    'tak-header-row, tr[tak-header-row]',
    ['takHeaderRow'],
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Header row definition for the tak-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
export declare class TakHeaderRowDef extends CdkHeaderRowDef {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakHeaderRowDef, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakHeaderRowDef,
    '[takHeaderRowDef]',
    never,
    { columns: 'takHeaderRowDef'; sticky: 'takHeaderRowDefSticky' },
    {},
    never,
    never,
    false
  >;
}

/** Row that can be used to display a message when no data is shown in the table. */
export declare class TakNoDataRow extends CdkNoDataRow {
  _contentClassName: string;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakNoDataRow, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakNoDataRow,
    'ng-template[takNoDataRow]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Enables the recycle view repeater strategy, which reduces rendering latency. Not compatible with
 * tables that animate rows.
 */
export declare class TakRecycleRows {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakRecycleRows, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakRecycleRows,
    'tak-table[recycleRows], table[tak-table][recycleRows]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
export declare class TakRow extends CdkRow {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakRow, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakRow,
    'tak-row, tr[tak-row]',
    ['takRow'],
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Data row definition for the tak-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
export declare class TakRowDef<T> extends CdkRowDef<T> {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakRowDef<any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakRowDef<any>,
    '[takRowDef]',
    never,
    { columns: 'takRowDefColumns'; when: 'takRowDefWhen' },
    {},
    never,
    never,
    false
  >;
}

/**
 * Wrapper for the CdkTable with Material design styles.
 */
export declare class TakTable<T> extends CdkTable<T> {
  /** Overrides the sticky CSS class set by the `CdkTable`. */
  protected stickyCssClass: string;
  /** Overrides the need to add position: sticky on every sticky cell element in `CdkTable`. */
  protected needsPositionStickyOnElement: boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTable<any>, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakTable<any>,
    'tak-table, table[tak-table]',
    ['takTable'],
    {},
    {},
    never,
    ['caption', 'colgroup, col'],
    false
  >;
}

/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using TakSort), and pagination (using TakPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 *
 * **Note:** This class is meant to be a simple data source to help you get started. As such
 * it isn't equipped to handle some more advanced cases like robust i18n support or server-side
 * interactions. If your app needs to support more advanced use cases, consider implementing your
 * own `DataSource`.
 */
export declare class TakTableDataSource<T> extends _TakTableDataSource<T, TakPaginator> {}

/** Shared base class with MDC-based implementation. */
export declare class _TakTableDataSource<
  T,
  P extends TakTableDataSourcePaginator = TakTableDataSourcePaginator,
> extends DataSource<T> {
  /** Stream that emits when a new data array is set on the data source. */
  private readonly _data;
  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly _renderData;
  /** Stream that emits when a new filter string is set on the data source. */
  private readonly _filter;
  /** Used to react to internal changes of the paginator that are made by the data source itself. */
  private readonly _internalPageChanges;
  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows, such
   * as filtering, sorting, pagination, or base data changes.
   */
  _renderChangesSubscription: Subscription | null;
  /**
   * The filtered set of data that has been matched by the filter string, or all the data if there
   * is no filter. Useful for knowing the set of data the table represents.
   * For example, a 'selectAll()' function would likely want to select the set of filtered data
   * shown to the user rather than all the data.
   */
  filteredData: T[];
  /** Array of data that should be rendered by the table, where each object represents one row. */
  get data(): T[];
  set data(data: T[]);
  /**
   * Filter term that should be used to filter out objects from the data array. To override how
   * data objects match to this filter string, provide a custom function for filterPredicate.
   */
  get filter(): string;
  set filter(filter: string);
  /**
   * Instance of the TakSort directive used by the table to control its sorting. Sort changes
   * emitted by the TakSort will trigger an update to the table's rendered data.
   */
  get sort(): TakSort | null;
  set sort(sort: TakSort | null);
  private _sort;
  /**
   * Instance of the TakPaginator component used by the table to control what page of the data is
   * displayed. Page changes emitted by the TakPaginator will trigger an update to the
   * table's rendered data.
   *
   * Note that the data source uses the paginator's properties to calculate which page of data
   * should be displayed. If the paginator receives its properties as template inputs,
   * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
   * initialized before assigning it to this data source.
   */
  get paginator(): P | null;
  set paginator(paginator: P | null);
  private _paginator;
  /**
   * Data accessor function that is used for accessing data properties for sorting through
   * the default sortData function.
   * This default function assumes that the sort header IDs (which defaults to the column name)
   * matches the data's properties (e.g. column Xyz represents data['Xyz']).
   * May be set to a custom function for different behavior.
   * @param data Data object that is being accessed.
   * @param sortHeaderId The name of the column that represents the data.
   */
  sortingDataAccessor: (data: T, sortHeaderId: string) => string | number;
  /**
   * Gets a sorted copy of the data array based on the state of the TakSort. Called
   * after changes are made to the filtered data or when sort changes are emitted from TakSort.
   * By default, the function retrieves the active sort and its direction and compares data
   * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
   * of data ordering.
   * @param data The array of data that should be sorted.
   * @param sort The connected TakSort that holds the current sort state.
   */
  sortData: (data: T[], sort: TakSort) => T[];
  /**
   * Checks if a data object matches the data source's filter string. By default, each data object
   * is converted to a string of its properties and returns true if the filter has
   * at least one occurrence in that string. By default, the filter string has its whitespace
   * trimmed and the match is case-insensitive. May be overridden for a custom implementation of
   * filter matching.
   * @param data Data object used to check against the filter.
   * @param filter Filter string that has been set on the data source.
   * @returns Whether the filter matches against the data
   */
  filterPredicate: (data: T, filter: string) => boolean;
  constructor(initialData?: T[]);
  /**
   * Subscribe to changes that should trigger an update to the table's rendered rows. When the
   * changes occur, process the current state of the filter, sort, and pagination along with
   * the provided base data and send it to the table for rendering.
   */
  _updateChangeSubscription(): void;
  /**
   * Returns a filtered data array where each filter object contains the filter string within
   * the result of the filterTermAccessor function. If no filter is set, returns the data array
   * as provided.
   */
  _filterData(data: T[]): T[];
  /**
   * Returns a sorted copy of the data if TakSort has a sort applied, otherwise just returns the
   * data array as provided. Uses the default data accessor for data lookup, unless a
   * sortDataAccessor function is defined.
   */
  _orderData(data: T[]): T[];
  /**
   * Returns a paged slice of the provided data array according to the provided TakPaginator's page
   * index and length. If there is no paginator provided, returns the data array as provided.
   */
  _pageData(data: T[]): T[];
  /**
   * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
   * index does not exceed the paginator's last page. Values are changed in a resolved promise to
   * guard against making property changes within a round of change detection.
   */
  _updatePaginator(filteredDataLength: number): void;
  /**
   * Used by the TakTable. Called when it connects to the data source.
   * @docs-private
   */
  connect(): BehaviorSubject<T[]>;
  /**
   * Used by the TakTable. Called when it disconnects from the data source.
   * @docs-private
   */
  disconnect(): void;
}

/**
 * Interface that matches the required API parts for the TakPaginator's PageEvent.
 * Decoupled so that users can depend on either the legacy or MDC-based paginator.
 */
export declare interface TakTableDataSourcePageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

/**
 * Interface that matches the required API parts of the TakPaginator.
 * Decoupled so that users can depend on either the legacy or MDC-based paginator.
 */
export declare interface TakTableDataSourcePaginator {
  page: Subject<TakTableDataSourcePageEvent>;
  pageIndex: number;
  initialized: Observable<void>;
  pageSize: number;
  length: number;
}

export declare class TakTableModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTableModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakTableModule,
    [
      typeof i1.TakTable,
      typeof i1.TakRecycleRows,
      typeof i2.TakHeaderCellDef,
      typeof i3.TakHeaderRowDef,
      typeof i2.TakColumnDef,
      typeof i2.TakCellDef,
      typeof i3.TakRowDef,
      typeof i2.TakFooterCellDef,
      typeof i3.TakFooterRowDef,
      typeof i2.TakHeaderCell,
      typeof i2.TakCell,
      typeof i2.TakFooterCell,
      typeof i3.TakHeaderRow,
      typeof i3.TakRow,
      typeof i3.TakFooterRow,
      typeof i3.TakNoDataRow,
      typeof i4.TakTextColumn,
    ],
    [typeof i5.CdkTableModule, typeof i6.TakCommonModule],
    [
      typeof i6.TakCommonModule,
      typeof i1.TakTable,
      typeof i1.TakRecycleRows,
      typeof i2.TakHeaderCellDef,
      typeof i3.TakHeaderRowDef,
      typeof i2.TakColumnDef,
      typeof i2.TakCellDef,
      typeof i3.TakRowDef,
      typeof i2.TakFooterCellDef,
      typeof i3.TakFooterRowDef,
      typeof i2.TakHeaderCell,
      typeof i2.TakCell,
      typeof i2.TakFooterCell,
      typeof i3.TakHeaderRow,
      typeof i3.TakRow,
      typeof i3.TakFooterRow,
      typeof i3.TakNoDataRow,
      typeof i4.TakTextColumn,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakTableModule>;
}

/**
 * Column that simply shows text content for the header and row cells. Assumes that the table
 * is using the native table implementation (`<table>`).
 *
 * By default, the name of this column will be the header text and data property accessor.
 * The header text can be overridden with the `headerText` input. Cell values can be overridden with
 * the `dataAccessor` input. Change the text justification to the start or end using the `justify`
 * input.
 */
export declare class TakTextColumn<T> extends CdkTextColumn<T> {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTextColumn<any>, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakTextColumn<any>,
    'tak-text-column',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export {};
