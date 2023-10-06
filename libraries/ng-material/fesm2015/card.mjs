import * as i0 from '@angular/core';
import {
  Directive,
  Input,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Optional,
  Inject,
  NgModule,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { TakCommonModule } from '@takkion/ng-material/core';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Content of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
class TakCardContent {}
TakCardContent.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardContent,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardContent.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardContent,
  selector: 'tak-card-content, [tak-card-content], [takCardContent]',
  host: { classAttribute: 'tak-card-content' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardContent,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-card-content, [tak-card-content], [takCardContent]',
          host: { class: 'tak-card-content' },
        },
      ],
    },
  ],
});
/**
 * Title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
class TakCardTitle {}
TakCardTitle.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardTitle,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardTitle.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardTitle,
  selector: 'tak-card-title, [tak-card-title], [takCardTitle]',
  host: { classAttribute: 'tak-card-title' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardTitle,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: `tak-card-title, [tak-card-title], [takCardTitle]`,
          host: {
            class: 'tak-card-title',
          },
        },
      ],
    },
  ],
});
/**
 * Sub-title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
class TakCardSubtitle {}
TakCardSubtitle.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardSubtitle,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardSubtitle.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardSubtitle,
  selector: 'tak-card-subtitle, [tak-card-subtitle], [takCardSubtitle]',
  host: { classAttribute: 'tak-card-subtitle' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardSubtitle,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: `tak-card-subtitle, [tak-card-subtitle], [takCardSubtitle]`,
          host: {
            class: 'tak-card-subtitle',
          },
        },
      ],
    },
  ],
});
/**
 * Action section of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
class TakCardActions {
  constructor() {
    /** Position of the actions inside the card. */
    this.align = 'start';
  }
}
TakCardActions.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardActions,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardActions.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardActions,
  selector: 'tak-card-actions',
  inputs: { align: 'align' },
  host: {
    properties: { 'class.tak-card-actions-align-end': 'align === "end"' },
    classAttribute: 'tak-card-actions',
  },
  exportAs: ['takCardActions'],
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardActions,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-card-actions',
          exportAs: 'takCardActions',
          host: {
            class: 'tak-card-actions',
            '[class.tak-card-actions-align-end]': 'align === "end"',
          },
        },
      ],
    },
  ],
  propDecorators: {
    align: [
      {
        type: Input,
      },
    ],
  },
});
/**
 * Footer of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
class TakCardFooter {}
TakCardFooter.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardFooter,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardFooter.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardFooter,
  selector: 'tak-card-footer',
  host: { classAttribute: 'tak-card-footer' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardFooter,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-card-footer',
          host: { class: 'tak-card-footer' },
        },
      ],
    },
  ],
});
/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
class TakCardImage {}
TakCardImage.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardImage,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardImage.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardImage,
  selector: '[tak-card-image], [takCardImage]',
  host: { classAttribute: 'tak-card-image' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardImage,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-card-image], [takCardImage]',
          host: { class: 'tak-card-image' },
        },
      ],
    },
  ],
});
/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
class TakCardSmImage {}
TakCardSmImage.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardSmImage,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardSmImage.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardSmImage,
  selector: '[tak-card-sm-image], [takCardImageSmall]',
  host: { classAttribute: 'tak-card-sm-image' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardSmImage,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-card-sm-image], [takCardImageSmall]',
          host: { class: 'tak-card-sm-image' },
        },
      ],
    },
  ],
});
/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
class TakCardMdImage {}
TakCardMdImage.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardMdImage,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardMdImage.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardMdImage,
  selector: '[tak-card-md-image], [takCardImageMedium]',
  host: { classAttribute: 'tak-card-md-image' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardMdImage,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-card-md-image], [takCardImageMedium]',
          host: { class: 'tak-card-md-image' },
        },
      ],
    },
  ],
});
/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
class TakCardLgImage {}
TakCardLgImage.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardLgImage,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardLgImage.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardLgImage,
  selector: '[tak-card-lg-image], [takCardImageLarge]',
  host: { classAttribute: 'tak-card-lg-image' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardLgImage,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-card-lg-image], [takCardImageLarge]',
          host: { class: 'tak-card-lg-image' },
        },
      ],
    },
  ],
});
/**
 * Large image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
class TakCardXlImage {}
TakCardXlImage.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardXlImage,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardXlImage.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardXlImage,
  selector: '[tak-card-xl-image], [takCardImageXLarge]',
  host: { classAttribute: 'tak-card-xl-image' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardXlImage,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-card-xl-image], [takCardImageXLarge]',
          host: { class: 'tak-card-xl-image' },
        },
      ],
    },
  ],
});
/**
 * Avatar image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
class TakCardAvatar {}
TakCardAvatar.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardAvatar,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakCardAvatar.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardAvatar,
  selector: '[tak-card-avatar], [takCardAvatar]',
  host: { classAttribute: 'tak-card-avatar' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardAvatar,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-card-avatar], [takCardAvatar]',
          host: { class: 'tak-card-avatar' },
        },
      ],
    },
  ],
});
/**
 * A basic content container component that adds the styles of a Material design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * - tak-card-title
 * - tak-card-subtitle
 * - tak-card-content
 * - tak-card-actions
 * - tak-card-footer
 */
