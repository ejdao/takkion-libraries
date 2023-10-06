import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterContentInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AnimationEvent as AnimationEvent_2 } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CdkAccordion } from '@takkion/ng-cdk/accordion';
import { CdkAccordionItem } from '@takkion/ng-cdk/accordion';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FocusableOption } from '@takkion/ng-cdk/a11y';
import { FocusMonitor } from '@takkion/ng-cdk/a11y';
import { FocusOrigin } from '@takkion/ng-cdk/a11y';
import { HasTabIndex } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i5 from '@angular/common';
import * as i6 from '@takkion/ng-material/core';
import * as i7 from '@takkion/ng-cdk/accordion';
import * as i8 from '@takkion/ng-cdk/portal';
import { InjectionToken } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { QueryList } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { TemplatePortal } from '@takkion/ng-cdk/portal';
import { TemplateRef } from '@angular/core';
import { UniqueSelectionDispatcher } from '@takkion/ng-cdk/collections';
import { ViewContainerRef } from '@angular/core';

/** Time and timing curve for expansion panel animations. */
export declare const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

declare namespace i1 {
  export { TakAccordion };
}

declare namespace i2 {
  export {
    TakExpansionPanelState,
    TakExpansionPanelDefaultOptions,
    TAK_EXPANSION_PANEL_DEFAULT_OPTIONS,
    TakExpansionPanel,
    TakExpansionPanelActionRow,
  };
}

declare namespace i3 {
  export { TakExpansionPanelHeader, TakExpansionPanelDescription, TakExpansionPanelTitle };
}

declare namespace i4 {
  export { TakExpansionPanelContent };
}

/**
 * Token used to provide a `TakAccordion` to `TakExpansionPanel`.
 * Used primarily to avoid circular imports between `TakAccordion` and `TakExpansionPanel`.
 */
export declare const TAK_ACCORDION: InjectionToken<TakAccordionBase>;

/**
 * Token used to provide a `TakExpansionPanel` to `TakExpansionPanelContent`.
 * Used to avoid circular imports between `TakExpansionPanel` and `TakExpansionPanelContent`.
 */
export declare const TAK_EXPANSION_PANEL: InjectionToken<TakExpansionPanelBase>;

/**
 * Injection token that can be used to configure the default
 * options for the expansion panel component.
 */
export declare const TAK_EXPANSION_PANEL_DEFAULT_OPTIONS: InjectionToken<TakExpansionPanelDefaultOptions>;

/**
 * Directive for a Material Design Accordion.
 */
export declare class TakAccordion
  extends CdkAccordion
  implements TakAccordionBase, AfterContentInit, OnDestroy
{
  private _keyManager;
  /** Headers belonging to this accordion. */
  private _ownHeaders;
  /** All headers inside the accordion. Includes headers inside nested accordions. */
  _headers: QueryList<TakExpansionPanelHeader>;
  /** Whether the expansion indicator should be hidden. */
  get hideToggle(): boolean;
  set hideToggle(show: BooleanInput);
  private _hideToggle;
  /**
   * Display mode used for all expansion panels in the accordion. Currently two display
   * modes exist:
   *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
   *     panel at a different elevation from the rest of the accordion.
   *  flat - no spacing is placed around expanded panels, showing all panels at the same
   *     elevation.
   */
  displayMode: TakAccordionDisplayMode;
  /** The position of the expansion indicator. */
  togglePosition: TakAccordionTogglePosition;
  ngAfterContentInit(): void;
  /** Handles keyboard events coming in from the panel headers. */
  _handleHeaderKeydown(event: KeyboardEvent): void;
  _handleHeaderFocus(header: TakExpansionPanelHeader): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakAccordion, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakAccordion,
    'tak-accordion',
    ['takAccordion'],
    {
      multi: 'multi';
      hideToggle: 'hideToggle';
      displayMode: 'displayMode';
      togglePosition: 'togglePosition';
    },
    {},
    ['_headers'],
    never,
    false
  >;
}

/**
 * Base interface for a `TakAccordion`.
 * @docs-private
 */
export declare interface TakAccordionBase extends CdkAccordion {
  /** Whether the expansion indicator should be hidden. */
  hideToggle: boolean;
  /** Display mode used for all expansion panels in the accordion. */
  displayMode: TakAccordionDisplayMode;
  /** The position of the expansion indicator. */
  togglePosition: TakAccordionTogglePosition;
  /** Handles keyboard events coming in from the panel headers. */
  _handleHeaderKeydown: (event: KeyboardEvent) => void;
  /** Handles focus events on the panel headers. */
  _handleHeaderFocus: (header: any) => void;
}

