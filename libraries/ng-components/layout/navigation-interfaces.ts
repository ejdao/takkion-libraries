export type TakSnavIconsType = 'material-icon' | 'img';
export type TakSnavItemType = 'link' | 'collection' | 'dropdown';

export interface TakSnavItems {
  type: TakSnavItemType;
  icon?: string;
  name: string;
  url?: string;
  urlIsNotAutoCompleted?: boolean;
  dropdownLinks?: TakSnavDropdownLink[];
  objects?: TakSnavItems[];
  authorities?: string[];
  disableOnContexts?: string[];
  showContent?: boolean;
  isOpened?: boolean;
}

export interface TakSnavDropdownLink {
  name: string;
  url: string;
  urlIsNotAutoCompleted?: boolean;
  authorities?: string[];
  disableOnContexts?: string[];
}

export interface TakSnav {
  typeSnavIcons: TakSnavIconsType;
  items: TakSnavItems[];
}