class TakCard {
  // @breaking-change 9.0.0 `_animationMode` parameter to be made required.
  constructor(_animationMode) {
    this._animationMode = _animationMode;
  }
}
TakCard.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCard,
  deps: [{ token: ANIMATION_MODULE_TYPE, optional: true }],
  target: i0.ɵɵFactoryTarget.Component,
});
TakCard.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCard,
  selector: 'tak-card',
  host: {
    properties: { 'class._tak-animation-noopable': '_animationMode === "NoopAnimations"' },
    classAttribute: 'tak-card tak-focus-indicator',
  },
  exportAs: ['takCard'],
  ngImport: i0,
  template: '<ng-content></ng-content>\n<ng-content select="tak-card-footer"></ng-content>\n',
  styles: [
    '.tak-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}.tak-card._tak-animation-noopable{transition:none !important;animation:none !important}.tak-card>.tak-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .tak-card>.tak-divider-horizontal{left:auto;right:0}.tak-card>.tak-divider-horizontal.tak-divider-inset{position:static;margin:0}[dir=rtl] .tak-card>.tak-divider-horizontal.tak-divider-inset{margin-right:0}.cdk-high-contrast-active .tak-card{outline:solid 1px}.tak-card-actions,.tak-card-subtitle,.tak-card-content{display:block;margin-bottom:16px}.tak-card-title{display:block;margin-bottom:8px}.tak-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.tak-card-actions-align-end{display:flex;justify-content:flex-end}.tak-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px;display:block;overflow:hidden}.tak-card-image img{width:100%}.tak-card-footer{display:block;margin:0 -16px -16px -16px}.tak-card-actions .tak-button,.tak-card-actions .tak-raised-button,.tak-card-actions .tak-stroked-button{margin:0 8px}.tak-card-header{display:flex;flex-direction:row}.tak-card-header .tak-card-title{margin-bottom:12px}.tak-card-header-text{margin:0 16px}.tak-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.tak-card-title-group{display:flex;justify-content:space-between}.tak-card-sm-image{width:80px;height:80px}.tak-card-md-image{width:112px;height:112px}.tak-card-lg-image{width:152px;height:152px}.tak-card-xl-image{width:240px;height:240px;margin:-8px}.tak-card-title-group>.tak-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.tak-card-title-group{margin:0}.tak-card-xl-image{margin-left:0;margin-right:0}}.tak-card>:first-child,.tak-card-content>:first-child{margin-top:0}.tak-card>:last-child:not(.tak-card-footer),.tak-card-content>:last-child:not(.tak-card-footer){margin-bottom:0}.tak-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.tak-card>.tak-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.tak-card-actions:not(.tak-card-actions-align-end) .tak-button:first-child,.tak-card-actions:not(.tak-card-actions-align-end) .tak-raised-button:first-child,.tak-card-actions:not(.tak-card-actions-align-end) .tak-stroked-button:first-child{margin-left:0;margin-right:0}.tak-card-actions-align-end .tak-button:last-child,.tak-card-actions-align-end .tak-raised-button:last-child,.tak-card-actions-align-end .tak-stroked-button:last-child{margin-left:0;margin-right:0}.tak-card-title:not(:first-child),.tak-card-subtitle:not(:first-child){margin-top:-4px}.tak-card-header .tak-card-subtitle:not(:first-child){margin-top:-8px}.tak-card>.tak-card-xl-image:first-child{margin-top:-8px}.tak-card>.tak-card-xl-image:last-child{margin-bottom:-8px}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCard,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-card',
          exportAs: 'takCard',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          host: {
            class: 'tak-card tak-focus-indicator',
            '[class._tak-animation-noopable]': '_animationMode === "NoopAnimations"',
          },
          template:
            '<ng-content></ng-content>\n<ng-content select="tak-card-footer"></ng-content>\n',
          styles: [
            '.tak-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}.tak-card._tak-animation-noopable{transition:none !important;animation:none !important}.tak-card>.tak-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .tak-card>.tak-divider-horizontal{left:auto;right:0}.tak-card>.tak-divider-horizontal.tak-divider-inset{position:static;margin:0}[dir=rtl] .tak-card>.tak-divider-horizontal.tak-divider-inset{margin-right:0}.cdk-high-contrast-active .tak-card{outline:solid 1px}.tak-card-actions,.tak-card-subtitle,.tak-card-content{display:block;margin-bottom:16px}.tak-card-title{display:block;margin-bottom:8px}.tak-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.tak-card-actions-align-end{display:flex;justify-content:flex-end}.tak-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px;display:block;overflow:hidden}.tak-card-image img{width:100%}.tak-card-footer{display:block;margin:0 -16px -16px -16px}.tak-card-actions .tak-button,.tak-card-actions .tak-raised-button,.tak-card-actions .tak-stroked-button{margin:0 8px}.tak-card-header{display:flex;flex-direction:row}.tak-card-header .tak-card-title{margin-bottom:12px}.tak-card-header-text{margin:0 16px}.tak-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.tak-card-title-group{display:flex;justify-content:space-between}.tak-card-sm-image{width:80px;height:80px}.tak-card-md-image{width:112px;height:112px}.tak-card-lg-image{width:152px;height:152px}.tak-card-xl-image{width:240px;height:240px;margin:-8px}.tak-card-title-group>.tak-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.tak-card-title-group{margin:0}.tak-card-xl-image{margin-left:0;margin-right:0}}.tak-card>:first-child,.tak-card-content>:first-child{margin-top:0}.tak-card>:last-child:not(.tak-card-footer),.tak-card-content>:last-child:not(.tak-card-footer){margin-bottom:0}.tak-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.tak-card>.tak-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.tak-card-actions:not(.tak-card-actions-align-end) .tak-button:first-child,.tak-card-actions:not(.tak-card-actions-align-end) .tak-raised-button:first-child,.tak-card-actions:not(.tak-card-actions-align-end) .tak-stroked-button:first-child{margin-left:0;margin-right:0}.tak-card-actions-align-end .tak-button:last-child,.tak-card-actions-align-end .tak-raised-button:last-child,.tak-card-actions-align-end .tak-stroked-button:last-child{margin-left:0;margin-right:0}.tak-card-title:not(:first-child),.tak-card-subtitle:not(:first-child){margin-top:-4px}.tak-card-header .tak-card-subtitle:not(:first-child){margin-top:-8px}.tak-card>.tak-card-xl-image:first-child{margin-top:-8px}.tak-card>.tak-card-xl-image:last-child{margin-bottom:-8px}',
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
            type: Inject,
            args: [ANIMATION_MODULE_TYPE],
          },
        ],
      },
    ];
  },
});
/**
 * Component intended to be used within the `<tak-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 * @docs-private
 */
