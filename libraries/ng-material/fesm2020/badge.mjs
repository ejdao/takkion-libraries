import * as i0 from '@angular/core';
import { Directive, Optional, Inject, Input, NgModule } from '@angular/core';
import { mixinDisabled, TakCommonModule } from '@takkion/ng-material/core';
import * as i1 from '@takkion/ng-cdk/a11y';
import { A11yModule } from '@takkion/ng-cdk/a11y';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let nextId = 0;
// Boilerplate for applying mixins to TakBadge.
/** @docs-private */
const _TakBadgeBase = mixinDisabled(class {});
const BADGE_CONTENT_CLASS = 'tak-badge-content';
/** Directive to display a text badge. */
class TakBadge extends _TakBadgeBase {
  constructor(_ngZone, _elementRef, _ariaDescriber, _renderer, _animationMode) {
    super();
    this._ngZone = _ngZone;
    this._elementRef = _elementRef;
    this._ariaDescriber = _ariaDescriber;
    this._renderer = _renderer;
    this._animationMode = _animationMode;
    this._color = 'primary';
    this._overlap = true;
    /**
     * Position the badge should reside.
     * Accepts any combination of 'above'|'below' and 'before'|'after'
     */
    this.position = 'above after';
    /** Size of the badge. Can be 'small', 'medium', or 'large'. */
    this.size = 'medium';
    /** Unique id for the badge */
    this._id = nextId++;
    /** Whether the OnInit lifecycle hook has run yet */
    this._isInitialized = false;
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      const nativeElement = _elementRef.nativeElement;
      if (nativeElement.nodeType !== nativeElement.ELEMENT_NODE) {
        throw Error('takBadge must be attached to an element node.');
      }
    }
  }
  /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
  get color() {
    return this._color;
  }
  set color(value) {
    this._setColor(value);
    this._color = value;
  }
  /** Whether the badge should overlap its contents or not */
  get overlap() {
    return this._overlap;
  }
  set overlap(val) {
    this._overlap = coerceBooleanProperty(val);
  }
  /** The content for the badge */
  get content() {
    return this._content;
  }
  set content(newContent) {
    this._updateRenderedContent(newContent);
  }
  /** Message used to describe the decorated element via aria-describedby */
  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._updateHostAriaDescription(newDescription);
  }
  /** Whether the badge is hidden. */
  get hidden() {
    return this._hidden;
  }
  set hidden(val) {
    this._hidden = coerceBooleanProperty(val);
  }
  /** Whether the badge is above the host or not */
  isAbove() {
    return this.position.indexOf('below') === -1;
  }
  /** Whether the badge is after the host or not */
  isAfter() {
    return this.position.indexOf('before') === -1;
  }
  /**
   * Gets the element into which the badge's content is being rendered. Undefined if the element
   * hasn't been created (e.g. if the badge doesn't have content).
   */
  getBadgeElement() {
    return this._badgeElement;
  }
  ngOnInit() {
    // We may have server-side rendered badge that we need to clear.
    // We need to do this in ngOnInit because the full content of the component
    // on which the badge is attached won't necessarily be in the DOM until this point.
    this._clearExistingBadges();
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
      this._updateRenderedContent(this.content);
    }
    this._isInitialized = true;
  }
  ngOnDestroy() {
    // ViewEngine only: when creating a badge through the Renderer, Angular remembers its index.
    // We have to destroy it ourselves, otherwise it'll be retained in memory.
    if (this._renderer.destroyNode) {
      this._renderer.destroyNode(this._badgeElement);
    }
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
  }
  /** Creates the badge element */
  _createBadgeElement() {
    const badgeElement = this._renderer.createElement('span');
    const activeClass = 'tak-badge-active';
    badgeElement.setAttribute('id', `tak-badge-content-${this._id}`);
    // The badge is aria-hidden because we don't want it to appear in the page's navigation
    // flow. Instead, we use the badge to describe the decorated element with aria-describedby.
    badgeElement.setAttribute('aria-hidden', 'true');
    badgeElement.classList.add(BADGE_CONTENT_CLASS);
    if (this._animationMode === 'NoopAnimations') {
      badgeElement.classList.add('_tak-animation-noopable');
    }
    this._elementRef.nativeElement.appendChild(badgeElement);
    // animate in after insertion
    if (typeof requestAnimationFrame === 'function' && this._animationMode !== 'NoopAnimations') {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          badgeElement.classList.add(activeClass);
        });
      });
    } else {
      badgeElement.classList.add(activeClass);
    }
    return badgeElement;
  }
  /** Update the text content of the badge element in the DOM, creating the element if necessary. */
  _updateRenderedContent(newContent) {
    const newContentNormalized = `${newContent ?? ''}`.trim();
    // Don't create the badge element if the directive isn't initialized because we want to
    // append the badge element to the *end* of the host element's content for backwards
    // compatibility.
    if (this._isInitialized && newContentNormalized && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }
    if (this._badgeElement) {
      this._badgeElement.textContent = newContentNormalized;
    }
    this._content = newContentNormalized;
  }
  /** Updates the host element's aria description via AriaDescriber. */
  _updateHostAriaDescription(newDescription) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
    if (newDescription) {
      this._ariaDescriber.describe(this._elementRef.nativeElement, newDescription);
    }
    this._description = newDescription;
  }
  /** Adds css theme class given the color to the component host */
  _setColor(colorPalette) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(`tak-badge-${this._color}`);
    if (colorPalette) {
      classList.add(`tak-badge-${colorPalette}`);
    }
  }
  /** Clears any existing badges that might be left over from server-side rendering. */
  _clearExistingBadges() {
    // Only check direct children of this host element in order to avoid deleting
    // any badges that might exist in descendant elements.
    const badges = this._elementRef.nativeElement.querySelectorAll(
      `:scope > .${BADGE_CONTENT_CLASS}`
    );
    for (const badgeElement of Array.from(badges)) {
      if (badgeElement !== this._badgeElement) {
        badgeElement.remove();
      }
    }
  }
}
TakBadge.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBadge,
  deps: [
    { token: i0.NgZone },
    { token: i0.ElementRef },
    { token: i1.AriaDescriber },
    { token: i0.Renderer2 },
    { token: ANIMATION_MODULE_TYPE, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakBadge.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakBadge,
  selector: '[takBadge]',
  inputs: {
    disabled: ['takBadgeDisabled', 'disabled'],
    color: ['takBadgeColor', 'color'],
    overlap: ['takBadgeOverlap', 'overlap'],
    position: ['takBadgePosition', 'position'],
    content: ['takBadge', 'content'],
    description: ['takBadgeDescription', 'description'],
    size: ['takBadgeSize', 'size'],
    hidden: ['takBadgeHidden', 'hidden'],
  },
  host: {
    properties: {
      'class.tak-badge-overlap': 'overlap',
      'class.tak-badge-above': 'isAbove()',
      'class.tak-badge-below': '!isAbove()',
      'class.tak-badge-before': '!isAfter()',
      'class.tak-badge-after': 'isAfter()',
      'class.tak-badge-small': 'size === "small"',
      'class.tak-badge-medium': 'size === "medium"',
      'class.tak-badge-large': 'size === "large"',
      'class.tak-badge-hidden': 'hidden || !content',
      'class.tak-badge-disabled': 'disabled',
    },
    classAttribute: 'tak-badge',
  },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBadge,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takBadge]',
          inputs: ['disabled: takBadgeDisabled'],
          host: {
            class: 'tak-badge',
            '[class.tak-badge-overlap]': 'overlap',
            '[class.tak-badge-above]': 'isAbove()',
            '[class.tak-badge-below]': '!isAbove()',
            '[class.tak-badge-before]': '!isAfter()',
            '[class.tak-badge-after]': 'isAfter()',
            '[class.tak-badge-small]': 'size === "small"',
            '[class.tak-badge-medium]': 'size === "medium"',
            '[class.tak-badge-large]': 'size === "large"',
            '[class.tak-badge-hidden]': 'hidden || !content',
            '[class.tak-badge-disabled]': 'disabled',
          },
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.NgZone },
      { type: i0.ElementRef },
      { type: i1.AriaDescriber },
      { type: i0.Renderer2 },
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
    ];
  },
  propDecorators: {
    color: [
      {
        type: Input,
        args: ['takBadgeColor'],
      },
    ],
    overlap: [
      {
        type: Input,
        args: ['takBadgeOverlap'],
      },
    ],
    position: [
      {
        type: Input,
        args: ['takBadgePosition'],
      },
    ],
    content: [
      {
        type: Input,
        args: ['takBadge'],
      },
    ],
    description: [
      {
        type: Input,
        args: ['takBadgeDescription'],
      },
    ],
    size: [
      {
        type: Input,
        args: ['takBadgeSize'],
      },
    ],
    hidden: [
      {
        type: Input,
        args: ['takBadgeHidden'],
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
class TakBadgeModule {}
TakBadgeModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBadgeModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakBadgeModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBadgeModule,
  declarations: [TakBadge],
  imports: [A11yModule, TakCommonModule],
  exports: [TakBadge, TakCommonModule],
});
TakBadgeModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBadgeModule,
  imports: [A11yModule, TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakBadgeModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [A11yModule, TakCommonModule],
          exports: [TakBadge, TakCommonModule],
          declarations: [TakBadge],
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

export { TakBadge, TakBadgeModule };
//# sourceMappingURL=badge.mjs.map
