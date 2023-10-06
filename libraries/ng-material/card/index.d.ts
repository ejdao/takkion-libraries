import * as i0 from '@angular/core';
import * as i2 from '@takkion/ng-material/core';

declare namespace i1 {
  export {
    TakCardContent,
    TakCardTitle,
    TakCardSubtitle,
    TakCardActions,
    TakCardFooter,
    TakCardImage,
    TakCardSmImage,
    TakCardMdImage,
    TakCardLgImage,
    TakCardXlImage,
    TakCardAvatar,
    TakCard,
    TakCardHeader,
    TakCardTitleGroup,
  };
}

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
export declare class TakCard {
  _animationMode?: string | undefined;
  constructor(_animationMode?: string | undefined);
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCard, [{ optional: true }]>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakCard,
    'tak-card',
    ['takCard'],
    {},
    {},
    never,
    ['*', 'tak-card-footer'],
    false
  >;
}

/**
 * Action section of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class TakCardActions {
  /** Position of the actions inside the card. */
  align: 'start' | 'end';
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardActions, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardActions,
    'tak-card-actions',
    ['takCardActions'],
    { align: 'align' },
    {},
    never,
    never,
    false
  >;
}

/**
 * Avatar image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
export declare class TakCardAvatar {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardAvatar, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardAvatar,
    '[tak-card-avatar], [takCardAvatar]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Content of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class TakCardContent {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardContent, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardContent,
    'tak-card-content, [tak-card-content], [takCardContent]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Footer of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class TakCardFooter {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardFooter, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardFooter,
    'tak-card-footer',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Component intended to be used within the `<tak-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 * @docs-private
 */
export declare class TakCardHeader {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardHeader, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakCardHeader,
    'tak-card-header',
    never,
    {},
    {},
    never,
    [
      '[tak-card-avatar], [takCardAvatar]',
      'tak-card-title, tak-card-subtitle,\n      [tak-card-title], [tak-card-subtitle],\n      [takCardTitle], [takCardSubtitle]',
      '*',
    ],
    false
  >;
}

/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
export declare class TakCardImage {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardImage, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardImage,
    '[tak-card-image], [takCardImage]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
export declare class TakCardLgImage {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardLgImage, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardLgImage,
    '[tak-card-lg-image], [takCardImageLarge]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
export declare class TakCardMdImage {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardMdImage, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardMdImage,
    '[tak-card-md-image], [takCardImageMedium]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export declare class TakCardModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakCardModule,
    [
      typeof i1.TakCard,
      typeof i1.TakCardHeader,
      typeof i1.TakCardTitleGroup,
      typeof i1.TakCardContent,
      typeof i1.TakCardTitle,
      typeof i1.TakCardSubtitle,
      typeof i1.TakCardActions,
      typeof i1.TakCardFooter,
      typeof i1.TakCardSmImage,
      typeof i1.TakCardMdImage,
      typeof i1.TakCardLgImage,
      typeof i1.TakCardImage,
      typeof i1.TakCardXlImage,
      typeof i1.TakCardAvatar,
    ],
    [typeof i2.TakCommonModule],
    [
      typeof i1.TakCard,
      typeof i1.TakCardHeader,
      typeof i1.TakCardTitleGroup,
      typeof i1.TakCardContent,
      typeof i1.TakCardTitle,
      typeof i1.TakCardSubtitle,
      typeof i1.TakCardActions,
      typeof i1.TakCardFooter,
      typeof i1.TakCardSmImage,
      typeof i1.TakCardMdImage,
      typeof i1.TakCardLgImage,
      typeof i1.TakCardImage,
      typeof i1.TakCardXlImage,
      typeof i1.TakCardAvatar,
      typeof i2.TakCommonModule,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakCardModule>;
}

/**
 * Image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
export declare class TakCardSmImage {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardSmImage, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardSmImage,
    '[tak-card-sm-image], [takCardImageSmall]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Sub-title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class TakCardSubtitle {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardSubtitle, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardSubtitle,
    'tak-card-subtitle, [tak-card-subtitle], [takCardSubtitle]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class TakCardTitle {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardTitle, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardTitle,
    'tak-card-title, [tak-card-title], [takCardTitle]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Component intended to be used within the `<tak-card>` component. It adds styles for a preset
 * layout that groups an image with a title section.
 * @docs-private
 */
export declare class TakCardTitleGroup {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardTitleGroup, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakCardTitleGroup,
    'tak-card-title-group',
    never,
    {},
    {},
    never,
    [
      'tak-card-title, tak-card-subtitle,\n      [tak-card-title], [tak-card-subtitle],\n      [takCardTitle], [takCardSubtitle]',
      'img',
      '*',
    ],
    false
  >;
}

/**
 * Large image used in a card, needed to add the tak- CSS styling.
 * @docs-private
 */
export declare class TakCardXlImage {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakCardXlImage, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakCardXlImage,
    '[tak-card-xl-image], [takCardImageXLarge]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

export {};
