import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import {
  InjectionToken,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Directive,
  Optional,
  Inject,
  ContentChildren,
  ContentChild,
  Input,
  forwardRef,
  EventEmitter,
  Output,
  ViewChild,
  NgModule,
} from '@angular/core';
import * as i1 from '@takkion/ng-material/core';
import {
  mixinDisabled,
  mixinDisableRipple,
  setLines,
  TakLine,
  TakLineModule,
  TakRippleModule,
  TakCommonModule,
  TakPseudoCheckboxModule,
} from '@takkion/ng-material/core';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';
import * as i3 from '@takkion/ng-cdk/a11y';
import { FocusKeyManager } from '@takkion/ng-cdk/a11y';
import { SelectionModel } from '@takkion/ng-cdk/collections';
import { hasModifierKey, A, ENTER, SPACE, UP_ARROW, DOWN_ARROW } from '@takkion/ng-cdk/keycodes';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TakDividerModule } from '@takkion/ng-material/divider';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Boilerplate for applying mixins to TakList.
/** @docs-private */
const _TakListBase = mixinDisabled(mixinDisableRipple(class {}));
// Boilerplate for applying mixins to TakListItem.
/** @docs-private */
const _TakListItemMixinBase = mixinDisableRipple(class {});
/**
 * Injection token that can be used to inject instances of `TakList`. It serves as
 * alternative token to the actual `TakList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const TAK_LIST = new InjectionToken('TakList');
/**
 * Injection token that can be used to inject instances of `TakNavList`. It serves as
 * alternative token to the actual `TakNavList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const TAK_NAV_LIST = new InjectionToken('TakNavList');
class TakNavList extends _TakListBase {
  constructor() {
    super(...arguments);
    /** Emits when the state of the list changes. */
    this._stateChanges = new Subject();
  }
  ngOnChanges() {
    this._stateChanges.next();
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
}
TakNavList.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNavList,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakNavList.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakNavList,
  selector: 'tak-nav-list',
  inputs: { disableRipple: 'disableRipple', disabled: 'disabled' },
  host: { attributes: { role: 'navigation' }, classAttribute: 'tak-nav-list tak-list-base' },
  providers: [{ provide: TAK_NAV_LIST, useExisting: TakNavList }],
  exportAs: ['takNavList'],
  usesInheritance: true,
  usesOnChanges: true,
  ngImport: i0,
  template: '<ng-content></ng-content>\n\n',
  styles: [
    '.tak-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.tak-list-base .tak-subheader{margin:0}button.tak-list-item,button.tak-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.tak-list-item,[dir=rtl] button.tak-list-option{text-align:right}button.tak-list-item::-moz-focus-inner,button.tak-list-option::-moz-focus-inner{border:0}.tak-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-list-base .tak-subheader{height:48px;line-height:16px}.tak-list-base .tak-subheader:first-child{margin-top:-8px}.tak-list-base .tak-list-item,.tak-list-base .tak-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base .tak-list-item .tak-list-item-content,.tak-list-base .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base .tak-list-item .tak-list-item-content-reverse,.tak-list-base .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base .tak-list-item .tak-list-item-ripple,.tak-list-base .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar,.tak-list-base .tak-list-option.tak-list-item-with-avatar{height:56px}.tak-list-base .tak-list-item.tak-2-line,.tak-list-base .tak-list-option.tak-2-line{height:72px}.tak-list-base .tak-list-item.tak-3-line,.tak-list-base .tak-list-option.tak-3-line{height:88px}.tak-list-base .tak-list-item.tak-multi-line,.tak-list-base .tak-list-option.tak-multi-line{height:auto}.tak-list-base .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base .tak-list-item .tak-list-text,.tak-list-base .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base .tak-list-item .tak-list-text>*,.tak-list-base .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base .tak-list-item .tak-list-text:empty,.tak-list-base .tak-list-option .tak-list-text:empty{display:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base .tak-list-item .tak-list-avatar,.tak-list-base .tak-list-option .tak-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:72px}.tak-list-base .tak-list-item .tak-list-icon,.tak-list-base .tak-list-option .tak-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:64px}.tak-list-base .tak-list-item .tak-divider,.tak-list-base .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base .tak-list-item .tak-divider,[dir=rtl] .tak-list-base .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-list-base[dense]{padding-top:4px;display:block}.tak-list-base[dense] .tak-subheader{height:40px;line-height:8px}.tak-list-base[dense] .tak-subheader:first-child{margin-top:-4px}.tak-list-base[dense] .tak-list-item,.tak-list-base[dense] .tak-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-item-content,.tak-list-base[dense] .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base[dense] .tak-list-item .tak-list-item-content-reverse,.tak-list-base[dense] .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base[dense] .tak-list-item .tak-list-item-ripple,.tak-list-base[dense] .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar{height:48px}.tak-list-base[dense] .tak-list-item.tak-2-line,.tak-list-base[dense] .tak-list-option.tak-2-line{height:60px}.tak-list-base[dense] .tak-list-item.tak-3-line,.tak-list-base[dense] .tak-list-option.tak-3-line{height:76px}.tak-list-base[dense] .tak-list-item.tak-multi-line,.tak-list-base[dense] .tak-list-option.tak-multi-line{height:auto}.tak-list-base[dense] .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base[dense] .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base[dense] .tak-list-item .tak-list-text,.tak-list-base[dense] .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-text>*,.tak-list-base[dense] .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base[dense] .tak-list-item .tak-list-text:empty,.tak-list-base[dense] .tak-list-option .tak-list-text:empty{display:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base[dense] .tak-list-item .tak-list-avatar,.tak-list-base[dense] .tak-list-option .tak-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:68px}.tak-list-base[dense] .tak-list-item .tak-list-icon,.tak-list-base[dense] .tak-list-option .tak-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:60px}.tak-list-base[dense] .tak-list-item .tak-divider,.tak-list-base[dense] .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-divider,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base[dense] .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-nav-list a{text-decoration:none;color:inherit}.tak-nav-list .tak-list-item{cursor:pointer;outline:none}tak-action-list .tak-list-item{cursor:pointer;outline:inherit}.tak-list-option:not(.tak-list-item-disabled){cursor:pointer;outline:none}.tak-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active .tak-list-option:hover,.cdk-high-contrast-active .tak-nav-list .tak-list-item:hover,.cdk-high-contrast-active tak-action-list .tak-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .tak-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .tak-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.tak-list-option:not(.tak-list-single-selected-option):not(.tak-list-item-disabled):hover,.tak-nav-list .tak-list-item:not(.tak-list-item-disabled):hover,.tak-action-list .tak-list-item:not(.tak-list-item-disabled):hover{background:none}}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNavList,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-nav-list',
          exportAs: 'takNavList',
          host: {
            role: 'navigation',
            class: 'tak-nav-list tak-list-base',
          },
          inputs: ['disableRipple', 'disabled'],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          providers: [{ provide: TAK_NAV_LIST, useExisting: TakNavList }],
          template: '<ng-content></ng-content>\n\n',
          styles: [
            '.tak-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.tak-list-base .tak-subheader{margin:0}button.tak-list-item,button.tak-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.tak-list-item,[dir=rtl] button.tak-list-option{text-align:right}button.tak-list-item::-moz-focus-inner,button.tak-list-option::-moz-focus-inner{border:0}.tak-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-list-base .tak-subheader{height:48px;line-height:16px}.tak-list-base .tak-subheader:first-child{margin-top:-8px}.tak-list-base .tak-list-item,.tak-list-base .tak-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base .tak-list-item .tak-list-item-content,.tak-list-base .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base .tak-list-item .tak-list-item-content-reverse,.tak-list-base .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base .tak-list-item .tak-list-item-ripple,.tak-list-base .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar,.tak-list-base .tak-list-option.tak-list-item-with-avatar{height:56px}.tak-list-base .tak-list-item.tak-2-line,.tak-list-base .tak-list-option.tak-2-line{height:72px}.tak-list-base .tak-list-item.tak-3-line,.tak-list-base .tak-list-option.tak-3-line{height:88px}.tak-list-base .tak-list-item.tak-multi-line,.tak-list-base .tak-list-option.tak-multi-line{height:auto}.tak-list-base .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base .tak-list-item .tak-list-text,.tak-list-base .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base .tak-list-item .tak-list-text>*,.tak-list-base .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base .tak-list-item .tak-list-text:empty,.tak-list-base .tak-list-option .tak-list-text:empty{display:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base .tak-list-item .tak-list-avatar,.tak-list-base .tak-list-option .tak-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:72px}.tak-list-base .tak-list-item .tak-list-icon,.tak-list-base .tak-list-option .tak-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:64px}.tak-list-base .tak-list-item .tak-divider,.tak-list-base .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base .tak-list-item .tak-divider,[dir=rtl] .tak-list-base .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-list-base[dense]{padding-top:4px;display:block}.tak-list-base[dense] .tak-subheader{height:40px;line-height:8px}.tak-list-base[dense] .tak-subheader:first-child{margin-top:-4px}.tak-list-base[dense] .tak-list-item,.tak-list-base[dense] .tak-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-item-content,.tak-list-base[dense] .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base[dense] .tak-list-item .tak-list-item-content-reverse,.tak-list-base[dense] .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base[dense] .tak-list-item .tak-list-item-ripple,.tak-list-base[dense] .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar{height:48px}.tak-list-base[dense] .tak-list-item.tak-2-line,.tak-list-base[dense] .tak-list-option.tak-2-line{height:60px}.tak-list-base[dense] .tak-list-item.tak-3-line,.tak-list-base[dense] .tak-list-option.tak-3-line{height:76px}.tak-list-base[dense] .tak-list-item.tak-multi-line,.tak-list-base[dense] .tak-list-option.tak-multi-line{height:auto}.tak-list-base[dense] .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base[dense] .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base[dense] .tak-list-item .tak-list-text,.tak-list-base[dense] .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-text>*,.tak-list-base[dense] .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base[dense] .tak-list-item .tak-list-text:empty,.tak-list-base[dense] .tak-list-option .tak-list-text:empty{display:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base[dense] .tak-list-item .tak-list-avatar,.tak-list-base[dense] .tak-list-option .tak-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:68px}.tak-list-base[dense] .tak-list-item .tak-list-icon,.tak-list-base[dense] .tak-list-option .tak-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:60px}.tak-list-base[dense] .tak-list-item .tak-divider,.tak-list-base[dense] .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-divider,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base[dense] .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-nav-list a{text-decoration:none;color:inherit}.tak-nav-list .tak-list-item{cursor:pointer;outline:none}tak-action-list .tak-list-item{cursor:pointer;outline:inherit}.tak-list-option:not(.tak-list-item-disabled){cursor:pointer;outline:none}.tak-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active .tak-list-option:hover,.cdk-high-contrast-active .tak-nav-list .tak-list-item:hover,.cdk-high-contrast-active tak-action-list .tak-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .tak-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .tak-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.tak-list-option:not(.tak-list-single-selected-option):not(.tak-list-item-disabled):hover,.tak-nav-list .tak-list-item:not(.tak-list-item-disabled):hover,.tak-action-list .tak-list-item:not(.tak-list-item-disabled):hover{background:none}}',
          ],
        },
      ],
    },
  ],
});
class TakList extends _TakListBase {
  constructor(_elementRef) {
    super();
    this._elementRef = _elementRef;
    /** Emits when the state of the list changes. */
    this._stateChanges = new Subject();
    if (this._getListType() === 'action-list') {
      _elementRef.nativeElement.classList.add('tak-action-list');
      _elementRef.nativeElement.setAttribute('role', 'group');
    }
  }
  _getListType() {
    const nodeName = this._elementRef.nativeElement.nodeName.toLowerCase();
    if (nodeName === 'tak-list') {
      return 'list';
    }
    if (nodeName === 'tak-action-list') {
      return 'action-list';
    }
    return null;
  }
  ngOnChanges() {
    this._stateChanges.next();
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
}
TakList.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakList,
  deps: [{ token: i0.ElementRef }],
  target: i0.ɵɵFactoryTarget.Component,
});
TakList.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakList,
  selector: 'tak-list, tak-action-list',
  inputs: { disableRipple: 'disableRipple', disabled: 'disabled' },
  host: { classAttribute: 'tak-list tak-list-base' },
  providers: [{ provide: TAK_LIST, useExisting: TakList }],
  exportAs: ['takList'],
  usesInheritance: true,
  usesOnChanges: true,
  ngImport: i0,
  template: '<ng-content></ng-content>\n\n',
  styles: [
    '.tak-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.tak-list-base .tak-subheader{margin:0}button.tak-list-item,button.tak-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.tak-list-item,[dir=rtl] button.tak-list-option{text-align:right}button.tak-list-item::-moz-focus-inner,button.tak-list-option::-moz-focus-inner{border:0}.tak-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-list-base .tak-subheader{height:48px;line-height:16px}.tak-list-base .tak-subheader:first-child{margin-top:-8px}.tak-list-base .tak-list-item,.tak-list-base .tak-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base .tak-list-item .tak-list-item-content,.tak-list-base .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base .tak-list-item .tak-list-item-content-reverse,.tak-list-base .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base .tak-list-item .tak-list-item-ripple,.tak-list-base .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar,.tak-list-base .tak-list-option.tak-list-item-with-avatar{height:56px}.tak-list-base .tak-list-item.tak-2-line,.tak-list-base .tak-list-option.tak-2-line{height:72px}.tak-list-base .tak-list-item.tak-3-line,.tak-list-base .tak-list-option.tak-3-line{height:88px}.tak-list-base .tak-list-item.tak-multi-line,.tak-list-base .tak-list-option.tak-multi-line{height:auto}.tak-list-base .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base .tak-list-item .tak-list-text,.tak-list-base .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base .tak-list-item .tak-list-text>*,.tak-list-base .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base .tak-list-item .tak-list-text:empty,.tak-list-base .tak-list-option .tak-list-text:empty{display:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base .tak-list-item .tak-list-avatar,.tak-list-base .tak-list-option .tak-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:72px}.tak-list-base .tak-list-item .tak-list-icon,.tak-list-base .tak-list-option .tak-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:64px}.tak-list-base .tak-list-item .tak-divider,.tak-list-base .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base .tak-list-item .tak-divider,[dir=rtl] .tak-list-base .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-list-base[dense]{padding-top:4px;display:block}.tak-list-base[dense] .tak-subheader{height:40px;line-height:8px}.tak-list-base[dense] .tak-subheader:first-child{margin-top:-4px}.tak-list-base[dense] .tak-list-item,.tak-list-base[dense] .tak-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-item-content,.tak-list-base[dense] .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base[dense] .tak-list-item .tak-list-item-content-reverse,.tak-list-base[dense] .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base[dense] .tak-list-item .tak-list-item-ripple,.tak-list-base[dense] .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar{height:48px}.tak-list-base[dense] .tak-list-item.tak-2-line,.tak-list-base[dense] .tak-list-option.tak-2-line{height:60px}.tak-list-base[dense] .tak-list-item.tak-3-line,.tak-list-base[dense] .tak-list-option.tak-3-line{height:76px}.tak-list-base[dense] .tak-list-item.tak-multi-line,.tak-list-base[dense] .tak-list-option.tak-multi-line{height:auto}.tak-list-base[dense] .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base[dense] .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base[dense] .tak-list-item .tak-list-text,.tak-list-base[dense] .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-text>*,.tak-list-base[dense] .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base[dense] .tak-list-item .tak-list-text:empty,.tak-list-base[dense] .tak-list-option .tak-list-text:empty{display:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base[dense] .tak-list-item .tak-list-avatar,.tak-list-base[dense] .tak-list-option .tak-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:68px}.tak-list-base[dense] .tak-list-item .tak-list-icon,.tak-list-base[dense] .tak-list-option .tak-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:60px}.tak-list-base[dense] .tak-list-item .tak-divider,.tak-list-base[dense] .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-divider,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base[dense] .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-nav-list a{text-decoration:none;color:inherit}.tak-nav-list .tak-list-item{cursor:pointer;outline:none}tak-action-list .tak-list-item{cursor:pointer;outline:inherit}.tak-list-option:not(.tak-list-item-disabled){cursor:pointer;outline:none}.tak-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active .tak-list-option:hover,.cdk-high-contrast-active .tak-nav-list .tak-list-item:hover,.cdk-high-contrast-active tak-action-list .tak-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .tak-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .tak-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.tak-list-option:not(.tak-list-single-selected-option):not(.tak-list-item-disabled):hover,.tak-nav-list .tak-list-item:not(.tak-list-item-disabled):hover,.tak-action-list .tak-list-item:not(.tak-list-item-disabled):hover{background:none}}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakList,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-list, tak-action-list',
          exportAs: 'takList',
          host: {
            class: 'tak-list tak-list-base',
          },
          inputs: ['disableRipple', 'disabled'],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          providers: [{ provide: TAK_LIST, useExisting: TakList }],
          template: '<ng-content></ng-content>\n\n',
          styles: [
            '.tak-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.tak-list-base .tak-subheader{margin:0}button.tak-list-item,button.tak-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.tak-list-item,[dir=rtl] button.tak-list-option{text-align:right}button.tak-list-item::-moz-focus-inner,button.tak-list-option::-moz-focus-inner{border:0}.tak-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-list-base .tak-subheader{height:48px;line-height:16px}.tak-list-base .tak-subheader:first-child{margin-top:-8px}.tak-list-base .tak-list-item,.tak-list-base .tak-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base .tak-list-item .tak-list-item-content,.tak-list-base .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base .tak-list-item .tak-list-item-content-reverse,.tak-list-base .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base .tak-list-item .tak-list-item-ripple,.tak-list-base .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar,.tak-list-base .tak-list-option.tak-list-item-with-avatar{height:56px}.tak-list-base .tak-list-item.tak-2-line,.tak-list-base .tak-list-option.tak-2-line{height:72px}.tak-list-base .tak-list-item.tak-3-line,.tak-list-base .tak-list-option.tak-3-line{height:88px}.tak-list-base .tak-list-item.tak-multi-line,.tak-list-base .tak-list-option.tak-multi-line{height:auto}.tak-list-base .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base .tak-list-item .tak-list-text,.tak-list-base .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base .tak-list-item .tak-list-text>*,.tak-list-base .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base .tak-list-item .tak-list-text:empty,.tak-list-base .tak-list-option .tak-list-text:empty{display:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base .tak-list-item .tak-list-avatar,.tak-list-base .tak-list-option .tak-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:72px}.tak-list-base .tak-list-item .tak-list-icon,.tak-list-base .tak-list-option .tak-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:64px}.tak-list-base .tak-list-item .tak-divider,.tak-list-base .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base .tak-list-item .tak-divider,[dir=rtl] .tak-list-base .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-list-base[dense]{padding-top:4px;display:block}.tak-list-base[dense] .tak-subheader{height:40px;line-height:8px}.tak-list-base[dense] .tak-subheader:first-child{margin-top:-4px}.tak-list-base[dense] .tak-list-item,.tak-list-base[dense] .tak-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-item-content,.tak-list-base[dense] .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base[dense] .tak-list-item .tak-list-item-content-reverse,.tak-list-base[dense] .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base[dense] .tak-list-item .tak-list-item-ripple,.tak-list-base[dense] .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar{height:48px}.tak-list-base[dense] .tak-list-item.tak-2-line,.tak-list-base[dense] .tak-list-option.tak-2-line{height:60px}.tak-list-base[dense] .tak-list-item.tak-3-line,.tak-list-base[dense] .tak-list-option.tak-3-line{height:76px}.tak-list-base[dense] .tak-list-item.tak-multi-line,.tak-list-base[dense] .tak-list-option.tak-multi-line{height:auto}.tak-list-base[dense] .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base[dense] .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base[dense] .tak-list-item .tak-list-text,.tak-list-base[dense] .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-text>*,.tak-list-base[dense] .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base[dense] .tak-list-item .tak-list-text:empty,.tak-list-base[dense] .tak-list-option .tak-list-text:empty{display:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base[dense] .tak-list-item .tak-list-avatar,.tak-list-base[dense] .tak-list-option .tak-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:68px}.tak-list-base[dense] .tak-list-item .tak-list-icon,.tak-list-base[dense] .tak-list-option .tak-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:60px}.tak-list-base[dense] .tak-list-item .tak-divider,.tak-list-base[dense] .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-divider,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base[dense] .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-nav-list a{text-decoration:none;color:inherit}.tak-nav-list .tak-list-item{cursor:pointer;outline:none}tak-action-list .tak-list-item{cursor:pointer;outline:inherit}.tak-list-option:not(.tak-list-item-disabled){cursor:pointer;outline:none}.tak-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active .tak-list-option:hover,.cdk-high-contrast-active .tak-nav-list .tak-list-item:hover,.cdk-high-contrast-active tak-action-list .tak-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .tak-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .tak-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.tak-list-option:not(.tak-list-single-selected-option):not(.tak-list-item-disabled):hover,.tak-nav-list .tak-list-item:not(.tak-list-item-disabled):hover,.tak-action-list .tak-list-item:not(.tak-list-item-disabled):hover{background:none}}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i0.ElementRef }];
  },
});
/**
 * Directive whose purpose is to add the tak- CSS styling to this selector.
 * @docs-private
 */
