import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import {
  Injectable,
  Optional,
  SkipSelf,
  InjectionToken,
  EventEmitter,
  Directive,
  Input,
  Output,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  NgModule,
} from '@angular/core';
import * as i6 from '@takkion/ng-material/core';
import { mixinDisabled, mixinInitialized, TakCommonModule } from '@takkion/ng-material/core';
import * as i3 from '@takkion/ng-material/button';
import { TakButtonModule } from '@takkion/ng-material/button';
import * as i5 from '@takkion/ng-material/select';
import { TakSelectModule } from '@takkion/ng-material/select';
import * as i7 from '@takkion/ng-material/tooltip';
import { TakTooltipModule } from '@takkion/ng-material/tooltip';
import { coerceNumberProperty, coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { Subject } from 'rxjs';
import * as i4 from '@takkion/ng-material/form-field';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * To modify the labels and text displayed, create a new instance of TakPaginatorIntl and
 * include it in a custom provider
 */
class TakPaginatorIntl {
  constructor() {
    /**
     * Stream to emit from when labels are changed. Use this to notify components when the labels have
     * changed after initialization.
     */
    this.changes = new Subject();
    /** A label for the page size selector. */
    this.itemsPerPageLabel = 'Items per page:';
    /** A label for the button that increments the current page. */
    this.nextPageLabel = 'Next page';
    /** A label for the button that decrements the current page. */
    this.previousPageLabel = 'Previous page';
    /** A label for the button that moves to the first page. */
    this.firstPageLabel = 'First page';
    /** A label for the button that moves to the last page. */
    this.lastPageLabel = 'Last page';
    /** A label for the range of items within the current page and the length of the whole list. */
    this.getRangeLabel = (page, pageSize, length) => {
      if (length == 0 || pageSize == 0) {
        return `0 of ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} of ${length}`;
    };
  }
}
TakPaginatorIntl.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginatorIntl,
  deps: [],
  target: i0.ɵɵFactoryTarget.Injectable,
});
TakPaginatorIntl.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginatorIntl,
  providedIn: 'root',
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginatorIntl,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
    },
  ],
});
/** @docs-private */
function TAK_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new TakPaginatorIntl();
}
/** @docs-private */
const TAK_PAGINATOR_INTL_PROVIDER = {
  // If there is already an TakPaginatorIntl available, use that. Otherwise, provide a new one.
  provide: TakPaginatorIntl,
  deps: [[new Optional(), new SkipSelf(), TakPaginatorIntl]],
  useFactory: TAK_PAGINATOR_INTL_PROVIDER_FACTORY,
};

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** The default page size if there is no page size and there are no provided page size options. */
const DEFAULT_PAGE_SIZE = 50;
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
class PageEvent {}
/** Injection token that can be used to provide the default options for the paginator module. */
const TAK_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken('TAK_PAGINATOR_DEFAULT_OPTIONS');
// Boilerplate for applying mixins to _TakPaginatorBase.
/** @docs-private */
const _TakPaginatorMixinBase = mixinDisabled(mixinInitialized(class {}));
/**
 * Base class with all of the `TakPaginator` functionality.
 * @docs-private
 */
