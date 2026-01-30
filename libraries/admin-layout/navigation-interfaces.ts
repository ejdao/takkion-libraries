export type CtmSnavItemType = 'link' | 'collection' | 'dropdown';

export interface CtmSnavItems {
  type: CtmSnavItemType;
  icon?: string;
  name: string;
  url?: string;
  urlIsNotAutoCompleted?: boolean;
  dropdownLinks?: CtmSnavDropdownLink[];
  objects?: CtmSnavItems[];
  authorities?: string[];
  disableOnContexts?: any[];
  showCollectionContent?: boolean;
  forceDisabledContent?: boolean;
  isOpened?: boolean;
  /** @deprecated NO DEBERIA DISTINGUIR */
  showForMobile?: boolean;
  /** @deprecated NO DEBERIA DISTINGUIR */
  showForWeb?: boolean;
}

export interface CtmSnavDropdownLink {
  name: string;
  url: string;
  urlIsNotAutoCompleted?: boolean;
  showForMobile?: boolean;
  showForWeb?: boolean;
  authorities?: string[];
  disableOnContexts?: any[];
  forceDisabledContent?: boolean;
}

export interface AdminLayoutConfig {
  userImage?: string;
}