class TakCardHeader {}
TakCardHeader.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardHeader,
  deps: [],
  target: i0.ɵɵFactoryTarget.Component,
});
TakCardHeader.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardHeader,
  selector: 'tak-card-header',
  host: { classAttribute: 'tak-card-header' },
  ngImport: i0,
  template:
    '<ng-content select="[tak-card-avatar], [takCardAvatar]"></ng-content>\n<div class="tak-card-header-text">\n  <ng-content\n      select="tak-card-title, tak-card-subtitle,\n      [tak-card-title], [tak-card-subtitle],\n      [takCardTitle], [takCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n',
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardHeader,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-card-header',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          host: { class: 'tak-card-header' },
          template:
            '<ng-content select="[tak-card-avatar], [takCardAvatar]"></ng-content>\n<div class="tak-card-header-text">\n  <ng-content\n      select="tak-card-title, tak-card-subtitle,\n      [tak-card-title], [tak-card-subtitle],\n      [takCardTitle], [takCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n',
        },
      ],
    },
  ],
});
/**
 * Component intended to be used within the `<tak-card>` component. It adds styles for a preset
 * layout that groups an image with a title section.
 * @docs-private
 */
class TakCardTitleGroup {}
TakCardTitleGroup.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardTitleGroup,
  deps: [],
  target: i0.ɵɵFactoryTarget.Component,
});
TakCardTitleGroup.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakCardTitleGroup,
  selector: 'tak-card-title-group',
  host: { classAttribute: 'tak-card-title-group' },
  ngImport: i0,
  template:
    '<div>\n  <ng-content\n      select="tak-card-title, tak-card-subtitle,\n      [tak-card-title], [tak-card-subtitle],\n      [takCardTitle], [takCardSubtitle]"></ng-content>\n</div>\n<ng-content select="img"></ng-content>\n<ng-content></ng-content>\n',
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardTitleGroup,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-card-title-group',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          host: { class: 'tak-card-title-group' },
          template:
            '<div>\n  <ng-content\n      select="tak-card-title, tak-card-subtitle,\n      [tak-card-title], [tak-card-subtitle],\n      [takCardTitle], [takCardSubtitle]"></ng-content>\n</div>\n<ng-content select="img"></ng-content>\n<ng-content></ng-content>\n',
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
class TakCardModule {}
TakCardModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakCardModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardModule,
  declarations: [
    TakCard,
    TakCardHeader,
    TakCardTitleGroup,
    TakCardContent,
    TakCardTitle,
    TakCardSubtitle,
    TakCardActions,
    TakCardFooter,
    TakCardSmImage,
    TakCardMdImage,
    TakCardLgImage,
    TakCardImage,
    TakCardXlImage,
    TakCardAvatar,
  ],
  imports: [TakCommonModule],
  exports: [
    TakCard,
    TakCardHeader,
    TakCardTitleGroup,
    TakCardContent,
    TakCardTitle,
    TakCardSubtitle,
    TakCardActions,
    TakCardFooter,
    TakCardSmImage,
    TakCardMdImage,
    TakCardLgImage,
    TakCardImage,
    TakCardXlImage,
    TakCardAvatar,
    TakCommonModule,
  ],
});
TakCardModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardModule,
  imports: [TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCardModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakCommonModule],
          exports: [
            TakCard,
            TakCardHeader,
            TakCardTitleGroup,
            TakCardContent,
            TakCardTitle,
            TakCardSubtitle,
            TakCardActions,
            TakCardFooter,
            TakCardSmImage,
            TakCardMdImage,
            TakCardLgImage,
            TakCardImage,
            TakCardXlImage,
            TakCardAvatar,
            TakCommonModule,
          ],
          declarations: [
            TakCard,
            TakCardHeader,
            TakCardTitleGroup,
            TakCardContent,
            TakCardTitle,
            TakCardSubtitle,
            TakCardActions,
            TakCardFooter,
            TakCardSmImage,
            TakCardMdImage,
            TakCardLgImage,
            TakCardImage,
            TakCardXlImage,
            TakCardAvatar,
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
  TakCard,
  TakCardActions,
  TakCardAvatar,
  TakCardContent,
  TakCardFooter,
  TakCardHeader,
  TakCardImage,
  TakCardLgImage,
  TakCardMdImage,
  TakCardModule,
  TakCardSmImage,
  TakCardSubtitle,
  TakCardTitle,
  TakCardTitleGroup,
  TakCardXlImage,
};
//# sourceMappingURL=card.mjs.map