class TakListAvatarCssTakStyler {}
TakListAvatarCssTakStyler.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListAvatarCssTakStyler,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakListAvatarCssTakStyler.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakListAvatarCssTakStyler,
  selector: '[tak-list-avatar], [takListAvatar]',
  host: { classAttribute: 'tak-list-avatar' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListAvatarCssTakStyler,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-list-avatar], [takListAvatar]',
          host: { class: 'tak-list-avatar' },
        },
      ],
    },
  ],
});
/**
 * Directive whose purpose is to add the tak- CSS styling to this selector.
 * @docs-private
 */
class TakListIconCssTakStyler {}
TakListIconCssTakStyler.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListIconCssTakStyler,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakListIconCssTakStyler.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakListIconCssTakStyler,
  selector: '[tak-list-icon], [takListIcon]',
  host: { classAttribute: 'tak-list-icon' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListIconCssTakStyler,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-list-icon], [takListIcon]',
          host: { class: 'tak-list-icon' },
        },
      ],
    },
  ],
});
/**
 * Directive whose purpose is to add the tak- CSS styling to this selector.
 * @docs-private
 */
class TakListSubheaderCssTakStyler {}
TakListSubheaderCssTakStyler.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListSubheaderCssTakStyler,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakListSubheaderCssTakStyler.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakListSubheaderCssTakStyler,
  selector: '[tak-subheader], [takSubheader]',
  host: { classAttribute: 'tak-subheader' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListSubheaderCssTakStyler,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-subheader], [takSubheader]',
          host: { class: 'tak-subheader' },
        },
      ],
    },
  ],
});
/** An item within a Material Design list. */
class TakListItem extends _TakListItemMixinBase {
  constructor(_element, _changeDetectorRef, navList, list) {
    super();
    this._element = _element;
    this._isInteractiveList = false;
    this._destroyed = new Subject();
    this._disabled = false;
    this._isInteractiveList = !!(navList || (list && list._getListType() === 'action-list'));
    this._list = navList || list;
    // If no type attribute is specified for <button>, set it to "button".
    // If a type attribute is already specified, do nothing.
    const element = this._getHostElement();
    if (element.nodeName.toLowerCase() === 'button' && !element.hasAttribute('type')) {
      element.setAttribute('type', 'button');
    }
    if (this._list) {
      // React to changes in the state of the parent list since
      // some of the item's properties depend on it (e.g. `disableRipple`).
      this._list._stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
        _changeDetectorRef.markForCheck();
      });
    }
  }
  /** Whether the option is disabled. */
  get disabled() {
    return this._disabled || !!(this._list && this._list.disabled);
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  ngAfterContentInit() {
    setLines(this._lines, this._element);
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Whether this list item should show a ripple effect when clicked. */
  _isRippleDisabled() {
    return (
      !this._isInteractiveList || this.disableRipple || !!(this._list && this._list.disableRipple)
    );
  }
  /** Retrieves the DOM element of the component host. */
  _getHostElement() {
    return this._element.nativeElement;
  }
}
TakListItem.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListItem,
  deps: [
    { token: i0.ElementRef },
    { token: i0.ChangeDetectorRef },
    { token: TAK_NAV_LIST, optional: true },
    { token: TAK_LIST, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakListItem.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakListItem,
  selector: 'tak-list-item, a[tak-list-item], button[tak-list-item]',
  inputs: { disableRipple: 'disableRipple', disabled: 'disabled' },
  host: {
    properties: {
      'class.tak-list-item-disabled': 'disabled',
      'class.tak-list-item-with-avatar': '_avatar || _icon',
    },
    classAttribute: 'tak-list-item tak-focus-indicator',
  },
  queries: [
    {
      propertyName: '_avatar',
      first: true,
      predicate: TakListAvatarCssTakStyler,
      descendants: true,
    },
    { propertyName: '_icon', first: true, predicate: TakListIconCssTakStyler, descendants: true },
    { propertyName: '_lines', predicate: TakLine, descendants: true },
  ],
  exportAs: ['takListItem'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<span class="tak-list-item-content">\n  <span class="tak-list-item-ripple" tak-ripple\n       [takRippleTrigger]="_getHostElement()"\n       [takRippleDisabled]="_isRippleDisabled()">\n  </span>\n\n  <ng-content select="[tak-list-avatar], [tak-list-icon], [takListAvatar], [takListIcon]">\n  </ng-content>\n\n  <span class="tak-list-text"><ng-content select="[tak-line], [takLine]"></ng-content></span>\n\n  <ng-content></ng-content>\n</span>\n',
  dependencies: [
    {
      kind: 'directive',
      type: i1.TakRipple,
      selector: '[tak-ripple], [takRipple]',
      inputs: [
        'takRippleColor',
        'takRippleUnbounded',
        'takRippleCentered',
        'takRippleRadius',
        'takRippleAnimation',
        'takRippleDisabled',
        'takRippleTrigger',
      ],
      exportAs: ['takRipple'],
    },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListItem,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-list-item, a[tak-list-item], button[tak-list-item]',
          exportAs: 'takListItem',
          host: {
            class: 'tak-list-item tak-focus-indicator',
            '[class.tak-list-item-disabled]': 'disabled',
            '[class.tak-list-item-with-avatar]': '_avatar || _icon',
          },
          inputs: ['disableRipple'],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<span class="tak-list-item-content">\n  <span class="tak-list-item-ripple" tak-ripple\n       [takRippleTrigger]="_getHostElement()"\n       [takRippleDisabled]="_isRippleDisabled()">\n  </span>\n\n  <ng-content select="[tak-list-avatar], [tak-list-icon], [takListAvatar], [takListIcon]">\n  </ng-content>\n\n  <span class="tak-list-text"><ng-content select="[tak-line], [takLine]"></ng-content></span>\n\n  <ng-content></ng-content>\n</span>\n',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      {
        type: TakNavList,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_NAV_LIST],
          },
        ],
      },
      {
        type: TakList,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_LIST],
          },
        ],
      },
    ];
  },
  propDecorators: {
    _lines: [
      {
        type: ContentChildren,
        args: [TakLine, { descendants: true }],
      },
    ],
    _avatar: [
      {
        type: ContentChild,
        args: [TakListAvatarCssTakStyler],
      },
    ],
    _icon: [
      {
        type: ContentChild,
        args: [TakListIconCssTakStyler],
      },
    ],
    disabled: [
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
const _TakSelectionListBase = mixinDisableRipple(class {});
const _TakListOptionBase = mixinDisableRipple(class {});
/** @docs-private */
const TAK_SELECTION_LIST_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TakSelectionList),
  multi: true,
};
/** Change event that is being fired whenever the selected state of an option changes. */
class TakSelectionListChange {
  constructor(
    /** Reference to the selection list that emitted the event. */
    source,
    /** Reference to the options that have been changed. */
    options
  ) {
    this.source = source;
    this.options = options;
  }
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
class TakListOption extends _TakListOptionBase {
  constructor(
    _element,
    _changeDetector,
    /** @docs-private */
    selectionList
  ) {
    super();
    this._element = _element;
    this._changeDetector = _changeDetector;
    this.selectionList = selectionList;
    this._selected = false;
    this._disabled = false;
    this._hasFocus = false;
    /**
     * Emits when the selected state of the option has changed.
     * Use to facilitate two-data binding to the `selected` property.
     * @docs-private
     */
    this.selectedChange = new EventEmitter();
    /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
    this.checkboxPosition = 'after';
    /**
     * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
     * in the first cycle.
     */
    this._inputsInitialized = false;
  }
  /** Theme color of the list option. This sets the color of the checkbox. */
  get color() {
    return this._color || this.selectionList.color;
  }
  set color(newValue) {
    this._color = newValue;
  }
  /** Value of the option */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (
      this.selected &&
      !this.selectionList.compareWith(newValue, this.value) &&
      this._inputsInitialized
    ) {
      this.selected = false;
    }
    this._value = newValue;
  }
  /** Whether the option is disabled. */
  get disabled() {
    return this._disabled || (this.selectionList && this.selectionList.disabled);
  }
  set disabled(value) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this._changeDetector.markForCheck();
    }
  }
  /** Whether the option is selected. */
  get selected() {
    return this.selectionList.selectedOptions.isSelected(this);
  }
  set selected(value) {
    const isSelected = coerceBooleanProperty(value);
    if (isSelected !== this._selected) {
      this._setSelected(isSelected);
      if (isSelected || this.selectionList.multiple) {
        this.selectionList._reportValueChange();
      }
    }
  }
  ngOnInit() {
    const list = this.selectionList;
    if (list._value && list._value.some(value => list.compareWith(this._value, value))) {
      this._setSelected(true);
    }
    const wasSelected = this._selected;
    // List options that are selected at initialization can't be reported properly to the form
    // control. This is because it takes some time until the selection-list knows about all
    // available options. Also it can happen that the ControlValueAccessor has an initial value
    // that should be used instead. Deferring the value change report to the next tick ensures
    // that the form control value is not being overwritten.
    Promise.resolve().then(() => {
      if (this._selected || wasSelected) {
        this.selected = true;
        this._changeDetector.markForCheck();
      }
    });
    this._inputsInitialized = true;
  }
  ngAfterContentInit() {
    setLines(this._lines, this._element);
  }
  ngOnDestroy() {
    if (this.selected) {
      // We have to delay this until the next tick in order
      // to avoid changed after checked errors.
      Promise.resolve().then(() => {
        this.selected = false;
      });
    }
    const hadFocus = this._hasFocus;
    const newActiveItem = this.selectionList._removeOptionFromList(this);
    // Only move focus if this option was focused at the time it was destroyed.
    if (hadFocus && newActiveItem) {
      newActiveItem.focus();
    }
  }
  /** Toggles the selection state of the option. */
  toggle() {
    this.selected = !this.selected;
  }
  /** Allows for programmatic focusing of the option. */
  focus() {
    this._element.nativeElement.focus();
  }
  /**
   * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
   * @docs-private
   */
  getLabel() {
    return this._text ? this._text.nativeElement.textContent || '' : '';
  }
  /** Whether this list item should show a ripple effect when clicked. */
  _isRippleDisabled() {
    return this.disabled || this.disableRipple || this.selectionList.disableRipple;
  }
  _handleClick() {
    if (!this.disabled && (this.selectionList.multiple || !this.selected)) {
      this.toggle();
      // Emit a change event if the selected state of the option changed through user interaction.
      this.selectionList._emitChangeEvent([this]);
    }
  }
  _handleFocus() {
    this.selectionList._setFocusedOption(this);
    this._hasFocus = true;
  }
  _handleBlur() {
    this.selectionList._onTouched();
    this._hasFocus = false;
  }
  /** Retrieves the DOM element of the component host. */
  _getHostElement() {
    return this._element.nativeElement;
  }
  /** Sets the selected state of the option. Returns whether the value has changed. */
  _setSelected(selected) {
    if (selected === this._selected) {
      return false;
    }
    this._selected = selected;
    if (selected) {
      this.selectionList.selectedOptions.select(this);
    } else {
      this.selectionList.selectedOptions.deselect(this);
    }
    this.selectedChange.emit(selected);
    this._changeDetector.markForCheck();
    return true;
  }
  /**
   * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
   * used to trigger an update of the list option if the disabled state of the selection list
   * changed.
   */
  _markForCheck() {
    this._changeDetector.markForCheck();
  }
}
TakListOption.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListOption,
  deps: [
    { token: i0.ElementRef },
    { token: i0.ChangeDetectorRef },
    { token: forwardRef(() => TakSelectionList) },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakListOption.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakListOption,
  selector: 'tak-list-option',
  inputs: {
    disableRipple: 'disableRipple',
    checkboxPosition: 'checkboxPosition',
    color: 'color',
    value: 'value',
    disabled: 'disabled',
    selected: 'selected',
  },
  outputs: { selectedChange: 'selectedChange' },
  host: {
    attributes: { role: 'option' },
    listeners: { focus: '_handleFocus()', blur: '_handleBlur()', click: '_handleClick()' },
    properties: {
      'class.tak-list-item-disabled': 'disabled',
      'class.tak-list-item-with-avatar': '_avatar || _icon',
      'class.tak-primary': 'color === "primary"',
      'class.tak-accent': 'color !== "primary" && color !== "warn"',
      'class.tak-warn': 'color === "warn"',
      'class.tak-list-single-selected-option': 'selected && !selectionList.multiple',
      'attr.aria-selected': 'selected',
      'attr.aria-disabled': 'disabled',
      'attr.tabindex': '-1',
    },
    classAttribute: 'tak-list-item tak-list-option tak-focus-indicator',
  },
  queries: [
    {
      propertyName: '_avatar',
      first: true,
      predicate: TakListAvatarCssTakStyler,
      descendants: true,
    },
    { propertyName: '_icon', first: true, predicate: TakListIconCssTakStyler, descendants: true },
    { propertyName: '_lines', predicate: TakLine, descendants: true },
  ],
  viewQueries: [{ propertyName: '_text', first: true, predicate: ['text'], descendants: true }],
  exportAs: ['takListOption'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<div class="tak-list-item-content"\n  [class.tak-list-item-content-reverse]="checkboxPosition == \'after\'">\n\n  <div tak-ripple\n    class="tak-list-item-ripple"\n    [takRippleTrigger]="_getHostElement()"\n    [takRippleDisabled]="_isRippleDisabled()"></div>\n\n  <tak-pseudo-checkbox\n    *ngIf="selectionList.multiple"\n    [state]="selected ? \'checked\' : \'unchecked\'"\n    [disabled]="disabled"></tak-pseudo-checkbox>\n\n  <div class="tak-list-text" #text><ng-content></ng-content></div>\n\n  <ng-content select="[tak-list-avatar], [tak-list-icon], [takListAvatar], [takListIcon]">\n  </ng-content>\n\n</div>\n',
  dependencies: [
    {
      kind: 'directive',
      type: i1.TakRipple,
      selector: '[tak-ripple], [takRipple]',
      inputs: [
        'takRippleColor',
        'takRippleUnbounded',
        'takRippleCentered',
        'takRippleRadius',
        'takRippleAnimation',
        'takRippleDisabled',
        'takRippleTrigger',
      ],
      exportAs: ['takRipple'],
    },
    {
      kind: 'component',
      type: i1.TakPseudoCheckbox,
      selector: 'tak-pseudo-checkbox',
      inputs: ['state', 'disabled'],
    },
    {
      kind: 'directive',
      type: i2.NgIf,
      selector: '[ngIf]',
      inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
    },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListOption,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-list-option',
          exportAs: 'takListOption',
          inputs: ['disableRipple'],
          host: {
            role: 'option',
            class: 'tak-list-item tak-list-option tak-focus-indicator',
            '(focus)': '_handleFocus()',
            '(blur)': '_handleBlur()',
            '(click)': '_handleClick()',
            '[class.tak-list-item-disabled]': 'disabled',
            '[class.tak-list-item-with-avatar]': '_avatar || _icon',
            // Manually set the "primary" or "warn" class if the color has been explicitly
            // set to "primary" or "warn". The pseudo checkbox picks up these classes for
            // its theme.
            '[class.tak-primary]': 'color === "primary"',
            // Even though accent is the default, we need to set this class anyway, because the  list might
            // be placed inside a parent that has one of the other colors with a higher specificity.
            '[class.tak-accent]': 'color !== "primary" && color !== "warn"',
            '[class.tak-warn]': 'color === "warn"',
            '[class.tak-list-single-selected-option]': 'selected && !selectionList.multiple',
            '[attr.aria-selected]': 'selected',
            '[attr.aria-disabled]': 'disabled',
            '[attr.tabindex]': '-1',
          },
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<div class="tak-list-item-content"\n  [class.tak-list-item-content-reverse]="checkboxPosition == \'after\'">\n\n  <div tak-ripple\n    class="tak-list-item-ripple"\n    [takRippleTrigger]="_getHostElement()"\n    [takRippleDisabled]="_isRippleDisabled()"></div>\n\n  <tak-pseudo-checkbox\n    *ngIf="selectionList.multiple"\n    [state]="selected ? \'checked\' : \'unchecked\'"\n    [disabled]="disabled"></tak-pseudo-checkbox>\n\n  <div class="tak-list-text" #text><ng-content></ng-content></div>\n\n  <ng-content select="[tak-list-avatar], [tak-list-icon], [takListAvatar], [takListIcon]">\n  </ng-content>\n\n</div>\n',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      {
        type: TakSelectionList,
        decorators: [
          {
            type: Inject,
            args: [forwardRef(() => TakSelectionList)],
          },
        ],
      },
    ];
  },
  propDecorators: {
    _avatar: [
      {
        type: ContentChild,
        args: [TakListAvatarCssTakStyler],
      },
    ],
    _icon: [
      {
        type: ContentChild,
        args: [TakListIconCssTakStyler],
      },
    ],
    _lines: [
      {
        type: ContentChildren,
        args: [TakLine, { descendants: true }],
      },
    ],
    selectedChange: [
      {
        type: Output,
      },
    ],
    _text: [
      {
        type: ViewChild,
        args: ['text'],
      },
    ],
    checkboxPosition: [
      {
        type: Input,
      },
    ],
    color: [
      {
        type: Input,
      },
    ],
    value: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    selected: [
      {
        type: Input,
      },
    ],
  },
});
/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 */
class TakSelectionList extends _TakSelectionListBase {
  constructor(_element, _changeDetector, _focusMonitor) {
    super();
    this._element = _element;
    this._changeDetector = _changeDetector;
    this._focusMonitor = _focusMonitor;
    this._multiple = true;
    this._contentInitialized = false;
    /** Emits a change event whenever the selected state of an option changes. */
    this.selectionChange = new EventEmitter();
    /** Theme color of the selection list. This sets the checkbox color for all list options. */
    this.color = 'accent';
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     */
    this.compareWith = (a1, a2) => a1 === a2;
    this._disabled = false;
    /** The currently selected options. */
    this.selectedOptions = new SelectionModel(this._multiple);
    /** The tabindex of the selection list. */
    this._tabIndex = -1;
    /** View to model callback that should be called whenever the selected options change. */
    this._onChange = _ => {};
    /** Emits when the list has been destroyed. */
    this._destroyed = new Subject();
    /** View to model callback that should be called if the list or its options lost focus. */
    this._onTouched = () => {};
  }
  /** Whether the selection list is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    // The `TakSelectionList` and `TakListOption` are using the `OnPush` change detection
    // strategy. Therefore the options will not check for any changes if the `TakSelectionList`
    // changed its state. Since we know that a change to `disabled` property of the list affects
    // the state of the options, we manually mark each option for check.
    this._markOptionsForCheck();
  }
  /** Whether selection is limited to one or multiple items (default multiple). */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._multiple) {
      if (this._contentInitialized && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw new Error(
          'Cannot change `multiple` mode of tak-selection-list after initialization.'
        );
      }
      this._multiple = newValue;
      this.selectedOptions = new SelectionModel(this._multiple, this.selectedOptions.selected);
    }
  }
  ngAfterContentInit() {
    this._contentInitialized = true;
    this._keyManager = new FocusKeyManager(this.options)
      .withWrap()
      .withTypeAhead()
      .withHomeAndEnd()
      // Allow disabled items to be focusable. For accessibility reasons, there must be a way for
      // screen reader users, that allows reading the different options of the list.
      .skipPredicate(() => false)
      .withAllowedModifierKeys(['shiftKey']);
    if (this._value) {
      this._setOptionsFromValues(this._value);
    }
    // If the user attempts to tab out of the selection list, allow focus to escape.
    this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._allowFocusEscape();
    });
    // When the number of options change, update the tabindex of the selection list.
    this.options.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      this._updateTabIndex();
    });
    // Sync external changes to the model back to the options.
    this.selectedOptions.changed.pipe(takeUntil(this._destroyed)).subscribe(event => {
      if (event.added) {
        for (let item of event.added) {
          item.selected = true;
        }
      }
      if (event.removed) {
        for (let item of event.removed) {
          item.selected = false;
        }
      }
    });
    this._focusMonitor
      .monitor(this._element)
      .pipe(takeUntil(this._destroyed))
      .subscribe(origin => {
        var _a;
        if (origin === 'keyboard' || origin === 'program') {
          let toFocus = 0;
          for (let i = 0; i < this.options.length; i++) {
            if ((_a = this.options.get(i)) === null || _a === void 0 ? void 0 : _a.selected) {
              toFocus = i;
              break;
            }
          }
          this._keyManager.setActiveItem(toFocus);
        }
      });
  }
  ngOnChanges(changes) {
    const disableRippleChanges = changes['disableRipple'];
    const colorChanges = changes['color'];
    if (
      (disableRippleChanges && !disableRippleChanges.firstChange) ||
      (colorChanges && !colorChanges.firstChange)
    ) {
      this._markOptionsForCheck();
    }
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._element);
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
  }
  /** Focuses the selection list. */
  focus(options) {
    this._element.nativeElement.focus(options);
  }
  /** Selects all of the options. Returns the options that changed as a result. */
  selectAll() {
    return this._setAllOptionsSelected(true);
  }
  /** Deselects all of the options. Returns the options that changed as a result. */
  deselectAll() {
    return this._setAllOptionsSelected(false);
  }
  /** Sets the focused option of the selection-list. */
  _setFocusedOption(option) {
    this._keyManager.updateActiveItem(option);
  }
  /**
   * Removes an option from the selection list and updates the active item.
   * @returns Currently-active item.
   */
  _removeOptionFromList(option) {
    const optionIndex = this._getOptionIndex(option);
    if (optionIndex > -1 && this._keyManager.activeItemIndex === optionIndex) {
      // Check whether the option is the last item
      if (optionIndex > 0) {
        this._keyManager.updateActiveItem(optionIndex - 1);
      } else if (optionIndex === 0 && this.options.length > 1) {
        this._keyManager.updateActiveItem(Math.min(optionIndex + 1, this.options.length - 1));
      }
    }
    return this._keyManager.activeItem;
  }
  /** Passes relevant key presses to our key manager. */
  _keydown(event) {
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    const previousFocusIndex = manager.activeItemIndex;
    const hasModifier = hasModifierKey(event);
    switch (keyCode) {
      case SPACE:
      case ENTER:
        if (!hasModifier && !manager.isTyping()) {
          this._toggleFocusedOption();
          // Always prevent space from scrolling the page since the list has focus
          event.preventDefault();
        }
        break;
      default:
        // The "A" key gets special treatment, because it's used for the "select all" functionality.
        if (
          keyCode === A &&
          this.multiple &&
          hasModifierKey(event, 'ctrlKey') &&
          !manager.isTyping()
        ) {
          const shouldSelect = this.options.some(option => !option.disabled && !option.selected);
          this._setAllOptionsSelected(shouldSelect, true, true);
          event.preventDefault();
        } else {
          manager.onKeydown(event);
        }
    }
    if (
      this.multiple &&
      (keyCode === UP_ARROW || keyCode === DOWN_ARROW) &&
      event.shiftKey &&
      manager.activeItemIndex !== previousFocusIndex
    ) {
      this._toggleFocusedOption();
    }
  }
  /** Reports a value change to the ControlValueAccessor */
  _reportValueChange() {
    // Stop reporting value changes after the list has been destroyed. This avoids
    // cases where the list might wrongly reset its value once it is removed, but
    // the form control is still live.
    if (this.options && !this._isDestroyed) {
      const value = this._getSelectedOptionValues();
      this._onChange(value);
      this._value = value;
    }
  }
  /** Emits a change event if the selected state of an option changed. */
  _emitChangeEvent(options) {
    this.selectionChange.emit(new TakSelectionListChange(this, options));
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(values) {
    this._value = values;
    if (this.options) {
      this._setOptionsFromValues(values || []);
    }
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Sets the selected options based on the specified values. */
  _setOptionsFromValues(values) {
    this.options.forEach(option => option._setSelected(false));
    values.forEach(value => {
      const correspondingOption = this.options.find(option => {
        // Skip options that are already in the model. This allows us to handle cases
        // where the same primitive value is selected multiple times.
        return option.selected ? false : this.compareWith(option.value, value);
      });
      if (correspondingOption) {
        correspondingOption._setSelected(true);
      }
    });
  }
  /** Returns the values of the selected options. */
  _getSelectedOptionValues() {
    return this.options.filter(option => option.selected).map(option => option.value);
  }
  /** Toggles the state of the currently focused option if enabled. */
  _toggleFocusedOption() {
    let focusedIndex = this._keyManager.activeItemIndex;
    if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
      let focusedOption = this.options.toArray()[focusedIndex];
      if (focusedOption && !focusedOption.disabled && (this._multiple || !focusedOption.selected)) {
        focusedOption.toggle();
        // Emit a change event because the focused option changed its state through user
        // interaction.
        this._emitChangeEvent([focusedOption]);
      }
    }
  }
  /**
   * Sets the selected state on all of the options
   * and emits an event if anything changed.
   */
  _setAllOptionsSelected(isSelected, skipDisabled, isUserInput) {
    // Keep track of whether anything changed, because we only want to
    // emit the changed event when something actually changed.
    const changedOptions = [];
    this.options.forEach(option => {
      if ((!skipDisabled || !option.disabled) && option._setSelected(isSelected)) {
        changedOptions.push(option);
      }
    });
    if (changedOptions.length) {
      this._reportValueChange();
      if (isUserInput) {
        this._emitChangeEvent(changedOptions);
      }
    }
    return changedOptions;
  }
  /**
   * Utility to ensure all indexes are valid.
   * @param index The index to be checked.
   * @returns True if the index is valid for our list of options.
   */
  _isValidIndex(index) {
    return index >= 0 && index < this.options.length;
  }
  /** Returns the index of the specified list option. */
  _getOptionIndex(option) {
    return this.options.toArray().indexOf(option);
  }
  /** Marks all the options to be checked in the next change detection run. */
  _markOptionsForCheck() {
    if (this.options) {
      this.options.forEach(option => option._markForCheck());
    }
  }
  /**
   * Removes the tabindex from the selection list and resets it back afterwards, allowing the user
   * to tab out of it. This prevents the list from capturing focus and redirecting it back within
   * the list, creating a focus trap if it user tries to tab away.
   */
  _allowFocusEscape() {
    this._tabIndex = -1;
    setTimeout(() => {
      this._tabIndex = 0;
      this._changeDetector.markForCheck();
    });
  }
  /** Updates the tabindex based upon if the selection list is empty. */
  _updateTabIndex() {
    this._tabIndex = this.options.length === 0 ? -1 : 0;
  }
}
TakSelectionList.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSelectionList,
  deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i3.FocusMonitor }],
  target: i0.ɵɵFactoryTarget.Component,
});
TakSelectionList.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakSelectionList,
  selector: 'tak-selection-list',
  inputs: {
    disableRipple: 'disableRipple',
    color: 'color',
    compareWith: 'compareWith',
    disabled: 'disabled',
    multiple: 'multiple',
  },
  outputs: { selectionChange: 'selectionChange' },
  host: {
    attributes: { role: 'listbox' },
    listeners: { keydown: '_keydown($event)' },
    properties: {
      'attr.aria-multiselectable': 'multiple',
      'attr.aria-disabled': 'disabled.toString()',
      'attr.tabindex': '_tabIndex',
    },
    classAttribute: 'tak-selection-list tak-list-base',
  },
  providers: [TAK_SELECTION_LIST_VALUE_ACCESSOR],
  queries: [{ propertyName: 'options', predicate: TakListOption, descendants: true }],
  exportAs: ['takSelectionList'],
  usesInheritance: true,
  usesOnChanges: true,
  ngImport: i0,
  template: '<ng-content></ng-content>',
  isInline: true,
  styles: [
    '.tak-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.tak-list-base .tak-subheader{margin:0}button.tak-list-item,button.tak-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.tak-list-item,[dir=rtl] button.tak-list-option{text-align:right}button.tak-list-item::-moz-focus-inner,button.tak-list-option::-moz-focus-inner{border:0}.tak-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-list-base .tak-subheader{height:48px;line-height:16px}.tak-list-base .tak-subheader:first-child{margin-top:-8px}.tak-list-base .tak-list-item,.tak-list-base .tak-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base .tak-list-item .tak-list-item-content,.tak-list-base .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base .tak-list-item .tak-list-item-content-reverse,.tak-list-base .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base .tak-list-item .tak-list-item-ripple,.tak-list-base .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar,.tak-list-base .tak-list-option.tak-list-item-with-avatar{height:56px}.tak-list-base .tak-list-item.tak-2-line,.tak-list-base .tak-list-option.tak-2-line{height:72px}.tak-list-base .tak-list-item.tak-3-line,.tak-list-base .tak-list-option.tak-3-line{height:88px}.tak-list-base .tak-list-item.tak-multi-line,.tak-list-base .tak-list-option.tak-multi-line{height:auto}.tak-list-base .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base .tak-list-item .tak-list-text,.tak-list-base .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base .tak-list-item .tak-list-text>*,.tak-list-base .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base .tak-list-item .tak-list-text:empty,.tak-list-base .tak-list-option .tak-list-text:empty{display:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base .tak-list-item .tak-list-avatar,.tak-list-base .tak-list-option .tak-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:72px}.tak-list-base .tak-list-item .tak-list-icon,.tak-list-base .tak-list-option .tak-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:64px}.tak-list-base .tak-list-item .tak-divider,.tak-list-base .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base .tak-list-item .tak-divider,[dir=rtl] .tak-list-base .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-list-base[dense]{padding-top:4px;display:block}.tak-list-base[dense] .tak-subheader{height:40px;line-height:8px}.tak-list-base[dense] .tak-subheader:first-child{margin-top:-4px}.tak-list-base[dense] .tak-list-item,.tak-list-base[dense] .tak-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-item-content,.tak-list-base[dense] .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base[dense] .tak-list-item .tak-list-item-content-reverse,.tak-list-base[dense] .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base[dense] .tak-list-item .tak-list-item-ripple,.tak-list-base[dense] .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar{height:48px}.tak-list-base[dense] .tak-list-item.tak-2-line,.tak-list-base[dense] .tak-list-option.tak-2-line{height:60px}.tak-list-base[dense] .tak-list-item.tak-3-line,.tak-list-base[dense] .tak-list-option.tak-3-line{height:76px}.tak-list-base[dense] .tak-list-item.tak-multi-line,.tak-list-base[dense] .tak-list-option.tak-multi-line{height:auto}.tak-list-base[dense] .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base[dense] .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base[dense] .tak-list-item .tak-list-text,.tak-list-base[dense] .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-text>*,.tak-list-base[dense] .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base[dense] .tak-list-item .tak-list-text:empty,.tak-list-base[dense] .tak-list-option .tak-list-text:empty{display:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base[dense] .tak-list-item .tak-list-avatar,.tak-list-base[dense] .tak-list-option .tak-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:68px}.tak-list-base[dense] .tak-list-item .tak-list-icon,.tak-list-base[dense] .tak-list-option .tak-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:60px}.tak-list-base[dense] .tak-list-item .tak-divider,.tak-list-base[dense] .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-divider,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base[dense] .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-nav-list a{text-decoration:none;color:inherit}.tak-nav-list .tak-list-item{cursor:pointer;outline:none}tak-action-list .tak-list-item{cursor:pointer;outline:inherit}.tak-list-option:not(.tak-list-item-disabled){cursor:pointer;outline:none}.tak-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active .tak-list-option:hover,.cdk-high-contrast-active .tak-nav-list .tak-list-item:hover,.cdk-high-contrast-active tak-action-list .tak-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .tak-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .tak-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.tak-list-option:not(.tak-list-single-selected-option):not(.tak-list-item-disabled):hover,.tak-nav-list .tak-list-item:not(.tak-list-item-disabled):hover,.tak-action-list .tak-list-item:not(.tak-list-item-disabled):hover{background:none}}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSelectionList,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-selection-list',
          exportAs: 'takSelectionList',
          inputs: ['disableRipple'],
          host: {
            role: 'listbox',
            class: 'tak-selection-list tak-list-base',
            '(keydown)': '_keydown($event)',
            '[attr.aria-multiselectable]': 'multiple',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.tabindex]': '_tabIndex',
          },
          template: '<ng-content></ng-content>',
          encapsulation: ViewEncapsulation.None,
          providers: [TAK_SELECTION_LIST_VALUE_ACCESSOR],
          changeDetection: ChangeDetectionStrategy.OnPush,
          styles: [
            '.tak-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.tak-list-base .tak-subheader{margin:0}button.tak-list-item,button.tak-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.tak-list-item,[dir=rtl] button.tak-list-option{text-align:right}button.tak-list-item::-moz-focus-inner,button.tak-list-option::-moz-focus-inner{border:0}.tak-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-list-base .tak-subheader{height:48px;line-height:16px}.tak-list-base .tak-subheader:first-child{margin-top:-8px}.tak-list-base .tak-list-item,.tak-list-base .tak-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base .tak-list-item .tak-list-item-content,.tak-list-base .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base .tak-list-item .tak-list-item-content-reverse,.tak-list-base .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base .tak-list-item .tak-list-item-ripple,.tak-list-base .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar,.tak-list-base .tak-list-option.tak-list-item-with-avatar{height:56px}.tak-list-base .tak-list-item.tak-2-line,.tak-list-base .tak-list-option.tak-2-line{height:72px}.tak-list-base .tak-list-item.tak-3-line,.tak-list-base .tak-list-option.tak-3-line{height:88px}.tak-list-base .tak-list-item.tak-multi-line,.tak-list-base .tak-list-option.tak-multi-line{height:auto}.tak-list-base .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base .tak-list-item .tak-list-text,.tak-list-base .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base .tak-list-item .tak-list-text>*,.tak-list-base .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base .tak-list-item .tak-list-text:empty,.tak-list-base .tak-list-option .tak-list-text:empty{display:none}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base .tak-list-item .tak-list-avatar,.tak-list-base .tak-list-option .tak-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:72px}.tak-list-base .tak-list-item .tak-list-icon,.tak-list-base .tak-list-option .tak-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .tak-list-base .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:64px}.tak-list-base .tak-list-item .tak-divider,.tak-list-base .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base .tak-list-item .tak-divider,[dir=rtl] .tak-list-base .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-list-base[dense]{padding-top:4px;display:block}.tak-list-base[dense] .tak-subheader{height:40px;line-height:8px}.tak-list-base[dense] .tak-subheader:first-child{margin-top:-4px}.tak-list-base[dense] .tak-list-item,.tak-list-base[dense] .tak-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-item-content,.tak-list-base[dense] .tak-list-option .tak-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.tak-list-base[dense] .tak-list-item .tak-list-item-content-reverse,.tak-list-base[dense] .tak-list-option .tak-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.tak-list-base[dense] .tak-list-item .tak-list-item-ripple,.tak-list-base[dense] .tak-list-option .tak-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar{height:48px}.tak-list-base[dense] .tak-list-item.tak-2-line,.tak-list-base[dense] .tak-list-option.tak-2-line{height:60px}.tak-list-base[dense] .tak-list-item.tak-3-line,.tak-list-base[dense] .tak-list-option.tak-3-line{height:76px}.tak-list-base[dense] .tak-list-item.tak-multi-line,.tak-list-base[dense] .tak-list-option.tak-multi-line{height:auto}.tak-list-base[dense] .tak-list-item.tak-multi-line .tak-list-item-content,.tak-list-base[dense] .tak-list-option.tak-multi-line .tak-list-item-content{padding-top:16px;padding-bottom:16px}.tak-list-base[dense] .tak-list-item .tak-list-text,.tak-list-base[dense] .tak-list-option .tak-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.tak-list-base[dense] .tak-list-item .tak-list-text>*,.tak-list-base[dense] .tak-list-option .tak-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.tak-list-base[dense] .tak-list-item .tak-list-text:empty,.tak-list-base[dense] .tak-list-option .tak-list-text:empty{display:none}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:0;padding-left:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:0}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-left:0;padding-right:16px}[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-item.tak-list-option .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar .tak-list-item-content-reverse .tak-list-text,[dir=rtl] .tak-list-base[dense] .tak-list-option.tak-list-option .tak-list-item-content-reverse .tak-list-text{padding-right:0;padding-left:16px}.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-item.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content-reverse .tak-list-text,.tak-list-base[dense] .tak-list-option.tak-list-item-with-avatar.tak-list-option .tak-list-item-content .tak-list-text{padding-right:16px;padding-left:16px}.tak-list-base[dense] .tak-list-item .tak-list-avatar,.tak-list-base[dense] .tak-list-option .tak-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-avatar~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-avatar~.tak-divider-inset{margin-left:auto;margin-right:68px}.tak-list-base[dense] .tak-list-item .tak-list-icon,.tak-list-base[dense] .tak-list-option .tak-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-list-icon~.tak-divider-inset,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-list-icon~.tak-divider-inset{margin-left:auto;margin-right:60px}.tak-list-base[dense] .tak-list-item .tak-divider,.tak-list-base[dense] .tak-list-option .tak-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .tak-list-base[dense] .tak-list-item .tak-divider,[dir=rtl] .tak-list-base[dense] .tak-list-option .tak-divider{margin-left:auto;margin-right:0}.tak-list-base[dense] .tak-list-item .tak-divider.tak-divider-inset,.tak-list-base[dense] .tak-list-option .tak-divider.tak-divider-inset{position:absolute}.tak-nav-list a{text-decoration:none;color:inherit}.tak-nav-list .tak-list-item{cursor:pointer;outline:none}tak-action-list .tak-list-item{cursor:pointer;outline:inherit}.tak-list-option:not(.tak-list-item-disabled){cursor:pointer;outline:none}.tak-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .tak-list-item-disabled{opacity:.5}.cdk-high-contrast-active .tak-list-option:hover,.cdk-high-contrast-active .tak-nav-list .tak-list-item:hover,.cdk-high-contrast-active tak-action-list .tak-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .tak-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .tak-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.tak-list-option:not(.tak-list-single-selected-option):not(.tak-list-item-disabled):hover,.tak-nav-list .tak-list-item:not(.tak-list-item-disabled):hover,.tak-action-list .tak-list-item:not(.tak-list-item-disabled):hover{background:none}}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i3.FocusMonitor }];
  },
  propDecorators: {
    options: [
      {
        type: ContentChildren,
        args: [TakListOption, { descendants: true }],
      },
    ],
    selectionChange: [
      {
        type: Output,
      },
    ],
    color: [
      {
        type: Input,
      },
    ],
    compareWith: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    multiple: [
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
class TakListModule {}
TakListModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakListModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListModule,
  declarations: [
    TakList,
    TakNavList,
    TakListItem,
    TakListAvatarCssTakStyler,
    TakListIconCssTakStyler,
    TakListSubheaderCssTakStyler,
    TakSelectionList,
    TakListOption,
  ],
  imports: [TakLineModule, TakRippleModule, TakCommonModule, TakPseudoCheckboxModule, CommonModule],
  exports: [
    TakList,
    TakNavList,
    TakListItem,
    TakListAvatarCssTakStyler,
    TakLineModule,
    TakCommonModule,
    TakListIconCssTakStyler,
    TakListSubheaderCssTakStyler,
    TakPseudoCheckboxModule,
    TakSelectionList,
    TakListOption,
    TakDividerModule,
  ],
});
TakListModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListModule,
  imports: [
    TakLineModule,
    TakRippleModule,
    TakCommonModule,
    TakPseudoCheckboxModule,
    CommonModule,
    TakLineModule,
    TakCommonModule,
    TakPseudoCheckboxModule,
    TakDividerModule,
  ],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakListModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [
            TakLineModule,
            TakRippleModule,
            TakCommonModule,
            TakPseudoCheckboxModule,
            CommonModule,
          ],
          exports: [
            TakList,
            TakNavList,
            TakListItem,
            TakListAvatarCssTakStyler,
            TakLineModule,
            TakCommonModule,
            TakListIconCssTakStyler,
            TakListSubheaderCssTakStyler,
            TakPseudoCheckboxModule,
            TakSelectionList,
            TakListOption,
            TakDividerModule,
          ],
          declarations: [
            TakList,
            TakNavList,
            TakListItem,
            TakListAvatarCssTakStyler,
            TakListIconCssTakStyler,
            TakListSubheaderCssTakStyler,
            TakSelectionList,
            TakListOption,
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
  TAK_LIST,
  TAK_NAV_LIST,
  TAK_SELECTION_LIST_VALUE_ACCESSOR,
  TakList,
  TakListAvatarCssTakStyler,
  TakListIconCssTakStyler,
  TakListItem,
  TakListModule,
  TakListOption,
  TakListSubheaderCssTakStyler,
  TakNavList,
  TakSelectionList,
  TakSelectionListChange,
};
//# sourceMappingURL=list.mjs.map
