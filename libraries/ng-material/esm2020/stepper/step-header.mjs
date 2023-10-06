/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TakStepLabel } from './step-label';
import { TakStepperIntl } from './stepper-intl';
import { CdkStepHeader } from '@takkion/ng-cdk/stepper';
import { mixinColor } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i1 from './stepper-intl';
import * as i2 from '@takkion/ng-cdk/a11y';
import * as i3 from '@angular/common';
import * as i4 from '@takkion/ng-material/icon';
import * as i5 from '@takkion/ng-material/core';
// Boilerplate for applying mixins to TakStepHeader.
/** @docs-private */
const _TakStepHeaderBase = mixinColor(
  class TakStepHeaderBase extends CdkStepHeader {
    constructor(elementRef) {
      super(elementRef);
    }
  },
  'primary'
);
export class TakStepHeader extends _TakStepHeaderBase {
  constructor(_intl, _focusMonitor, _elementRef, changeDetectorRef) {
    super(_elementRef);
    this._intl = _intl;
    this._focusMonitor = _focusMonitor;
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Focuses the step header. */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  /** Returns string label of given step if it is a text label. */
  _stringLabel() {
    return this.label instanceof TakStepLabel ? null : this.label;
  }
  /** Returns TakStepLabel if the label of given step is a template label. */
  _templateLabel() {
    return this.label instanceof TakStepLabel ? this.label : null;
  }
  /** Returns the host HTML element. */
  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  /** Template context variables that are exposed to the `takStepperIcon` instances. */
  _getIconContext() {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional,
    };
  }
  _getDefaultTextForState(state) {
    if (state == 'number') {
      return `${this.index + 1}`;
    }
    if (state == 'edit') {
      return 'create';
    }
    if (state == 'error') {
      return 'warning';
    }
    return state;
  }
}
TakStepHeader.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepHeader,
  deps: [
    { token: i1.TakStepperIntl },
    { token: i2.FocusMonitor },
    { token: i0.ElementRef },
    { token: i0.ChangeDetectorRef },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakStepHeader.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStepHeader,
  selector: 'tak-step-header',
  inputs: {
    color: 'color',
    state: 'state',
    label: 'label',
    errorMessage: 'errorMessage',
    iconOverrides: 'iconOverrides',
    index: 'index',
    selected: 'selected',
    active: 'active',
    optional: 'optional',
    disableRipple: 'disableRipple',
  },
  host: { attributes: { role: 'tab' }, classAttribute: 'tak-step-header' },
  usesInheritance: true,
  ngImport: i0,
  template:
    '<div class="tak-step-header-ripple tak-focus-indicator" takRipple\n     [takRippleTrigger]="_getHostElement()"\n     [takRippleDisabled]="disableRipple"></div>\n\n<div class="tak-step-icon-state-{{state}} tak-step-icon" [class.tak-step-icon-selected]="selected">\n  <div class="tak-step-icon-content" [ngSwitch]="!!(iconOverrides && iconOverrides[state])">\n    <ng-container\n      *ngSwitchCase="true"\n      [ngTemplateOutlet]="iconOverrides[state]"\n      [ngTemplateOutletContext]="_getIconContext()"></ng-container>\n    <ng-container *ngSwitchDefault [ngSwitch]="state">\n      <span aria-hidden="true" *ngSwitchCase="\'number\'">{{_getDefaultTextForState(state)}}</span>\n      <span class="cdk-visually-hidden" *ngIf="state === \'done\'">{{_intl.completedLabel}}</span>\n      <span class="cdk-visually-hidden" *ngIf="state === \'edit\'">{{_intl.editableLabel}}</span>\n      <tak-icon aria-hidden="true" *ngSwitchDefault>{{_getDefaultTextForState(state)}}</tak-icon>\n    </ng-container>\n  </div>\n</div>\n<div class="tak-step-label"\n     [class.tak-step-label-active]="active"\n     [class.tak-step-label-selected]="selected"\n     [class.tak-step-label-error]="state == \'error\'">\n  <!-- If there is a label template, use it. -->\n  <div class="tak-step-text-label" *ngIf="_templateLabel()">\n    <ng-container [ngTemplateOutlet]="_templateLabel()!.template"></ng-container>\n  </div>\n  <!-- If there is no label template, fall back to the text label. -->\n  <div class="tak-step-text-label" *ngIf="_stringLabel()">{{label}}</div>\n\n  <div class="tak-step-optional" *ngIf="optional && state != \'error\'">{{_intl.optionalLabel}}</div>\n  <div class="tak-step-sub-label-error" *ngIf="state == \'error\'">{{errorMessage}}</div>\n</div>\n\n',
  styles: [
    '.tak-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-step-header:focus .tak-focus-indicator::before{content:""}.cdk-high-contrast-active .tak-step-header{outline:solid 1px}.cdk-high-contrast-active .tak-step-header[aria-selected=true] .tak-step-label{text-decoration:underline}.cdk-high-contrast-active .tak-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .tak-step-header[aria-disabled=true] .tak-step-label,.cdk-high-contrast-active .tak-step-header[aria-disabled=true] .tak-step-icon,.cdk-high-contrast-active .tak-step-header[aria-disabled=true] .tak-step-optional{color:GrayText}.tak-step-optional,.tak-step-sub-label-error{font-size:12px}.tak-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative}.tak-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.tak-step-icon .tak-icon{font-size:16px;height:16px;width:16px}.tak-step-icon-state-error .tak-icon{font-size:24px;height:24px;width:24px}.tak-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle}.tak-step-text-label{text-overflow:ellipsis;overflow:hidden}.tak-step-header .tak-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i3.NgIf,
      selector: '[ngIf]',
      inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
    },
    {
      kind: 'directive',
      type: i3.NgTemplateOutlet,
      selector: '[ngTemplateOutlet]',
      inputs: ['ngTemplateOutletContext', 'ngTemplateOutlet', 'ngTemplateOutletInjector'],
    },
    { kind: 'directive', type: i3.NgSwitch, selector: '[ngSwitch]', inputs: ['ngSwitch'] },
    {
      kind: 'directive',
      type: i3.NgSwitchCase,
      selector: '[ngSwitchCase]',
      inputs: ['ngSwitchCase'],
    },
    { kind: 'directive', type: i3.NgSwitchDefault, selector: '[ngSwitchDefault]' },
    {
      kind: 'component',
      type: i4.TakIcon,
      selector: 'tak-icon',
      inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
      exportAs: ['takIcon'],
    },
    {
      kind: 'directive',
      type: i5.TakRipple,
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
  type: TakStepHeader,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-step-header',
          inputs: ['color'],
          host: {
            class: 'tak-step-header',
            role: 'tab',
          },
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<div class="tak-step-header-ripple tak-focus-indicator" takRipple\n     [takRippleTrigger]="_getHostElement()"\n     [takRippleDisabled]="disableRipple"></div>\n\n<div class="tak-step-icon-state-{{state}} tak-step-icon" [class.tak-step-icon-selected]="selected">\n  <div class="tak-step-icon-content" [ngSwitch]="!!(iconOverrides && iconOverrides[state])">\n    <ng-container\n      *ngSwitchCase="true"\n      [ngTemplateOutlet]="iconOverrides[state]"\n      [ngTemplateOutletContext]="_getIconContext()"></ng-container>\n    <ng-container *ngSwitchDefault [ngSwitch]="state">\n      <span aria-hidden="true" *ngSwitchCase="\'number\'">{{_getDefaultTextForState(state)}}</span>\n      <span class="cdk-visually-hidden" *ngIf="state === \'done\'">{{_intl.completedLabel}}</span>\n      <span class="cdk-visually-hidden" *ngIf="state === \'edit\'">{{_intl.editableLabel}}</span>\n      <tak-icon aria-hidden="true" *ngSwitchDefault>{{_getDefaultTextForState(state)}}</tak-icon>\n    </ng-container>\n  </div>\n</div>\n<div class="tak-step-label"\n     [class.tak-step-label-active]="active"\n     [class.tak-step-label-selected]="selected"\n     [class.tak-step-label-error]="state == \'error\'">\n  <!-- If there is a label template, use it. -->\n  <div class="tak-step-text-label" *ngIf="_templateLabel()">\n    <ng-container [ngTemplateOutlet]="_templateLabel()!.template"></ng-container>\n  </div>\n  <!-- If there is no label template, fall back to the text label. -->\n  <div class="tak-step-text-label" *ngIf="_stringLabel()">{{label}}</div>\n\n  <div class="tak-step-optional" *ngIf="optional && state != \'error\'">{{_intl.optionalLabel}}</div>\n  <div class="tak-step-sub-label-error" *ngIf="state == \'error\'">{{errorMessage}}</div>\n</div>\n\n',
          styles: [
            '.tak-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-step-header:focus .tak-focus-indicator::before{content:""}.cdk-high-contrast-active .tak-step-header{outline:solid 1px}.cdk-high-contrast-active .tak-step-header[aria-selected=true] .tak-step-label{text-decoration:underline}.cdk-high-contrast-active .tak-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .tak-step-header[aria-disabled=true] .tak-step-label,.cdk-high-contrast-active .tak-step-header[aria-disabled=true] .tak-step-icon,.cdk-high-contrast-active .tak-step-header[aria-disabled=true] .tak-step-optional{color:GrayText}.tak-step-optional,.tak-step-sub-label-error{font-size:12px}.tak-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative}.tak-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.tak-step-icon .tak-icon{font-size:16px;height:16px;width:16px}.tak-step-icon-state-error .tak-icon{font-size:24px;height:24px;width:24px}.tak-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle}.tak-step-text-label{text-overflow:ellipsis;overflow:hidden}.tak-step-header .tak-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.TakStepperIntl },
      { type: i2.FocusMonitor },
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
    ];
  },
  propDecorators: {
    state: [
      {
        type: Input,
      },
    ],
    label: [
      {
        type: Input,
      },
    ],
    errorMessage: [
      {
        type: Input,
      },
    ],
    iconOverrides: [
      {
        type: Input,
      },
    ],
    index: [
      {
        type: Input,
      },
    ],
    selected: [
      {
        type: Input,
      },
    ],
    active: [
      {
        type: Input,
      },
    ],
    optional: [
      {
        type: Input,
      },
    ],
    disableRipple: [
      {
        type: Input,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc3RlcHBlci9zdGVwLWhlYWRlci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zdGVwcGVyL3N0ZXAtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLGlCQUFpQixHQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsYUFBYSxFQUFZLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBRTVELG9EQUFvRDtBQUNwRCxvQkFBb0I7QUFDcEIsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQ25DLE1BQU0saUJBQWtCLFNBQVEsYUFBYTtJQUMzQyxZQUFZLFVBQXNCO1FBQ2hDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0YsRUFDRCxTQUFTLENBQ1YsQ0FBQztBQWNGLE1BQU0sT0FBTyxhQUNYLFNBQVEsa0JBQWtCO0lBZ0MxQixZQUNTLEtBQXFCLEVBQ3BCLGFBQTJCLEVBQ25DLFdBQW9DLEVBQ3BDLGlCQUFvQztRQUVwQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFMWixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNwQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUtuQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCwrQkFBK0I7SUFDdEIsS0FBSyxDQUFDLE1BQW9CLEVBQUUsT0FBc0I7UUFDekQsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ2hFLENBQUM7SUFFRCwyRUFBMkU7SUFDM0UsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNoRSxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxxRkFBcUY7SUFDckYsZUFBZTtRQUNiLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO0lBQ0osQ0FBQztJQUVELHVCQUF1QixDQUFDLEtBQWdCO1FBQ3RDLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUNyQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUNuQixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUNELElBQUksS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUNwQixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7MEdBaEdVLGFBQWE7OEZBQWIsYUFBYSxrWUNsRDFCLCt3REFpQ0E7MkZEaUJhLGFBQWE7a0JBWnpCLFNBQVM7K0JBQ0UsaUJBQWlCLFVBR25CLENBQUMsT0FBTyxDQUFDLFFBQ1g7d0JBQ0osT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsTUFBTSxFQUFFLEtBQUs7cUJBQ2QsaUJBQ2MsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTt5TEFTdEMsS0FBSztzQkFBYixLQUFLO2dCQUdHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxZQUFZO3NCQUFwQixLQUFLO2dCQUdHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csYUFBYTtzQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0ZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW59IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVGVtcGxhdGVSZWYsXG4gIEFmdGVyVmlld0luaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtNYXRTdGVwTGFiZWx9IGZyb20gJy4vc3RlcC1sYWJlbCc7XG5pbXBvcnQge01hdFN0ZXBwZXJJbnRsfSBmcm9tICcuL3N0ZXBwZXItaW50bCc7XG5pbXBvcnQge01hdFN0ZXBwZXJJY29uQ29udGV4dH0gZnJvbSAnLi9zdGVwcGVyLWljb24nO1xuaW1wb3J0IHtDZGtTdGVwSGVhZGVyLCBTdGVwU3RhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7bWl4aW5Db2xvciwgQ2FuQ29sb3J9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFN0ZXBIZWFkZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY29uc3QgX01hdFN0ZXBIZWFkZXJCYXNlID0gbWl4aW5Db2xvcihcbiAgY2xhc3MgTWF0U3RlcEhlYWRlckJhc2UgZXh0ZW5kcyBDZGtTdGVwSGVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG4gIH0sXG4gICdwcmltYXJ5Jyxcbik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zdGVwLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc3RlcC1oZWFkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzdGVwLWhlYWRlci5jc3MnXSxcbiAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LXN0ZXAtaGVhZGVyJyxcbiAgICAncm9sZSc6ICd0YWInLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U3RlcEhlYWRlclxuICBleHRlbmRzIF9NYXRTdGVwSGVhZGVyQmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2FuQ29sb3JcbntcbiAgcHJpdmF0ZSBfaW50bFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBTdGF0ZSBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgQElucHV0KCkgc3RhdGU6IFN0ZXBTdGF0ZTtcblxuICAvKiogTGFiZWwgb2YgdGhlIGdpdmVuIHN0ZXAuICovXG4gIEBJbnB1dCgpIGxhYmVsOiBNYXRTdGVwTGFiZWwgfCBzdHJpbmc7XG5cbiAgLyoqIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZXJlJ3MgYW4gZXJyb3IuICovXG4gIEBJbnB1dCgpIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKiBPdmVycmlkZXMgZm9yIHRoZSBoZWFkZXIgaWNvbnMsIHBhc3NlZCBpbiB2aWEgdGhlIHN0ZXBwZXIuICovXG4gIEBJbnB1dCgpIGljb25PdmVycmlkZXM6IHtba2V5OiBzdHJpbmddOiBUZW1wbGF0ZVJlZjxNYXRTdGVwcGVySWNvbkNvbnRleHQ+fTtcblxuICAvKiogSW5kZXggb2YgdGhlIGdpdmVuIHN0ZXAuICovXG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgaXMgc2VsZWN0ZWQuICovXG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBzdGVwIGxhYmVsIGlzIGFjdGl2ZS4gKi9cbiAgQElucHV0KCkgYWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBzdGVwIGlzIG9wdGlvbmFsLiAqL1xuICBASW5wdXQoKSBvcHRpb25hbDogYm9vbGVhbjtcblxuICAvKiogV2hldGhlciB0aGUgcmlwcGxlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgQElucHV0KCkgZGlzYWJsZVJpcHBsZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2ludGw6IE1hdFN0ZXBwZXJJbnRsLFxuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9pbnRsU3Vic2NyaXB0aW9uID0gX2ludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYsIHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5faW50bFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBzdGVwIGhlYWRlci4gKi9cbiAgb3ZlcnJpZGUgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHtcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICB0aGlzLl9mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5fZWxlbWVudFJlZiwgb3JpZ2luLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHN0cmluZyBsYWJlbCBvZiBnaXZlbiBzdGVwIGlmIGl0IGlzIGEgdGV4dCBsYWJlbC4gKi9cbiAgX3N0cmluZ0xhYmVsKCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmxhYmVsIGluc3RhbmNlb2YgTWF0U3RlcExhYmVsID8gbnVsbCA6IHRoaXMubGFiZWw7XG4gIH1cblxuICAvKiogUmV0dXJucyBNYXRTdGVwTGFiZWwgaWYgdGhlIGxhYmVsIG9mIGdpdmVuIHN0ZXAgaXMgYSB0ZW1wbGF0ZSBsYWJlbC4gKi9cbiAgX3RlbXBsYXRlTGFiZWwoKTogTWF0U3RlcExhYmVsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWwgaW5zdGFuY2VvZiBNYXRTdGVwTGFiZWwgPyB0aGlzLmxhYmVsIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBob3N0IEhUTUwgZWxlbWVudC4gKi9cbiAgX2dldEhvc3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKiogVGVtcGxhdGUgY29udGV4dCB2YXJpYWJsZXMgdGhhdCBhcmUgZXhwb3NlZCB0byB0aGUgYG1hdFN0ZXBwZXJJY29uYCBpbnN0YW5jZXMuICovXG4gIF9nZXRJY29uQ29udGV4dCgpOiBNYXRTdGVwcGVySWNvbkNvbnRleHQge1xuICAgIHJldHVybiB7XG4gICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgIGFjdGl2ZTogdGhpcy5hY3RpdmUsXG4gICAgICBvcHRpb25hbDogdGhpcy5vcHRpb25hbCxcbiAgICB9O1xuICB9XG5cbiAgX2dldERlZmF1bHRUZXh0Rm9yU3RhdGUoc3RhdGU6IFN0ZXBTdGF0ZSk6IHN0cmluZyB7XG4gICAgaWYgKHN0YXRlID09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5pbmRleCArIDF9YDtcbiAgICB9XG4gICAgaWYgKHN0YXRlID09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuICdjcmVhdGUnO1xuICAgIH1cbiAgICBpZiAoc3RhdGUgPT0gJ2Vycm9yJykge1xuICAgICAgcmV0dXJuICd3YXJuaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWF0LXN0ZXAtaGVhZGVyLXJpcHBsZSBtYXQtZm9jdXMtaW5kaWNhdG9yXCIgbWF0UmlwcGxlXG4gICAgIFttYXRSaXBwbGVUcmlnZ2VyXT1cIl9nZXRIb3N0RWxlbWVudCgpXCJcbiAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cImRpc2FibGVSaXBwbGVcIj48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm1hdC1zdGVwLWljb24tc3RhdGUte3tzdGF0ZX19IG1hdC1zdGVwLWljb25cIiBbY2xhc3MubWF0LXN0ZXAtaWNvbi1zZWxlY3RlZF09XCJzZWxlY3RlZFwiPlxuICA8ZGl2IGNsYXNzPVwibWF0LXN0ZXAtaWNvbi1jb250ZW50XCIgW25nU3dpdGNoXT1cIiEhKGljb25PdmVycmlkZXMgJiYgaWNvbk92ZXJyaWRlc1tzdGF0ZV0pXCI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nU3dpdGNoQ2FzZT1cInRydWVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaWNvbk92ZXJyaWRlc1tzdGF0ZV1cIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIl9nZXRJY29uQ29udGV4dCgpXCI+PC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0IFtuZ1N3aXRjaF09XCJzdGF0ZVwiPlxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCI+e3tfZ2V0RGVmYXVsdFRleHRGb3JTdGF0ZShzdGF0ZSl9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY2RrLXZpc3VhbGx5LWhpZGRlblwiICpuZ0lmPVwic3RhdGUgPT09ICdkb25lJ1wiPnt7X2ludGwuY29tcGxldGVkTGFiZWx9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY2RrLXZpc3VhbGx5LWhpZGRlblwiICpuZ0lmPVwic3RhdGUgPT09ICdlZGl0J1wiPnt7X2ludGwuZWRpdGFibGVMYWJlbH19PC9zcGFuPlxuICAgICAgPG1hdC1pY29uIGFyaWEtaGlkZGVuPVwidHJ1ZVwiICpuZ1N3aXRjaERlZmF1bHQ+e3tfZ2V0RGVmYXVsdFRleHRGb3JTdGF0ZShzdGF0ZSl9fTwvbWF0LWljb24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibWF0LXN0ZXAtbGFiZWxcIlxuICAgICBbY2xhc3MubWF0LXN0ZXAtbGFiZWwtYWN0aXZlXT1cImFjdGl2ZVwiXG4gICAgIFtjbGFzcy5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgIFtjbGFzcy5tYXQtc3RlcC1sYWJlbC1lcnJvcl09XCJzdGF0ZSA9PSAnZXJyb3InXCI+XG4gIDwhLS0gSWYgdGhlcmUgaXMgYSBsYWJlbCB0ZW1wbGF0ZSwgdXNlIGl0LiAtLT5cbiAgPGRpdiBjbGFzcz1cIm1hdC1zdGVwLXRleHQtbGFiZWxcIiAqbmdJZj1cIl90ZW1wbGF0ZUxhYmVsKClcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIl90ZW1wbGF0ZUxhYmVsKCkhLnRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuICA8IS0tIElmIHRoZXJlIGlzIG5vIGxhYmVsIHRlbXBsYXRlLCBmYWxsIGJhY2sgdG8gdGhlIHRleHQgbGFiZWwuIC0tPlxuICA8ZGl2IGNsYXNzPVwibWF0LXN0ZXAtdGV4dC1sYWJlbFwiICpuZ0lmPVwiX3N0cmluZ0xhYmVsKClcIj57e2xhYmVsfX08L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwibWF0LXN0ZXAtb3B0aW9uYWxcIiAqbmdJZj1cIm9wdGlvbmFsICYmIHN0YXRlICE9ICdlcnJvcidcIj57e19pbnRsLm9wdGlvbmFsTGFiZWx9fTwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWF0LXN0ZXAtc3ViLWxhYmVsLWVycm9yXCIgKm5nSWY9XCJzdGF0ZSA9PSAnZXJyb3InXCI+e3tlcnJvck1lc3NhZ2V9fTwvZGl2PlxuPC9kaXY+XG5cbiJdfQ==