class _TakPaginatorBase extends _TakPaginatorMixinBase {
  constructor(_intl, _changeDetectorRef, defaults) {
    super();
    this._intl = _intl;
    this._changeDetectorRef = _changeDetectorRef;
    this._pageIndex = 0;
    this._length = 0;
    this._pageSizeOptions = [];
    this._hidePageSize = false;
    this._showFirstLastButtons = false;
    /** Used to configure the underlying `TakSelect` inside the paginator. */
    this.selectConfig = {};
    /** Event emitted when the paginator changes the page size or page index. */
    this.page = new EventEmitter();
    this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
    if (defaults) {
      const { pageSize, pageSizeOptions, hidePageSize, showFirstLastButtons } = defaults;
      if (pageSize != null) {
        this._pageSize = pageSize;
      }
      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }
      if (hidePageSize != null) {
        this._hidePageSize = hidePageSize;
      }
      if (showFirstLastButtons != null) {
        this._showFirstLastButtons = showFirstLastButtons;
      }
    }
  }
  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value) {
    this._pageIndex = Math.max(coerceNumberProperty(value), 0);
    this._changeDetectorRef.markForCheck();
  }
  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = coerceNumberProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  /** Number of items to display on a page. By default set to 50. */
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = Math.max(coerceNumberProperty(value), 0);
    this._updateDisplayedPageSizeOptions();
  }
  /** The set of provided page size options to display to the user. */
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value) {
    this._pageSizeOptions = (value || []).map(p => coerceNumberProperty(p));
    this._updateDisplayedPageSizeOptions();
  }
  /** Whether to hide the page size selection UI from the user. */
  get hidePageSize() {
    return this._hidePageSize;
  }
  set hidePageSize(value) {
    this._hidePageSize = coerceBooleanProperty(value);
  }
  /** Whether to show the first/last buttons UI to the user. */
  get showFirstLastButtons() {
    return this._showFirstLastButtons;
  }
  set showFirstLastButtons(value) {
    this._showFirstLastButtons = coerceBooleanProperty(value);
  }
  ngOnInit() {
    this._initialized = true;
    this._updateDisplayedPageSizeOptions();
    this._markInitialized();
  }
  ngOnDestroy() {
    this._intlChanges.unsubscribe();
  }
  /** Advances to the next page if it exists. */
  nextPage() {
    if (!this.hasNextPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex + 1;
    this._emitPageEvent(previousPageIndex);
  }
  /** Move back to the previous page if it exists. */
  previousPage() {
    if (!this.hasPreviousPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex - 1;
    this._emitPageEvent(previousPageIndex);
  }
  /** Move to the first page if not already there. */
  firstPage() {
    // hasPreviousPage being false implies at the start
    if (!this.hasPreviousPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    this._emitPageEvent(previousPageIndex);
  }
  /** Move to the last page if not already there. */
  lastPage() {
    // hasNextPage being false implies at the end
    if (!this.hasNextPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.getNumberOfPages() - 1;
    this._emitPageEvent(previousPageIndex);
  }
  /** Whether there is a previous page. */
  hasPreviousPage() {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }
  /** Whether there is a next page. */
  hasNextPage() {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }
  /** Calculate the number of pages */
  getNumberOfPages() {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }
  /**
   * Changes the page size so that the first item displayed on the page will still be
   * displayed using the new page size.
   *
   * For example, if the page size is 10 and on the second page (items indexed 10-19) then
   * switching so that the page size is 5 will set the third page as the current page so
   * that the 10th item will still be displayed.
   */
  _changePageSize(pageSize) {
    // Current page needs to be updated to reflect the new page size. Navigate to the page
    // containing the previous page's first item.
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }
  /** Checks whether the buttons for going forwards should be disabled. */
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }
  /** Checks whether the buttons for going backwards should be disabled. */
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }
  /**
   * Updates the list of page size options to display to the user. Includes making sure that
   * the page size is an option and that the list is sorted.
   */
  _updateDisplayedPageSizeOptions() {
    if (!this._initialized) {
      return;
    }
    // If no page size is provided, use the first page size option or the default page size.
    if (!this.pageSize) {
      this._pageSize =
        this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
    this._displayedPageSizeOptions = this.pageSizeOptions.slice();
    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }
    // Sort the numbers using a number-specific sort function.
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }
  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  _emitPageEvent(previousPageIndex) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
  }
}
_TakPaginatorBase.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakPaginatorBase,
  deps: 'invalid',
  target: i0.ɵɵFactoryTarget.Directive,
});
_TakPaginatorBase.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: _TakPaginatorBase,
  inputs: {
    color: 'color',
    pageIndex: 'pageIndex',
    length: 'length',
    pageSize: 'pageSize',
    pageSizeOptions: 'pageSizeOptions',
    hidePageSize: 'hidePageSize',
    showFirstLastButtons: 'showFirstLastButtons',
    selectConfig: 'selectConfig',
  },
  outputs: { page: 'page' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakPaginatorBase,
  decorators: [
    {
      type: Directive,
    },
  ],
  ctorParameters: function () {
    return [{ type: TakPaginatorIntl }, { type: i0.ChangeDetectorRef }, { type: undefined }];
  },
  propDecorators: {
    color: [
      {
        type: Input,
      },
    ],
    pageIndex: [
      {
        type: Input,
      },
    ],
    length: [
      {
        type: Input,
      },
    ],
    pageSize: [
      {
        type: Input,
      },
    ],
    pageSizeOptions: [
      {
        type: Input,
      },
    ],
    hidePageSize: [
      {
        type: Input,
      },
    ],
    showFirstLastButtons: [
      {
        type: Input,
      },
    ],
    selectConfig: [
      {
        type: Input,
      },
    ],
    page: [
      {
        type: Output,
      },
    ],
  },
});
/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
class TakPaginator extends _TakPaginatorBase {
  constructor(intl, changeDetectorRef, defaults) {
    super(intl, changeDetectorRef, defaults);
    if (defaults && defaults.formFieldAppearance != null) {
      this._formFieldAppearance = defaults.formFieldAppearance;
    }
  }
}
TakPaginator.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginator,
  deps: [
    { token: TakPaginatorIntl },
    { token: i0.ChangeDetectorRef },
    { token: TAK_PAGINATOR_DEFAULT_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakPaginator.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakPaginator,
  selector: 'tak-paginator',
  inputs: { disabled: 'disabled' },
  host: { attributes: { role: 'group' }, classAttribute: 'tak-paginator' },
  exportAs: ['takPaginator'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<div class="tak-paginator-outer-container">\n  <div class="tak-paginator-container">\n    <div class="tak-paginator-page-size" *ngIf="!hidePageSize">\n      <div class="tak-paginator-page-size-label">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <tak-form-field\n        *ngIf="_displayedPageSizeOptions.length > 1"\n        [appearance]="_formFieldAppearance!"\n        [color]="color"\n        class="tak-paginator-page-size-select">\n        <tak-select\n          [value]="pageSize"\n          [disabled]="disabled"\n          [panelClass]="selectConfig.panelClass || \'\'"\n          [disableOptionCentering]="selectConfig.disableOptionCentering"\n          [aria-label]="_intl.itemsPerPageLabel"\n          (selectionChange)="_changePageSize($event.value)">\n          <tak-option *ngFor="let pageSizeOption of _displayedPageSizeOptions" [value]="pageSizeOption">\n            {{pageSizeOption}}\n          </tak-option>\n        </tak-select>\n      </tak-form-field>\n\n      <div\n        class="tak-paginator-page-size-value"\n        *ngIf="_displayedPageSizeOptions.length <= 1">{{pageSize}}</div>\n    </div>\n\n    <div class="tak-paginator-range-actions">\n      <div class="tak-paginator-range-label">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-first"\n              (click)="firstPage()"\n              [attr.aria-label]="_intl.firstPageLabel"\n              [takTooltip]="_intl.firstPageLabel"\n              [takTooltipDisabled]="_previousButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_previousButtonsDisabled()"\n              *ngIf="showFirstLastButtons">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>\n        </svg>\n      </button>\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-previous"\n              (click)="previousPage()"\n              [attr.aria-label]="_intl.previousPageLabel"\n              [takTooltip]="_intl.previousPageLabel"\n              [takTooltipDisabled]="_previousButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_previousButtonsDisabled()">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n        </svg>\n      </button>\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-next"\n              (click)="nextPage()"\n              [attr.aria-label]="_intl.nextPageLabel"\n              [takTooltip]="_intl.nextPageLabel"\n              [takTooltipDisabled]="_nextButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_nextButtonsDisabled()">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n        </svg>\n      </button>\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-last"\n              (click)="lastPage()"\n              [attr.aria-label]="_intl.lastPageLabel"\n              [takTooltip]="_intl.lastPageLabel"\n              [takTooltipDisabled]="_nextButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_nextButtonsDisabled()"\n              *ngIf="showFirstLastButtons">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n',
  styles: [
    '.tak-paginator{display:block}.tak-paginator-outer-container{display:flex}.tak-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.tak-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .tak-paginator-page-size{margin-right:0;margin-left:8px}.tak-paginator-page-size-label{margin:0 4px}.tak-paginator-page-size-select{margin:6px 4px 0 4px;width:56px}.tak-paginator-page-size-select.tak-form-field-appearance-outline{width:64px}.tak-paginator-page-size-select.tak-form-field-appearance-fill{width:64px}.tak-paginator-range-label{margin:0 32px 0 24px}.tak-paginator-range-actions{display:flex;align-items:center}.tak-paginator-icon{display:inline-block;width:28px;fill:currentColor}[dir=rtl] .tak-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .tak-paginator-icon{fill:CanvasText}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i2.NgForOf,
      selector: '[ngFor][ngForOf]',
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
    {
      kind: 'directive',
      type: i2.NgIf,
      selector: '[ngIf]',
      inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
    },
    {
      kind: 'component',
      type: i3.TakButton,
      selector:
        'button[tak-button], button[tak-raised-button], button[tak-icon-button],             button[tak-fab], button[tak-mini-fab], button[tak-stroked-button],             button[tak-flat-button]',
      inputs: ['disabled', 'disableRipple', 'color'],
      exportAs: ['takButton'],
    },
    {
      kind: 'component',
      type: i4.TakFormField,
      selector: 'tak-form-field',
      inputs: ['color', 'appearance', 'hideRequiredMarker', 'hintLabel', 'floatLabel'],
      exportAs: ['takFormField'],
    },
    {
      kind: 'component',
      type: i5.TakSelect,
      selector: 'tak-select',
      inputs: ['disabled', 'disableRipple', 'tabIndex'],
      exportAs: ['takSelect'],
    },
    { kind: 'component', type: i6.TakOption, selector: 'tak-option', exportAs: ['takOption'] },
    { kind: 'directive', type: i7.TakTooltip, selector: '[takTooltip]', exportAs: ['takTooltip'] },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginator,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-paginator',
          exportAs: 'takPaginator',
          inputs: ['disabled'],
          host: {
            class: 'tak-paginator',
            role: 'group',
          },
          changeDetection: ChangeDetectionStrategy.OnPush,
          encapsulation: ViewEncapsulation.None,
          template:
            '<div class="tak-paginator-outer-container">\n  <div class="tak-paginator-container">\n    <div class="tak-paginator-page-size" *ngIf="!hidePageSize">\n      <div class="tak-paginator-page-size-label">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <tak-form-field\n        *ngIf="_displayedPageSizeOptions.length > 1"\n        [appearance]="_formFieldAppearance!"\n        [color]="color"\n        class="tak-paginator-page-size-select">\n        <tak-select\n          [value]="pageSize"\n          [disabled]="disabled"\n          [panelClass]="selectConfig.panelClass || \'\'"\n          [disableOptionCentering]="selectConfig.disableOptionCentering"\n          [aria-label]="_intl.itemsPerPageLabel"\n          (selectionChange)="_changePageSize($event.value)">\n          <tak-option *ngFor="let pageSizeOption of _displayedPageSizeOptions" [value]="pageSizeOption">\n            {{pageSizeOption}}\n          </tak-option>\n        </tak-select>\n      </tak-form-field>\n\n      <div\n        class="tak-paginator-page-size-value"\n        *ngIf="_displayedPageSizeOptions.length <= 1">{{pageSize}}</div>\n    </div>\n\n    <div class="tak-paginator-range-actions">\n      <div class="tak-paginator-range-label">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-first"\n              (click)="firstPage()"\n              [attr.aria-label]="_intl.firstPageLabel"\n              [takTooltip]="_intl.firstPageLabel"\n              [takTooltipDisabled]="_previousButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_previousButtonsDisabled()"\n              *ngIf="showFirstLastButtons">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>\n        </svg>\n      </button>\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-previous"\n              (click)="previousPage()"\n              [attr.aria-label]="_intl.previousPageLabel"\n              [takTooltip]="_intl.previousPageLabel"\n              [takTooltipDisabled]="_previousButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_previousButtonsDisabled()">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n        </svg>\n      </button>\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-next"\n              (click)="nextPage()"\n              [attr.aria-label]="_intl.nextPageLabel"\n              [takTooltip]="_intl.nextPageLabel"\n              [takTooltipDisabled]="_nextButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_nextButtonsDisabled()">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n        </svg>\n      </button>\n      <button tak-icon-button type="button"\n              class="tak-paginator-navigation-last"\n              (click)="lastPage()"\n              [attr.aria-label]="_intl.lastPageLabel"\n              [takTooltip]="_intl.lastPageLabel"\n              [takTooltipDisabled]="_nextButtonsDisabled()"\n              [takTooltipPosition]="\'above\'"\n              [disabled]="_nextButtonsDisabled()"\n              *ngIf="showFirstLastButtons">\n        <svg class="tak-paginator-icon" viewBox="0 0 24 24" focusable="false">\n          <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n',
          styles: [
            '.tak-paginator{display:block}.tak-paginator-outer-container{display:flex}.tak-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.tak-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .tak-paginator-page-size{margin-right:0;margin-left:8px}.tak-paginator-page-size-label{margin:0 4px}.tak-paginator-page-size-select{margin:6px 4px 0 4px;width:56px}.tak-paginator-page-size-select.tak-form-field-appearance-outline{width:64px}.tak-paginator-page-size-select.tak-form-field-appearance-fill{width:64px}.tak-paginator-range-label{margin:0 32px 0 24px}.tak-paginator-range-actions{display:flex;align-items:center}.tak-paginator-icon{display:inline-block;width:28px;fill:currentColor}[dir=rtl] .tak-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .tak-paginator-icon{fill:CanvasText}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: TakPaginatorIntl },
      { type: i0.ChangeDetectorRef },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_PAGINATOR_DEFAULT_OPTIONS],
          },
        ],
      },
    ];
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakPaginatorModule {}
TakPaginatorModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginatorModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakPaginatorModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginatorModule,
  declarations: [TakPaginator],
  imports: [CommonModule, TakButtonModule, TakSelectModule, TakTooltipModule, TakCommonModule],
  exports: [TakPaginator],
});
TakPaginatorModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginatorModule,
  providers: [TAK_PAGINATOR_INTL_PROVIDER],
  imports: [CommonModule, TakButtonModule, TakSelectModule, TakTooltipModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPaginatorModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [
            CommonModule,
            TakButtonModule,
            TakSelectModule,
            TakTooltipModule,
            TakCommonModule,
          ],
          exports: [TakPaginator],
          declarations: [TakPaginator],
          providers: [TAK_PAGINATOR_INTL_PROVIDER],
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
  TAK_PAGINATOR_DEFAULT_OPTIONS,
  TAK_PAGINATOR_INTL_PROVIDER,
  TAK_PAGINATOR_INTL_PROVIDER_FACTORY,
  TakPaginator,
  TakPaginatorIntl,
  TakPaginatorModule,
  PageEvent,
  _TakPaginatorBase,
};
//# sourceMappingURL=paginator.mjs.map
