import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AbstractControl } from '@angular/forms';
import { AfterContentInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AnimationEvent as AnimationEvent_2 } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';
import { CanColor } from '@takkion/ng-material/core';
import { CdkStep } from '@takkion/ng-cdk/stepper';
import { CdkStepLabel } from '@takkion/ng-cdk/stepper';
import { CdkStepper } from '@takkion/ng-cdk/stepper';
import { CdkStepperNext } from '@takkion/ng-cdk/stepper';
import { CdkStepperPrevious } from '@takkion/ng-cdk/stepper';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { Directionality } from '@takkion/ng-cdk/bidi';
import { ElementRef } from '@angular/core';
import { ErrorStateMatcher } from '@takkion/ng-material/core';
import { EventEmitter } from '@angular/core';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import { FocusOrigin } from '@takkion/ng-cdk/a11y';
import { FormGroupDirective } from '@angular/forms';
import * as i0 from '@angular/core';
import * as i10 from '@takkion/ng-material/button';
import * as i11 from '@takkion/ng-cdk/stepper';
import * as i12 from '@takkion/ng-material/icon';
import * as i7 from '@takkion/ng-material/core';
import * as i8 from '@angular/common';
import * as i9 from '@takkion/ng-cdk/portal';
import { NgForm } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Optional } from '@angular/core';
import { QueryList } from '@angular/core';
import { StepperOptions } from '@takkion/ng-cdk/stepper';
import { StepperOrientation } from '@takkion/ng-cdk/stepper';
import { StepState } from '@takkion/ng-cdk/stepper';
import { Subject } from 'rxjs';
import { TemplatePortal } from '@takkion/ng-cdk/portal';
import { TemplateRef } from '@angular/core';
import { ThemePalette } from '@takkion/ng-material/core';
import { ViewContainerRef } from '@angular/core';

declare namespace i1 {
  export { TakStep, TakStepper };
}

declare namespace i2 {
  export { TakStepLabel };
}

declare namespace i3 {
  export { TakStepperNext, TakStepperPrevious };
}

declare namespace i4 {
  export { TakStepHeader };
}

declare namespace i5 {
  export { TakStepperIconContext, TakStepperIcon };
}

declare namespace i6 {
  export { TakStepContent };
}

/** @docs-private */
export declare const TAK_STEPPER_INTL_PROVIDER: {
  provide: typeof TakStepperIntl;
  deps: Optional[][];
  useFactory: typeof TAK_STEPPER_INTL_PROVIDER_FACTORY;
};

/** @docs-private */
export declare function TAK_STEPPER_INTL_PROVIDER_FACTORY(
  parentIntl: TakStepperIntl
): TakStepperIntl;

