import { CdkAccordionItem, CdkAccordion, CdkAccordionModule } from '@takkion/ng-cdk/accordion';
import * as i2 from '@takkion/ng-cdk/portal';
import { TemplatePortal, PortalModule } from '@takkion/ng-cdk/portal';
import * as i3 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import {
  InjectionToken,
  Directive,
  Inject,
  Optional,
  EventEmitter,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SkipSelf,
  Input,
  Output,
  ContentChild,
  ViewChild,
  Host,
  Attribute,
  QueryList,
  ContentChildren,
  NgModule,
} from '@angular/core';
import { mixinTabIndex, TakCommonModule } from '@takkion/ng-material/core';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import * as i2$1 from '@takkion/ng-cdk/a11y';
import { FocusKeyManager } from '@takkion/ng-cdk/a11y';
import { distinctUntilChanged, startWith, filter, take } from 'rxjs/operators';
import { ENTER, hasModifierKey, SPACE } from '@takkion/ng-cdk/keycodes';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subject, Subscription, EMPTY, merge } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1 from '@takkion/ng-cdk/collections';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Token used to provide a `TakAccordion` to `TakExpansionPanel`.
 * Used primarily to avoid circular imports between `TakAccordion` and `TakExpansionPanel`.
 */
const TAK_ACCORDION = new InjectionToken('TAK_ACCORDION');

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Time and timing curve for expansion panel animations. */
// Note: Keep this in sync with the Sass variable for the panel header animation.
const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';
/**
 * Animations used by the Material expansion panel.
 *
 * A bug in angular animation's `state` when ViewContainers are moved using ViewContainerRef.move()
 * causes the animation state of moved components to become `void` upon exit, and not update again
 * upon reentry into the DOM.  This can lead a to situation for the expansion panel where the state
 * of the panel is `expanded` or `collapsed` but the animation state is `void`.
 *
 * To correctly handle animating to the next state, we animate between `void` and `collapsed` which
 * are defined to have the same styles. Since angular animates from the current styles to the
 * destination state's style definition, in situations where we are moving from `void`'s styles to
 * `collapsed` this acts a noop since no style values change.
 *
 * In the case where angular's animation state is out of sync with the expansion panel's state, the
 * expansion panel being `expanded` and angular animations being `void`, the animation from the
 * `expanded`'s effective styles (though in a `void` animation state) to the collapsed state will
 * occur as expected.
 *
 * Angular Bug: https://github.com/angular/angular/issues/18847
 *
 * @docs-private
 */
const takExpansionAnimations = {
  /** Animation that rotates the indicator arrow. */
  indicatorRotate: trigger('indicatorRotate', [
    state('collapsed, void', style({ transform: 'rotate(0deg)' })),
    state('expanded', style({ transform: 'rotate(180deg)' })),
    transition(
      'expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)
    ),
  ]),
  /** Animation that expands and collapses the panel content. */
  bodyExpansion: trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition(
      'expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)
    ),
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
 * Token used to provide a `TakExpansionPanel` to `TakExpansionPanelContent`.
 * Used to avoid circular imports between `TakExpansionPanel` and `TakExpansionPanelContent`.
 */
const TAK_EXPANSION_PANEL = new InjectionToken('TAK_EXPANSION_PANEL');

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
class TakExpansionPanelContent {
  constructor(_template, _expansionPanel) {
    this._template = _template;
    this._expansionPanel = _expansionPanel;
  }
}
TakExpansionPanelContent.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelContent,
  deps: [{ token: i0.TemplateRef }, { token: TAK_EXPANSION_PANEL, optional: true }],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakExpansionPanelContent.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakExpansionPanelContent,
  selector: 'ng-template[takExpansionPanelContent]',
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelContent,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'ng-template[takExpansionPanelContent]',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.TemplateRef },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [TAK_EXPANSION_PANEL],
          },
          {
            type: Optional,
          },
        ],
      },
    ];
  },
});

/** Counter for generating unique element ids. */
let uniqueId = 0;
/**
 * Injection token that can be used to configure the default
 * options for the expansion panel component.
 */
