import * as i0 from '@angular/core';
import {
  Directive,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  NgModule,
} from '@angular/core';
import * as i1 from '@takkion/ng-cdk/table';
import {
  CdkTable,
  CDK_TABLE,
  _COALESCED_STYLE_SCHEDULER,
  _CoalescedStyleScheduler,
  STICKY_POSITIONING_LISTENER,
  CDK_TABLE_TEMPLATE,
  CdkCellDef,
  CdkHeaderCellDef,
  CdkFooterCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkFooterCell,
  CdkCell,
  CdkHeaderRowDef,
  CdkFooterRowDef,
  CdkRowDef,
  CdkHeaderRow,
  CDK_ROW_TEMPLATE,
  CdkFooterRow,
  CdkRow,
  CdkNoDataRow,
  CdkTextColumn,
  CdkTableModule,
  DataSource,
} from '@takkion/ng-cdk/table';
import {
  _VIEW_REPEATER_STRATEGY,
  _RecycleViewRepeaterStrategy,
  _DisposeViewRepeaterStrategy,
} from '@takkion/ng-cdk/collections';
import { TakCommonModule } from '@takkion/ng-material/core';
import { _isNumberValue } from '@takkion/ng-cdk/coercion';
import { BehaviorSubject, Subject, merge, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Enables the recycle view repeater strategy, which reduces rendering latency. Not compatible with
 * tables that animate rows.
 */
class TakRecycleRows {}
TakRecycleRows.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRecycleRows,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakRecycleRows.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakRecycleRows,
  selector: 'tak-table[recycleRows], table[tak-table][recycleRows]',
  providers: [{ provide: _VIEW_REPEATER_STRATEGY, useClass: _RecycleViewRepeaterStrategy }],
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRecycleRows,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-table[recycleRows], table[tak-table][recycleRows]',
          providers: [{ provide: _VIEW_REPEATER_STRATEGY, useClass: _RecycleViewRepeaterStrategy }],
        },
      ],
    },
  ],
});
/**
 * Wrapper for the CdkTable with Material design styles.
 */
