import * as i0 from '@angular/core';
import {
  InjectionToken,
  EventEmitter,
  Directive,
  Optional,
  Inject,
  Input,
  Output,
  Injectable,
  SkipSelf,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import * as i3 from '@takkion/ng-cdk/a11y';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { SPACE, ENTER } from '@takkion/ng-cdk/keycodes';
import {
  mixinInitialized,
  mixinDisabled,
  AnimationDurations,
  AnimationCurves,
  TakCommonModule,
} from '@takkion/ng-material/core';
import { Subject, merge } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  query,
  animateChild,
} from '@angular/animations';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @docs-private */
function getSortDuplicateSortableIdError(id) {
  return Error(`Cannot have two TakSortables with the same id (${id}).`);
}
/** @docs-private */
function getSortHeaderNotContainedWithinSortError() {
  return Error(`TakSortHeader must be placed within a parent element with the TakSort directive.`);
}
/** @docs-private */
function getSortHeaderMissingIdError() {
  return Error(`TakSortHeader must be provided with a unique id.`);
}
/** @docs-private */
function getSortInvalidDirectionError(direction) {
  return Error(`${direction} is not a valid sort direction ('asc' or 'desc').`);
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token to be used to override the default options for `tak-sort`. */
const TAK_SORT_DEFAULT_OPTIONS = new InjectionToken('TAK_SORT_DEFAULT_OPTIONS');
// Boilerplate for applying mixins to TakSort.
/** @docs-private */
const _TakSortBase = mixinInitialized(mixinDisabled(class {}));
/** Container for TakSortables to manage the sort state and provide default sort parameters. */
class TakSort extends _TakSortBase {
  constructor(_defaultOptions) {
    super();
    this._defaultOptions = _defaultOptions;
    /** Collection of all registered sortables that this directive manages. */
    this.sortables = new Map();
    /** Used to notify any child components listening to state changes. */
    this._stateChanges = new Subject();
    /**
     * The direction to set when an TakSortable is initially sorted.
     * May be overridden by the TakSortable's sort start.
     */
    this.start = 'asc';
    this._direction = '';
    /** Event emitted when the user changes either the active sort or sort direction. */
    this.sortChange = new EventEmitter();
  }
  /** The sort direction of the currently active TakSortable. */
  get direction() {
    return this._direction;
  }
  set direction(direction) {
    if (
      direction &&
      direction !== 'asc' &&
      direction !== 'desc' &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw getSortInvalidDirectionError(direction);
    }
    this._direction = direction;
  }
  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   * May be overridden by the TakSortable's disable clear input.
   */
  get disableClear() {
    return this._disableClear;
  }
  set disableClear(v) {
    this._disableClear = coerceBooleanProperty(v);
  }
  /**
   * Register function to be used by the contained TakSortables. Adds the TakSortable to the
   * collection of TakSortables.
   */
  register(sortable) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!sortable.id) {
        throw getSortHeaderMissingIdError();
      }
      if (this.sortables.has(sortable.id)) {
        throw getSortDuplicateSortableIdError(sortable.id);
      }
    }
    this.sortables.set(sortable.id, sortable);
  }
  /**
   * Unregister function to be used by the contained TakSortables. Removes the TakSortable from the
   * collection of contained TakSortables.
   */
  deregister(sortable) {
    this.sortables.delete(sortable.id);
  }
  /** Sets the active sort id and determines the new sort direction. */
  sort(sortable) {
    if (this.active != sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }
    this.sortChange.emit({ active: this.active, direction: this.direction });
  }
  /** Returns the next sort direction of the active sortable, checking for potential overrides. */
  getNextSortDirection(sortable) {
    if (!sortable) {
      return '';
    }
    // Get the sort direction cycle with the potential sortable overrides.
    const disableClear =
      sortable?.disableClear ?? this.disableClear ?? !!this._defaultOptions?.disableClear;
    let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }
  ngOnInit() {
    this._markInitialized();
  }
  ngOnChanges() {
    this._stateChanges.next();
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
}
TakSort.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSort,
  deps: [{ token: TAK_SORT_DEFAULT_OPTIONS, optional: true }],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakSort.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakSort,
  selector: '[takSort]',
  inputs: {
    disabled: ['takSortDisabled', 'disabled'],
    active: ['takSortActive', 'active'],
    start: ['takSortStart', 'start'],
    direction: ['takSortDirection', 'direction'],
    disableClear: ['takSortDisableClear', 'disableClear'],
  },
  outputs: { sortChange: 'takSortChange' },
  host: { classAttribute: 'tak-sort' },
  exportAs: ['takSort'],
  usesInheritance: true,
  usesOnChanges: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSort,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takSort]',
          exportAs: 'takSort',
          host: { class: 'tak-sort' },
          inputs: ['disabled: takSortDisabled'],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_SORT_DEFAULT_OPTIONS],
          },
        ],
      },
    ];
  },
  propDecorators: {
    active: [
      {
        type: Input,
        args: ['takSortActive'],
      },
    ],
    start: [
      {
        type: Input,
        args: ['takSortStart'],
      },
    ],
    direction: [
      {
        type: Input,
        args: ['takSortDirection'],
      },
    ],
    disableClear: [
      {
        type: Input,
        args: ['takSortDisableClear'],
      },
    ],
    sortChange: [
      {
        type: Output,
        args: ['takSortChange'],
      },
    ],
  },
});
/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start, disableClear) {
  let sortOrder = ['asc', 'desc'];
  if (start == 'desc') {
    sortOrder.reverse();
  }
  if (!disableClear) {
    sortOrder.push('');
  }
  return sortOrder;
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const SORT_ANIMATION_TRANSITION =
  AnimationDurations.ENTERING + ' ' + AnimationCurves.STANDARD_CURVE;
/**
 * Animations used by TakSort.
 * @docs-private
 */
const takSortAnimations = {
  /** Animation that moves the sort indicator. */
  indicator: trigger('indicator', [
    state('active-asc, asc', style({ transform: 'translateY(0px)' })),
    // 10px is the height of the sort indicator, minus the width of the pointers
    state('active-desc, desc', style({ transform: 'translateY(10px)' })),
    transition('active-asc <=> active-desc', animate(SORT_ANIMATION_TRANSITION)),
  ]),
  /** Animation that rotates the left pointer of the indicator based on the sorting direction. */
  leftPointer: trigger('leftPointer', [
    state('active-asc, asc', style({ transform: 'rotate(-45deg)' })),
    state('active-desc, desc', style({ transform: 'rotate(45deg)' })),
    transition('active-asc <=> active-desc', animate(SORT_ANIMATION_TRANSITION)),
  ]),
  /** Animation that rotates the right pointer of the indicator based on the sorting direction. */
  rightPointer: trigger('rightPointer', [
    state('active-asc, asc', style({ transform: 'rotate(45deg)' })),
    state('active-desc, desc', style({ transform: 'rotate(-45deg)' })),
    transition('active-asc <=> active-desc', animate(SORT_ANIMATION_TRANSITION)),
  ]),
  /** Animation that controls the arrow opacity. */
  arrowOpacity: trigger('arrowOpacity', [
    state('desc-to-active, asc-to-active, active', style({ opacity: 1 })),
    state('desc-to-hint, asc-to-hint, hint', style({ opacity: 0.54 })),
    state(
      'hint-to-desc, active-to-desc, desc, hint-to-asc, active-to-asc, asc, void',
      style({ opacity: 0 })
    ),
    // Transition between all states except for immediate transitions
    transition('* => asc, * => desc, * => active, * => hint, * => void', animate('0ms')),
    transition('* <=> *', animate(SORT_ANIMATION_TRANSITION)),
  ]),
  /**
   * Animation for the translation of the arrow as a whole. States are separated into two
   * groups: ones with animations and others that are immediate. Immediate states are asc, desc,
   * peek, and active. The other states define a specific animation (source-to-destination)
   * and are determined as a function of their prev user-perceived state and what the next state
   * should be.
   */
  arrowPosition: trigger('arrowPosition', [
    // Hidden Above => Hint Center
    transition(
      '* => desc-to-hint, * => desc-to-active',
      animate(
        SORT_ANIMATION_TRANSITION,
        keyframes([style({ transform: 'translateY(-25%)' }), style({ transform: 'translateY(0)' })])
      )
    ),
    // Hint Center => Hidden Below
    transition(
      '* => hint-to-desc, * => active-to-desc',
      animate(
        SORT_ANIMATION_TRANSITION,
        keyframes([style({ transform: 'translateY(0)' }), style({ transform: 'translateY(25%)' })])
      )
    ),
    // Hidden Below => Hint Center
    transition(
      '* => asc-to-hint, * => asc-to-active',
      animate(
        SORT_ANIMATION_TRANSITION,
        keyframes([style({ transform: 'translateY(25%)' }), style({ transform: 'translateY(0)' })])
      )
    ),
    // Hint Center => Hidden Above
    transition(
      '* => hint-to-asc, * => active-to-asc',
      animate(
        SORT_ANIMATION_TRANSITION,
        keyframes([style({ transform: 'translateY(0)' }), style({ transform: 'translateY(-25%)' })])
      )
    ),
    state(
      'desc-to-hint, asc-to-hint, hint, desc-to-active, asc-to-active, active',
      style({ transform: 'translateY(0)' })
    ),
    state('hint-to-desc, active-to-desc, desc', style({ transform: 'translateY(-25%)' })),
    state('hint-to-asc, active-to-asc, asc', style({ transform: 'translateY(25%)' })),
  ]),
  /** Necessary trigger that calls animate on children animations. */
  allowChildren: trigger('allowChildren', [
    transition('* <=> *', [query('@*', animateChild(), { optional: true })]),
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
 * To modify the labels and text displayed, create a new instance of TakSortHeaderIntl and
 * include it in a custom provider.
 */
class TakSortHeaderIntl {
  constructor() {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    this.changes = new Subject();
  }
}
TakSortHeaderIntl.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortHeaderIntl,
  deps: [],
  target: i0.ɵɵFactoryTarget.Injectable,
});
TakSortHeaderIntl.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortHeaderIntl,
  providedIn: 'root',
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortHeaderIntl,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
    },
  ],
});
/** @docs-private */
function TAK_SORT_HEADER_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new TakSortHeaderIntl();
}
/** @docs-private */
const TAK_SORT_HEADER_INTL_PROVIDER = {
  // If there is already an TakSortHeaderIntl available, use that. Otherwise, provide a new one.
  provide: TakSortHeaderIntl,
  deps: [[new Optional(), new SkipSelf(), TakSortHeaderIntl]],
  useFactory: TAK_SORT_HEADER_INTL_PROVIDER_FACTORY,
};

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Boilerplate for applying mixins to the sort header.
/** @docs-private */
const _TakSortHeaderBase = mixinDisabled(class {});
/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent TakSort directive.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
class TakSortHeader extends _TakSortHeaderBase {
  constructor(
    /**
     * @deprecated `_intl` parameter isn't being used anymore and it'll be removed.
     * @breaking-change 13.0.0
     */
    _intl,
    _changeDetectorRef,
    // `TakSort` is not optionally injected, but just asserted manually w/ better error.
    // tslint:disable-next-line: lightweight-tokens
    _sort,
    _columnDef,
    _focusMonitor,
    _elementRef,
    /** @breaking-change 14.0.0 _ariaDescriber will be required. */
    _ariaDescriber,
    defaultOptions
  ) {
    // Note that we use a string token for the `_columnDef`, because the value is provided both by
    // `material/table` and `cdk/table` and we can't have the CDK depending on Material,
    // and we want to avoid having the sort header depending on the CDK table because
    // of this single reference.
    super();
    this._intl = _intl;
    this._changeDetectorRef = _changeDetectorRef;
    this._sort = _sort;
    this._columnDef = _columnDef;
    this._focusMonitor = _focusMonitor;
    this._elementRef = _elementRef;
    this._ariaDescriber = _ariaDescriber;
    /**
     * Flag set to true when the indicator should be displayed while the sort is not active. Used to
     * provide an affordance that the header is sortable by showing on focus and hover.
     */
    this._showIndicatorHint = false;
    /**
     * The view transition state of the arrow (translation/ opacity) - indicates its `from` and `to`
     * position through the animation. If animations are currently disabled, the fromState is removed
     * so that there is no animation displayed.
     */
    this._viewState = {};
    /** The direction the arrow should be facing according to the current state. */
    this._arrowDirection = '';
    /**
     * Whether the view state animation should show the transition between the `from` and `to` states.
     */
    this._disableViewStateAnimation = false;
    /** Sets the position of the arrow that displays when sorted. */
    this.arrowPosition = 'after';
    // Default the action description to "Sort" because it's better than nothing.
    // Without a description, the button's label comes from the sort header text content,
    // which doesn't give any indication that it performs a sorting operation.
    this._sortActionDescription = 'Sort';
    if (!_sort && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw getSortHeaderNotContainedWithinSortError();
    }
    if (defaultOptions?.arrowPosition) {
      this.arrowPosition = defaultOptions?.arrowPosition;
    }
    this._handleStateChanges();
  }
  /**
   * Description applied to TakSortHeader's button element with aria-describedby. This text should
   * describe the action that will occur when the user clicks the sort header.
   */
  get sortActionDescription() {
    return this._sortActionDescription;
  }
  set sortActionDescription(value) {
    this._updateSortActionDescription(value);
  }
  /** Overrides the disable clear value of the containing TakSort for this TakSortable. */
  get disableClear() {
    return this._disableClear;
  }
  set disableClear(v) {
    this._disableClear = coerceBooleanProperty(v);
  }
  ngOnInit() {
    if (!this.id && this._columnDef) {
      this.id = this._columnDef.name;
    }
    // Initialize the direction of the arrow and set the view state to be immediately that state.
    this._updateArrowDirection();
    this._setAnimationTransitionState({
      toState: this._isSorted() ? 'active' : this._arrowDirection,
    });
    this._sort.register(this);
    this._sortButton = this._elementRef.nativeElement.querySelector('.tak-sort-header-container');
    this._updateSortActionDescription(this._sortActionDescription);
  }
  ngAfterViewInit() {
    // We use the focus monitor because we also want to style
    // things differently based on the focus origin.
    this._focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
      const newState = !!origin;
      if (newState !== this._showIndicatorHint) {
        this._setIndicatorHintVisible(newState);
        this._changeDetectorRef.markForCheck();
      }
    });
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._sort.deregister(this);
    this._rerenderSubscription.unsubscribe();
  }
  /**
   * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
   * user showing what the active sort will become. If set to false, the arrow will fade away.
   */
  _setIndicatorHintVisible(visible) {
    // No-op if the sort header is disabled - should not make the hint visible.
    if (this._isDisabled() && visible) {
      return;
    }
    this._showIndicatorHint = visible;
    if (!this._isSorted()) {
      this._updateArrowDirection();
      if (this._showIndicatorHint) {
        this._setAnimationTransitionState({ fromState: this._arrowDirection, toState: 'hint' });
      } else {
        this._setAnimationTransitionState({ fromState: 'hint', toState: this._arrowDirection });
      }
    }
  }
  /**
   * Sets the animation transition view state for the arrow's position and opacity. If the
   * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
   * no animation appears.
   */
  _setAnimationTransitionState(viewState) {
    this._viewState = viewState || {};
    // If the animation for arrow position state (opacity/translation) should be disabled,
    // remove the fromState so that it jumps right to the toState.
    if (this._disableViewStateAnimation) {
      this._viewState = { toState: viewState.toState };
    }
  }
  /** Triggers the sort on this sort header and removes the indicator hint. */
  _toggleOnInteraction() {
    this._sort.sort(this);
    // Do not show the animation if the header was already shown in the right position.
    if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
      this._disableViewStateAnimation = true;
    }
  }
  _handleClick() {
    if (!this._isDisabled()) {
      this._sort.sort(this);
    }
  }
  _handleKeydown(event) {
    if (!this._isDisabled() && (event.keyCode === SPACE || event.keyCode === ENTER)) {
      event.preventDefault();
      this._toggleOnInteraction();
    }
  }
  /** Whether this TakSortHeader is currently sorted in either ascending or descending order. */
  _isSorted() {
    return (
      this._sort.active == this.id &&
      (this._sort.direction === 'asc' || this._sort.direction === 'desc')
    );
  }
  /** Returns the animation state for the arrow direction (indicator and pointers). */
  _getArrowDirectionState() {
    return `${this._isSorted() ? 'active-' : ''}${this._arrowDirection}`;
  }
  /** Returns the arrow position state (opacity, translation). */
  _getArrowViewState() {
    const fromState = this._viewState.fromState;
    return (fromState ? `${fromState}-to-` : '') + this._viewState.toState;
  }
  /**
   * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
   * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
   * active sorted direction. The reason this is updated through a function is because the direction
   * should only be changed at specific times - when deactivated but the hint is displayed and when
   * the sort is active and the direction changes. Otherwise the arrow's direction should linger
   * in cases such as the sort becoming deactivated but we want to animate the arrow away while
   * preserving its direction, even though the next sort direction is actually different and should
   * only be changed once the arrow displays again (hint or activation).
   */
  _updateArrowDirection() {
    this._arrowDirection = this._isSorted() ? this._sort.direction : this.start || this._sort.start;
  }
  _isDisabled() {
    return this._sort.disabled || this.disabled;
  }
  /**
   * Gets the aria-sort attribute that should be applied to this sort header. If this header
   * is not sorted, returns null so that the attribute is removed from the host element. Aria spec
   * says that the aria-sort property should only be present on one header at a time, so removing
   * ensures this is true.
   */
  _getAriaSortAttribute() {
    if (!this._isSorted()) {
      return 'none';
    }
    return this._sort.direction == 'asc' ? 'ascending' : 'descending';
  }
  /** Whether the arrow inside the sort header should be rendered. */
  _renderArrow() {
    return !this._isDisabled() || this._isSorted();
  }
  _updateSortActionDescription(newDescription) {
    // We use AriaDescriber for the sort button instead of setting an `aria-label` because some
    // screen readers (notably VoiceOver) will read both the column header *and* the button's label
    // for every *cell* in the table, creating a lot of unnecessary noise.
    // If _sortButton is undefined, the component hasn't been initialized yet so there's
    // nothing to update in the DOM.
    if (this._sortButton) {
      // removeDescription will no-op if there is no existing message.
      // TODO(jelbourn): remove optional chaining when AriaDescriber is required.
      this._ariaDescriber?.removeDescription(this._sortButton, this._sortActionDescription);
      this._ariaDescriber?.describe(this._sortButton, newDescription);
    }
    this._sortActionDescription = newDescription;
  }
  /** Handles changes in the sorting state. */
  _handleStateChanges() {
    this._rerenderSubscription = merge(
      this._sort.sortChange,
      this._sort._stateChanges,
      this._intl.changes
    ).subscribe(() => {
      if (this._isSorted()) {
        this._updateArrowDirection();
        // Do not show the animation if the header was already shown in the right position.
        if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
          this._disableViewStateAnimation = true;
        }
        this._setAnimationTransitionState({ fromState: this._arrowDirection, toState: 'active' });
        this._showIndicatorHint = false;
      }
      // If this header was recently active and now no longer sorted, animate away the arrow.
      if (!this._isSorted() && this._viewState && this._viewState.toState === 'active') {
        this._disableViewStateAnimation = false;
        this._setAnimationTransitionState({ fromState: 'active', toState: this._arrowDirection });
      }
      this._changeDetectorRef.markForCheck();
    });
  }
}
TakSortHeader.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortHeader,
  deps: [
    { token: TakSortHeaderIntl },
    { token: i0.ChangeDetectorRef },
    { token: TakSort, optional: true },
    { token: 'TAK_SORT_HEADER_COLUMN_DEF', optional: true },
    { token: i3.FocusMonitor },
    { token: i0.ElementRef },
    { token: i3.AriaDescriber, optional: true },
    { token: TAK_SORT_DEFAULT_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakSortHeader.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakSortHeader,
  selector: '[tak-sort-header]',
  inputs: {
    disabled: 'disabled',
    id: ['tak-sort-header', 'id'],
    arrowPosition: 'arrowPosition',
    start: 'start',
    sortActionDescription: 'sortActionDescription',
    disableClear: 'disableClear',
  },
  host: {
    listeners: {
      click: '_handleClick()',
      keydown: '_handleKeydown($event)',
      mouseenter: '_setIndicatorHintVisible(true)',
      mouseleave: '_setIndicatorHintVisible(false)',
    },
    properties: {
      'attr.aria-sort': '_getAriaSortAttribute()',
      'class.tak-sort-header-disabled': '_isDisabled()',
    },
    classAttribute: 'tak-sort-header',
  },
  exportAs: ['takSortHeader'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<!--\n  We set the `tabindex` on an element inside the table header, rather than the header itself,\n  because of a bug in NVDA where having a `tabindex` on a `th` breaks keyboard navigation in the\n  table (see https://github.com/nvaccess/nvda/issues/7718). This allows for the header to both\n  be focusable, and have screen readers read out its `aria-sort` state. We prefer this approach\n  over having a button with an `aria-label` inside the header, because the button\'s `aria-label`\n  will be read out as the user is navigating the table\'s cell (see #13012).\n\n  The approach is based off of: https://dequeuniversity.com/library/aria/tables/sf-sortable-grid\n-->\n<div class="tak-sort-header-container tak-focus-indicator"\n     [class.tak-sort-header-sorted]="_isSorted()"\n     [class.tak-sort-header-position-before]="arrowPosition === \'before\'"\n     [attr.tabindex]="_isDisabled() ? null : 0"\n     [attr.role]="_isDisabled() ? null : \'button\'">\n\n  <!--\n    TODO(crisbeto): this div isn\'t strictly necessary, but we have to keep it due to a large\n    number of screenshot diff failures. It should be removed eventually. Note that the difference\n    isn\'t visible with a shorter header, but once it breaks up into multiple lines, this element\n    causes it to be center-aligned, whereas removing it will keep the text to the left.\n  -->\n  <div class="tak-sort-header-content">\n    <ng-content></ng-content>\n  </div>\n\n  <!-- Disable animations while a current animation is running -->\n  <div class="tak-sort-header-arrow"\n       *ngIf="_renderArrow()"\n       [@arrowOpacity]="_getArrowViewState()"\n       [@arrowPosition]="_getArrowViewState()"\n       [@allowChildren]="_getArrowDirectionState()"\n       (@arrowPosition.start)="_disableViewStateAnimation = true"\n       (@arrowPosition.done)="_disableViewStateAnimation = false">\n    <div class="tak-sort-header-stem"></div>\n    <div class="tak-sort-header-indicator" [@indicator]="_getArrowDirectionState()">\n      <div class="tak-sort-header-pointer-left" [@leftPointer]="_getArrowDirectionState()"></div>\n      <div class="tak-sort-header-pointer-right" [@rightPointer]="_getArrowDirectionState()"></div>\n      <div class="tak-sort-header-pointer-middle"></div>\n    </div>\n  </div>\n</div>\n',
  styles: [
    '.tak-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}[tak-sort-header].cdk-keyboard-focused .tak-sort-header-container,[tak-sort-header].cdk-program-focused .tak-sort-header-container{border-bottom:solid 1px currentColor}.tak-sort-header-disabled .tak-sort-header-container{cursor:default}.tak-sort-header-container::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 2px) * -1)}.tak-sort-header-content{text-align:center;display:flex;align-items:center}.tak-sort-header-position-before{flex-direction:row-reverse}.tak-sort-header-arrow{height:12px;width:12px;min-width:12px;position:relative;display:flex;opacity:0}.tak-sort-header-arrow,[dir=rtl] .tak-sort-header-position-before .tak-sort-header-arrow{margin:0 0 0 6px}.tak-sort-header-position-before .tak-sort-header-arrow,[dir=rtl] .tak-sort-header-arrow{margin:0 6px 0 0}.tak-sort-header-stem{background:currentColor;height:10px;width:2px;margin:auto;display:flex;align-items:center}.cdk-high-contrast-active .tak-sort-header-stem{width:0;border-left:solid 2px}.tak-sort-header-indicator{width:100%;height:2px;display:flex;align-items:center;position:absolute;top:0;left:0}.tak-sort-header-pointer-middle{margin:auto;height:2px;width:2px;background:currentColor;transform:rotate(45deg)}.cdk-high-contrast-active .tak-sort-header-pointer-middle{width:0;height:0;border-top:solid 2px;border-left:solid 2px}.tak-sort-header-pointer-left,.tak-sort-header-pointer-right{background:currentColor;width:6px;height:2px;position:absolute;top:0}.cdk-high-contrast-active .tak-sort-header-pointer-left,.cdk-high-contrast-active .tak-sort-header-pointer-right{width:0;height:0;border-left:solid 6px;border-top:solid 2px}.tak-sort-header-pointer-left{transform-origin:right;left:0}.tak-sort-header-pointer-right{transform-origin:left;right:0}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i4.NgIf,
      selector: '[ngIf]',
      inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
    },
  ],
  animations: [
    takSortAnimations.indicator,
    takSortAnimations.leftPointer,
    takSortAnimations.rightPointer,
    takSortAnimations.arrowOpacity,
    takSortAnimations.arrowPosition,
    takSortAnimations.allowChildren,
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortHeader,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: '[tak-sort-header]',
          exportAs: 'takSortHeader',
          host: {
            class: 'tak-sort-header',
            '(click)': '_handleClick()',
            '(keydown)': '_handleKeydown($event)',
            '(mouseenter)': '_setIndicatorHintVisible(true)',
            '(mouseleave)': '_setIndicatorHintVisible(false)',
            '[attr.aria-sort]': '_getAriaSortAttribute()',
            '[class.tak-sort-header-disabled]': '_isDisabled()',
          },
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          inputs: ['disabled'],
          animations: [
            takSortAnimations.indicator,
            takSortAnimations.leftPointer,
            takSortAnimations.rightPointer,
            takSortAnimations.arrowOpacity,
            takSortAnimations.arrowPosition,
            takSortAnimations.allowChildren,
          ],
          template:
            '<!--\n  We set the `tabindex` on an element inside the table header, rather than the header itself,\n  because of a bug in NVDA where having a `tabindex` on a `th` breaks keyboard navigation in the\n  table (see https://github.com/nvaccess/nvda/issues/7718). This allows for the header to both\n  be focusable, and have screen readers read out its `aria-sort` state. We prefer this approach\n  over having a button with an `aria-label` inside the header, because the button\'s `aria-label`\n  will be read out as the user is navigating the table\'s cell (see #13012).\n\n  The approach is based off of: https://dequeuniversity.com/library/aria/tables/sf-sortable-grid\n-->\n<div class="tak-sort-header-container tak-focus-indicator"\n     [class.tak-sort-header-sorted]="_isSorted()"\n     [class.tak-sort-header-position-before]="arrowPosition === \'before\'"\n     [attr.tabindex]="_isDisabled() ? null : 0"\n     [attr.role]="_isDisabled() ? null : \'button\'">\n\n  <!--\n    TODO(crisbeto): this div isn\'t strictly necessary, but we have to keep it due to a large\n    number of screenshot diff failures. It should be removed eventually. Note that the difference\n    isn\'t visible with a shorter header, but once it breaks up into multiple lines, this element\n    causes it to be center-aligned, whereas removing it will keep the text to the left.\n  -->\n  <div class="tak-sort-header-content">\n    <ng-content></ng-content>\n  </div>\n\n  <!-- Disable animations while a current animation is running -->\n  <div class="tak-sort-header-arrow"\n       *ngIf="_renderArrow()"\n       [@arrowOpacity]="_getArrowViewState()"\n       [@arrowPosition]="_getArrowViewState()"\n       [@allowChildren]="_getArrowDirectionState()"\n       (@arrowPosition.start)="_disableViewStateAnimation = true"\n       (@arrowPosition.done)="_disableViewStateAnimation = false">\n    <div class="tak-sort-header-stem"></div>\n    <div class="tak-sort-header-indicator" [@indicator]="_getArrowDirectionState()">\n      <div class="tak-sort-header-pointer-left" [@leftPointer]="_getArrowDirectionState()"></div>\n      <div class="tak-sort-header-pointer-right" [@rightPointer]="_getArrowDirectionState()"></div>\n      <div class="tak-sort-header-pointer-middle"></div>\n    </div>\n  </div>\n</div>\n',
          styles: [
            '.tak-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}[tak-sort-header].cdk-keyboard-focused .tak-sort-header-container,[tak-sort-header].cdk-program-focused .tak-sort-header-container{border-bottom:solid 1px currentColor}.tak-sort-header-disabled .tak-sort-header-container{cursor:default}.tak-sort-header-container::before{margin:calc(calc(var(--tak-focus-indicator-border-width, 3px) + 2px) * -1)}.tak-sort-header-content{text-align:center;display:flex;align-items:center}.tak-sort-header-position-before{flex-direction:row-reverse}.tak-sort-header-arrow{height:12px;width:12px;min-width:12px;position:relative;display:flex;opacity:0}.tak-sort-header-arrow,[dir=rtl] .tak-sort-header-position-before .tak-sort-header-arrow{margin:0 0 0 6px}.tak-sort-header-position-before .tak-sort-header-arrow,[dir=rtl] .tak-sort-header-arrow{margin:0 6px 0 0}.tak-sort-header-stem{background:currentColor;height:10px;width:2px;margin:auto;display:flex;align-items:center}.cdk-high-contrast-active .tak-sort-header-stem{width:0;border-left:solid 2px}.tak-sort-header-indicator{width:100%;height:2px;display:flex;align-items:center;position:absolute;top:0;left:0}.tak-sort-header-pointer-middle{margin:auto;height:2px;width:2px;background:currentColor;transform:rotate(45deg)}.cdk-high-contrast-active .tak-sort-header-pointer-middle{width:0;height:0;border-top:solid 2px;border-left:solid 2px}.tak-sort-header-pointer-left,.tak-sort-header-pointer-right{background:currentColor;width:6px;height:2px;position:absolute;top:0}.cdk-high-contrast-active .tak-sort-header-pointer-left,.cdk-high-contrast-active .tak-sort-header-pointer-right{width:0;height:0;border-left:solid 6px;border-top:solid 2px}.tak-sort-header-pointer-left{transform-origin:right;left:0}.tak-sort-header-pointer-right{transform-origin:left;right:0}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: TakSortHeaderIntl },
      { type: i0.ChangeDetectorRef },
      {
        type: TakSort,
        decorators: [
          {
            type: Optional,
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: ['TAK_SORT_HEADER_COLUMN_DEF'],
          },
          {
            type: Optional,
          },
        ],
      },
      { type: i3.FocusMonitor },
      { type: i0.ElementRef },
      {
        type: i3.AriaDescriber,
        decorators: [
          {
            type: Optional,
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_SORT_DEFAULT_OPTIONS],
          },
        ],
      },
    ];
  },
  propDecorators: {
    id: [
      {
        type: Input,
        args: ['tak-sort-header'],
      },
    ],
    arrowPosition: [
      {
        type: Input,
      },
    ],
    start: [
      {
        type: Input,
      },
    ],
    sortActionDescription: [
      {
        type: Input,
      },
    ],
    disableClear: [
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
class TakSortModule {}
TakSortModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakSortModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortModule,
  declarations: [TakSort, TakSortHeader],
  imports: [CommonModule, TakCommonModule],
  exports: [TakSort, TakSortHeader],
});
TakSortModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortModule,
  providers: [TAK_SORT_HEADER_INTL_PROVIDER],
  imports: [CommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakSortModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [CommonModule, TakCommonModule],
          exports: [TakSort, TakSortHeader],
          declarations: [TakSort, TakSortHeader],
          providers: [TAK_SORT_HEADER_INTL_PROVIDER],
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
  TAK_SORT_DEFAULT_OPTIONS,
  TAK_SORT_HEADER_INTL_PROVIDER,
  TAK_SORT_HEADER_INTL_PROVIDER_FACTORY,
  TakSort,
  TakSortHeader,
  TakSortHeaderIntl,
  TakSortModule,
  takSortAnimations,
};
//# sourceMappingURL=sort.mjs.map
