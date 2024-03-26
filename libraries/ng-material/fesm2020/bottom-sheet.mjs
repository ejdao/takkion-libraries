import * as i2 from '@takkion/ng-cdk/dialog';
import { CdkDialogContainer, DialogModule, Dialog } from '@takkion/ng-cdk/dialog';
import * as i5 from '@takkion/ng-cdk/portal';
import { PortalModule } from '@takkion/ng-cdk/portal';
import * as i0 from '@angular/core';
import {
  EventEmitter,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Optional,
  Inject,
  NgModule,
  InjectionToken,
  Injectable,
  SkipSelf,
} from '@angular/core';
import { AnimationDurations, AnimationCurves, TakCommonModule } from '@takkion/ng-material/core';
import * as i1 from '@takkion/ng-cdk/a11y';
import * as i4 from '@takkion/ng-cdk/layout';
import { Breakpoints } from '@takkion/ng-cdk/layout';
import * as i3 from '@takkion/ng-cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
  query,
  animateChild,
} from '@angular/animations';
import { ESCAPE, hasModifierKey } from '@takkion/ng-cdk/keycodes';
import { Subject, merge } from 'rxjs';
import { filter, take } from 'rxjs/operators';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Animations used by the Material bottom sheet. */
const takBottomSheetAnimations = {
  /** Animation that shows and hides a bottom sheet. */
  bottomSheetState: trigger('state', [
    state('void, hidden', style({ transform: 'translateY(100%)' })),
    state('visible', style({ transform: 'translateY(0%)' })),
    transition(
      'visible => void, visible => hidden',
      group([
        animate(`${AnimationDurations.COMPLEX} ${AnimationCurves.ACCELERATION_CURVE}`),
        query('@*', animateChild(), { optional: true }),
      ])
    ),
    transition(
      'void => visible',
      group([
        animate(`${AnimationDurations.EXITING} ${AnimationCurves.DECELERATION_CURVE}`),
        query('@*', animateChild(), { optional: true }),
      ])
    ),
  ]),
};

/**
 * Internal component that wraps user-provided bottom sheet content.
 * @docs-private
 */
