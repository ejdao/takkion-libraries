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
  showForWeb?: boolean;
  authorities?: string[];
  disableOnContexts?: any[];
  forceDisabledContent?: boolean;
  /** @deprecated NO DEBERIA DISTINGUIR */
  showForMobile?: boolean;
  /** @deprecated NO DEBERIA DISTINGUIR */
}

export interface AdminLayoutConfig {
  userImage?: string;
  appIcon: string;
  appTitle: string;
  appSidebarTitle: string;
  appSidebarSubtitle: string;
  navigation: CtmSnavItems[];
  authorities: string[];
  context: any[];
  isDinamicSidebar: boolean;
  sidebarDebounceTime: number;
  accordionInCollections: boolean;
  disableHiddenCollections: boolean;
  hasFooter: boolean;
  mdWidth: number;
  includeBreadcrumbs: boolean;
}