export declare class TakStep
  extends CdkStep
  implements ErrorStateMatcher, AfterContentInit, OnDestroy
{
  private _errorStateMatcher;
  private _viewContainerRef;
  private _isSelected;
  /** Content for step label given by `<ng-template takStepLabel>`. */
  stepLabel: TakStepLabel;
  /** Theme color for the particular step. */
  color: ThemePalette;
  /** Content that will be rendered lazily. */
  _lazyContent: TakStepContent;
  /** Currently-attached portal containing the lazy content. */
  _portal: TemplatePortal;
  constructor(
    stepper: TakStepper,
    _errorStateMatcher: ErrorStateMatcher,
    _viewContainerRef: ViewContainerRef,
    stepperOptions?: StepperOptions
  );
  ngAfterContentInit(): void;
  ngOnDestroy(): void;
  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakStep,
    [null, { skipSelf: true }, null, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakStep,
    'tak-step',
    ['takStep'],
    { color: 'color' },
    {},
    ['stepLabel', '_lazyContent'],
    ['*'],
    false
  >;
}

/**
 * Content for a `tak-step` that will be rendered lazily.
 */
export declare class TakStepContent {
  _template: TemplateRef<any>;
  constructor(_template: TemplateRef<any>);
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepContent, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakStepContent,
    'ng-template[takStepContent]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export declare class TakStepHeader
  extends _TakStepHeaderBase
  implements AfterViewInit, OnDestroy, CanColor
{
  _intl: TakStepperIntl;
  private _focusMonitor;
  private _intlSubscription;
  /** State of the given step. */
  state: StepState;
  /** Label of the given step. */
  label: TakStepLabel | string;
  /** Error message to display when there's an error. */
  errorMessage: string;
  /** Overrides for the header icons, passed in via the stepper. */
  iconOverrides: {
    [key: string]: TemplateRef<TakStepperIconContext>;
  };
  /** Index of the given step. */
  index: number;
  /** Whether the given step is selected. */
  selected: boolean;
  /** Whether the given step label is active. */
  active: boolean;
  /** Whether the given step is optional. */
  optional: boolean;
  /** Whether the ripple should be disabled. */
  disableRipple: boolean;
  constructor(
    _intl: TakStepperIntl,
    _focusMonitor: FocusMonitor,
    _elementRef: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef
  );
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  /** Focuses the step header. */
  focus(origin?: FocusOrigin, options?: FocusOptions): void;
  /** Returns string label of given step if it is a text label. */
  _stringLabel(): string | null;
  /** Returns TakStepLabel if the label of given step is a template label. */
  _templateLabel(): TakStepLabel | null;
  /** Returns the host HTML element. */
  _getHostElement(): HTMLElement;
  /** Template context variables that are exposed to the `takStepperIcon` instances. */
  _getIconContext(): TakStepperIconContext;
  _getDefaultTextForState(state: StepState): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepHeader, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakStepHeader,
    'tak-step-header',
    never,
    {
      color: 'color';
      state: 'state';
      label: 'label';
      errorMessage: 'errorMessage';
      iconOverrides: 'iconOverrides';
      index: 'index';
      selected: 'selected';
      active: 'active';
      optional: 'optional';
      disableRipple: 'disableRipple';
    },
    {},
    never,
    never,
    false
  >;
}

/** @docs-private */
declare const _TakStepHeaderBase: _Constructor<CanColor> &
  _AbstractConstructor<CanColor> & {
    new (elementRef: ElementRef): {
      _elementRef: ElementRef<HTMLElement>;
      focus(): void;
    };
    ɵfac: unknown;
    ɵdir: unknown;
  };

export declare class TakStepLabel extends CdkStepLabel {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepLabel, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakStepLabel,
    '[takStepLabel]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export declare class TakStepper extends CdkStepper implements AfterContentInit {
  /** The list of step headers of the steps in the stepper. */
  _stepHeader: QueryList<TakStepHeader>;
  /** Full list of steps inside the stepper, including inside nested steppers. */
  _steps: QueryList<TakStep>;
  /** Steps that belong to the current stepper, excluding ones from nested steppers. */
  readonly steps: QueryList<TakStep>;
  /** Custom icon overrides passed in by the consumer. */
  _icons: QueryList<TakStepperIcon>;
  /** Event emitted when the current step is done transitioning in. */
  readonly animationDone: EventEmitter<void>;
  /** Whether ripples should be disabled for the step headers. */
  disableRipple: boolean;
  /** Theme color for all of the steps in stepper. */
  color: ThemePalette;
  /**
   * Whether the label should display in bottom or end position.
   * Only applies in the `horizontal` orientation.
   */
  labelPosition: 'bottom' | 'end';
  /**
   * Position of the stepper's header.
   * Only applies in the `horizontal` orientation.
   */
  headerPosition: 'top' | 'bottom';
  /** Consumer-specified template-refs to be used to override the header icons. */
  _iconOverrides: Record<string, TemplateRef<TakStepperIconContext>>;
  /** Stream of animation `done` events when the body expands/collapses. */
  readonly _animationDone: Subject<AnimationEvent_2>;
  /** Duration for the animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration(): string;
  set animationDuration(value: string);
  private _animationDuration;
  constructor(
    dir: Directionality,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef<HTMLElement>
  );
  ngAfterContentInit(): void;
  _stepIsNavigable(index: number, step: TakStep): boolean;
  _getAnimationDuration(): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepper, [{ optional: true }, null, null]>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakStepper,
    'tak-stepper, tak-vertical-stepper, tak-horizontal-stepper, [takStepper]',
    ['takStepper', 'takVerticalStepper', 'takHorizontalStepper'],
    {
      selectedIndex: 'selectedIndex';
      disableRipple: 'disableRipple';
      color: 'color';
      labelPosition: 'labelPosition';
      headerPosition: 'headerPosition';
      animationDuration: 'animationDuration';
    },
    { animationDone: 'animationDone' },
    ['_steps', '_icons'],
    never,
    false
  >;
}

/**
 * Animations used by the Material steppers.
 * @docs-private
 */
export declare const takStepperAnimations: {
  readonly horizontalStepTransition: AnimationTriggerMetadata;
  readonly verticalStepTransition: AnimationTriggerMetadata;
};

/**
 * Template to be used to override the icons inside the step header.
 */
export declare class TakStepperIcon {
  templateRef: TemplateRef<TakStepperIconContext>;
  /** Name of the icon to be overridden. */
  name: StepState;
  constructor(templateRef: TemplateRef<TakStepperIconContext>);
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepperIcon, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakStepperIcon,
    'ng-template[takStepperIcon]',
    never,
    { name: 'takStepperIcon' },
    {},
    never,
    never,
    false
  >;
}

/** Template context available to an attached `takStepperIcon`. */
export declare interface TakStepperIconContext {
  /** Index of the step. */
  index: number;
  /** Whether the step is currently active. */
  active: boolean;
  /** Whether the step is optional. */
  optional: boolean;
}

/** Stepper data that is required for internationalization. */
export declare class TakStepperIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void>;
  /** Label that is rendered below optional steps. */
  optionalLabel: string;
  /** Label that is used to indicate step as completed to screen readers. */
  completedLabel: string;
  /** Label that is used to indicate step as editable to screen readers. */
  editableLabel: string;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepperIntl, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<TakStepperIntl>;
}

export declare class TakStepperModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepperModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakStepperModule,
    [
      typeof i1.TakStep,
      typeof i2.TakStepLabel,
      typeof i1.TakStepper,
      typeof i3.TakStepperNext,
      typeof i3.TakStepperPrevious,
      typeof i4.TakStepHeader,
      typeof i5.TakStepperIcon,
      typeof i6.TakStepContent,
    ],
    [
      typeof i7.TakCommonModule,
      typeof i8.CommonModule,
      typeof i9.PortalModule,
      typeof i10.TakButtonModule,
      typeof i11.CdkStepperModule,
      typeof i12.TakIconModule,
      typeof i7.TakRippleModule,
    ],
    [
      typeof i7.TakCommonModule,
      typeof i1.TakStep,
      typeof i2.TakStepLabel,
      typeof i1.TakStepper,
      typeof i3.TakStepperNext,
      typeof i3.TakStepperPrevious,
      typeof i4.TakStepHeader,
      typeof i5.TakStepperIcon,
      typeof i6.TakStepContent,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakStepperModule>;
}

/** Button that moves to the next step in a stepper workflow. */
export declare class TakStepperNext extends CdkStepperNext {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepperNext, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakStepperNext,
    'button[takStepperNext]',
    never,
    { type: 'type' },
    {},
    never,
    never,
    false
  >;
}

/** Button that moves to the previous step in a stepper workflow. */
export declare class TakStepperPrevious extends CdkStepperPrevious {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakStepperPrevious, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakStepperPrevious,
    'button[takStepperPrevious]',
    never,
    { type: 'type' },
    {},
    never,
    never,
    false
  >;
}

export { StepperOrientation };

export { StepState };

export {};