/** TakAccordion's display modes. */
export declare type TakAccordionDisplayMode = 'default' | 'flat';

/** TakAccordion's toggle positions. */
export declare type TakAccordionTogglePosition = 'before' | 'after';

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
export declare const takExpansionAnimations: {
  readonly indicatorRotate: AnimationTriggerMetadata;
  readonly bodyExpansion: AnimationTriggerMetadata;
};

export declare class TakExpansionModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakExpansionModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakExpansionModule,
    [
      typeof i1.TakAccordion,
      typeof i2.TakExpansionPanel,
      typeof i2.TakExpansionPanelActionRow,
      typeof i3.TakExpansionPanelHeader,
      typeof i3.TakExpansionPanelTitle,
      typeof i3.TakExpansionPanelDescription,
      typeof i4.TakExpansionPanelContent,
    ],
    [
      typeof i5.CommonModule,
      typeof i6.TakCommonModule,
      typeof i7.CdkAccordionModule,
      typeof i8.PortalModule,
    ],
    [
      typeof i1.TakAccordion,
      typeof i2.TakExpansionPanel,
      typeof i2.TakExpansionPanelActionRow,
      typeof i3.TakExpansionPanelHeader,
      typeof i3.TakExpansionPanelTitle,
      typeof i3.TakExpansionPanelDescription,
      typeof i4.TakExpansionPanelContent,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakExpansionModule>;
}

/**
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the TakAccordion directive attached.
 */
export declare class TakExpansionPanel
  extends CdkAccordionItem
  implements AfterContentInit, OnChanges, OnDestroy
{
  private _viewContainerRef;
  _animationMode: string;
  private _document;
  private _hideToggle;
  private _togglePosition;
  /** Whether the toggle indicator should be hidden. */
  get hideToggle(): boolean;
  set hideToggle(value: BooleanInput);
  /** The position of the expansion indicator. */
  get togglePosition(): TakAccordionTogglePosition;
  set togglePosition(value: TakAccordionTogglePosition);
  /** An event emitted after the body's expansion animation happens. */
  readonly afterExpand: EventEmitter<void>;
  /** An event emitted after the body's collapse animation happens. */
  readonly afterCollapse: EventEmitter<void>;
  /** Stream that emits for changes in `@Input` properties. */
  readonly _inputChanges: Subject<SimpleChanges>;
  /** Optionally defined accordion the expansion panel belongs to. */
  accordion: TakAccordionBase;
  /** Content that will be rendered lazily. */
  _lazyContent: TakExpansionPanelContent;
  /** Element containing the panel's user-provided content. */
  _body: ElementRef<HTMLElement>;
  /** Portal holding the user's content. */
  _portal: TemplatePortal;
  /** ID for the associated header element. Used for a11y labelling. */
  _headerId: string;
  /** Stream of body animation done events. */
  readonly _bodyAnimationDone: Subject<AnimationEvent_2>;
  constructor(
    accordion: TakAccordionBase,
    _changeDetectorRef: ChangeDetectorRef,
    _uniqueSelectionDispatcher: UniqueSelectionDispatcher,
    _viewContainerRef: ViewContainerRef,
    _document: any,
    _animationMode: string,
    defaultOptions?: TakExpansionPanelDefaultOptions
  );
  /** Determines whether the expansion panel should have spacing between it and its siblings. */
  _hasSpacing(): boolean;
  /** Gets the expanded state string. */
  _getExpandedState(): TakExpansionPanelState;
  /** Toggles the expanded state of the expansion panel. */
  toggle(): void;
  /** Sets the expanded state of the expansion panel to false. */
  close(): void;
  /** Sets the expanded state of the expansion panel to true. */
  open(): void;
  ngAfterContentInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  /** Checks whether the expansion panel's content contains the currently-focused element. */
  _containsFocus(): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakExpansionPanel,
    [
      { optional: true; skipSelf: true },
      null,
      null,
      null,
      null,
      { optional: true },
      { optional: true },
    ]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakExpansionPanel,
    'tak-expansion-panel',
    ['takExpansionPanel'],
    {
      disabled: 'disabled';
      expanded: 'expanded';
      hideToggle: 'hideToggle';
      togglePosition: 'togglePosition';
    },
    {
      opened: 'opened';
      closed: 'closed';
      expandedChange: 'expandedChange';
      afterExpand: 'afterExpand';
      afterCollapse: 'afterCollapse';
    },
    ['_lazyContent'],
    ['tak-expansion-panel-header', '*', 'tak-action-row'],
    false
  >;
}

/**
 * Actions of a `<tak-expansion-panel>`.
 */
