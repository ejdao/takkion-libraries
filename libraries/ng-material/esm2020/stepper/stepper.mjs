/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@takkion/ng-cdk/bidi';
import { CdkStep, CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@takkion/ng-cdk/stepper';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ErrorStateMatcher } from '@takkion/ng-material/core';
import { TemplatePortal } from '@takkion/ng-cdk/portal';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { TakStepHeader } from './step-header';
import { TakStepLabel } from './step-label';
import {
  DEFAULT_HORIZONTAL_ANIMATION_DURATION,
  DEFAULT_VERTICAL_ANIMATION_DURATION,
  takStepperAnimations,
} from './stepper-animations';
import { TakStepperIcon } from './stepper-icon';
import { TakStepContent } from './step-content';
import * as i0 from '@angular/core';
import * as i1 from '@takkion/ng-material/core';
import * as i2 from '@takkion/ng-cdk/portal';
import * as i3 from '@takkion/ng-cdk/bidi';
import * as i4 from '@angular/common';
import * as i5 from './step-header';
export class TakStep extends CdkStep {
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
      type: i2.CdkPortalOutlet,
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
export class TakStepper extends CdkStepper {
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
    { token: i3.Directionality, optional: true },
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
      type: i4.NgForOf,
      selector: '[ngFor][ngForOf]',
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
    {
      kind: 'directive',
      type: i4.NgIf,
      selector: '[ngIf]',
      inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
    },
    {
      kind: 'directive',
      type: i4.NgTemplateOutlet,
      selector: '[ngTemplateOutlet]',
      inputs: ['ngTemplateOutletContext', 'ngTemplateOutlet', 'ngTemplateOutletInjector'],
    },
    { kind: 'directive', type: i4.NgSwitch, selector: '[ngSwitch]', inputs: ['ngSwitch'] },
    {
      kind: 'directive',
      type: i4.NgSwitchCase,
      selector: '[ngSwitchCase]',
      inputs: ['ngSwitchCase'],
    },
    {
      kind: 'component',
      type: i5.TakStepHeader,
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
        type: i3.Directionality,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zdGVwcGVyL3N0ZXBwZXIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc3RlcHBlci9zdGVwLmh0bWwiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc3RlcHBlci9zdGVwcGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUVWLHNCQUFzQixHQUV2QixNQUFNLHNCQUFzQixDQUFDO0FBRTlCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUVSLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFDTCxx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aEQsWUFBWTt1QkFBQyxhQUFhO2dCQUc2QixNQUFNO3NCQUE3RCxlQUFlO3VCQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7Z0JBTVMsTUFBTTtzQkFBM0QsZUFBZTt1QkFBQyxjQUFjLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDO2dCQUdqQyxhQUFhO3NCQUEvQixNQUFNO2dCQUdFLGFBQWE7c0JBQXJCLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQU9OLGFBQWE7c0JBRFosS0FBSztnQkFRTixjQUFjO3NCQURiLEtBQUs7Z0JBV0YsaUJBQWlCO3NCQURwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENka1N0ZXAsXG4gIENka1N0ZXBwZXIsXG4gIFN0ZXBDb250ZW50UG9zaXRpb25TdGF0ZSxcbiAgU1RFUFBFUl9HTE9CQUxfT1BUSU9OUyxcbiAgU3RlcHBlck9wdGlvbnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7QW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTa2lwU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdGb3JtfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vycm9yU3RhdGVNYXRjaGVyLCBUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtUZW1wbGF0ZVBvcnRhbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbCwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtNYXRTdGVwSGVhZGVyfSBmcm9tICcuL3N0ZXAtaGVhZGVyJztcbmltcG9ydCB7TWF0U3RlcExhYmVsfSBmcm9tICcuL3N0ZXAtbGFiZWwnO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9IT1JJWk9OVEFMX0FOSU1BVElPTl9EVVJBVElPTixcbiAgREVGQVVMVF9WRVJUSUNBTF9BTklNQVRJT05fRFVSQVRJT04sXG4gIG1hdFN0ZXBwZXJBbmltYXRpb25zLFxufSBmcm9tICcuL3N0ZXBwZXItYW5pbWF0aW9ucyc7XG5pbXBvcnQge01hdFN0ZXBwZXJJY29uLCBNYXRTdGVwcGVySWNvbkNvbnRleHR9IGZyb20gJy4vc3RlcHBlci1pY29uJztcbmltcG9ydCB7TWF0U3RlcENvbnRlbnR9IGZyb20gJy4vc3RlcC1jb250ZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXN0ZXAnLFxuICB0ZW1wbGF0ZVVybDogJ3N0ZXAuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBFcnJvclN0YXRlTWF0Y2hlciwgdXNlRXhpc3Rpbmc6IE1hdFN0ZXB9LFxuICAgIHtwcm92aWRlOiBDZGtTdGVwLCB1c2VFeGlzdGluZzogTWF0U3RlcH0sXG4gIF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0U3RlcCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTdGVwIGV4dGVuZHMgQ2RrU3RlcCBpbXBsZW1lbnRzIEVycm9yU3RhdGVNYXRjaGVyLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9pc1NlbGVjdGVkID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBDb250ZW50IGZvciBzdGVwIGxhYmVsIGdpdmVuIGJ5IGA8bmctdGVtcGxhdGUgbWF0U3RlcExhYmVsPmAuICovXG4gIEBDb250ZW50Q2hpbGQoTWF0U3RlcExhYmVsKSBvdmVycmlkZSBzdGVwTGFiZWw6IE1hdFN0ZXBMYWJlbDtcblxuICAvKiogVGhlbWUgY29sb3IgZm9yIHRoZSBwYXJ0aWN1bGFyIHN0ZXAuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgLyoqIENvbnRlbnQgdGhhdCB3aWxsIGJlIHJlbmRlcmVkIGxhemlseS4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRTdGVwQ29udGVudCwge3N0YXRpYzogZmFsc2V9KSBfbGF6eUNvbnRlbnQ6IE1hdFN0ZXBDb250ZW50O1xuXG4gIC8qKiBDdXJyZW50bHktYXR0YWNoZWQgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIGxhenkgY29udGVudC4gKi9cbiAgX3BvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdFN0ZXBwZXIpKSBzdGVwcGVyOiBNYXRTdGVwcGVyLFxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgX2Vycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU1RFUFBFUl9HTE9CQUxfT1BUSU9OUykgc3RlcHBlck9wdGlvbnM/OiBTdGVwcGVyT3B0aW9ucyxcbiAgKSB7XG4gICAgc3VwZXIoc3RlcHBlciwgc3RlcHBlck9wdGlvbnMpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2lzU2VsZWN0ZWQgPSB0aGlzLl9zdGVwcGVyLnN0ZXBzLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9zdGVwcGVyLnNlbGVjdGlvbkNoYW5nZS5waXBlKFxuICAgICAgICAgICAgbWFwKGV2ZW50ID0+IGV2ZW50LnNlbGVjdGVkU3RlcCA9PT0gdGhpcyksXG4gICAgICAgICAgICBzdGFydFdpdGgodGhpcy5fc3RlcHBlci5zZWxlY3RlZCA9PT0gdGhpcyksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGlzU2VsZWN0ZWQgPT4ge1xuICAgICAgICBpZiAoaXNTZWxlY3RlZCAmJiB0aGlzLl9sYXp5Q29udGVudCAmJiAhdGhpcy5fcG9ydGFsKSB7XG4gICAgICAgICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX2xhenlDb250ZW50Ll90ZW1wbGF0ZSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZiEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2lzU2VsZWN0ZWQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKiBDdXN0b20gZXJyb3Igc3RhdGUgbWF0Y2hlciB0aGF0IGFkZGl0aW9uYWxseSBjaGVja3MgZm9yIHZhbGlkaXR5IG9mIGludGVyYWN0ZWQgZm9ybS4gKi9cbiAgaXNFcnJvclN0YXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IG51bGwsIGZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSB8IE5nRm9ybSB8IG51bGwpOiBib29sZWFuIHtcbiAgICBjb25zdCBvcmlnaW5hbEVycm9yU3RhdGUgPSB0aGlzLl9lcnJvclN0YXRlTWF0Y2hlci5pc0Vycm9yU3RhdGUoY29udHJvbCwgZm9ybSk7XG5cbiAgICAvLyBDdXN0b20gZXJyb3Igc3RhdGUgY2hlY2tzIGZvciB0aGUgdmFsaWRpdHkgb2YgZm9ybSB0aGF0IGlzIG5vdCBzdWJtaXR0ZWQgb3IgdG91Y2hlZFxuICAgIC8vIHNpbmNlIHVzZXIgY2FuIHRyaWdnZXIgYSBmb3JtIGNoYW5nZSBieSBjYWxsaW5nIGZvciBhbm90aGVyIHN0ZXAgd2l0aG91dCBkaXJlY3RseVxuICAgIC8vIGludGVyYWN0aW5nIHdpdGggdGhlIGN1cnJlbnQgZm9ybS5cbiAgICBjb25zdCBjdXN0b21FcnJvclN0YXRlID0gISEoY29udHJvbCAmJiBjb250cm9sLmludmFsaWQgJiYgdGhpcy5pbnRlcmFjdGVkKTtcblxuICAgIHJldHVybiBvcmlnaW5hbEVycm9yU3RhdGUgfHwgY3VzdG9tRXJyb3JTdGF0ZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc3RlcHBlciwgbWF0LXZlcnRpY2FsLXN0ZXBwZXIsIG1hdC1ob3Jpem9udGFsLXN0ZXBwZXIsIFttYXRTdGVwcGVyXScsXG4gIGV4cG9ydEFzOiAnbWF0U3RlcHBlciwgbWF0VmVydGljYWxTdGVwcGVyLCBtYXRIb3Jpem9udGFsU3RlcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnc3RlcHBlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3N0ZXBwZXIuY3NzJ10sXG4gIGlucHV0czogWydzZWxlY3RlZEluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1zdGVwcGVyLWhvcml6b250YWxdJzogJ29yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5tYXQtc3RlcHBlci12ZXJ0aWNhbF0nOiAnb3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIicsXG4gICAgJ1tjbGFzcy5tYXQtc3RlcHBlci1sYWJlbC1wb3NpdGlvbi1lbmRdJzpcbiAgICAgICdvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgJiYgbGFiZWxQb3NpdGlvbiA9PSBcImVuZFwiJyxcbiAgICAnW2NsYXNzLm1hdC1zdGVwcGVyLWxhYmVsLXBvc2l0aW9uLWJvdHRvbV0nOlxuICAgICAgJ29yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiAmJiBsYWJlbFBvc2l0aW9uID09IFwiYm90dG9tXCInLFxuICAgICdbY2xhc3MubWF0LXN0ZXBwZXItaGVhZGVyLXBvc2l0aW9uLWJvdHRvbV0nOiAnaGVhZGVyUG9zaXRpb24gPT09IFwiYm90dG9tXCInLFxuICAgICdbYXR0ci5hcmlhLW9yaWVudGF0aW9uXSc6ICdvcmllbnRhdGlvbicsXG4gICAgJ3JvbGUnOiAndGFibGlzdCcsXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICBtYXRTdGVwcGVyQW5pbWF0aW9ucy5ob3Jpem9udGFsU3RlcFRyYW5zaXRpb24sXG4gICAgbWF0U3RlcHBlckFuaW1hdGlvbnMudmVydGljYWxTdGVwVHJhbnNpdGlvbixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1N0ZXBwZXIsIHVzZUV4aXN0aW5nOiBNYXRTdGVwcGVyfV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTdGVwcGVyIGV4dGVuZHMgQ2RrU3RlcHBlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKiogVGhlIGxpc3Qgb2Ygc3RlcCBoZWFkZXJzIG9mIHRoZSBzdGVwcyBpbiB0aGUgc3RlcHBlci4gKi9cbiAgQFZpZXdDaGlsZHJlbihNYXRTdGVwSGVhZGVyKSBvdmVycmlkZSBfc3RlcEhlYWRlcjogUXVlcnlMaXN0PE1hdFN0ZXBIZWFkZXI+O1xuXG4gIC8qKiBGdWxsIGxpc3Qgb2Ygc3RlcHMgaW5zaWRlIHRoZSBzdGVwcGVyLCBpbmNsdWRpbmcgaW5zaWRlIG5lc3RlZCBzdGVwcGVycy4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRTdGVwLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBvdmVycmlkZSBfc3RlcHM6IFF1ZXJ5TGlzdDxNYXRTdGVwPjtcblxuICAvKiogU3RlcHMgdGhhdCBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgc3RlcHBlciwgZXhjbHVkaW5nIG9uZXMgZnJvbSBuZXN0ZWQgc3RlcHBlcnMuICovXG4gIG92ZXJyaWRlIHJlYWRvbmx5IHN0ZXBzOiBRdWVyeUxpc3Q8TWF0U3RlcD4gPSBuZXcgUXVlcnlMaXN0PE1hdFN0ZXA+KCk7XG5cbiAgLyoqIEN1c3RvbSBpY29uIG92ZXJyaWRlcyBwYXNzZWQgaW4gYnkgdGhlIGNvbnN1bWVyLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE1hdFN0ZXBwZXJJY29uLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfaWNvbnM6IFF1ZXJ5TGlzdDxNYXRTdGVwcGVySWNvbj47XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY3VycmVudCBzdGVwIGlzIGRvbmUgdHJhbnNpdGlvbmluZyBpbi4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGFuaW1hdGlvbkRvbmU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogV2hldGhlciByaXBwbGVzIHNob3VsZCBiZSBkaXNhYmxlZCBmb3IgdGhlIHN0ZXAgaGVhZGVycy4gKi9cbiAgQElucHV0KCkgZGlzYWJsZVJpcHBsZTogYm9vbGVhbjtcblxuICAvKiogVGhlbWUgY29sb3IgZm9yIGFsbCBvZiB0aGUgc3RlcHMgaW4gc3RlcHBlci4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGRpc3BsYXkgaW4gYm90dG9tIG9yIGVuZCBwb3NpdGlvbi5cbiAgICogT25seSBhcHBsaWVzIGluIHRoZSBgaG9yaXpvbnRhbGAgb3JpZW50YXRpb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBsYWJlbFBvc2l0aW9uOiAnYm90dG9tJyB8ICdlbmQnID0gJ2VuZCc7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIG9mIHRoZSBzdGVwcGVyJ3MgaGVhZGVyLlxuICAgKiBPbmx5IGFwcGxpZXMgaW4gdGhlIGBob3Jpem9udGFsYCBvcmllbnRhdGlvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGhlYWRlclBvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nID0gJ3RvcCc7XG5cbiAgLyoqIENvbnN1bWVyLXNwZWNpZmllZCB0ZW1wbGF0ZS1yZWZzIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGhlYWRlciBpY29ucy4gKi9cbiAgX2ljb25PdmVycmlkZXM6IFJlY29yZDxzdHJpbmcsIFRlbXBsYXRlUmVmPE1hdFN0ZXBwZXJJY29uQ29udGV4dD4+ID0ge307XG5cbiAgLyoqIFN0cmVhbSBvZiBhbmltYXRpb24gYGRvbmVgIGV2ZW50cyB3aGVuIHRoZSBib2R5IGV4cGFuZHMvY29sbGFwc2VzLiAqL1xuICByZWFkb25seSBfYW5pbWF0aW9uRG9uZSA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gIC8qKiBEdXJhdGlvbiBmb3IgdGhlIGFuaW1hdGlvbi4gV2lsbCBiZSBub3JtYWxpemVkIHRvIG1pbGxpc2Vjb25kcyBpZiBubyB1bml0cyBhcmUgc2V0LiAqL1xuICBASW5wdXQoKVxuICBnZXQgYW5pbWF0aW9uRHVyYXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uRHVyYXRpb247XG4gIH1cbiAgc2V0IGFuaW1hdGlvbkR1cmF0aW9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hbmltYXRpb25EdXJhdGlvbiA9IC9eXFxkKyQvLnRlc3QodmFsdWUpID8gdmFsdWUgKyAnbXMnIDogdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uRHVyYXRpb24gPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgKSB7XG4gICAgc3VwZXIoZGlyLCBjaGFuZ2VEZXRlY3RvclJlZiwgZWxlbWVudFJlZik7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gbm9kZU5hbWUgPT09ICdtYXQtdmVydGljYWwtc3RlcHBlcicgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuICAgIHRoaXMuX2ljb25zLmZvckVhY2goKHtuYW1lLCB0ZW1wbGF0ZVJlZn0pID0+ICh0aGlzLl9pY29uT3ZlcnJpZGVzW25hbWVdID0gdGVtcGxhdGVSZWYpKTtcblxuICAgIC8vIE1hcmsgdGhlIGNvbXBvbmVudCBmb3IgY2hhbmdlIGRldGVjdGlvbiB3aGVuZXZlciB0aGUgY29udGVudCBjaGlsZHJlbiBxdWVyeSBjaGFuZ2VzXG4gICAgdGhpcy5zdGVwcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2FuaW1hdGlvbkRvbmVcbiAgICAgIC5waXBlKFxuICAgICAgICAvLyBUaGlzIG5lZWRzIGEgYGRpc3RpbmN0VW50aWxDaGFuZ2VkYCBpbiBvcmRlciB0byBhdm9pZCBlbWl0dGluZyB0aGUgc2FtZSBldmVudCB0d2ljZSBkdWVcbiAgICAgICAgLy8gdG8gYSBidWcgaW4gYW5pbWF0aW9ucyB3aGVyZSB0aGUgYC5kb25lYCBjYWxsYmFjayBnZXRzIGludm9rZWQgdHdpY2Ugb24gc29tZSBicm93c2Vycy5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0MDg0XG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB4LmZyb21TdGF0ZSA9PT0geS5mcm9tU3RhdGUgJiYgeC50b1N0YXRlID09PSB5LnRvU3RhdGUpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoKGV2ZW50LnRvU3RhdGUgYXMgU3RlcENvbnRlbnRQb3NpdGlvblN0YXRlKSA9PT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25Eb25lLmVtaXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBfc3RlcElzTmF2aWdhYmxlKGluZGV4OiBudW1iZXIsIHN0ZXA6IE1hdFN0ZXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gc3RlcC5jb21wbGV0ZWQgfHwgdGhpcy5zZWxlY3RlZEluZGV4ID09PSBpbmRleCB8fCAhdGhpcy5saW5lYXI7XG4gIH1cblxuICBfZ2V0QW5pbWF0aW9uRHVyYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRHVyYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcbiAgICAgID8gREVGQVVMVF9IT1JJWk9OVEFMX0FOSU1BVElPTl9EVVJBVElPTlxuICAgICAgOiBERUZBVUxUX1ZFUlRJQ0FMX0FOSU1BVElPTl9EVVJBVElPTjtcbiAgfVxufVxuIiwiPG5nLXRlbXBsYXRlPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cIl9wb3J0YWxcIj48L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cbiIsIjxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm9yaWVudGF0aW9uXCI+XG4gIDwhLS0gSG9yaXpvbnRhbCBzdGVwcGVyIC0tPlxuICA8ZGl2IGNsYXNzPVwibWF0LWhvcml6b250YWwtc3RlcHBlci13cmFwcGVyXCIgKm5nU3dpdGNoQ2FzZT1cIidob3Jpem9udGFsJ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXQtaG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlci1jb250YWluZXJcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHN0ZXAgb2Ygc3RlcHM7IGxldCBpID0gaW5kZXg7IGxldCBpc0xhc3QgPSBsYXN0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGVwVGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7c3RlcDogc3RlcCwgaTogaX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiFpc0xhc3RcIiBjbGFzcz1cIm1hdC1zdGVwcGVyLWhvcml6b250YWwtbGluZVwiPjwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWF0LWhvcml6b250YWwtY29udGVudC1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHN0ZXAgb2Ygc3RlcHM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICBjbGFzcz1cIm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItY29udGVudFwiIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgIFtAaG9yaXpvbnRhbFN0ZXBUcmFuc2l0aW9uXT1cIntcbiAgICAgICAgICAgICAgJ3ZhbHVlJzogX2dldEFuaW1hdGlvbkRpcmVjdGlvbihpKSxcbiAgICAgICAgICAgICAgJ3BhcmFtcyc6IHsnYW5pbWF0aW9uRHVyYXRpb24nOiBfZ2V0QW5pbWF0aW9uRHVyYXRpb24oKX1cbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAoQGhvcml6b250YWxTdGVwVHJhbnNpdGlvbi5kb25lKT1cIl9hbmltYXRpb25Eb25lLm5leHQoJGV2ZW50KVwiXG4gICAgICAgICAgIFtpZF09XCJfZ2V0U3RlcENvbnRlbnRJZChpKVwiXG4gICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJfZ2V0U3RlcExhYmVsSWQoaSlcIlxuICAgICAgICAgICBbY2xhc3MubWF0LWhvcml6b250YWwtc3RlcHBlci1jb250ZW50LWluYWN0aXZlXT1cInNlbGVjdGVkSW5kZXggIT09IGlcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGVwLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8IS0tIFZlcnRpY2FsIHN0ZXBwZXIgLS0+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIid2ZXJ0aWNhbCdcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWF0LXN0ZXBcIiAqbmdGb3I9XCJsZXQgc3RlcCBvZiBzdGVwczsgbGV0IGkgPSBpbmRleDsgbGV0IGlzTGFzdCA9IGxhc3RcIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwic3RlcFRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntzdGVwOiBzdGVwLCBpOiBpfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPGRpdiBjbGFzcz1cIm1hdC12ZXJ0aWNhbC1jb250ZW50LWNvbnRhaW5lclwiIFtjbGFzcy5tYXQtc3RlcHBlci12ZXJ0aWNhbC1saW5lXT1cIiFpc0xhc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC12ZXJ0aWNhbC1zdGVwcGVyLWNvbnRlbnRcIiByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgICAgIFtAdmVydGljYWxTdGVwVHJhbnNpdGlvbl09XCJ7XG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogX2dldEFuaW1hdGlvbkRpcmVjdGlvbihpKSxcbiAgICAgICAgICAgICAgICAncGFyYW1zJzogeydhbmltYXRpb25EdXJhdGlvbic6IF9nZXRBbmltYXRpb25EdXJhdGlvbigpfVxuICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAoQHZlcnRpY2FsU3RlcFRyYW5zaXRpb24uZG9uZSk9XCJfYW5pbWF0aW9uRG9uZS5uZXh0KCRldmVudClcIlxuICAgICAgICAgICAgIFtpZF09XCJfZ2V0U3RlcENvbnRlbnRJZChpKVwiXG4gICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIl9nZXRTdGVwTGFiZWxJZChpKVwiXG4gICAgICAgICAgICAgW2NsYXNzLm1hdC12ZXJ0aWNhbC1zdGVwcGVyLWNvbnRlbnQtaW5hY3RpdmVdPVwic2VsZWN0ZWRJbmRleCAhPT0gaVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXQtdmVydGljYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGVwLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG5cbjwvbmctY29udGFpbmVyPlxuXG48IS0tIENvbW1vbiBzdGVwIHRlbXBsYXRpbmcgLS0+XG48bmctdGVtcGxhdGUgbGV0LXN0ZXA9XCJzdGVwXCIgbGV0LWk9XCJpXCIgI3N0ZXBUZW1wbGF0ZT5cbiAgPG1hdC1zdGVwLWhlYWRlclxuICAgIFtjbGFzcy5tYXQtaG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlcl09XCJvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXCJcbiAgICBbY2xhc3MubWF0LXZlcnRpY2FsLXN0ZXBwZXItaGVhZGVyXT1cIm9yaWVudGF0aW9uID09PSAndmVydGljYWwnXCJcbiAgICAoY2xpY2spPVwic3RlcC5zZWxlY3QoKVwiXG4gICAgKGtleWRvd24pPVwiX29uS2V5ZG93bigkZXZlbnQpXCJcbiAgICBbdGFiSW5kZXhdPVwiX2dldEZvY3VzSW5kZXgoKSA9PT0gaSA/IDAgOiAtMVwiXG4gICAgW2lkXT1cIl9nZXRTdGVwTGFiZWxJZChpKVwiXG4gICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJpICsgMVwiXG4gICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cInN0ZXBzLmxlbmd0aFwiXG4gICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJfZ2V0U3RlcENvbnRlbnRJZChpKVwiXG4gICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzZWxlY3RlZEluZGV4ID09IGlcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwic3RlcC5hcmlhTGFiZWwgfHwgbnVsbFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIighc3RlcC5hcmlhTGFiZWwgJiYgc3RlcC5hcmlhTGFiZWxsZWRieSkgPyBzdGVwLmFyaWFMYWJlbGxlZGJ5IDogbnVsbFwiXG4gICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJfc3RlcElzTmF2aWdhYmxlKGksIHN0ZXApID8gbnVsbCA6IHRydWVcIlxuICAgIFtpbmRleF09XCJpXCJcbiAgICBbc3RhdGVdPVwiX2dldEluZGljYXRvclR5cGUoaSwgc3RlcC5zdGF0ZSlcIlxuICAgIFtsYWJlbF09XCJzdGVwLnN0ZXBMYWJlbCB8fCBzdGVwLmxhYmVsXCJcbiAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRJbmRleCA9PT0gaVwiXG4gICAgW2FjdGl2ZV09XCJfc3RlcElzTmF2aWdhYmxlKGksIHN0ZXApXCJcbiAgICBbb3B0aW9uYWxdPVwic3RlcC5vcHRpb25hbFwiXG4gICAgW2Vycm9yTWVzc2FnZV09XCJzdGVwLmVycm9yTWVzc2FnZVwiXG4gICAgW2ljb25PdmVycmlkZXNdPVwiX2ljb25PdmVycmlkZXNcIlxuICAgIFtkaXNhYmxlUmlwcGxlXT1cImRpc2FibGVSaXBwbGUgfHwgIV9zdGVwSXNOYXZpZ2FibGUoaSwgc3RlcClcIlxuICAgIFtjb2xvcl09XCJzdGVwLmNvbG9yIHx8IGNvbG9yXCI+PC9tYXQtc3RlcC1oZWFkZXI+XG48L25nLXRlbXBsYXRlPlxuIl19