class TakTable extends CdkTable {
  constructor() {
    super(...arguments);
    /** Overrides the sticky CSS class set by the `CdkTable`. */
    this.stickyCssClass = 'tak-table-sticky';
    /** Overrides the need to add position: sticky on every sticky cell element in `CdkTable`. */
    this.needsPositionStickyOnElement = false;
  }
}
TakTable.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTable,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakTable.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTable,
  selector: 'tak-table, table[tak-table]',
  host: {
    properties: { 'class.tak-table-fixed-layout': 'fixedLayout' },
    classAttribute: 'tak-table',
  },
  providers: [
    // TODO(michaeljamesparsons) Abstract the view repeater strategy to a directive API so this code
    //  is only included in the build if used.
    { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
    { provide: CdkTable, useExisting: TakTable },
    { provide: CDK_TABLE, useExisting: TakTable },
    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
    // Prevent nested tables from seeing this table's StickyPositioningListener.
    { provide: STICKY_POSITIONING_LISTENER, useValue: null },
  ],
  exportAs: ['takTable'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '\n  <ng-content select="caption"></ng-content>\n  <ng-content select="colgroup, col"></ng-content>\n  <ng-container headerRowOutlet></ng-container>\n  <ng-container rowOutlet></ng-container>\n  <ng-container noDataRowOutlet></ng-container>\n  <ng-container footerRowOutlet></ng-container>\n',
  isInline: true,
  styles: [
    'tak-table{display:block}tak-header-row{min-height:56px}tak-row,tak-footer-row{min-height:48px}tak-row,tak-header-row,tak-footer-row{display:flex;border-width:0;border-bottom-width:1px;border-style:solid;align-items:center;box-sizing:border-box}tak-cell:first-of-type,tak-header-cell:first-of-type,tak-footer-cell:first-of-type{padding-left:24px}[dir=rtl] tak-cell:first-of-type:not(:only-of-type),[dir=rtl] tak-header-cell:first-of-type:not(:only-of-type),[dir=rtl] tak-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}tak-cell:last-of-type,tak-header-cell:last-of-type,tak-footer-cell:last-of-type{padding-right:24px}[dir=rtl] tak-cell:last-of-type:not(:only-of-type),[dir=rtl] tak-header-cell:last-of-type:not(:only-of-type),[dir=rtl] tak-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}tak-cell,tak-header-cell,tak-footer-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}table.tak-table{border-spacing:0}tr.tak-header-row{height:56px}tr.tak-row,tr.tak-footer-row{height:48px}th.tak-header-cell{text-align:left}[dir=rtl] th.tak-header-cell{text-align:right}th.tak-header-cell,td.tak-cell,td.tak-footer-cell{padding:0;border-bottom-width:1px;border-bottom-style:solid}th.tak-header-cell:first-of-type,td.tak-cell:first-of-type,td.tak-footer-cell:first-of-type{padding-left:24px}[dir=rtl] th.tak-header-cell:first-of-type:not(:only-of-type),[dir=rtl] td.tak-cell:first-of-type:not(:only-of-type),[dir=rtl] td.tak-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}th.tak-header-cell:last-of-type,td.tak-cell:last-of-type,td.tak-footer-cell:last-of-type{padding-right:24px}[dir=rtl] th.tak-header-cell:last-of-type:not(:only-of-type),[dir=rtl] td.tak-cell:last-of-type:not(:only-of-type),[dir=rtl] td.tak-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}.tak-table-sticky{position:sticky !important}.tak-table-fixed-layout{table-layout:fixed}',
  ],
  dependencies: [
    { kind: 'directive', type: i1.DataRowOutlet, selector: '[rowOutlet]' },
    { kind: 'directive', type: i1.HeaderRowOutlet, selector: '[headerRowOutlet]' },
    { kind: 'directive', type: i1.FooterRowOutlet, selector: '[footerRowOutlet]' },
    { kind: 'directive', type: i1.NoDataRowOutlet, selector: '[noDataRowOutlet]' },
  ],
  changeDetection: i0.ChangeDetectionStrategy.Default,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTable,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-table, table[tak-table]',
          exportAs: 'takTable',
          template: CDK_TABLE_TEMPLATE,
          host: {
            class: 'tak-table',
            '[class.tak-table-fixed-layout]': 'fixedLayout',
          },
          providers: [
            // TODO(michaeljamesparsons) Abstract the view repeater strategy to a directive API so this code
            //  is only included in the build if used.
            { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
            { provide: CdkTable, useExisting: TakTable },
            { provide: CDK_TABLE, useExisting: TakTable },
            { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
            // Prevent nested tables from seeing this table's StickyPositioningListener.
            { provide: STICKY_POSITIONING_LISTENER, useValue: null },
          ],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.Default,
          styles: [
            'tak-table{display:block}tak-header-row{min-height:56px}tak-row,tak-footer-row{min-height:48px}tak-row,tak-header-row,tak-footer-row{display:flex;border-width:0;border-bottom-width:1px;border-style:solid;align-items:center;box-sizing:border-box}tak-cell:first-of-type,tak-header-cell:first-of-type,tak-footer-cell:first-of-type{padding-left:24px}[dir=rtl] tak-cell:first-of-type:not(:only-of-type),[dir=rtl] tak-header-cell:first-of-type:not(:only-of-type),[dir=rtl] tak-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}tak-cell:last-of-type,tak-header-cell:last-of-type,tak-footer-cell:last-of-type{padding-right:24px}[dir=rtl] tak-cell:last-of-type:not(:only-of-type),[dir=rtl] tak-header-cell:last-of-type:not(:only-of-type),[dir=rtl] tak-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}tak-cell,tak-header-cell,tak-footer-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}table.tak-table{border-spacing:0}tr.tak-header-row{height:56px}tr.tak-row,tr.tak-footer-row{height:48px}th.tak-header-cell{text-align:left}[dir=rtl] th.tak-header-cell{text-align:right}th.tak-header-cell,td.tak-cell,td.tak-footer-cell{padding:0;border-bottom-width:1px;border-bottom-style:solid}th.tak-header-cell:first-of-type,td.tak-cell:first-of-type,td.tak-footer-cell:first-of-type{padding-left:24px}[dir=rtl] th.tak-header-cell:first-of-type:not(:only-of-type),[dir=rtl] td.tak-cell:first-of-type:not(:only-of-type),[dir=rtl] td.tak-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}th.tak-header-cell:last-of-type,td.tak-cell:last-of-type,td.tak-footer-cell:last-of-type{padding-right:24px}[dir=rtl] th.tak-header-cell:last-of-type:not(:only-of-type),[dir=rtl] td.tak-cell:last-of-type:not(:only-of-type),[dir=rtl] td.tak-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}.tak-table-sticky{position:sticky !important}.tak-table-fixed-layout{table-layout:fixed}',
          ],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Cell definition for the tak-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
class TakCellDef extends CdkCellDef {}
TakCellDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCellDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCellDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCellDef,
  selector: '[takCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: TakCellDef }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCellDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takCellDef]',
          providers: [{ provide: CdkCellDef, useExisting: TakCellDef }],
        },
      ],
    },
  ],
});
/**
 * Header cell definition for the tak-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
class TakHeaderCellDef extends CdkHeaderCellDef {}
TakHeaderCellDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderCellDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakHeaderCellDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakHeaderCellDef,
  selector: '[takHeaderCellDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: TakHeaderCellDef }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderCellDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takHeaderCellDef]',
          providers: [{ provide: CdkHeaderCellDef, useExisting: TakHeaderCellDef }],
        },
      ],
    },
  ],
});
/**
 * Footer cell definition for the tak-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
class TakFooterCellDef extends CdkFooterCellDef {}
TakFooterCellDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterCellDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakFooterCellDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakFooterCellDef,
  selector: '[takFooterCellDef]',
  providers: [{ provide: CdkFooterCellDef, useExisting: TakFooterCellDef }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterCellDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takFooterCellDef]',
          providers: [{ provide: CdkFooterCellDef, useExisting: TakFooterCellDef }],
        },
      ],
    },
  ],
});
/**
 * Column definition for the tak-table.
 * Defines a set of cells available for a table column.
 */
