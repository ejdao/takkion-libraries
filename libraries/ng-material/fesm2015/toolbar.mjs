import * as i0 from '@angular/core';
import {
  Directive,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  ContentChildren,
  NgModule,
} from '@angular/core';
import { mixinColor, TakCommonModule } from '@takkion/ng-material/core';
import { DOCUMENT } from '@angular/common';
import * as i1 from '@takkion/ng-cdk/platform';

// Boilerplate for applying mixins to TakToolbar.
/** @docs-private */
const _TakToolbarBase = mixinColor(
  class {
    constructor(_elementRef) {
      this._elementRef = _elementRef;
    }
  }
);
class TakToolbarRow {}
TakToolbarRow.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbarRow,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakToolbarRow.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakToolbarRow,
  selector: 'tak-toolbar-row',
  host: { classAttribute: 'tak-toolbar-row' },
  exportAs: ['takToolbarRow'],
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbarRow,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-toolbar-row',
          exportAs: 'takToolbarRow',
          host: { class: 'tak-toolbar-row' },
        },
      ],
    },
  ],
});
class TakToolbar extends _TakToolbarBase {
  constructor(elementRef, _platform, document) {
    super(elementRef);
    this._platform = _platform;
    // TODO: make the document a required param when doing breaking changes.
    this._document = document;
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      // Check if there are any other DOM nodes that can display content but aren't inside of
      // a <tak-toolbar-row> element.
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes)
        .filter(node => !(node.classList && node.classList.contains('tak-toolbar-row')))
        .filter(node => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8))
        .some(node => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
}
TakToolbar.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbar,
  deps: [{ token: i0.ElementRef }, { token: i1.Platform }, { token: DOCUMENT }],
  target: i0.ɵɵFactoryTarget.Component,
});
TakToolbar.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakToolbar,
  selector: 'tak-toolbar',
  inputs: { color: 'color' },
  host: {
    properties: {
      'class.tak-toolbar-multiple-rows': '_toolbarRows.length > 0',
      'class.tak-toolbar-single-row': '_toolbarRows.length === 0',
    },
    classAttribute: 'tak-toolbar',
  },
  queries: [{ propertyName: '_toolbarRows', predicate: TakToolbarRow, descendants: true }],
  exportAs: ['takToolbar'],
  usesInheritance: true,
  ngImport: i0,
  template: '<ng-content></ng-content>\n<ng-content select="tak-toolbar-row"></ng-content>\n',
  styles: [
    '.cdk-high-contrast-active .tak-toolbar{outline:solid 1px}.tak-toolbar-row,.tak-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.tak-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbar,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-toolbar',
          exportAs: 'takToolbar',
          inputs: ['color'],
          host: {
            class: 'tak-toolbar',
            '[class.tak-toolbar-multiple-rows]': '_toolbarRows.length > 0',
            '[class.tak-toolbar-single-row]': '_toolbarRows.length === 0',
          },
          changeDetection: ChangeDetectionStrategy.OnPush,
          encapsulation: ViewEncapsulation.None,
          template:
            '<ng-content></ng-content>\n<ng-content select="tak-toolbar-row"></ng-content>\n',
          styles: [
            '.cdk-high-contrast-active .tak-toolbar{outline:solid 1px}.tak-toolbar-row,.tak-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.tak-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i1.Platform },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [DOCUMENT],
          },
        ],
      },
    ];
  },
  propDecorators: {
    _toolbarRows: [
      {
        type: ContentChildren,
        args: [TakToolbarRow, { descendants: true }],
      },
    ],
  },
});
/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
function throwToolbarMixedModesError() {
  throw Error(
    'TakToolbar: Attempting to combine different toolbar modes. ' +
      'Either specify multiple `<tak-toolbar-row>` elements explicitly or just place content ' +
      'inside of a `<tak-toolbar>` for a single row.'
  );
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakToolbarModule {}
TakToolbarModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbarModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakToolbarModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbarModule,
  declarations: [TakToolbar, TakToolbarRow],
  imports: [TakCommonModule],
  exports: [TakToolbar, TakToolbarRow, TakCommonModule],
});
TakToolbarModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbarModule,
  imports: [TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakToolbarModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakCommonModule],
          exports: [TakToolbar, TakToolbarRow, TakCommonModule],
          declarations: [TakToolbar, TakToolbarRow],
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

export { TakToolbar, TakToolbarModule, TakToolbarRow, throwToolbarMixedModesError };
//# sourceMappingURL=toolbar.mjs.map