const TAK_EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken(
  'TAK_EXPANSION_PANEL_DEFAULT_OPTIONS'
);
/**
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the TakAccordion directive attached.
 */
class TakExpansionPanel extends CdkAccordionItem {
  constructor(
    accordion,
    _changeDetectorRef,
    _uniqueSelectionDispatcher,
    _viewContainerRef,
    _document,
    _animationMode,
    defaultOptions
  ) {
    super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
    this._viewContainerRef = _viewContainerRef;
    this._animationMode = _animationMode;
    this._hideToggle = false;
    /** An event emitted after the body's expansion animation happens. */
    this.afterExpand = new EventEmitter();
    /** An event emitted after the body's collapse animation happens. */
    this.afterCollapse = new EventEmitter();
    /** Stream that emits for changes in `@Input` properties. */
    this._inputChanges = new Subject();
    /** ID for the associated header element. Used for a11y labelling. */
    this._headerId = `tak-expansion-panel-header-${uniqueId++}`;
    /** Stream of body animation done events. */
    this._bodyAnimationDone = new Subject();
    this.accordion = accordion;
    this._document = _document;
    // We need a Subject with distinctUntilChanged, because the `done` event
    // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
    this._bodyAnimationDone
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        })
      )
      .subscribe(event => {
        if (event.fromState !== 'void') {
          if (event.toState === 'expanded') {
            this.afterExpand.emit();
          } else if (event.toState === 'collapsed') {
            this.afterCollapse.emit();
          }
        }
      });
    if (defaultOptions) {
      this.hideToggle = defaultOptions.hideToggle;
    }
  }
  /** Whether the toggle indicator should be hidden. */
  get hideToggle() {
    return this._hideToggle || (this.accordion && this.accordion.hideToggle);
  }
  set hideToggle(value) {
    this._hideToggle = coerceBooleanProperty(value);
  }
  /** The position of the expansion indicator. */
  get togglePosition() {
    return this._togglePosition || (this.accordion && this.accordion.togglePosition);
  }
  set togglePosition(value) {
    this._togglePosition = value;
  }
  /** Determines whether the expansion panel should have spacing between it and its siblings. */
  _hasSpacing() {
    if (this.accordion) {
      return this.expanded && this.accordion.displayMode === 'default';
    }
    return false;
  }
  /** Gets the expanded state string. */
  _getExpandedState() {
    return this.expanded ? 'expanded' : 'collapsed';
  }
  /** Toggles the expanded state of the expansion panel. */
  toggle() {
    this.expanded = !this.expanded;
  }
  /** Sets the expanded state of the expansion panel to false. */
  close() {
    this.expanded = false;
  }
  /** Sets the expanded state of the expansion panel to true. */
  open() {
    this.expanded = true;
  }
  ngAfterContentInit() {
    if (this._lazyContent && this._lazyContent._expansionPanel === this) {
      // Render the content as soon as the panel becomes open.
      this.opened
        .pipe(
          startWith(null),
          filter(() => this.expanded && !this._portal),
          take(1)
        )
        .subscribe(() => {
          this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
        });
    }
  }
  ngOnChanges(changes) {
    this._inputChanges.next(changes);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._bodyAnimationDone.complete();
    this._inputChanges.complete();
  }
  /** Checks whether the expansion panel's content contains the currently-focused element. */
  _containsFocus() {
    if (this._body) {
      const focusedElement = this._document.activeElement;
      const bodyElement = this._body.nativeElement;
      return focusedElement === bodyElement || bodyElement.contains(focusedElement);
    }
    return false;
  }
}
TakExpansionPanel.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanel,
  deps: [
    { token: TAK_ACCORDION, optional: true, skipSelf: true },
    { token: i0.ChangeDetectorRef },
    { token: i1.UniqueSelectionDispatcher },
    { token: i0.ViewContainerRef },
    { token: DOCUMENT },
    { token: ANIMATION_MODULE_TYPE, optional: true },
    { token: TAK_EXPANSION_PANEL_DEFAULT_OPTIONS, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakExpansionPanel.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakExpansionPanel,
  selector: 'tak-expansion-panel',
  inputs: {
    disabled: 'disabled',
    expanded: 'expanded',
    hideToggle: 'hideToggle',
    togglePosition: 'togglePosition',
  },
  outputs: {
    opened: 'opened',
    closed: 'closed',
    expandedChange: 'expandedChange',
    afterExpand: 'afterExpand',
    afterCollapse: 'afterCollapse',
  },
  host: {
    properties: {
      'class.tak-expanded': 'expanded',
      'class._tak-animation-noopable': '_animationMode === "NoopAnimations"',
      'class.tak-expansion-panel-spacing': '_hasSpacing()',
    },
    classAttribute: 'tak-expansion-panel',
  },
  providers: [
    // Provide TakAccordion as undefined to prevent nested expansion panels from registering
    // to the same accordion.
    { provide: TAK_ACCORDION, useValue: undefined },
    { provide: TAK_EXPANSION_PANEL, useExisting: TakExpansionPanel },
  ],
  queries: [
    {
      propertyName: '_lazyContent',
      first: true,
      predicate: TakExpansionPanelContent,
      descendants: true,
    },
  ],
  viewQueries: [{ propertyName: '_body', first: true, predicate: ['body'], descendants: true }],
  exportAs: ['takExpansionPanel'],
  usesInheritance: true,
  usesOnChanges: true,
  ngImport: i0,
  template:
    '<ng-content select="tak-expansion-panel-header"></ng-content>\n<div class="tak-expansion-panel-content"\n     role="region"\n     [@bodyExpansion]="_getExpandedState()"\n     (@bodyExpansion.done)="_bodyAnimationDone.next($event)"\n     [attr.aria-labelledby]="_headerId"\n     [id]="id"\n     #body>\n  <div class="tak-expansion-panel-body">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n  </div>\n  <ng-content select="tak-action-row"></ng-content>\n</div>\n',
  styles: [
    '.tak-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.tak-accordion .tak-expansion-panel:not(.tak-expanded),.tak-accordion .tak-expansion-panel:not(.tak-expansion-panel-spacing){border-radius:0}.tak-accordion .tak-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.tak-accordion .tak-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .tak-expansion-panel{outline:solid 1px}.tak-expansion-panel.ng-animate-disabled,.ng-animate-disabled .tak-expansion-panel,.tak-expansion-panel._tak-animation-noopable{transition:none}.tak-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.tak-expansion-panel-content[style*="visibility: hidden"] *{visibility:hidden !important}.tak-expansion-panel-body{padding:0 24px 16px}.tak-expansion-panel-spacing{margin:16px 0}.tak-accordion>.tak-expansion-panel-spacing:first-child,.tak-accordion>*:first-child:not(.tak-expansion-panel) .tak-expansion-panel-spacing{margin-top:0}.tak-accordion>.tak-expansion-panel-spacing:last-child,.tak-accordion>*:last-child:not(.tak-expansion-panel) .tak-expansion-panel-spacing{margin-bottom:0}.tak-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.tak-action-row .tak-button-base,.tak-action-row .tak-mdc-button-base{margin-left:8px}[dir=rtl] .tak-action-row .tak-button-base,[dir=rtl] .tak-action-row .tak-mdc-button-base{margin-left:0;margin-right:8px}',
  ],
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
  animations: [takExpansionAnimations.bodyExpansion],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanel,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-expansion-panel',
          exportAs: 'takExpansionPanel',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          inputs: ['disabled', 'expanded'],
          outputs: ['opened', 'closed', 'expandedChange'],
          animations: [takExpansionAnimations.bodyExpansion],
          providers: [
            // Provide TakAccordion as undefined to prevent nested expansion panels from registering
            // to the same accordion.
            { provide: TAK_ACCORDION, useValue: undefined },
            { provide: TAK_EXPANSION_PANEL, useExisting: TakExpansionPanel },
          ],
          host: {
            class: 'tak-expansion-panel',
            '[class.tak-expanded]': 'expanded',
            '[class._tak-animation-noopable]': '_animationMode === "NoopAnimations"',
            '[class.tak-expansion-panel-spacing]': '_hasSpacing()',
          },
          template:
            '<ng-content select="tak-expansion-panel-header"></ng-content>\n<div class="tak-expansion-panel-content"\n     role="region"\n     [@bodyExpansion]="_getExpandedState()"\n     (@bodyExpansion.done)="_bodyAnimationDone.next($event)"\n     [attr.aria-labelledby]="_headerId"\n     [id]="id"\n     #body>\n  <div class="tak-expansion-panel-body">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n  </div>\n  <ng-content select="tak-action-row"></ng-content>\n</div>\n',
          styles: [
            '.tak-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.tak-accordion .tak-expansion-panel:not(.tak-expanded),.tak-accordion .tak-expansion-panel:not(.tak-expansion-panel-spacing){border-radius:0}.tak-accordion .tak-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.tak-accordion .tak-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .tak-expansion-panel{outline:solid 1px}.tak-expansion-panel.ng-animate-disabled,.ng-animate-disabled .tak-expansion-panel,.tak-expansion-panel._tak-animation-noopable{transition:none}.tak-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.tak-expansion-panel-content[style*="visibility: hidden"] *{visibility:hidden !important}.tak-expansion-panel-body{padding:0 24px 16px}.tak-expansion-panel-spacing{margin:16px 0}.tak-accordion>.tak-expansion-panel-spacing:first-child,.tak-accordion>*:first-child:not(.tak-expansion-panel) .tak-expansion-panel-spacing{margin-top:0}.tak-accordion>.tak-expansion-panel-spacing:last-child,.tak-accordion>*:last-child:not(.tak-expansion-panel) .tak-expansion-panel-spacing{margin-bottom:0}.tak-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.tak-action-row .tak-button-base,.tak-action-row .tak-mdc-button-base{margin-left:8px}[dir=rtl] .tak-action-row .tak-button-base,[dir=rtl] .tak-action-row .tak-mdc-button-base{margin-left:0;margin-right:8px}',
          ],
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
            type: SkipSelf,
          },
          {
            type: Inject,
            args: [TAK_ACCORDION],
          },
        ],
      },
      { type: i0.ChangeDetectorRef },
      { type: i1.UniqueSelectionDispatcher },
      { type: i0.ViewContainerRef },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [DOCUMENT],
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
            args: [ANIMATION_MODULE_TYPE],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [TAK_EXPANSION_PANEL_DEFAULT_OPTIONS],
          },
          {
            type: Optional,
          },
        ],
      },
    ];
  },
  propDecorators: {
    hideToggle: [
      {
        type: Input,
      },
    ],
    togglePosition: [
      {
        type: Input,
      },
    ],
    afterExpand: [
      {
        type: Output,
      },
    ],
    afterCollapse: [
      {
        type: Output,
      },
    ],
    _lazyContent: [
      {
        type: ContentChild,
        args: [TakExpansionPanelContent],
      },
    ],
    _body: [
      {
        type: ViewChild,
        args: ['body'],
      },
    ],
  },
});
/**
 * Actions of a `<tak-expansion-panel>`.
 */