class TakBottomSheetContainer extends CdkDialogContainer {
  constructor(
    elementRef,
    focusTrapFactory,
    document,
    config,
    checker,
    ngZone,
    overlayRef,
    breakpointObserver,
    _changeDetectorRef,
    focusMonitor
  ) {
    super(
      elementRef,
      focusTrapFactory,
      document,
      config,
      checker,
      ngZone,
      overlayRef,
      focusMonitor
    );
    this._changeDetectorRef = _changeDetectorRef;
    /** The state of the bottom sheet animations. */
    this._animationState = 'void';
    /** Emits whenever the state of the animation changes. */
    this._animationStateChanged = new EventEmitter();
    this._breakpointSubscription = breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(() => {
        this._toggleClass(
          'tak-bottom-sheet-container-medium',
          breakpointObserver.isMatched(Breakpoints.Medium)
        );
        this._toggleClass(
          'tak-bottom-sheet-container-large',
          breakpointObserver.isMatched(Breakpoints.Large)
        );
        this._toggleClass(
          'tak-bottom-sheet-container-xlarge',
          breakpointObserver.isMatched(Breakpoints.XLarge)
        );
      });
  }
  /** Begin animation of bottom sheet entrance into view. */
  enter() {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.detectChanges();
    }
  }
  /** Begin animation of the bottom sheet exiting from view. */
  exit() {
    if (!this._destroyed) {
      this._animationState = 'hidden';
      this._changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._breakpointSubscription.unsubscribe();
    this._destroyed = true;
  }
  _onAnimationDone(event) {
    if (event.toState === 'visible') {
      this._trapFocus();
    }
    this._animationStateChanged.emit(event);
  }
  _onAnimationStart(event) {
    this._animationStateChanged.emit(event);
  }
  _captureInitialFocus() {}
  _toggleClass(cssClass, add) {
    this._elementRef.nativeElement.classList.toggle(cssClass, add);
  }
}
TakBottomSheetContainer.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheetContainer,
  deps: [
    { token: i0.ElementRef },
    { token: i1.FocusTrapFactory },
    { token: DOCUMENT, optional: true },
    { token: i2.DialogConfig },
    { token: i1.InteractivityChecker },
    { token: i0.NgZone },
    { token: i3.OverlayRef },
    { token: i4.BreakpointObserver },
    { token: i0.ChangeDetectorRef },
    { token: i1.FocusMonitor },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakBottomSheetContainer.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakBottomSheetContainer,
  selector: 'tak-bottom-sheet-container',
  host: {
    attributes: { tabindex: '-1' },
    listeners: {
      '@state.start': '_onAnimationStart($event)',
      '@state.done': '_onAnimationDone($event)',
    },
    properties: {
      'attr.role': '_config.role',
      'attr.aria-modal': '_config.ariaModal',
      'attr.aria-label': '_config.ariaLabel',
      '@state': '_animationState',
    },
    classAttribute: 'tak-bottom-sheet-container',
  },
  usesInheritance: true,
  ngImport: i0,
  template: '<ng-template cdkPortalOutlet></ng-template>\r\n',
  styles: [
    '.tak-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .tak-bottom-sheet-container{outline:1px solid}.tak-bottom-sheet-container-xlarge,.tak-bottom-sheet-container-large,.tak-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.tak-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.tak-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.tak-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i5.CdkPortalOutlet,
      selector: '[cdkPortalOutlet]',
      inputs: ['cdkPortalOutlet'],
      outputs: ['attached'],
      exportAs: ['cdkPortalOutlet'],
    },
  ],
  animations: [takBottomSheetAnimations.bottomSheetState],
  changeDetection: i0.ChangeDetectionStrategy.Default,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheetContainer,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-bottom-sheet-container',
          changeDetection: ChangeDetectionStrategy.Default,
          encapsulation: ViewEncapsulation.None,
          animations: [takBottomSheetAnimations.bottomSheetState],
          host: {
            class: 'tak-bottom-sheet-container',
            tabindex: '-1',
            '[attr.role]': '_config.role',
            '[attr.aria-modal]': '_config.ariaModal',
            '[attr.aria-label]': '_config.ariaLabel',
            '[@state]': '_animationState',
            '(@state.start)': '_onAnimationStart($event)',
            '(@state.done)': '_onAnimationDone($event)',
          },
          template: '<ng-template cdkPortalOutlet></ng-template>\r\n',
          styles: [
            '.tak-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .tak-bottom-sheet-container{outline:1px solid}.tak-bottom-sheet-container-xlarge,.tak-bottom-sheet-container-large,.tak-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.tak-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.tak-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.tak-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i1.FocusTrapFactory },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [DOCUMENT],
          },
        ],
      },
      { type: i2.DialogConfig },
      { type: i1.InteractivityChecker },
      { type: i0.NgZone },
      { type: i3.OverlayRef },
      { type: i4.BreakpointObserver },
      { type: i0.ChangeDetectorRef },
      { type: i1.FocusMonitor },
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
class TakBottomSheetModule {}
TakBottomSheetModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheetModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakBottomSheetModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheetModule,
  declarations: [TakBottomSheetContainer],
  imports: [DialogModule, TakCommonModule, PortalModule],
  exports: [TakBottomSheetContainer, TakCommonModule],
});
TakBottomSheetModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheetModule,
  imports: [DialogModule, TakCommonModule, PortalModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheetModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [DialogModule, TakCommonModule, PortalModule],
          exports: [TakBottomSheetContainer, TakCommonModule],
          declarations: [TakBottomSheetContainer],
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
/** Injection token that can be used to access the data that was passed in to a bottom sheet. */
const TAK_BOTTOM_SHEET_DATA = new InjectionToken('TakBottomSheetData');
/**
 * Configuration used when opening a bottom sheet.
 */
class TakBottomSheetConfig {
  constructor() {
    /** Data being injected into the child component. */
    this.data = null;
    /** Whether the bottom sheet has a backdrop. */
    this.hasBackdrop = true;
    /** Whether the user can use escape or clicking outside to close the bottom sheet. */
    this.disableClose = false;
    /** Aria label to assign to the bottom sheet element. */
    this.ariaLabel = null;
    /** Whether this is a modal bottom sheet. Used to set the `aria-modal` attribute. */
    this.ariaModal = true;
    /**
     * Whether the bottom sheet should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    this.closeOnNavigation = true;
    // Note that this is set to 'dialog' by default, because while the a11y recommendations
    // are to focus the first focusable element, doing so prevents screen readers from reading out the
    // rest of the bottom sheet content.
    /**
     * Where the bottom sheet should focus on open.
     * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
     * AutoFocusTarget instead.
     */
    this.autoFocus = 'dialog';
    /**
     * Whether the bottom sheet should restore focus to the
     * previously-focused element, after it's closed.
     */
    this.restoreFocus = true;
  }
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
class TakBottomSheetRef {
  constructor(_ref, config, containerInstance) {
    this._ref = _ref;
    /** Subject for notifying the user that the bottom sheet has opened and appeared. */
    this._afterOpened = new Subject();
    this.containerInstance = containerInstance;
    this.disableClose = config.disableClose;
    // Emit when opening animation completes
    containerInstance._animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'visible'),
        take(1)
      )
      .subscribe(() => {
        this._afterOpened.next();
        this._afterOpened.complete();
      });
    // Dispose overlay when closing animation is complete
    containerInstance._animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'hidden'),
        take(1)
      )
      .subscribe(() => {
        clearTimeout(this._closeFallbackTimeout);
        this._ref.close(this._result);
      });
    _ref.overlayRef.detachments().subscribe(() => {
      this._ref.close(this._result);
    });
    merge(
      this.backdropClick(),
      this.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE))
    ).subscribe(event => {
      if (!this.disableClose && (event.type !== 'keydown' || !hasModifierKey(event))) {
        event.preventDefault();
        this.dismiss();
      }
    });
  }
  /** Instance of the component making up the content of the bottom sheet. */
  get instance() {
    return this._ref.componentInstance;
  }
  /**
   * Dismisses the bottom sheet.
   * @param result Data to be passed back to the bottom sheet opener.
   */
  dismiss(result) {
    if (!this.containerInstance) {
      return;
    }
    // Transition the backdrop in parallel to the bottom sheet.
    this.containerInstance._animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'start'),
        take(1)
      )
      .subscribe(event => {
        // The logic that disposes of the overlay depends on the exit animation completing, however
        // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
        // timeout which will clean everything up if the animation hasn't fired within the specified
        // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
        // vast majority of cases the timeout will have been cleared before it has fired.
        this._closeFallbackTimeout = setTimeout(() => {
          this._ref.close(this._result);
        }, event.totalTime + 100);
        this._ref.overlayRef.detachBackdrop();
      });
    this._result = result;
    this.containerInstance.exit();
    this.containerInstance = null;
  }
  /** Gets an observable that is notified when the bottom sheet is finished closing. */
  afterDismissed() {
    return this._ref.closed;
  }
  /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
  afterOpened() {
    return this._afterOpened;
  }
  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick() {
    return this._ref.backdropClick;
  }
  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents() {
    return this._ref.keydownEvents;
  }
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token that can be used to specify default bottom sheet options. */
const TAK_BOTTOM_SHEET_DEFAULT_OPTIONS = new InjectionToken('tak-bottom-sheet-default-options');
/**
 * Service to trigger Material Design bottom sheets.
 */
