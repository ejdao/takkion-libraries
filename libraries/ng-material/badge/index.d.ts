import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AriaDescriber } from '@takkion/ng-cdk/a11y';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanDisable } from '@takkion/ng-material/core';
import { _Constructor } from '@takkion/ng-material/core';
import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-cdk/a11y';
import * as i3 from '@takkion/ng-material/core';
import { NgZone } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ThemePalette } from '@takkion/ng-material/core';

declare namespace i1 {
  export { TakBadgePosition, TakBadgeSize, TakBadge };
}

/** Directive to display a text badge. */
export declare class TakBadge extends _TakBadgeBase implements OnInit, OnDestroy, CanDisable {
  private _ngZone;
  private _elementRef;
  private _ariaDescriber;
  private _renderer;
  private _animationMode?;
  /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
  get color(): ThemePalette;
  set color(value: ThemePalette);
  private _color;
  /** Whether the badge should overlap its contents or not */
  get overlap(): boolean;
  set overlap(val: BooleanInput);
  private _overlap;
  /**
   * Position the badge should reside.
   * Accepts any combination of 'above'|'below' and 'before'|'after'
   */
  position: TakBadgePosition;
  /** The content for the badge */
  get content(): string | number | undefined | null;
  set content(newContent: string | number | undefined | null);
  private _content;
  /** Message used to describe the decorated element via aria-describedby */
  get description(): string;
  set description(newDescription: string);
  private _description;
  /** Size of the badge. Can be 'small', 'medium', or 'large'. */
  size: TakBadgeSize;
  /** Whether the badge is hidden. */
  get hidden(): boolean;
  set hidden(val: BooleanInput);
  private _hidden;
  /** Unique id for the badge */
  _id: number;
  /** Visible badge element. */
  private _badgeElement;
  /** Whether the OnInit lifecycle hook has run yet */
  private _isInitialized;
  constructor(
    _ngZone: NgZone,
    _elementRef: ElementRef<HTMLElement>,
    _ariaDescriber: AriaDescriber,
    _renderer: Renderer2,
    _animationMode?: string | undefined
  );
  /** Whether the badge is above the host or not */
  isAbove(): boolean;
  /** Whether the badge is after the host or not */
  isAfter(): boolean;
  /**
   * Gets the element into which the badge's content is being rendered. Undefined if the element
   * hasn't been created (e.g. if the badge doesn't have content).
   */
  getBadgeElement(): HTMLElement | undefined;
  ngOnInit(): void;
  ngOnDestroy(): void;
  /** Creates the badge element */
  private _createBadgeElement;
  /** Update the text content of the badge element in the DOM, creating the element if necessary. */
  private _updateRenderedContent;
  /** Updates the host element's aria description via AriaDescriber. */
  private _updateHostAriaDescription;
  /** Adds css theme class given the color to the component host */
  private _setColor;
  /** Clears any existing badges that might be left over from server-side rendering. */
  private _clearExistingBadges;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakBadge, [null, null, null, null, { optional: true }]>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakBadge,
    '[takBadge]',
    never,
    {
      disabled: 'takBadgeDisabled';
      color: 'takBadgeColor';
      overlap: 'takBadgeOverlap';
      position: 'takBadgePosition';
      content: 'takBadge';
      description: 'takBadgeDescription';
      size: 'takBadgeSize';
      hidden: 'takBadgeHidden';
    },
    {},
    never,
    never,
    false
  >;
}

/** @docs-private */
declare const _TakBadgeBase: _Constructor<CanDisable> &
  _AbstractConstructor<CanDisable> & {
    new (): {};
  };

export declare class TakBadgeModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakBadgeModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakBadgeModule,
    [typeof i1.TakBadge],
    [typeof i2.A11yModule, typeof i3.TakCommonModule],
    [typeof i1.TakBadge, typeof i3.TakCommonModule]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakBadgeModule>;
}

/** Allowed position options for takBadgePosition */
export declare type TakBadgePosition =
  | 'above after'
  | 'above before'
  | 'below before'
  | 'below after'
  | 'before'
  | 'after'
  | 'above'
  | 'below';

/** Allowed size options for takBadgeSize */
export declare type TakBadgeSize = 'small' | 'medium' | 'large';

export {};
