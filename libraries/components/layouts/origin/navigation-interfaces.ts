export type TakOriginSnavItemType = 'link' | 'collection' | 'dropdown';

export interface TakOriginSnavItems {
  type: TakOriginSnavItemType;
  icon?: string;
  name: string;
  url?: string;
  urlIsNotAutoCompleted?: boolean;
  dropdownLinks?: TakOriginSnavDropdownLink[];
  objects?: TakOriginSnavItems[];
  authorities?: string[];
  disableOnContexts?: string[];
  showCollectionContent?: boolean;
  forceDisabledContent?: boolean;
  disabledOnMobile?: boolean;
  disabledOnWeb?: boolean;
  isOpened?: boolean;
}

export interface TakOriginSnavDropdownLink {
  name: string;
  url: string;
  urlIsNotAutoCompleted?: boolean;
  authorities?: string[];
  disableOnContexts?: string[];
  forceDisabledContent?: boolean;
}