class TakColumnDef extends CdkColumnDef {
  /** Unique name for this column. */
  get name() {
    return this._name;
  }
  set name(name) {
    this._setNameInput(name);
  }
  /**
   * Add "tak-column-" prefix in addition to "cdk-column-" prefix.
   * In the future, this will only add "tak-column-" and columnCssClassName
   * will change from type string[] to string.
   * @docs-private
   */
  _updateColumnCssClassName() {
    super._updateColumnCssClassName();
    this._columnCssClassName.push(`tak-column-${this.cssClassFriendlyName}`);
  }
}
TakColumnDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakColumnDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakColumnDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakColumnDef,
  selector: '[takColumnDef]',
  inputs: { sticky: 'sticky', name: ['takColumnDef', 'name'] },
  providers: [
    { provide: CdkColumnDef, useExisting: TakColumnDef },
    { provide: 'TAK_SORT_HEADER_COLUMN_DEF', useExisting: TakColumnDef },
  ],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakColumnDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takColumnDef]',
          inputs: ['sticky'],
          providers: [
            { provide: CdkColumnDef, useExisting: TakColumnDef },
            { provide: 'TAK_SORT_HEADER_COLUMN_DEF', useExisting: TakColumnDef },
          ],
        },
      ],
    },
  ],
  propDecorators: {
    name: [
      {
        type: Input,
        args: ['takColumnDef'],
      },
    ],
  },
});
/** Header cell template container that adds the right classes and role. */
class TakHeaderCell extends CdkHeaderCell {}
TakHeaderCell.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderCell,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakHeaderCell.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakHeaderCell,
  selector: 'tak-header-cell, th[tak-header-cell]',
  host: { attributes: { role: 'columnheader' }, classAttribute: 'tak-header-cell' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderCell,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-header-cell, th[tak-header-cell]',
          host: {
            class: 'tak-header-cell',
            role: 'columnheader',
          },
        },
      ],
    },
  ],
});
/** Footer cell template container that adds the right classes and role. */
class TakFooterCell extends CdkFooterCell {}
TakFooterCell.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterCell,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakFooterCell.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakFooterCell,
  selector: 'tak-footer-cell, td[tak-footer-cell]',
  host: { attributes: { role: 'gridcell' }, classAttribute: 'tak-footer-cell' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterCell,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-footer-cell, td[tak-footer-cell]',
          host: {
            class: 'tak-footer-cell',
            role: 'gridcell',
          },
        },
      ],
    },
  ],
});
/** Cell template container that adds the right classes and role. */
class TakCell extends CdkCell {}
TakCell.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCell,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCell.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCell,
  selector: 'tak-cell, td[tak-cell]',
  host: { attributes: { role: 'gridcell' }, classAttribute: 'tak-cell' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCell,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-cell, td[tak-cell]',
          host: {
            class: 'tak-cell',
            role: 'gridcell',
          },
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Header row definition for the tak-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
class TakHeaderRowDef extends CdkHeaderRowDef {}
TakHeaderRowDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderRowDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakHeaderRowDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakHeaderRowDef,
  selector: '[takHeaderRowDef]',
  inputs: { columns: ['takHeaderRowDef', 'columns'], sticky: ['takHeaderRowDefSticky', 'sticky'] },
  providers: [{ provide: CdkHeaderRowDef, useExisting: TakHeaderRowDef }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderRowDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takHeaderRowDef]',
          providers: [{ provide: CdkHeaderRowDef, useExisting: TakHeaderRowDef }],
          inputs: ['columns: takHeaderRowDef', 'sticky: takHeaderRowDefSticky'],
        },
      ],
    },
  ],
});
/**
 * Footer row definition for the tak-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
class TakFooterRowDef extends CdkFooterRowDef {}
TakFooterRowDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterRowDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakFooterRowDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakFooterRowDef,
  selector: '[takFooterRowDef]',
  inputs: { columns: ['takFooterRowDef', 'columns'], sticky: ['takFooterRowDefSticky', 'sticky'] },
  providers: [{ provide: CdkFooterRowDef, useExisting: TakFooterRowDef }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterRowDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takFooterRowDef]',
          providers: [{ provide: CdkFooterRowDef, useExisting: TakFooterRowDef }],
          inputs: ['columns: takFooterRowDef', 'sticky: takFooterRowDefSticky'],
        },
      ],
    },
  ],
});
/**
 * Data row definition for the tak-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
class TakRowDef extends CdkRowDef {}
TakRowDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRowDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakRowDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakRowDef,
  selector: '[takRowDef]',
  inputs: { columns: ['takRowDefColumns', 'columns'], when: ['takRowDefWhen', 'when'] },
  providers: [{ provide: CdkRowDef, useExisting: TakRowDef }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRowDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takRowDef]',
          providers: [{ provide: CdkRowDef, useExisting: TakRowDef }],
          inputs: ['columns: takRowDefColumns', 'when: takRowDefWhen'],
        },
      ],
    },
  ],
});
/** Header template container that contains the cell outlet. Adds the right class and role. */
class TakHeaderRow extends CdkHeaderRow {}
TakHeaderRow.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderRow,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakHeaderRow.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakHeaderRow,
  selector: 'tak-header-row, tr[tak-header-row]',
  host: { attributes: { role: 'row' }, classAttribute: 'tak-header-row' },
  providers: [{ provide: CdkHeaderRow, useExisting: TakHeaderRow }],
  exportAs: ['takHeaderRow'],
  usesInheritance: true,
  ngImport: i0,
  template: '<ng-container cdkCellOutlet></ng-container>',
  isInline: true,
  dependencies: [{ kind: 'directive', type: i1.CdkCellOutlet, selector: '[cdkCellOutlet]' }],
  changeDetection: i0.ChangeDetectionStrategy.Default,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakHeaderRow,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-header-row, tr[tak-header-row]',
          template: CDK_ROW_TEMPLATE,
          host: {
            class: 'tak-header-row',
            role: 'row',
          },
          // See note on CdkTable for explanation on why this uses the default change detection strategy.
          // tslint:disable-next-line:validate-decorators
          changeDetection: ChangeDetectionStrategy.Default,
          encapsulation: ViewEncapsulation.None,
          exportAs: 'takHeaderRow',
          providers: [{ provide: CdkHeaderRow, useExisting: TakHeaderRow }],
        },
      ],
    },
  ],
});
/** Footer template container that contains the cell outlet. Adds the right class and role. */
class TakFooterRow extends CdkFooterRow {}
TakFooterRow.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterRow,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakFooterRow.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakFooterRow,
  selector: 'tak-footer-row, tr[tak-footer-row]',
  host: { attributes: { role: 'row' }, classAttribute: 'tak-footer-row' },
  providers: [{ provide: CdkFooterRow, useExisting: TakFooterRow }],
  exportAs: ['takFooterRow'],
  usesInheritance: true,
  ngImport: i0,
  template: '<ng-container cdkCellOutlet></ng-container>',
  isInline: true,
  dependencies: [{ kind: 'directive', type: i1.CdkCellOutlet, selector: '[cdkCellOutlet]' }],
  changeDetection: i0.ChangeDetectionStrategy.Default,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakFooterRow,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-footer-row, tr[tak-footer-row]',
          template: CDK_ROW_TEMPLATE,
          host: {
            class: 'tak-footer-row',
            role: 'row',
          },
          // See note on CdkTable for explanation on why this uses the default change detection strategy.
          // tslint:disable-next-line:validate-decorators
          changeDetection: ChangeDetectionStrategy.Default,
          encapsulation: ViewEncapsulation.None,
          exportAs: 'takFooterRow',
          providers: [{ provide: CdkFooterRow, useExisting: TakFooterRow }],
        },
      ],
    },
  ],
});
/** Data row template container that contains the cell outlet. Adds the right class and role. */
class TakRow extends CdkRow {}
TakRow.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRow,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakRow.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakRow,
  selector: 'tak-row, tr[tak-row]',
  host: { attributes: { role: 'row' }, classAttribute: 'tak-row' },
  providers: [{ provide: CdkRow, useExisting: TakRow }],
  exportAs: ['takRow'],
  usesInheritance: true,
  ngImport: i0,
  template: '<ng-container cdkCellOutlet></ng-container>',
  isInline: true,
  dependencies: [{ kind: 'directive', type: i1.CdkCellOutlet, selector: '[cdkCellOutlet]' }],
  changeDetection: i0.ChangeDetectionStrategy.Default,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRow,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-row, tr[tak-row]',
          template: CDK_ROW_TEMPLATE,
          host: {
            class: 'tak-row',
            role: 'row',
          },
          // See note on CdkTable for explanation on why this uses the default change detection strategy.
          // tslint:disable-next-line:validate-decorators
          changeDetection: ChangeDetectionStrategy.Default,
          encapsulation: ViewEncapsulation.None,
          exportAs: 'takRow',
          providers: [{ provide: CdkRow, useExisting: TakRow }],
        },
      ],
    },
  ],
});
/** Row that can be used to display a message when no data is shown in the table. */
class TakNoDataRow extends CdkNoDataRow {
  constructor() {
    super(...arguments);
    this._contentClassName = 'tak-no-data-row';
  }
}
TakNoDataRow.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNoDataRow,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakNoDataRow.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakNoDataRow,
  selector: 'ng-template[takNoDataRow]',
  providers: [{ provide: CdkNoDataRow, useExisting: TakNoDataRow }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNoDataRow,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'ng-template[takNoDataRow]',
          providers: [{ provide: CdkNoDataRow, useExisting: TakNoDataRow }],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Column that simply shows text content for the header and row cells. Assumes that the table
 * is using the native table implementation (`<table>`).
 *
 * By default, the name of this column will be the header text and data property accessor.
 * The header text can be overridden with the `headerText` input. Cell values can be overridden with
 * the `dataAccessor` input. Change the text justification to the start or end using the `justify`
 * input.
 */
class TakTextColumn extends CdkTextColumn {}
TakTextColumn.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTextColumn,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakTextColumn.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTextColumn,
  selector: 'tak-text-column',
  usesInheritance: true,
  ngImport: i0,
  template: `
    <ng-container takColumnDef>
      <th tak-header-cell *takHeaderCellDef [style.text-align]="justify">
        {{headerText}}
      </th>
      <td tak-cell *takCellDef="let data" [style.text-align]="justify">
        {{dataAccessor(data, name)}}
      </td>
    </ng-container>
  `,
  isInline: true,
  dependencies: [
    { kind: 'directive', type: TakHeaderCellDef, selector: '[takHeaderCellDef]' },
    {
      kind: 'directive',
      type: TakColumnDef,
      selector: '[takColumnDef]',
      inputs: ['sticky', 'takColumnDef'],
    },
    { kind: 'directive', type: TakCellDef, selector: '[takCellDef]' },
    { kind: 'directive', type: TakHeaderCell, selector: 'tak-header-cell, th[tak-header-cell]' },
    { kind: 'directive', type: TakCell, selector: 'tak-cell, td[tak-cell]' },
  ],
  changeDetection: i0.ChangeDetectionStrategy.Default,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTextColumn,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-text-column',
          template: `
    <ng-container takColumnDef>
      <th tak-header-cell *takHeaderCellDef [style.text-align]="justify">
        {{headerText}}
      </th>
      <td tak-cell *takCellDef="let data" [style.text-align]="justify">
        {{dataAccessor(data, name)}}
      </td>
    </ng-container>
  `,
          encapsulation: ViewEncapsulation.None,
          // Change detection is intentionally not set to OnPush. This component's template will be provided
          // to the table to be inserted into its view. This is problematic when change detection runs since
          // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
          // mean's the template in the table's view will not have the updated value (and in fact will cause
          // an ExpressionChangedAfterItHasBeenCheckedError).
          // tslint:disable-next-line:validate-decorators
          changeDetection: ChangeDetectionStrategy.Default,
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const EXPORTED_DECLARATIONS = [
  // Table
  TakTable,
  TakRecycleRows,
  // Template defs
  TakHeaderCellDef,
  TakHeaderRowDef,
  TakColumnDef,
  TakCellDef,
  TakRowDef,
  TakFooterCellDef,
  TakFooterRowDef,
  // Cell directives
  TakHeaderCell,
  TakCell,
  TakFooterCell,
  // Row directives
  TakHeaderRow,
  TakRow,
  TakFooterRow,
  TakNoDataRow,
  TakTextColumn,
];
class TakTableModule {}
TakTableModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTableModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakTableModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTableModule,
  declarations: [
    // Table
    TakTable,
    TakRecycleRows,
    // Template defs
    TakHeaderCellDef,
    TakHeaderRowDef,
    TakColumnDef,
    TakCellDef,
    TakRowDef,
    TakFooterCellDef,
    TakFooterRowDef,
    // Cell directives
    TakHeaderCell,
    TakCell,
    TakFooterCell,
    // Row directives
    TakHeaderRow,
    TakRow,
    TakFooterRow,
    TakNoDataRow,
    TakTextColumn,
  ],
  imports: [CdkTableModule, TakCommonModule],
  exports: [
    TakCommonModule,
    // Table
    TakTable,
    TakRecycleRows,
    // Template defs
    TakHeaderCellDef,
    TakHeaderRowDef,
    TakColumnDef,
    TakCellDef,
    TakRowDef,
    TakFooterCellDef,
    TakFooterRowDef,
    // Cell directives
    TakHeaderCell,
    TakCell,
    TakFooterCell,
    // Row directives
    TakHeaderRow,
    TakRow,
    TakFooterRow,
    TakNoDataRow,
    TakTextColumn,
  ],
});
TakTableModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTableModule,
  imports: [CdkTableModule, TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTableModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [CdkTableModule, TakCommonModule],
          exports: [TakCommonModule, EXPORTED_DECLARATIONS],
          declarations: EXPORTED_DECLARATIONS,
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to
 * flaky browser support and the value not being defined in Closure's typings.
 */
const MAX_SAFE_INTEGER = 9007199254740991;
/** Shared base class with MDC-based implementation. */
class _TakTableDataSource extends DataSource {
  constructor(initialData = []) {
    super();
    /** Stream emitting render data to the table (depends on ordered data changes). */
    this._renderData = new BehaviorSubject([]);
    /** Stream that emits when a new filter string is set on the data source. */
    this._filter = new BehaviorSubject('');
    /** Used to react to internal changes of the paginator that are made by the data source itself. */
    this._internalPageChanges = new Subject();
    /**
     * Subscription to the changes that should trigger an update to the table's rendered rows, such
     * as filtering, sorting, pagination, or base data changes.
     */
    this._renderChangesSubscription = null;
    /**
     * Data accessor function that is used for accessing data properties for sorting through
     * the default sortData function.
     * This default function assumes that the sort header IDs (which defaults to the column name)
     * matches the data's properties (e.g. column Xyz represents data['Xyz']).
     * May be set to a custom function for different behavior.
     * @param data Data object that is being accessed.
     * @param sortHeaderId The name of the column that represents the data.
     */
    this.sortingDataAccessor = (data, sortHeaderId) => {
      const value = data[sortHeaderId];
      if (_isNumberValue(value)) {
        const numberValue = Number(value);
        // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we
        // leave them as strings. For more info: https://goo.gl/y5vbSg
        return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
      }
      return value;
    };
    /**
     * Gets a sorted copy of the data array based on the state of the TakSort. Called
     * after changes are made to the filtered data or when sort changes are emitted from TakSort.
     * By default, the function retrieves the active sort and its direction and compares data
     * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
     * of data ordering.
     * @param data The array of data that should be sorted.
     * @param sort The connected TakSort that holds the current sort state.
     */
    this.sortData = (data, sort) => {
      const active = sort.active;
      const direction = sort.direction;
      if (!active || direction == '') {
        return data;
      }
      return data.sort((a, b) => {
        let valueA = this.sortingDataAccessor(a, active);
        let valueB = this.sortingDataAccessor(b, active);
        // If there are data in the column that can be converted to a number,
        // it must be ensured that the rest of the data
        // is of the same type so as not to order incorrectly.
        const valueAType = typeof valueA;
        const valueBType = typeof valueB;
        if (valueAType !== valueBType) {
          if (valueAType === 'number') {
            valueA += '';
          }
          if (valueBType === 'number') {
            valueB += '';
          }
        }
        // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
        // one value exists while the other doesn't. In this case, existing value should come last.
        // This avoids inconsistent results when comparing values to undefined/null.
        // If neither value exists, return 0 (equal).
        let comparatorResult = 0;
        if (valueA != null && valueB != null) {
          // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
          if (valueA > valueB) {
            comparatorResult = 1;
          } else if (valueA < valueB) {
            comparatorResult = -1;
          }
        } else if (valueA != null) {
          comparatorResult = 1;
        } else if (valueB != null) {
          comparatorResult = -1;
        }
        return comparatorResult * (direction == 'asc' ? 1 : -1);
      });
    };
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
    this.filterPredicate = (data, filter) => {
      // Transform the data into a lowercase string of all property values.
      const dataStr = Object.keys(data)
        .reduce((currentTerm, key) => {
          // Use an obscure Unicode character to delimit the words in the concatenated string.
          // This avoids matches where the values of two columns combined will match the user's query
          // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
          // that has a very low chance of being typed in by somebody in a text field. This one in
          // particular is "White up-pointing triangle with dot" from
          // https://en.wikipedia.org/wiki/List_of_Unicode_characters
          return currentTerm + data[key] + '◬';
        }, '')
        .toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
    };
    this._data = new BehaviorSubject(initialData);
    this._updateChangeSubscription();
  }
  /** Array of data that should be rendered by the table, where each object represents one row. */
  get data() {
    return this._data.value;
  }
  set data(data) {
    data = Array.isArray(data) ? data : [];
    this._data.next(data);
    // Normally the `filteredData` is updated by the re-render
    // subscription, but that won't happen if it's inactive.
    if (!this._renderChangesSubscription) {
      this._filterData(data);
    }
  }
  /**
   * Filter term that should be used to filter out objects from the data array. To override how
   * data objects match to this filter string, provide a custom function for filterPredicate.
   */
  get filter() {
    return this._filter.value;
  }
  set filter(filter) {
    this._filter.next(filter);
    // Normally the `filteredData` is updated by the re-render
    // subscription, but that won't happen if it's inactive.
    if (!this._renderChangesSubscription) {
      this._filterData(this.data);
    }
  }
  /**
   * Instance of the TakSort directive used by the table to control its sorting. Sort changes
   * emitted by the TakSort will trigger an update to the table's rendered data.
   */
  get sort() {
    return this._sort;
  }
  set sort(sort) {
    this._sort = sort;
    this._updateChangeSubscription();
  }
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
  get paginator() {
    return this._paginator;
  }
  set paginator(paginator) {
    this._paginator = paginator;
    this._updateChangeSubscription();
  }
  /**
   * Subscribe to changes that should trigger an update to the table's rendered rows. When the
   * changes occur, process the current state of the filter, sort, and pagination along with
   * the provided base data and send it to the table for rendering.
   */
  _updateChangeSubscription() {
    // Sorting and/or pagination should be watched if TakSort and/or TakPaginator are provided.
    // The events should emit whenever the component emits a change or initializes, or if no
    // component is provided, a stream with just a null event should be provided.
    // The `sortChange` and `pageChange` acts as a signal to the combineLatests below so that the
    // pipeline can progress to the next step. Note that the value from these streams are not used,
    // they purely act as a signal to progress in the pipeline.
    const sortChange = this._sort ? merge(this._sort.sortChange, this._sort.initialized) : of(null);
    const pageChange = this._paginator
      ? merge(this._paginator.page, this._internalPageChanges, this._paginator.initialized)
      : of(null);
    const dataStream = this._data;
    // Watch for base data or filter changes to provide a filtered set of data.
    const filteredData = combineLatest([dataStream, this._filter]).pipe(
      map(([data]) => this._filterData(data))
    );
    // Watch for filtered data or sort changes to provide an ordered set of data.
    const orderedData = combineLatest([filteredData, sortChange]).pipe(
      map(([data]) => this._orderData(data))
    );
    // Watch for ordered data or page changes to provide a paged set of data.
    const paginatedData = combineLatest([orderedData, pageChange]).pipe(
      map(([data]) => this._pageData(data))
    );
    // Watched for paged data changes and send the result to the table to render.
    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = paginatedData.subscribe(data => this._renderData.next(data));
  }
  /**
   * Returns a filtered data array where each filter object contains the filter string within
   * the result of the filterTermAccessor function. If no filter is set, returns the data array
   * as provided.
   */
  _filterData(data) {
    // If there is a filter string, filter out data that does not contain it.
    // Each data object is converted to a string using the function defined by filterTermAccessor.
    // May be overridden for customization.
    this.filteredData =
      this.filter == null || this.filter === ''
        ? data
        : data.filter(obj => this.filterPredicate(obj, this.filter));
    if (this.paginator) {
      this._updatePaginator(this.filteredData.length);
    }
    return this.filteredData;
  }
  /**
   * Returns a sorted copy of the data if TakSort has a sort applied, otherwise just returns the
   * data array as provided. Uses the default data accessor for data lookup, unless a
   * sortDataAccessor function is defined.
   */
  _orderData(data) {
    // If there is no active sort or direction, return the data without trying to sort.
    if (!this.sort) {
      return data;
    }
    return this.sortData(data.slice(), this.sort);
  }
  /**
   * Returns a paged slice of the provided data array according to the provided TakPaginator's page
   * index and length. If there is no paginator provided, returns the data array as provided.
   */
  _pageData(data) {
    if (!this.paginator) {
      return data;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }
  /**
   * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
   * index does not exceed the paginator's last page. Values are changed in a resolved promise to
   * guard against making property changes within a round of change detection.
   */
  _updatePaginator(filteredDataLength) {
    Promise.resolve().then(() => {
      const paginator = this.paginator;
      if (!paginator) {
        return;
      }
      paginator.length = filteredDataLength;
      // If the page index is set beyond the page, reduce it to the last page.
      if (paginator.pageIndex > 0) {
        const lastPageIndex = Math.ceil(paginator.length / paginator.pageSize) - 1 || 0;
        const newPageIndex = Math.min(paginator.pageIndex, lastPageIndex);
        if (newPageIndex !== paginator.pageIndex) {
          paginator.pageIndex = newPageIndex;
          // Since the paginator only emits after user-generated changes,
          // we need our own stream so we know to should re-render the data.
          this._internalPageChanges.next();
        }
      }
    });
  }
  /**
   * Used by the TakTable. Called when it connects to the data source.
   * @docs-private
   */
  connect() {
    if (!this._renderChangesSubscription) {
      this._updateChangeSubscription();
    }
    return this._renderData;
  }
  /**
   * Used by the TakTable. Called when it disconnects from the data source.
   * @docs-private
   */
  disconnect() {
    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = null;
  }
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
class TakTableDataSource extends _TakTableDataSource {}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export {
  TakCell,
  TakCellDef,
  TakColumnDef,
  TakFooterCell,
  TakFooterCellDef,
  TakFooterRow,
  TakFooterRowDef,
  TakHeaderCell,
  TakHeaderCellDef,
  TakHeaderRow,
  TakHeaderRowDef,
  TakNoDataRow,
  TakRecycleRows,
  TakRow,
  TakRowDef,
  TakTable,
  TakTableDataSource,
  TakTableModule,
  TakTextColumn,
  _TakTableDataSource,
};
//# sourceMappingURL=table.mjs.map
