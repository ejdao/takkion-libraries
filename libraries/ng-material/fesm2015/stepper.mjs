import * as i2$1 from '@takkion/ng-cdk/portal';
import { TemplatePortal, PortalModule } from '@takkion/ng-cdk/portal';
import {
  CdkStepLabel,
  CdkStepHeader,
  CdkStep,
  STEPPER_GLOBAL_OPTIONS,
  CdkStepper,
  CdkStepperNext,
  CdkStepperPrevious,
  CdkStepperModule,
} from '@takkion/ng-cdk/stepper';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import {
  Directive,
  Injectable,
  Optional,
  SkipSelf,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  Inject,
  ContentChild,
  QueryList,
  EventEmitter,
  ViewChildren,
  ContentChildren,
  Output,
  NgModule,
} from '@angular/core';
import { TakButtonModule } from '@takkion/ng-material/button';
import * as i1 from '@takkion/ng-material/core';
import {
  mixinColor,
  ErrorStateMatcher,
  TakCommonModule,
  TakRippleModule,
} from '@takkion/ng-material/core';
import * as i4 from '@takkion/ng-material/icon';
import { TakIconModule } from '@takkion/ng-material/icon';
import { Subject, Subscription } from 'rxjs';
import * as i2 from '@takkion/ng-cdk/a11y';
import { switchMap, map, startWith, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i3$1 from '@takkion/ng-cdk/bidi';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakStepLabel extends CdkStepLabel {}
TakStepLabel.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepLabel,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakStepLabel.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStepLabel,
  selector: '[takStepLabel]',
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepLabel,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takStepLabel]',
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
/** Stepper data that is required for internationalization. */
class TakStepperIntl {
  constructor() {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    this.changes = new Subject();
    /** Label that is rendered below optional steps. */
    this.optionalLabel = 'Optional';
    /** Label that is used to indicate step as completed to screen readers. */
    this.completedLabel = 'Completed';
    /** Label that is used to indicate step as editable to screen readers. */
    this.editableLabel = 'Editable';
  }
}
TakStepperIntl.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperIntl,
  deps: [],
  target: i0.ɵɵFactoryTarget.Injectable,
});
TakStepperIntl.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperIntl,
  providedIn: 'root',
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperIntl,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
    },
  ],
});
/** @docs-private */
function TAK_STEPPER_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new TakStepperIntl();
}
/** @docs-private */
const TAK_STEPPER_INTL_PROVIDER = {
  provide: TakStepperIntl,
  deps: [[new Optional(), new SkipSelf(), TakStepperIntl]],
  useFactory: TAK_STEPPER_INTL_PROVIDER_FACTORY,
};

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
class TakStepHeader extends _TakStepHeaderBase {
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
    { token: TakStepperIntl },
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
      { type: TakStepperIntl },
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

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const DEFAULT_HORIZONTAL_ANIMATION_DURATION = '500ms';
const DEFAULT_VERTICAL_ANIMATION_DURATION = '225ms';
/**
 * Animations used by the Material steppers.
 * @docs-private
 */
const takStepperAnimations = {
  /** Animation that transitions the step along the X axis in a horizontal stepper. */
  horizontalStepTransition: trigger('horizontalStepTransition', [
    state('previous', style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state('current', style({ transform: 'none', visibility: 'inherit' })),
    state('next', style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' })),
    transition('* => *', animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)'), {
      params: { animationDuration: DEFAULT_HORIZONTAL_ANIMATION_DURATION },
    }),
  ]),
  /** Animation that transitions the step along the Y axis in a vertical stepper. */
  verticalStepTransition: trigger('verticalStepTransition', [
    state('previous', style({ height: '0px', visibility: 'hidden' })),
    state('next', style({ height: '0px', visibility: 'hidden' })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state('current', style({ height: '*', visibility: 'inherit' })),
    transition('* <=> current', animate('{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)'), {
      params: { animationDuration: DEFAULT_VERTICAL_ANIMATION_DURATION },
    }),
  ]),
};

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Template to be used to override the icons inside the step header.
 */
class TakStepperIcon {
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
}
TakStepperIcon.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperIcon,
  deps: [{ token: i0.TemplateRef }],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakStepperIcon.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStepperIcon,
  selector: 'ng-template[takStepperIcon]',
  inputs: { name: ['takStepperIcon', 'name'] },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperIcon,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'ng-template[takStepperIcon]',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i0.TemplateRef }];
  },
  propDecorators: {
    name: [
      {
        type: Input,
        args: ['takStepperIcon'],
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
/**
 * Content for a `tak-step` that will be rendered lazily.
 */
class TakStepContent {
  constructor(_template) {
    this._template = _template;
  }
}
TakStepContent.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepContent,
  deps: [{ token: i0.TemplateRef }],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakStepContent.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStepContent,
  selector: 'ng-template[takStepContent]',
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepContent,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'ng-template[takStepContent]',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i0.TemplateRef }];
  },
});

