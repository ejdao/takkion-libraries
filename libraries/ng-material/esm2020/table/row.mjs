/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  CDK_ROW_TEMPLATE,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
  CdkNoDataRow,
} from '@takkion/ng-cdk/table';
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@takkion/ng-cdk/table';
/**
 * Header row definition for the tak-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
export class TakHeaderRowDef extends CdkHeaderRowDef {}
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
export class TakFooterRowDef extends CdkFooterRowDef {}
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
export class TakRowDef extends CdkRowDef {}
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
export class TakHeaderRow extends CdkHeaderRow {}
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
export class TakFooterRow extends CdkFooterRow {}
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
export class TakRow extends CdkRow {}
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
export class TakNoDataRow extends CdkNoDataRow {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3RhYmxlL3Jvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFFL0Y7OztHQUdHO0FBTUgsTUFBTSxPQUFPLGVBQWdCLFNBQVEsZUFBZTs7NEdBQXZDLGVBQWU7Z0dBQWYsZUFBZSw4SUFIZixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7MkZBRzFELGVBQWU7a0JBTDNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsaUJBQWlCLEVBQUMsQ0FBQztvQkFDckUsTUFBTSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsK0JBQStCLENBQUM7aUJBQ3RFOztBQUdEOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxlQUFnQixTQUFRLGVBQWU7OzRHQUF2QyxlQUFlO2dHQUFmLGVBQWUsOElBSGYsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxDQUFDOzJGQUcxRCxlQUFlO2tCQUwzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLGlCQUFpQixFQUFDLENBQUM7b0JBQ3JFLE1BQU0s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RyxpQkFBaUIsQ0FBQztLQUNoRDs7eUdBRlksWUFBWTs2RkFBWixZQUFZLG9EQUZaLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQzsyRkFFcEQsWUFBWTtrQkFKeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxjQUFjLEVBQUMsQ0FBQztpQkFDaEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ0RLX1JPV19URU1QTEFURSxcbiAgQ2RrRm9vdGVyUm93LFxuICBDZGtGb290ZXJSb3dEZWYsXG4gIENka0hlYWRlclJvdyxcbiAgQ2RrSGVhZGVyUm93RGVmLFxuICBDZGtSb3csXG4gIENka1Jvd0RlZixcbiAgQ2RrTm9EYXRhUm93LFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBIZWFkZXIgcm93IGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgaGVhZGVyIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBoZWFkZXIgcHJvcGVydGllcyBzdWNoIGFzIHRoZSBjb2x1bW5zIHRvIGRpc3BsYXkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRIZWFkZXJSb3dEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0hlYWRlclJvd0RlZiwgdXNlRXhpc3Rpbmc6IE1hdEhlYWRlclJvd0RlZn1dLFxuICBpbnB1dHM6IFsnY29sdW1uczogbWF0SGVhZGVyUm93RGVmJywgJ3N0aWNreTogbWF0SGVhZGVyUm93RGVmU3RpY2t5J10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlclJvd0RlZiBleHRlbmRzIENka0hlYWRlclJvd0RlZiB7fVxuXG4vKipcbiAqIEZvb3RlciByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBmb290ZXIgcm93J3MgdGVtcGxhdGUgYW5kIG90aGVyIGZvb3RlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEZvb3RlclJvd0RlZl0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrRm9vdGVyUm93RGVmLCB1c2VFeGlzdGluZzogTWF0Rm9vdGVyUm93RGVmfV0sXG4gIGlucHV0czogWydjb2x1bW5zOiBtYXRGb290ZXJSb3dEZWYnLCAnc3RpY2t5OiBtYXRGb290ZXJSb3dEZWZTdGlja3knXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyUm93RGVmIGV4dGVuZHMgQ2RrRm9vdGVyUm93RGVmIHt9XG5cbi8qKlxuICogRGF0YSByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBkYXRhIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheSBhbmRcbiAqIGEgd2hlbiBwcmVkaWNhdGUgdGhhdCBkZXNjcmliZXMgd2hlbiB0aGlzIHJvdyBzaG91bGQgYmUgdXNlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFJvd0RlZl0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrUm93RGVmLCB1c2VFeGlzdGluZzogTWF0Um93RGVmfV0sXG4gIGlucHV0czogWydjb2x1bW5zOiBtYXRSb3dEZWZDb2x1bW5zJywgJ3doZW46IG1hdFJvd0RlZldoZW4nXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Um93RGVmPFQ+IGV4dGVuZHMgQ2RrUm93RGVmPFQ+IHt9XG5cbi8qKiBIZWFkZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1oZWFkZXItcm93LCB0clttYXQtaGVhZGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtaGVhZGVyLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdEhlYWRlclJvdycsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtIZWFkZXJSb3csIHVzZUV4aXN0aW5nOiBNYXRIZWFkZXJSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyUm93IGV4dGVuZHMgQ2RrSGVhZGVyUm93IHt9XG5cbi8qKiBGb290ZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1mb290ZXItcm93LCB0clttYXQtZm9vdGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZm9vdGVyLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdEZvb3RlclJvdycsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtGb290ZXJSb3csIHVzZUV4aXN0aW5nOiBNYXRGb290ZXJSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyUm93IGV4dGVuZHMgQ2RrRm9vdGVyUm93IHt9XG5cbi8qKiBEYXRhIHJvdyB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBjb250YWlucyB0aGUgY2VsbCBvdXRsZXQuIEFkZHMgdGhlIHJpZ2h0IGNsYXNzIGFuZCByb2xlLiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXJvdywgdHJbbWF0LXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtcm93JyxcbiAgICAncm9sZSc6ICdyb3cnLFxuICB9LFxuICAvLyBTZWUgbm90ZSBvbiBDZGtUYWJsZSBmb3IgZXhwbGFuYXRpb24gb24gd2h5IHRoaXMgdXNlcyB0aGUgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0Um93JyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1JvdywgdXNlRXhpc3Rpbmc6IE1hdFJvd31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSb3cgZXh0ZW5kcyBDZGtSb3cge31cblxuLyoqIFJvdyB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gbm8gZGF0YSBpcyBzaG93biBpbiB0aGUgdGFibGUuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttYXROb0RhdGFSb3ddJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka05vRGF0YVJvdywgdXNlRXhpc3Rpbmc6IE1hdE5vRGF0YVJvd31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXROb0RhdGFSb3cgZXh0ZW5kcyBDZGtOb0RhdGFSb3cge1xuICBvdmVycmlkZSBfY29udGVudENsYXNzTmFtZSA9ICdtYXQtbm8tZGF0YS1yb3cnO1xufVxuIl19
