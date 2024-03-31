export interface TakAdminLayoutConfig {
  topSegmentTitle: string;
  topSegmentSubtitle: string;
  topSegmentIconUrl: string;
  mobileResolution: string;
  hasFooter: boolean;
  contexts?: string[];
  authorities?: string[];
  navigation: TakAdminLayoutSnavItems[];
  multiDropdowns?: boolean;
}

export type TakAdminLayoutSnavIconsType = 'material-icon' | 'img';
export type TakAdminLayoutSnavItemType = 'link' | 'collection' | 'dropdown';

export interface TakAdminLayoutSnavItems {
  type: TakAdminLayoutSnavItemType;
  icon?: string;
  iconCollectionOpened?: string;
  iconCollectionClosed?: string;
  iconType?: TakAdminLayoutSnavIconsType;
  iconWidth?: string;
  iconMarginLeft?: string;
  iconMarginRight?: string;
  name: string;
  url?: string;
  urlIsNotAutoCompleted?: boolean;
  dropdownLinks?: TakAdminLayoutSnavDropdownLink[];
  objects?: TakAdminLayoutSnavItems[];
  authorities?: string[];
  disableOnContexts?: string[];
  showCollectionContent?: boolean;
  forceDisabledContent?: boolean;
  disabledOnMobile?: boolean;
  disabledOnWeb?: boolean;
  isOpened?: boolean;
}

export interface TakAdminLayoutSnavDropdownLink {
  name: string;
  url: string;
  urlIsNotAutoCompleted?: boolean;
  authorities?: string[];
  disableOnContexts?: string[];
  forceDisabledContent?: boolean;
}