export declare class TakExpansionPanelActionRow {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakExpansionPanelActionRow, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakExpansionPanelActionRow,
    'tak-action-row',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Base interface for a `TakExpansionPanel`.
 * @docs-private
 */
declare interface TakExpansionPanelBase extends CdkAccordionItem {
  /** Whether the toggle indicator should be hidden. */
  hideToggle: boolean;
}

/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
export declare class TakExpansionPanelContent {
  _template: TemplateRef<any>;
  _expansionPanel?: TakExpansionPanelBase | undefined;
  constructor(_template: TemplateRef<any>, _expansionPanel?: TakExpansionPanelBase | undefined);
  static ɵfac: i0.ɵɵFactoryDeclaration<TakExpansionPanelContent, [null, { optional: true }]>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakExpansionPanelContent,
    'ng-template[takExpansionPanelContent]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Object that can be used to override the default options
 * for all of the expansion panels in a module.
 */
export declare interface TakExpansionPanelDefaultOptions {
  /** Height of the header while the panel is expanded. */
  expandedHeight: string;
  /** Height of the header while the panel is collapsed. */
  collapsedHeight: string;
  /** Whether the toggle indicator should be hidden. */
  hideToggle: boolean;
}

/**
 * Description element of a `<tak-expansion-panel-header>`.
 */
export declare class TakExpansionPanelDescription {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakExpansionPanelDescription, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakExpansionPanelDescription,
    'tak-panel-description',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Header element of a `<tak-expansion-panel>`.
 */
export declare class TakExpansionPanelHeader
  extends _TakExpansionPanelHeaderMixinBase
  implements AfterViewInit, OnDestroy, FocusableOption, HasTabIndex
{
  panel: TakExpansionPanel;
  private _element;
  private _focusMonitor;
  private _changeDetectorRef;
  _animationMode?: string | undefined;
  private _parentChangeSubscription;
  constructor(
    panel: TakExpansionPanel,
    _element: ElementRef,
    _focusMonitor: FocusMonitor,
    _changeDetectorRef: ChangeDetectorRef,
    defaultOptions?: TakExpansionPanelDefaultOptions,
    _animationMode?: string | undefined,
    tabIndex?: string
  );
  /** Height of the header while the panel is expanded. */
  expandedHeight: string;
  /** Height of the header while the panel is collapsed. */
  collapsedHeight: string;
  /**
   * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
   * @docs-private
   */
  get disabled(): boolean;
  /** Toggles the expanded state of the panel. */
  _toggle(): void;
  /** Gets whether the panel is expanded. */
  _isExpanded(): boolean;
  /** Gets the expanded state string of the panel. */
  _getExpandedState(): string;
  /** Gets the panel id. */
  _getPanelId(): string;
  /** Gets the toggle position for the header. */
  _getTogglePosition(): TakAccordionTogglePosition;
  /** Gets whether the expand indicator should be shown. */
  _showToggle(): boolean;
  /**
   * Gets the current height of the header. Null if no custom height has been
   * specified, and if the default height from the stylesheet should be used.
   */
  _getHeaderHeight(): string | null;
  /** Handle keydown event calling to toggle() if appropriate. */
  _keydown(event: KeyboardEvent): void;
  /**
   * Focuses the panel header. Implemented as a part of `FocusableOption`.
   * @param origin Origin of the action that triggered the focus.
   * @docs-private
   */
  focus(origin?: FocusOrigin, options?: FocusOptions): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakExpansionPanelHeader,
    [
      { host: true },
      null,
      null,
      null,
      { optional: true },
      { optional: true },
      { attribute: 'tabindex' },
    ]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakExpansionPanelHeader,
    'tak-expansion-panel-header',
    never,
    { tabIndex: 'tabIndex'; expandedHeight: 'expandedHeight'; collapsedHeight: 'collapsedHeight' },
    {},
    never,
    ['tak-panel-title', 'tak-panel-description', '*'],
    false
  >;
}

/** @docs-private */
declare abstract class TakExpansionPanelHeaderBase {
  abstract readonly disabled: boolean;
}

declare const _TakExpansionPanelHeaderMixinBase: _Constructor<HasTabIndex> &
  _AbstractConstructor<HasTabIndex> &
  typeof TakExpansionPanelHeaderBase;

/** TakExpansionPanel's states. */
export declare type TakExpansionPanelState = 'expanded' | 'collapsed';

/**
 * Title element of a `<tak-expansion-panel-header>`.
 */
export declare class TakExpansionPanelTitle {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakExpansionPanelTitle, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakExpansionPanelTitle,
    'tak-panel-title',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export {};
