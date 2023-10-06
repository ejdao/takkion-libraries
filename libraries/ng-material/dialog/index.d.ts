import { AnimationEvent as AnimationEvent_2 } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';
import { CdkDialogContainer } from '@takkion/ng-cdk/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { ComponentType } from '@takkion/ng-cdk/portal';
import { DialogRef } from '@takkion/ng-cdk/dialog';
import { Direction } from '@takkion/ng-cdk/bidi';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import { FocusOrigin } from '@takkion/ng-cdk/a11y';
import { FocusTrapFactory } from '@takkion/ng-cdk/a11y';
import * as i0 from '@angular/core';
import * as i3 from '@takkion/ng-cdk/dialog';
import * as i4 from '@takkion/ng-cdk/overlay';
import * as i5 from '@takkion/ng-cdk/portal';
import * as i6 from '@takkion/ng-material/core';
import { InjectionToken } from '@angular/core';
import { Injector } from '@angular/core';
import { InteractivityChecker } from '@takkion/ng-cdk/a11y';
import { Location as Location_2 } from '@angular/common';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Overlay } from '@takkion/ng-cdk/overlay';
import { OverlayContainer } from '@takkion/ng-cdk/overlay';
import { OverlayRef } from '@takkion/ng-cdk/overlay';
import { ScrollStrategy } from '@takkion/ng-cdk/overlay';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { Type } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

/** Options for where to set focus to automatically on dialog open */
export declare type AutoFocusTarget = 'dialog' | 'first-tabbable' | 'first-heading';

/**
 * Closes the dialog with the specified interaction type. This is currently not part of
 * `TakDialogRef` as that would conflict with custom dialog ref mocks provided in tests.
 * More details. See: https://github.com/angular/components/pull/9257#issuecomment-651342226.
 */
export declare function _closeDialogVia<R>(
  ref: TakDialogRef<R>,
  interactionType: FocusOrigin,
  result?: R
): void;

/** Event that captures the state of dialog container animations. */
declare interface DialogAnimationEvent {
  state: 'opened' | 'opening' | 'closing' | 'closed';
  totalTime: number;
}

/** Possible overrides for a dialog's position. */
export declare interface DialogPosition {
  /** Override for the dialog's top position. */
  top?: string;
  /** Override for the dialog's bottom position. */
  bottom?: string;
  /** Override for the dialog's left position. */
  left?: string;
  /** Override for the dialog's right position. */
  right?: string;
}

/** Valid ARIA roles for a dialog element. */
export declare type DialogRole = 'dialog' | 'alertdialog';

declare namespace i1 {
  export { _TakDialogContainerBase, TakDialogContainer };
}

declare namespace i2 {
  export { TakDialogClose, TakDialogTitle, TakDialogContent, TakDialogActions };
}

/** Injection token that can be used to access the data that was passed in to a dialog. */
export declare const TAK_DIALOG_DATA: InjectionToken<any>;

/** Injection token that can be used to specify default dialog options. */
export declare const TAK_DIALOG_DEFAULT_OPTIONS: InjectionToken<TakDialogConfig<any>>;

/** Injection token that determines the scroll handling while the dialog is open. */
export declare const TAK_DIALOG_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;

/** @docs-private */
export declare function TAK_DIALOG_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;

/** @docs-private */
export declare const TAK_DIALOG_SCROLL_STRATEGY_PROVIDER: {
  provide: InjectionToken<() => ScrollStrategy>;
  deps: (typeof Overlay)[];
  useFactory: typeof TAK_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
};

/** @docs-private */
export declare function TAK_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay
): () => ScrollStrategy;

/**
 * Service to open Material Design modal dialogs.
 */
export declare class TakDialog extends _TakDialogBase<TakDialogContainer> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    _location: Location_2,
    defaultOptions: TakDialogConfig,
    scrollStrategy: any,
    parentDialog: TakDialog,
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 15.0.0
     */
    overlayContainer: OverlayContainer,
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 14.0.0
     */
    animationMode?: 'NoopAnimations' | 'BrowserAnimations'
  );
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakDialog,
    [
      null,
      null,
      { optional: true },
      { optional: true },
      null,
      { optional: true; skipSelf: true },
      null,
      { optional: true },
    ]
  >;
  static ɵprov: i0.ɵɵInjectableDeclaration<TakDialog>;
}

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export declare class TakDialogActions {
  /**
   * Horizontal alignment of action buttons.
   */
  align?: 'start' | 'center' | 'end';
  static ɵfac: i0.ɵɵFactoryDeclaration<TakDialogActions, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakDialogActions,
    '[tak-dialog-actions], tak-dialog-actions, [takDialogActions]',
    never,
    { align: 'align' },
    {},
    never,
    never,
    false
  >;
}