class TakExpansionPanelActionRow {}
TakExpansionPanelActionRow.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelActionRow,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakExpansionPanelActionRow.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakExpansionPanelActionRow,
  selector: 'tak-action-row',
  host: { classAttribute: 'tak-action-row' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelActionRow,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-action-row',
          host: {
            class: 'tak-action-row',
          },
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
// Boilerplate for applying mixins to TakExpansionPanelHeader.
/** @docs-private */
class TakExpansionPanelHeaderBase {}
const _TakExpansionPanelHeaderMixinBase = mixinTabIndex(TakExpansionPanelHeaderBase);
/**
 * Header element of a `<tak-expansion-panel>`.
 */
class TakExpansionPanelHeader extends _TakExpansionPanelHeaderMixinBase {
  constructor(
    panel,
    _element,
    _focusMonitor,
    _changeDetectorRef,
    defaultOptions,
    _animationMode,
    tabIndex
  ) {
    super();
    this.panel = panel;
    this._element = _element;
    this._focusMonitor = _focusMonitor;
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    this._parentChangeSubscription = Subscription.EMPTY;
    const accordionHideToggleChange = panel.accordion
      ? panel.accordion._stateChanges.pipe(
          filter(changes => !!(changes['hideToggle'] || changes['togglePosition']))
        )
      : EMPTY;
    this.tabIndex = parseInt(tabIndex || '') || 0;
    // Since the toggle state depends on an @Input on the panel, we
    // need to subscribe and trigger change detection manually.
    this._parentChangeSubscription = merge(
      panel.opened,
      panel.closed,
      accordionHideToggleChange,
      panel._inputChanges.pipe(
        filter(changes => {
          return !!(changes['hideToggle'] || changes['disabled'] || changes['togglePosition']);
        })
      )
    ).subscribe(() => this._changeDetectorRef.markForCheck());
    // Avoids focus being lost if the panel contained the focused element and was closed.
    panel.closed
      .pipe(filter(() => panel._containsFocus()))
      .subscribe(() => _focusMonitor.focusVia(_element, 'program'));
    if (defaultOptions) {
      this.expandedHeight = defaultOptions.expandedHeight;
      this.collapsedHeight = defaultOptions.collapsedHeight;
    }
  }
  /**
   * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
   * @docs-private
   */
  get disabled() {
    return this.panel.disabled;
  }
  /** Toggles the expanded state of the panel. */
  _toggle() {
    if (!this.disabled) {
      this.panel.toggle();
    }
  }
  /** Gets whether the panel is expanded. */
  _isExpanded() {
    return this.panel.expanded;
  }
  /** Gets the expanded state string of the panel. */
  _getExpandedState() {
    return this.panel._getExpandedState();
  }
  /** Gets the panel id. */
  _getPanelId() {
    return this.panel.id;
  }
  /** Gets the toggle position for the header. */
  _getTogglePosition() {
    return this.panel.togglePosition;
  }
  /** Gets whether the expand indicator should be shown. */
  _showToggle() {
    return !this.panel.hideToggle && !this.panel.disabled;
  }
  /**
   * Gets the current height of the header. Null if no custom height has been
   * specified, and if the default height from the stylesheet should be used.
   */
  _getHeaderHeight() {
    const isExpanded = this._isExpanded();
    if (isExpanded && this.expandedHeight) {
      return this.expandedHeight;
    } else if (!isExpanded && this.collapsedHeight) {
      return this.collapsedHeight;
    }
    return null;
  }
  /** Handle keydown event calling to toggle() if appropriate. */
  _keydown(event) {
    switch (event.keyCode) {
      // Toggle for space and enter keys.
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this._toggle();
        }
        break;
      default:
        if (this.panel.accordion) {
          this.panel.accordion._handleHeaderKeydown(event);
        }
        return;
    }
  }
  /**
   * Focuses the panel header. Implemented as a part of `FocusableOption`.
   * @param origin Origin of the action that triggered the focus.
   * @docs-private
   */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._element).subscribe(origin => {
      if (origin && this.panel.accordion) {
        this.panel.accordion._handleHeaderFocus(this);
      }
    });
  }
  ngOnDestroy() {
    this._parentChangeSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element);
  }
}
TakExpansionPanelHeader.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelHeader,
  deps: [
    { token: TakExpansionPanel, host: true },
    { token: i0.ElementRef },
    { token: i2$1.FocusMonitor },
    { token: i0.ChangeDetectorRef },
    { token: TAK_EXPANSION_PANEL_DEFAULT_OPTIONS, optional: true },
    { token: ANIMATION_MODULE_TYPE, optional: true },
    { token: 'tabindex', attribute: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakExpansionPanelHeader.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakExpansionPanelHeader,
  selector: 'tak-expansion-panel-header',
  inputs: {
    tabIndex: 'tabIndex',
    expandedHeight: 'expandedHeight',
    collapsedHeight: 'collapsedHeight',
  },
  host: {
    attributes: { role: 'button' },
    listeners: { click: '_toggle()', keydown: '_keydown($event)' },
    properties: {
      'attr.id': 'panel._headerId',
      'attr.tabindex': 'tabIndex',
      'attr.aria-controls': '_getPanelId()',
      'attr.aria-expanded': '_isExpanded()',
      'attr.aria-disabled': 'panel.disabled',
      'class.tak-expanded': '_isExpanded()',
      'class.tak-expansion-toggle-indicator-after': "_getTogglePosition() === 'after'",
      'class.tak-expansion-toggle-indicator-before': "_getTogglePosition() === 'before'",
      'class._tak-animation-noopable': '_animationMode === "NoopAnimations"',
      'style.height': '_getHeaderHeight()',
    },
    classAttribute: 'tak-expansion-panel-header tak-focus-indicator',
  },
  usesInheritance: true,
  ngImport: i0,
  template:
    '<span class="tak-content" [class.tak-content-hide-toggle]="!_showToggle()">\n  <ng-content select="tak-panel-title"></ng-content>\n  <ng-content select="tak-panel-description"></ng-content>\n  <ng-content></ng-content>\n</span>\n<span [@indicatorRotate]="_getExpandedState()" *ngIf="_showToggle()"\n      class="tak-expansion-indicator"></span>\n',
  styles: [
    '.tak-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.tak-expansion-panel-header._tak-animation-noopable{transition:none}.tak-expansion-panel-header:focus,.tak-expansion-panel-header:hover{outline:none}.tak-expansion-panel-header.tak-expanded:focus,.tak-expansion-panel-header.tak-expanded:hover{background:inherit}.tak-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.tak-expansion-panel-header.tak-expansion-toggle-indicator-before{flex-direction:row-reverse}.tak-expansion-panel-header.tak-expansion-toggle-indicator-before .tak-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .tak-expansion-panel-header.tak-expansion-toggle-indicator-before .tak-expansion-indicator{margin:0 0 0 16px}.tak-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.tak-content.tak-content-hide-toggle{margin-right:8px}[dir=rtl] .tak-content.tak-content-hide-toggle{margin-right:0;margin-left:8px}.tak-expansion-toggle-indicator-before .tak-content.tak-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .tak-expansion-toggle-indicator-before .tak-content.tak-content-hide-toggle{margin-right:24px;margin-left:0}.tak-expansion-panel-header-title,.tak-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .tak-expansion-panel-header-title,[dir=rtl] .tak-expansion-panel-header-description{margin-right:0;margin-left:16px}.tak-expansion-panel-header-description{flex-grow:2}.tak-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .tak-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: i3.NgIf,
      selector: '[ngIf]',
      inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
    },
  ],
  animations: [takExpansionAnimations.indicatorRotate],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelHeader,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-expansion-panel-header',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          inputs: ['tabIndex'],
          animations: [takExpansionAnimations.indicatorRotate],
          host: {
            class: 'tak-expansion-panel-header tak-focus-indicator',
            role: 'button',
            '[attr.id]': 'panel._headerId',
            '[attr.tabindex]': 'tabIndex',
            '[attr.aria-controls]': '_getPanelId()',
            '[attr.aria-expanded]': '_isExpanded()',
            '[attr.aria-disabled]': 'panel.disabled',
            '[class.tak-expanded]': '_isExpanded()',
            '[class.tak-expansion-toggle-indicator-after]': `_getTogglePosition() === 'after'`,
            '[class.tak-expansion-toggle-indicator-before]': `_getTogglePosition() === 'before'`,
            '[class._tak-animation-noopable]': '_animationMode === "NoopAnimations"',
            '[style.height]': '_getHeaderHeight()',
            '(click)': '_toggle()',
            '(keydown)': '_keydown($event)',
          },
          template:
            '<span class="tak-content" [class.tak-content-hide-toggle]="!_showToggle()">\n  <ng-content select="tak-panel-title"></ng-content>\n  <ng-content select="tak-panel-description"></ng-content>\n  <ng-content></ng-content>\n</span>\n<span [@indicatorRotate]="_getExpandedState()" *ngIf="_showToggle()"\n      class="tak-expansion-indicator"></span>\n',
          styles: [
            '.tak-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.tak-expansion-panel-header._tak-animation-noopable{transition:none}.tak-expansion-panel-header:focus,.tak-expansion-panel-header:hover{outline:none}.tak-expansion-panel-header.tak-expanded:focus,.tak-expansion-panel-header.tak-expanded:hover{background:inherit}.tak-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.tak-expansion-panel-header.tak-expansion-toggle-indicator-before{flex-direction:row-reverse}.tak-expansion-panel-header.tak-expansion-toggle-indicator-before .tak-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .tak-expansion-panel-header.tak-expansion-toggle-indicator-before .tak-expansion-indicator{margin:0 0 0 16px}.tak-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.tak-content.tak-content-hide-toggle{margin-right:8px}[dir=rtl] .tak-content.tak-content-hide-toggle{margin-right:0;margin-left:8px}.tak-expansion-toggle-indicator-before .tak-content.tak-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .tak-expansion-toggle-indicator-before .tak-content.tak-content-hide-toggle{margin-right:24px;margin-left:0}.tak-expansion-panel-header-title,.tak-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .tak-expansion-panel-header-title,[dir=rtl] .tak-expansion-panel-header-description{margin-right:0;margin-left:16px}.tak-expansion-panel-header-description{flex-grow:2}.tak-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .tak-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: TakExpansionPanel,
        decorators: [
          {
            type: Host,
          },
        ],
      },
      { type: i0.ElementRef },
      { type: i2$1.FocusMonitor },
      { type: i0.ChangeDetectorRef },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [TAK_EXPANSION_PANEL_DEFAULT_OPTIONS],
          },
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
            args: [ANIMATION_MODULE_TYPE],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Attribute,
            args: ['tabindex'],
          },
        ],
      },
    ];
  },
  propDecorators: {
    expandedHeight: [
      {
        type: Input,
      },
    ],
    collapsedHeight: [
      {
        type: Input,
      },
    ],
  },
});
/**
 * Description element of a `<tak-expansion-panel-header>`.
 */
