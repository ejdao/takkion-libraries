import * as i0 from '@angular/core';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  NgModule,
} from '@angular/core';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { TakCommonModule } from '@takkion/ng-material/core';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakDivider {
  constructor() {
    this._vertical = false;
    this._inset = false;
  }
  /** Whether the divider is vertically aligned. */
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  /** Whether the divider is an inset divider. */
  get inset() {
    return this._inset;
  }
  set inset(value) {
    this._inset = coerceBooleanProperty(value);
  }
}
TakDivider.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakDivider,
  deps: [],
  target: i0.ɵɵFactoryTarget.Component,
});
TakDivider.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakDivider,
  selector: 'tak-divider',
  inputs: { vertical: 'vertical', inset: 'inset' },
  host: {
    attributes: { role: 'separator' },
    properties: {
      'attr.aria-orientation': 'vertical ? "vertical" : "horizontal"',
      'class.tak-divider-vertical': 'vertical',
      'class.tak-divider-horizontal': '!vertical',
      'class.tak-divider-inset': 'inset',
    },
    classAttribute: 'tak-divider',
  },
  ngImport: i0,
  template: '',
  isInline: true,
  styles: [
    '.tak-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.tak-divider.tak-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.tak-divider.tak-divider-inset{margin-left:80px}[dir=rtl] .tak-divider.tak-divider-inset{margin-left:auto;margin-right:80px}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakDivider,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-divider',
          host: {
            role: 'separator',
            '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
            '[class.tak-divider-vertical]': 'vertical',
            '[class.tak-divider-horizontal]': '!vertical',
            '[class.tak-divider-inset]': 'inset',
            class: 'tak-divider',
          },
          template: '',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          styles: [
            '.tak-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.tak-divider.tak-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.tak-divider.tak-divider-inset{margin-left:80px}[dir=rtl] .tak-divider.tak-divider-inset{margin-left:auto;margin-right:80px}',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    vertical: [
      {
        type: Input,
      },
    ],
    inset: [
      {
        type: Input,
      },
    ],
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakDividerModule {}
TakDividerModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakDividerModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakDividerModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakDividerModule,
  declarations: [TakDivider],
  imports: [TakCommonModule],
  exports: [TakDivider, TakCommonModule],
});
TakDividerModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakDividerModule,
  imports: [TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakDividerModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakCommonModule],
          exports: [TakDivider, TakCommonModule],
          declarations: [TakDivider],
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

export { TakDivider, TakDividerModule };
//# sourceMappingURL=divider.mjs.map