/**
 * Animations used by TakDialog.
 * @docs-private
 */
export declare const takDialogAnimations: {
  readonly dialogContainer: AnimationTriggerMetadata;
};

/**
 * Base class for dialog services. The base dialog service allows
 * for arbitrary dialog refs and dialog container components.
 */
export declare abstract class _TakDialogBase<C extends _TakDialogContainerBase>
  implements OnDestroy
{
  private _overlay;
  private _defaultOptions;
  private _parentDialog;
  private _dialogRefConstructor;
  private _dialogContainerType;
  private _dialogDataToken;
  private readonly _openDialogsAtThisLevel;
  private readonly _afterAllClosedAtThisLevel;
  private readonly _afterOpenedAtThisLevel;
  private _scrollStrategy;
  protected _idPrefix: string;
  private _dialog;
  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): TakDialogRef<any>[];
  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Subject<TakDialogRef<any>>;
  private _getAfterAllClosed;
  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  readonly afterAllClosed: Observable<void>;
  constructor(
    _overlay: Overlay,
    injector: Injector,
    _defaultOptions: TakDialogConfig | undefined,
    _parentDialog: _TakDialogBase<C> | undefined,
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 15.0.0
     */
    _overlayContainer: OverlayContainer,
    scrollStrategy: any,
    _dialogRefConstructor: Type<TakDialogRef<any>>,
    _dialogContainerType: Type<C>,
    _dialogDataToken: InjectionToken<any>,
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 14.0.0
     */
    _animationMode?: 'NoopAnimations' | 'BrowserAnimations'
  );
  /**
   * Opens a modal dialog containing the given component.
   * @param component Type of the component to load into the dialog.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any, R = any>(
    component: ComponentType<T>,
    config?: TakDialogConfig<D>
  ): TakDialogRef<T, R>;
  /**
   * Opens a modal dialog containing the given template.
   * @param template TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any, R = any>(
    template: TemplateRef<T>,
    config?: TakDialogConfig<D>
  ): TakDialogRef<T, R>;
  open<T, D = any, R = any>(
    template: ComponentType<T> | TemplateRef<T>,
    config?: TakDialogConfig<D>
  ): TakDialogRef<T, R>;
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll(): void;
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string): TakDialogRef<any> | undefined;
  ngOnDestroy(): void;
  private _closeDialogs;
  static ɵfac: i0.ɵɵFactoryDeclaration<_TakDialogBase<any>, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<_TakDialogBase<any>>;
}

/**
 * Button that will close the current dialog.
 */