class TakExpansionPanelDescription {}
TakExpansionPanelDescription.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelDescription,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakExpansionPanelDescription.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakExpansionPanelDescription,
  selector: 'tak-panel-description',
  host: { classAttribute: 'tak-expansion-panel-header-description' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelDescription,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-panel-description',
          host: {
            class: 'tak-expansion-panel-header-description',
          },
        },
      ],
    },
  ],
});
/**
 * Title element of a `<tak-expansion-panel-header>`.
 */
class TakExpansionPanelTitle {}
TakExpansionPanelTitle.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelTitle,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakExpansionPanelTitle.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakExpansionPanelTitle,
  selector: 'tak-panel-title',
  host: { classAttribute: 'tak-expansion-panel-header-title' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionPanelTitle,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-panel-title',
          host: {
            class: 'tak-expansion-panel-header-title',
          },
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
 * Directive for a Material Design Accordion.
 */
class TakAccordion extends CdkAccordion {
  constructor() {
    super(...arguments);
    /** Headers belonging to this accordion. */
    this._ownHeaders = new QueryList();
    this._hideToggle = false;
    /**
     * Display mode used for all expansion panels in the accordion. Currently two display
     * modes exist:
     *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
     *     panel at a different elevation from the rest of the accordion.
     *  flat - no spacing is placed around expanded panels, showing all panels at the same
     *     elevation.
     */
    this.displayMode = 'default';
    /** The position of the expansion indicator. */
    this.togglePosition = 'after';
  }
  /** Whether the expansion indicator should be hidden. */
  get hideToggle() {
    return this._hideToggle;
  }
  set hideToggle(show) {
    this._hideToggle = coerceBooleanProperty(show);
  }
  ngAfterContentInit() {
    this._headers.changes.pipe(startWith(this._headers)).subscribe(headers => {
      this._ownHeaders.reset(headers.filter(header => header.panel.accordion === this));
      this._ownHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._ownHeaders).withWrap().withHomeAndEnd();
  }
  /** Handles keyboard events coming in from the panel headers. */
  _handleHeaderKeydown(event) {
    this._keyManager.onKeydown(event);
  }
  _handleHeaderFocus(header) {
    this._keyManager.updateActiveItem(header);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._ownHeaders.destroy();
  }
}
TakAccordion.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakAccordion,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakAccordion.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakAccordion,
  selector: 'tak-accordion',
  inputs: {
    multi: 'multi',
    hideToggle: 'hideToggle',
    displayMode: 'displayMode',
    togglePosition: 'togglePosition',
  },
  host: {
    properties: { 'class.tak-accordion-multi': 'this.multi' },
    classAttribute: 'tak-accordion',
  },
  providers: [
    {
      provide: TAK_ACCORDION,
      useExisting: TakAccordion,
    },
  ],
  queries: [{ propertyName: '_headers', predicate: TakExpansionPanelHeader, descendants: true }],
  exportAs: ['takAccordion'],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakAccordion,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-accordion',
          exportAs: 'takAccordion',
          inputs: ['multi'],
          providers: [
            {
              provide: TAK_ACCORDION,
              useExisting: TakAccordion,
            },
          ],
          host: {
            class: 'tak-accordion',
            // Class binding which is only used by the test harness as there is no other
            // way for the harness to detect if multiple panel support is enabled.
            '[class.tak-accordion-multi]': 'this.multi',
          },
        },
      ],
    },
  ],
  propDecorators: {
    _headers: [
      {
        type: ContentChildren,
        args: [TakExpansionPanelHeader, { descendants: true }],
      },
    ],
    hideToggle: [
      {
        type: Input,
      },
    ],
    displayMode: [
      {
        type: Input,
      },
    ],
    togglePosition: [
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
class TakExpansionModule {}
TakExpansionModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakExpansionModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionModule,
  declarations: [
    TakAccordion,
    TakExpansionPanel,
    TakExpansionPanelActionRow,
    TakExpansionPanelHeader,
    TakExpansionPanelTitle,
    TakExpansionPanelDescription,
    TakExpansionPanelContent,
  ],
  imports: [CommonModule, TakCommonModule, CdkAccordionModule, PortalModule],
  exports: [
    TakAccordion,
    TakExpansionPanel,
    TakExpansionPanelActionRow,
    TakExpansionPanelHeader,
    TakExpansionPanelTitle,
    TakExpansionPanelDescription,
    TakExpansionPanelContent,
  ],
});
TakExpansionModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionModule,
  imports: [CommonModule, TakCommonModule, CdkAccordionModule, PortalModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakExpansionModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [CommonModule, TakCommonModule, CdkAccordionModule, PortalModule],
          exports: [
            TakAccordion,
            TakExpansionPanel,
            TakExpansionPanelActionRow,
            TakExpansionPanelHeader,
            TakExpansionPanelTitle,
            TakExpansionPanelDescription,
            TakExpansionPanelContent,
          ],
          declarations: [
            TakAccordion,
            TakExpansionPanel,
            TakExpansionPanelActionRow,
            TakExpansionPanelHeader,
            TakExpansionPanelTitle,
            TakExpansionPanelDescription,
            TakExpansionPanelContent,
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
  EXPANSION_PANEL_ANIMATION_TIMING,
  TAK_ACCORDION,
  TAK_EXPANSION_PANEL,
  TAK_EXPANSION_PANEL_DEFAULT_OPTIONS,
  TakAccordion,
  TakExpansionModule,
  TakExpansionPanel,
  TakExpansionPanelActionRow,
  TakExpansionPanelContent,
  TakExpansionPanelDescription,
  TakExpansionPanelHeader,
  TakExpansionPanelTitle,
  takExpansionAnimations,
};
//# sourceMappingURL=expansion.mjs.map