class TakStep extends CdkStep {
  constructor(stepper, _errorStateMatcher, _viewContainerRef, stepperOptions) {
    super(stepper, stepperOptions);
    this._errorStateMatcher = _errorStateMatcher;
    this._viewContainerRef = _viewContainerRef;
    this._isSelected = Subscription.EMPTY;
  }
  ngAfterContentInit() {
    this._isSelected = this._stepper.steps.changes
      .pipe(
        switchMap(() => {
          return this._stepper.selectionChange.pipe(
            map(event => event.selectedStep === this),
            startWith(this._stepper.selected === this)
          );
        })
      )
      .subscribe(isSelected => {
        if (isSelected && this._lazyContent && !this._portal) {
          this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
        }
      });
  }
  ngOnDestroy() {
    this._isSelected.unsubscribe();
  }
  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control, form) {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);
    // Custom error state checks for the validity of form that is not submitted or touched
    // since user can trigger a form change by calling for another step without directly
    // interacting with the current form.
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }
}
TakStep.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStep,
  deps: [
    { token: forwardRef(() => TakStepper) },
    { token: i1.ErrorStateMatcher, skipSelf: true },
    { token: i0.ViewContainerRef },
    { token: STEPPER_GLOBAL_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakStep.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStep,
  selector: 'tak-step',
  inputs: { color: 'color' },
  providers: [
    { provide: ErrorStateMatcher, useExisting: TakStep },
    { provide: CdkStep, useExisting: TakStep },
  ],
  queries: [
    { propertyName: 'stepLabel', first: true, predicate: TakStepLabel, descendants: true },
    { propertyName: '_lazyContent', first: true, predicate: TakStepContent, descendants: true },
  ],
  exportAs: ['takStep'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<ng-template>\n  <ng-content></ng-content>\n  <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n</ng-template>\n',
  dependencies: [
    {
      kind: 'directive',
      type: i2$1.CdkPortalOutlet,
      selector: '[cdkPortalOutlet]',
      inputs: ['cdkPortalOutlet'],
      outputs: ['attached'],
      exportAs: ['cdkPortalOutlet'],
    },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStep,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-step',
          providers: [
            { provide: ErrorStateMatcher, useExisting: TakStep },
            { provide: CdkStep, useExisting: TakStep },
          ],
          encapsulation: ViewEncapsulation.None,
          exportAs: 'takStep',
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<ng-template>\n  <ng-content></ng-content>\n  <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n</ng-template>\n',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: TakStepper,
        decorators: [
          {
            type: Inject,
            args: [forwardRef(() => TakStepper)],
          },
        ],
      },
      {
        type: i1.ErrorStateMatcher,
        decorators: [
          {
            type: SkipSelf,
          },
        ],
      },
      { type: i0.ViewContainerRef },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [STEPPER_GLOBAL_OPTIONS],
          },
        ],
      },
    ];
  },
  propDecorators: {
    stepLabel: [
      {
        type: ContentChild,
        args: [TakStepLabel],
      },
    ],
    color: [
      {
        type: Input,
      },
    ],
    _lazyContent: [
      {
        type: ContentChild,
        args: [TakStepContent, { static: false }],
      },
    ],
  },
});
class TakStepper extends CdkStepper {
  constructor(dir, changeDetectorRef, elementRef) {
    super(dir, changeDetectorRef, elementRef);
    /** Steps that belong to the current stepper, excluding ones from nested steppers. */
    this.steps = new QueryList();
    /** Event emitted when the current step is done transitioning in. */
    this.animationDone = new EventEmitter();
    /**
     * Whether the label should display in bottom or end position.
     * Only applies in the `horizontal` orientation.
     */
    this.labelPosition = 'end';
    /**
     * Position of the stepper's header.
     * Only applies in the `horizontal` orientation.
     */
    this.headerPosition = 'top';
    /** Consumer-specified template-refs to be used to override the header icons. */
    this._iconOverrides = {};
    /** Stream of animation `done` events when the body expands/collapses. */
    this._animationDone = new Subject();
    this._animationDuration = '';
    const nodeName = elementRef.nativeElement.nodeName.toLowerCase();
    this.orientation = nodeName === 'tak-vertical-stepper' ? 'vertical' : 'horizontal';
  }
  /** Duration for the animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value) ? value + 'ms' : value;
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._icons.forEach(({ name, templateRef }) => (this._iconOverrides[name] = templateRef));
    // Mark the component for change detection whenever the content children query changes
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
    this._animationDone
      .pipe(
        // This needs a `distinctUntilChanged` in order to avoid emitting the same event twice due
        // to a bug in animations where the `.done` callback gets invoked twice on some browsers.
        // See https://github.com/angular/angular/issues/24084
        distinctUntilChanged((x, y) => x.fromState === y.fromState && x.toState === y.toState),
        takeUntil(this._destroyed)
      )
      .subscribe(event => {
        if (event.toState === 'current') {
          this.animationDone.emit();
        }
      });
  }
  _stepIsNavigable(index, step) {
    return step.completed || this.selectedIndex === index || !this.linear;
  }
  _getAnimationDuration() {
    if (this.animationDuration) {
      return this.animationDuration;
    }
    return this.orientation === 'horizontal'
      ? DEFAULT_HORIZONTAL_ANIMATION_DURATION
      : DEFAULT_VERTICAL_ANIMATION_DURATION;
  }
}
TakStepper.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepper,
  deps: [
    { token: i3$1.Directionality, optional: true },
    { token: i0.ChangeDetectorRef },
    { token: i0.ElementRef },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakStepper.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStepper,
  selector: 'tak-stepper, tak-vertical-stepper, tak-horizontal-stepper, [takStepper]',
  inputs: {
    selectedIndex: 'selectedIndex',
    disableRipple: 'disableRipple',
    color: 'color',
    labelPosition: 'labelPosition',
    headerPosition: 'headerPosition',
    animationDuration: 'animationDuration',
  },
  outputs: { animationDone: 'animationDone' },
  host: {
    attributes: { role: 'tablist' },
    properties: {
      'class.tak-stepper-horizontal': 'orientation === "horizontal"',
      'class.tak-stepper-vertical': 'orientation === "vertical"',
      'class.tak-stepper-label-position-end':
        'orientation === "horizontal" && labelPosition == "end"',
      'class.tak-stepper-label-position-bottom':
        'orientation === "horizontal" && labelPosition == "bottom"',
      'class.tak-stepper-header-position-bottom': 'headerPosition === "bottom"',
      'attr.aria-orientation': 'orientation',
    },
  },
  providers: [{ provide: CdkStepper, useExisting: TakStepper }],
  queries: [
    { propertyName: '_steps', predicate: TakStep, descendants: true },
    { propertyName: '_icons', predicate: TakStepperIcon, descendants: true },
  ],
  viewQueries: [{ propertyName: '_stepHeader', predicate: TakStepHeader, descendants: true }],
  exportAs: ['takStepper', 'takVerticalStepper', 'takHorizontalStepper'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<ng-container [ngSwitch]="orientation">\n  <!-- Horizontal stepper -->\n  <div class="tak-horizontal-stepper-wrapper" *ngSwitchCase="\'horizontal\'">\n    <div class="tak-horizontal-stepper-header-container">\n      <ng-container *ngFor="let step of steps; let i = index; let isLast = last">\n        <ng-container\n          [ngTemplateOutlet]="stepTemplate"\n          [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>\n        <div *ngIf="!isLast" class="tak-stepper-horizontal-line"></div>\n      </ng-container>\n    </div>\n\n    <div class="tak-horizontal-content-container">\n      <div *ngFor="let step of steps; let i = index"\n           class="tak-horizontal-stepper-content" role="tabpanel"\n           [@horizontalStepTransition]="{\n              \'value\': _getAnimationDirection(i),\n              \'params\': {\'animationDuration\': _getAnimationDuration()}\n            }"\n           (@horizontalStepTransition.done)="_animationDone.next($event)"\n           [id]="_getStepContentId(i)"\n           [attr.aria-labelledby]="_getStepLabelId(i)"\n           [class.tak-horizontal-stepper-content-inactive]="selectedIndex !== i">\n        <ng-container [ngTemplateOutlet]="step.content"></ng-container>\n      </div>\n    </div>\n  </div>\n\n  <!-- Vertical stepper -->\n  <ng-container *ngSwitchCase="\'vertical\'">\n    <div class="tak-step" *ngFor="let step of steps; let i = index; let isLast = last">\n      <ng-container\n        [ngTemplateOutlet]="stepTemplate"\n        [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>\n      <div class="tak-vertical-content-container" [class.tak-stepper-vertical-line]="!isLast">\n        <div class="tak-vertical-stepper-content" role="tabpanel"\n             [@verticalStepTransition]="{\n                \'value\': _getAnimationDirection(i),\n                \'params\': {\'animationDuration\': _getAnimationDuration()}\n              }"\n             (@verticalStepTransition.done)="_animationDone.next($event)"\n             [id]="_getStepContentId(i)"\n             [attr.aria-labelledby]="_getStepLabelId(i)"\n             [class.tak-vertical-stepper-content-inactive]="selectedIndex !== i">\n          <div class="tak-vertical-content">\n            <ng-container [ngTemplateOutlet]="step.content"></ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n\n</ng-container>\n\n<!-- Common step templating -->\n<ng-template let-step="step" let-i="i" #stepTemplate>\n  <tak-step-header\n    [class.tak-horizontal-stepper-header]="orientation === \'horizontal\'"\n    [class.tak-vertical-stepper-header]="orientation === \'vertical\'"\n    (click)="step.select()"\n    (keydown)="_onKeydown($event)"\n    [tabIndex]="_getFocusIndex() === i ? 0 : -1"\n    [id]="_getStepLabelId(i)"\n    [attr.aria-posinset]="i + 1"\n    [attr.aria-setsize]="steps.length"\n    [attr.aria-controls]="_getStepContentId(i)"\n    [attr.aria-selected]="selectedIndex == i"\n    [attr.aria-label]="step.ariaLabel || null"\n    [attr.aria-labelledby]="(!step.ariaLabel && step.ariaLabelledby) ? step.ariaLabelledby : null"\n    [attr.aria-disabled]="_stepIsNavigable(i, step) ? null : true"\n    [index]="i"\n    [state]="_getIndicatorType(i, step.state)"\n    [label]="step.stepLabel || step.label"\n    [selected]="selectedIndex === i"\n    [active]="_stepIsNavigable(i, step)"\n    [optional]="step.optional"\n    [errorMessage]="step.errorMessage"\n    [iconOverrides]="_iconOverrides"\n    [disableRipple]="disableRipple || !_stepIsNavigable(i, step)"\n    [color]="step.color || color"></tak-step-header>\n</ng-template>\n',
  styles: [
    '.tak-stepper-vertical,.tak-stepper-horizontal{display:block}.tak-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header-container{align-items:flex-start}.tak-stepper-header-position-bottom .tak-horizontal-stepper-header-container{order:1}.tak-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px}.tak-stepper-label-position-bottom .tak-stepper-horizontal-line{margin:0;min-width:0;position:relative}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::before,.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.tak-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px}.tak-horizontal-stepper-header .tak-step-icon{margin-right:8px;flex:none}[dir=rtl] .tak-horizontal-stepper-header .tak-step-icon{margin-right:0;margin-left:8px}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::after{right:0}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:last-child::before,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:first-child::after{display:none}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header .tak-step-icon{margin-right:0;margin-left:0}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header .tak-step-label{padding:16px 0 0 0;text-align:center;width:100%}.tak-vertical-stepper-header{display:flex;align-items:center;height:24px}.tak-vertical-stepper-header .tak-step-icon{margin-right:12px}[dir=rtl] .tak-vertical-stepper-header .tak-step-icon{margin-right:0;margin-left:12px}.tak-horizontal-stepper-wrapper{display:flex;flex-direction:column}.tak-horizontal-stepper-content{outline:0}.tak-horizontal-stepper-content.tak-horizontal-stepper-content-inactive{height:0;overflow:hidden}.tak-horizontal-stepper-content:not(.tak-horizontal-stepper-content-inactive){visibility:inherit !important}.tak-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .tak-horizontal-content-container{outline:solid 1px}.tak-stepper-header-position-bottom .tak-horizontal-content-container{padding:24px 24px 0 24px}.tak-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .tak-vertical-content-container{outline:solid 1px}[dir=rtl] .tak-vertical-content-container{margin-left:0;margin-right:36px}.tak-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid}[dir=rtl] .tak-stepper-vertical-line::before{left:auto;right:0}.tak-vertical-stepper-content{overflow:hidden;outline:0}.tak-vertical-stepper-content:not(.tak-vertical-stepper-content-inactive){visibility:inherit !important}.tak-vertical-content{padding:0 24px 24px 24px}.tak-step:last-child .tak-vertical-content-container{border:none}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i3.NgForOf,
      selector: '[ngFor][ngForOf]',
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
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
    {
      kind: 'component',
      type: TakStepHeader,
      selector: 'tak-step-header',
      inputs: [
        'color',
        'state',
        'label',
        'errorMessage',
        'iconOverrides',
        'index',
        'selected',
        'active',
        'optional',
        'disableRipple',
      ],
    },
  ],
  animations: [
    takStepperAnimations.horizontalStepTransition,
    takStepperAnimations.verticalStepTransition,
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepper,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-stepper, tak-vertical-stepper, tak-horizontal-stepper, [takStepper]',
          exportAs: 'takStepper, takVerticalStepper, takHorizontalStepper',
          inputs: ['selectedIndex'],
          host: {
            '[class.tak-stepper-horizontal]': 'orientation === "horizontal"',
            '[class.tak-stepper-vertical]': 'orientation === "vertical"',
            '[class.tak-stepper-label-position-end]':
              'orientation === "horizontal" && labelPosition == "end"',
            '[class.tak-stepper-label-position-bottom]':
              'orientation === "horizontal" && labelPosition == "bottom"',
            '[class.tak-stepper-header-position-bottom]': 'headerPosition === "bottom"',
            '[attr.aria-orientation]': 'orientation',
            role: 'tablist',
          },
          animations: [
            takStepperAnimations.horizontalStepTransition,
            takStepperAnimations.verticalStepTransition,
          ],
          providers: [{ provide: CdkStepper, useExisting: TakStepper }],
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<ng-container [ngSwitch]="orientation">\n  <!-- Horizontal stepper -->\n  <div class="tak-horizontal-stepper-wrapper" *ngSwitchCase="\'horizontal\'">\n    <div class="tak-horizontal-stepper-header-container">\n      <ng-container *ngFor="let step of steps; let i = index; let isLast = last">\n        <ng-container\n          [ngTemplateOutlet]="stepTemplate"\n          [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>\n        <div *ngIf="!isLast" class="tak-stepper-horizontal-line"></div>\n      </ng-container>\n    </div>\n\n    <div class="tak-horizontal-content-container">\n      <div *ngFor="let step of steps; let i = index"\n           class="tak-horizontal-stepper-content" role="tabpanel"\n           [@horizontalStepTransition]="{\n              \'value\': _getAnimationDirection(i),\n              \'params\': {\'animationDuration\': _getAnimationDuration()}\n            }"\n           (@horizontalStepTransition.done)="_animationDone.next($event)"\n           [id]="_getStepContentId(i)"\n           [attr.aria-labelledby]="_getStepLabelId(i)"\n           [class.tak-horizontal-stepper-content-inactive]="selectedIndex !== i">\n        <ng-container [ngTemplateOutlet]="step.content"></ng-container>\n      </div>\n    </div>\n  </div>\n\n  <!-- Vertical stepper -->\n  <ng-container *ngSwitchCase="\'vertical\'">\n    <div class="tak-step" *ngFor="let step of steps; let i = index; let isLast = last">\n      <ng-container\n        [ngTemplateOutlet]="stepTemplate"\n        [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>\n      <div class="tak-vertical-content-container" [class.tak-stepper-vertical-line]="!isLast">\n        <div class="tak-vertical-stepper-content" role="tabpanel"\n             [@verticalStepTransition]="{\n                \'value\': _getAnimationDirection(i),\n                \'params\': {\'animationDuration\': _getAnimationDuration()}\n              }"\n             (@verticalStepTransition.done)="_animationDone.next($event)"\n             [id]="_getStepContentId(i)"\n             [attr.aria-labelledby]="_getStepLabelId(i)"\n             [class.tak-vertical-stepper-content-inactive]="selectedIndex !== i">\n          <div class="tak-vertical-content">\n            <ng-container [ngTemplateOutlet]="step.content"></ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n\n</ng-container>\n\n<!-- Common step templating -->\n<ng-template let-step="step" let-i="i" #stepTemplate>\n  <tak-step-header\n    [class.tak-horizontal-stepper-header]="orientation === \'horizontal\'"\n    [class.tak-vertical-stepper-header]="orientation === \'vertical\'"\n    (click)="step.select()"\n    (keydown)="_onKeydown($event)"\n    [tabIndex]="_getFocusIndex() === i ? 0 : -1"\n    [id]="_getStepLabelId(i)"\n    [attr.aria-posinset]="i + 1"\n    [attr.aria-setsize]="steps.length"\n    [attr.aria-controls]="_getStepContentId(i)"\n    [attr.aria-selected]="selectedIndex == i"\n    [attr.aria-label]="step.ariaLabel || null"\n    [attr.aria-labelledby]="(!step.ariaLabel && step.ariaLabelledby) ? step.ariaLabelledby : null"\n    [attr.aria-disabled]="_stepIsNavigable(i, step) ? null : true"\n    [index]="i"\n    [state]="_getIndicatorType(i, step.state)"\n    [label]="step.stepLabel || step.label"\n    [selected]="selectedIndex === i"\n    [active]="_stepIsNavigable(i, step)"\n    [optional]="step.optional"\n    [errorMessage]="step.errorMessage"\n    [iconOverrides]="_iconOverrides"\n    [disableRipple]="disableRipple || !_stepIsNavigable(i, step)"\n    [color]="step.color || color"></tak-step-header>\n</ng-template>\n',
          styles: [
            '.tak-stepper-vertical,.tak-stepper-horizontal{display:block}.tak-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header-container{align-items:flex-start}.tak-stepper-header-position-bottom .tak-horizontal-stepper-header-container{order:1}.tak-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px}.tak-stepper-label-position-bottom .tak-stepper-horizontal-line{margin:0;min-width:0;position:relative}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::before,.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.tak-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px}.tak-horizontal-stepper-header .tak-step-icon{margin-right:8px;flex:none}[dir=rtl] .tak-horizontal-stepper-header .tak-step-icon{margin-right:0;margin-left:8px}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::after{right:0}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:last-child::before,[dir=rtl] .tak-stepper-label-position-bottom .tak-horizontal-stepper-header:first-child::after{display:none}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header .tak-step-icon{margin-right:0;margin-left:0}.tak-stepper-label-position-bottom .tak-horizontal-stepper-header .tak-step-label{padding:16px 0 0 0;text-align:center;width:100%}.tak-vertical-stepper-header{display:flex;align-items:center;height:24px}.tak-vertical-stepper-header .tak-step-icon{margin-right:12px}[dir=rtl] .tak-vertical-stepper-header .tak-step-icon{margin-right:0;margin-left:12px}.tak-horizontal-stepper-wrapper{display:flex;flex-direction:column}.tak-horizontal-stepper-content{outline:0}.tak-horizontal-stepper-content.tak-horizontal-stepper-content-inactive{height:0;overflow:hidden}.tak-horizontal-stepper-content:not(.tak-horizontal-stepper-content-inactive){visibility:inherit !important}.tak-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .tak-horizontal-content-container{outline:solid 1px}.tak-stepper-header-position-bottom .tak-horizontal-content-container{padding:24px 24px 0 24px}.tak-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .tak-vertical-content-container{outline:solid 1px}[dir=rtl] .tak-vertical-content-container{margin-left:0;margin-right:36px}.tak-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid}[dir=rtl] .tak-stepper-vertical-line::before{left:auto;right:0}.tak-vertical-stepper-content{overflow:hidden;outline:0}.tak-vertical-stepper-content:not(.tak-vertical-stepper-content-inactive){visibility:inherit !important}.tak-vertical-content{padding:0 24px 24px 24px}.tak-step:last-child .tak-vertical-content-container{border:none}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: i3$1.Directionality,
        decorators: [
          {
            type: Optional,
          },
        ],
      },
      { type: i0.ChangeDetectorRef },
      { type: i0.ElementRef },
    ];
  },
  propDecorators: {
    _stepHeader: [
      {
        type: ViewChildren,
        args: [TakStepHeader],
      },
    ],
    _steps: [
      {
        type: ContentChildren,
        args: [TakStep, { descendants: true }],
      },
    ],
    _icons: [
      {
        type: ContentChildren,
        args: [TakStepperIcon, { descendants: true }],
      },
    ],
    animationDone: [
      {
        type: Output,
      },
    ],
    disableRipple: [
      {
        type: Input,
      },
    ],
    color: [
      {
        type: Input,
      },
    ],
    labelPosition: [
      {
        type: Input,
      },
    ],
    headerPosition: [
      {
        type: Input,
      },
    ],
    animationDuration: [
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
/** Button that moves to the next step in a stepper workflow. */
class TakStepperNext extends CdkStepperNext {}
TakStepperNext.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperNext,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakStepperNext.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStepperNext,
  selector: 'button[takStepperNext]',
  inputs: { type: 'type' },
  host: { properties: { type: 'type' }, classAttribute: 'tak-stepper-next' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperNext,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'button[takStepperNext]',
          host: {
            class: 'tak-stepper-next',
            '[type]': 'type',
          },
          inputs: ['type'],
        },
      ],
    },
  ],
});
/** Button that moves to the previous step in a stepper workflow. */
class TakStepperPrevious extends CdkStepperPrevious {}
TakStepperPrevious.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperPrevious,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakStepperPrevious.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakStepperPrevious,
  selector: 'button[takStepperPrevious]',
  inputs: { type: 'type' },
  host: { properties: { type: 'type' }, classAttribute: 'tak-stepper-previous' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperPrevious,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'button[takStepperPrevious]',
          host: {
            class: 'tak-stepper-previous',
            '[type]': 'type',
          },
          inputs: ['type'],
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
class TakStepperModule {}
TakStepperModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakStepperModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperModule,
  declarations: [
    TakStep,
    TakStepLabel,
    TakStepper,
    TakStepperNext,
    TakStepperPrevious,
    TakStepHeader,
    TakStepperIcon,
    TakStepContent,
  ],
  imports: [
    TakCommonModule,
    CommonModule,
    PortalModule,
    TakButtonModule,
    CdkStepperModule,
    TakIconModule,
    TakRippleModule,
  ],
  exports: [
    TakCommonModule,
    TakStep,
    TakStepLabel,
    TakStepper,
    TakStepperNext,
    TakStepperPrevious,
    TakStepHeader,
    TakStepperIcon,
    TakStepContent,
  ],
});
TakStepperModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperModule,
  providers: [TAK_STEPPER_INTL_PROVIDER, ErrorStateMatcher],
  imports: [
    TakCommonModule,
    CommonModule,
    PortalModule,
    TakButtonModule,
    CdkStepperModule,
    TakIconModule,
    TakRippleModule,
    TakCommonModule,
  ],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakStepperModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [
            TakCommonModule,
            CommonModule,
            PortalModule,
            TakButtonModule,
            CdkStepperModule,
            TakIconModule,
            TakRippleModule,
          ],
          exports: [
            TakCommonModule,
            TakStep,
            TakStepLabel,
            TakStepper,
            TakStepperNext,
            TakStepperPrevious,
            TakStepHeader,
            TakStepperIcon,
            TakStepContent,
          ],
          declarations: [
            TakStep,
            TakStepLabel,
            TakStepper,
            TakStepperNext,
            TakStepperPrevious,
            TakStepHeader,
            TakStepperIcon,
            TakStepContent,
          ],
          providers: [TAK_STEPPER_INTL_PROVIDER, ErrorStateMatcher],
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
  TAK_STEPPER_INTL_PROVIDER,
  TAK_STEPPER_INTL_PROVIDER_FACTORY,
  TakStep,
  TakStepContent,
  TakStepHeader,
  TakStepLabel,
  TakStepper,
  TakStepperIcon,
  TakStepperIntl,
  TakStepperModule,
  TakStepperNext,
  TakStepperPrevious,
  takStepperAnimations,
};
//# sourceMappingURL=stepper.mjs.map