export declare class TakDialogClose implements OnInit, OnChanges {
  /**
   * Reference to the containing dialog.
   * @deprecated `dialogRef` property to become private.
   * @breaking-change 13.0.0
   */
  dialogRef: TakDialogRef<any>;
  private _elementRef;
  private _dialog;
  /** Screen reader label for the button. */
  ariaLabel: string;
  /** Default to "button" to prevents accidental form submits. */
  type: 'submit' | 'button' | 'reset';
  /** Dialog close input. */
  dialogResult: any;
  _takDialogClose: any;
  constructor(
    /**
     * Reference to the containing dialog.
     * @deprecated `dialogRef` property to become private.
     * @breaking-change 13.0.0
     */
    dialogRef: TakDialogRef<any>,
    _elementRef: ElementRef<HTMLElement>,
    _dialog: TakDialog
  );
  ngOnInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  _onButtonClick(event: MouseEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakDialogClose, [{ optional: true }, null, null]>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakDialogClose,
    '[tak-dialog-close], [takDialogClose]',
    ['takDialogClose'],
    {
      ariaLabel: 'aria-label';
      type: 'type';
      dialogResult: 'tak-dialog-close';
      _takDialogClose: 'takDialogClose';
    },
    {},
    never,
    never,
    false
  >;
}

/**
 * Configuration for opening a modal dialog with the TakDialog service.
 */
export declare class TakDialogConfig<D = any> {
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;
  /**
   * Injector used for the instantiation of the component to be attached. If provided,
   * takes precedence over the injector indirectly provided by `ViewContainerRef`.
   */
  injector?: Injector;
  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;
  /** The ARIA role of the dialog element. */
  role?: DialogRole;
  /** Custom class for the overlay pane. */
  panelClass?: string | string[];
  /** Whether the dialog has a backdrop. */
  hasBackdrop?: boolean;
  /** Custom class for the backdrop. */
  backdropClass?: string | string[];
  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  disableClose?: boolean;
  /** Width of the dialog. */
  width?: string;
  /** Height of the dialog. */
  height?: string;
  /** Min-width of the dialog. If a number is provided, assumes pixel units. */
  minWidth?: number | string;
  /** Min-height of the dialog. If a number is provided, assumes pixel units. */
  minHeight?: number | string;
  /** Max-width of the dialog. If a number is provided, assumes pixel units. Defaults to 80vw. */
  maxWidth?: number | string;
  /** Max-height of the dialog. If a number is provided, assumes pixel units. */
  maxHeight?: number | string;
  /** Position overrides. */
  position?: DialogPosition;
  /** Data being injected into the child component. */
  data?: D | null;
  /** Layout direction for the dialog's content. */
  direction?: Direction;
  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null;
  /** ID of the element that labels the dialog. */
  ariaLabelledBy?: string | null;
  /** Aria label to assign to the dialog element. */
  ariaLabel?: string | null;
  /** Whether this is a modal dialog. Used to set the `aria-modal` attribute. */
  ariaModal?: boolean;
  /**
   * Where the dialog should focus on open.
   * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
   * AutoFocusTarget instead.
   */
  autoFocus?: AutoFocusTarget | string | boolean;
  /**
   * Whether the dialog should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean;
  /** Whether to wait for the opening animation to finish before trapping focus. */
  delayFocusTrap?: boolean;
  /** Scroll strategy to be used for the dialog. */
  scrollStrategy?: ScrollStrategy;
  /**
   * Whether the dialog should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean;
  /** Alternate `ComponentFactoryResolver` to use when resolving the associated component. */
  componentFactoryResolver?: ComponentFactoryResolver;
  /** Duration of the enter animation. Has to be a valid CSS value (e.g. 100ms). */
  enterAnimationDuration?: string;
  /** Duration of the exit animation. Has to be a valid CSS value (e.g. 50ms). */
  exitAnimationDuration?: string;
}

/**
 * Internal component that wraps user-provided dialog content.
 * Animation is based on https://material.io/guidelines/motion/choreography.html.
 * @docs-private
 */
export declare class TakDialogContainer extends _TakDialogContainerBase {
  private _changeDetectorRef;
  /** State of the dialog animation. */
  _state: 'void' | 'enter' | 'exit';
  /** Callback, invoked whenever an animation on the host completes. */
  _onAnimationDone({ toState, totalTime }: AnimationEvent_2): void;
  /** Callback, invoked when an animation on the host starts. */
  _onAnimationStart({ toState, totalTime }: AnimationEvent_2): void;
  /** Starts the dialog exit animation. */
  _startExitAnimation(): void;
  constructor(
    elementRef: ElementRef,
    focusTrapFactory: FocusTrapFactory,
    document: any,
    dialogConfig: TakDialogConfig,
    checker: InteractivityChecker,
    ngZone: NgZone,
    overlayRef: OverlayRef,
    _changeDetectorRef: ChangeDetectorRef,
    focusMonitor?: FocusMonitor
  );
  _getAnimationState(): {
    value: 'enter' | 'void' | 'exit';
    params: {
      enterAnimationDuration: string;
      exitAnimationDuration: string;
    };
  };
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakDialogContainer,
    [null, null, { optional: true }, null, null, null, null, null, null]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakDialogContainer,
    'tak-dialog-container',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Base class for the `TakDialogContainer`. The base class does not implement
 * animations as these are left to implementers of the dialog container.
 */
export declare abstract class _TakDialogContainerBase extends CdkDialogContainer<TakDialogConfig> {
  /** Emits when an animation state changes. */
  _animationStateChanged: EventEmitter<DialogAnimationEvent>;
  constructor(
    elementRef: ElementRef,
    focusTrapFactory: FocusTrapFactory,
    _document: any,
    dialogConfig: TakDialogConfig,
    interactivityChecker: InteractivityChecker,
    ngZone: NgZone,
    overlayRef: OverlayRef,
    focusMonitor?: FocusMonitor
  );
  /** Starts the dialog exit animation. */
  abstract _startExitAnimation(): void;
  protected _captureInitialFocus(): void;
  /**
   * Callback for when the open dialog animation has finished. Intended to
   * be called by sub-classes that use different animation implementations.
   */
  protected _openAnimationDone(totalTime: number): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    _TakDialogContainerBase,
    [null, null, { optional: true }, null, null, null, null, null]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    _TakDialogContainerBase,
    'ng-component',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Scrollable content container of a dialog.
 */
export declare class TakDialogContent {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakDialogContent, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakDialogContent,
    '[tak-dialog-content], tak-dialog-content, [takDialogContent]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export declare class TakDialogModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakDialogModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakDialogModule,
    [
      typeof i1.TakDialogContainer,
      typeof i2.TakDialogClose,
      typeof i2.TakDialogTitle,
      typeof i2.TakDialogActions,
      typeof i2.TakDialogContent,
    ],
    [
      typeof i3.DialogModule,
      typeof i4.OverlayModule,
      typeof i5.PortalModule,
      typeof i6.TakCommonModule,
    ],
    [
      typeof i1.TakDialogContainer,
      typeof i2.TakDialogClose,
      typeof i2.TakDialogTitle,
      typeof i2.TakDialogContent,
      typeof i2.TakDialogActions,
      typeof i6.TakCommonModule,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakDialogModule>;
}

/**
 * Reference to a dialog opened via the TakDialog service.
 */
export declare class TakDialogRef<T, R = any> {
  private _ref;
  _containerInstance: _TakDialogContainerBase;
  /** The instance of component opened into the dialog. */
  componentInstance: T;
  /** Whether the user is allowed to close the dialog. */
  disableClose: boolean | undefined;
  /** Unique ID for the dialog. */
  id: string;
  /** Subject for notifying the user that the dialog has finished opening. */
  private readonly _afterOpened;
  /** Subject for notifying the user that the dialog has started closing. */
  private readonly _beforeClosed;
  /** Result to be passed to afterClosed. */
  private _result;
  /** Handle to the timeout that's running as a fallback in case the exit animation doesn't fire. */
  private _closeFallbackTimeout;
  /** Current state of the dialog. */
  private _state;
  /** Interaction that caused the dialog to close. */
  private _closeInteractionType;
  constructor(
    _ref: DialogRef<R, T>,
    config: TakDialogConfig,
    _containerInstance: _TakDialogContainerBase
  );
  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult?: R): void;
  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  afterOpened(): Observable<void>;
  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined>;
  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  beforeClosed(): Observable<R | undefined>;
  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick(): Observable<MouseEvent>;
  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents(): Observable<KeyboardEvent>;
  /**
   * Updates the dialog's position.
   * @param position New dialog position.
   */
  updatePosition(position?: DialogPosition): this;
  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  updateSize(width?: string, height?: string): this;
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes: string | string[]): this;
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes: string | string[]): this;
  /** Gets the current state of the dialog's lifecycle. */
  getState(): TakDialogState;
  /**
   * Finishes the dialog close by updating the state of the dialog
   * and disposing the overlay.
   */
  private _finishDialogClose;
}

/** Possible states of the lifecycle of a dialog. */
export declare const enum TakDialogState {
  OPEN = 0,
  CLOSING = 1,
  CLOSED = 2,
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
export declare class TakDialogTitle implements OnInit {
  private _dialogRef;
  private _elementRef;
  private _dialog;
  /** Unique id for the dialog title. If none is supplied, it will be auto-generated. */
  id: string;
  constructor(
    _dialogRef: TakDialogRef<any>,
    _elementRef: ElementRef<HTMLElement>,
    _dialog: TakDialog
  );
  ngOnInit(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakDialogTitle, [{ optional: true }, null, null]>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakDialogTitle,
    '[tak-dialog-title], [takDialogTitle]',
    ['takDialogTitle'],
    { id: 'id' },
    {},
    never,
    never,
    false
  >;
}

export {};