class TakBottomSheet {
  constructor(_overlay, injector, _parentBottomSheet, _defaultOptions) {
    this._overlay = _overlay;
    this._parentBottomSheet = _parentBottomSheet;
    this._defaultOptions = _defaultOptions;
    this._bottomSheetRefAtThisLevel = null;
    this._dialog = injector.get(Dialog);
  }
  /** Reference to the currently opened bottom sheet. */
  get _openedBottomSheetRef() {
    const parent = this._parentBottomSheet;
    return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
  }
  set _openedBottomSheetRef(value) {
    if (this._parentBottomSheet) {
      this._parentBottomSheet._openedBottomSheetRef = value;
    } else {
      this._bottomSheetRefAtThisLevel = value;
    }
  }
  open(componentOrTemplateRef, config) {
    const _config = { ...(this._defaultOptions || new TakBottomSheetConfig()), ...config };
    let ref;
    this._dialog.open(componentOrTemplateRef, {
      ..._config,
      // Disable closing since we need to sync it up to the animation ourselves.
      disableClose: true,
      maxWidth: '100%',
      container: TakBottomSheetContainer,
      scrollStrategy: _config.scrollStrategy || this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().global().centerHorizontally().bottom('0'),
      templateContext: () => ({ bottomSheetRef: ref }),
      providers: (cdkRef, _cdkConfig, container) => {
        ref = new TakBottomSheetRef(cdkRef, _config, container);
        return [
          { provide: TakBottomSheetRef, useValue: ref },
          { provide: TAK_BOTTOM_SHEET_DATA, useValue: _config.data },
        ];
      },
    });
    // When the bottom sheet is dismissed, clear the reference to it.
    ref.afterDismissed().subscribe(() => {
      // Clear the bottom sheet ref if it hasn't already been replaced by a newer one.
      if (this._openedBottomSheetRef === ref) {
        this._openedBottomSheetRef = null;
      }
    });
    if (this._openedBottomSheetRef) {
      // If a bottom sheet is already in view, dismiss it and enter the
      // new bottom sheet after exit animation is complete.
      this._openedBottomSheetRef.afterDismissed().subscribe(() => ref.containerInstance?.enter());
      this._openedBottomSheetRef.dismiss();
    } else {
      // If no bottom sheet is in view, enter the new bottom sheet.
      ref.containerInstance.enter();
    }
    this._openedBottomSheetRef = ref;
    return ref;
  }
  /**
   * Dismisses the currently-visible bottom sheet.
   * @param result Data to pass to the bottom sheet instance.
   */
  dismiss(result) {
    if (this._openedBottomSheetRef) {
      this._openedBottomSheetRef.dismiss(result);
    }
  }
  ngOnDestroy() {
    if (this._bottomSheetRefAtThisLevel) {
      this._bottomSheetRefAtThisLevel.dismiss();
    }
  }
}
TakBottomSheet.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheet,
  deps: [
    { token: i3.Overlay },
    { token: i0.Injector },
    { token: TakBottomSheet, optional: true, skipSelf: true },
    { token: TAK_BOTTOM_SHEET_DEFAULT_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Injectable,
});
TakBottomSheet.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheet,
  providedIn: TakBottomSheetModule,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBottomSheet,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: TakBottomSheetModule }],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i3.Overlay },
      { type: i0.Injector },
      {
        type: TakBottomSheet,
        decorators: [
          {
            type: Optional,
          },
          {
            type: SkipSelf,
          },
        ],
      },
      {
        type: TakBottomSheetConfig,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_BOTTOM_SHEET_DEFAULT_OPTIONS],
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
  TAK_BOTTOM_SHEET_DATA,
  TAK_BOTTOM_SHEET_DEFAULT_OPTIONS,
  TakBottomSheet,
  TakBottomSheetConfig,
  TakBottomSheetContainer,
  TakBottomSheetModule,
  TakBottomSheetRef,
  takBottomSheetAnimations,
};
//# sourceMappingURL=bottom-sheet.mjs.map
