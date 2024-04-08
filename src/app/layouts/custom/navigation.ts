import { TakSnavItems } from '@takkion/components/layouts/origin';

const ADMIN = '000';

export const SIDE_NAV: TakSnavItems[] = [
  {
    type: 'link',
    name: 'Home',
    icon: 'dashboard',
    url: 'home',
  },
  {
    type: 'dropdown',
    name: 'Components',
    url: 'components',
    authorities: [ADMIN, '001'],
    icon: 'shield',
    dropdownLinks: [
      {
        name: 'Autocomplete + Button + Button Toggle',
        url: 'autocomplete',
        authorities: [ADMIN, '001001'],
      },
      {
        name: 'Badge + Bottom Sheet + Card',
        url: 'badge',
        authorities: [ADMIN, '001002'],
      },
    ],
  },
  {
    type: 'collection',
    name: 'Material Components',
    url: '',
    authorities: [ADMIN, '002'],
    objects: [
      {
        type: 'link',
        name: 'Datepicker + Dialog + Expansion Panel',
        url: 'components/datepicker',
        icon: 'format_color_fill',
        authorities: [ADMIN, '002001'],
      },
      {
        type: 'link',
        name: 'Form field + Grid list + Icon + Input + List + Menu',
        url: 'components/form-field',
        icon: 'format_color_fill',
        forceDisabledContent: true,
        authorities: [ADMIN, '002002'],
      },
      {
        type: 'dropdown',
        name: 'Components 1',
        url: 'components',
        icon: 'shield',
        authorities: [ADMIN, '002003'],
        dropdownLinks: [
          {
            name: 'Progress bar + Progress spinner + Radio button + Ripples + Slide toggle + Slider',
            url: 'progress-bar',
            disableOnContexts: ['BOGOTA'],
            authorities: [ADMIN, '002003001'],
          },
          {
            name: 'Paginator + Sort header + Table',
            url: 'tables',
            disableOnContexts: ['BOGOTA'],
            authorities: [ADMIN, '002003002'],
          },
          {
            name: 'Select + Sidenav + Snackbar + Stepper + Tabs + Toolbar + Tooltip',
            url: 'select',
            authorities: [ADMIN, '002003003'],
          },
          {
            name: 'Autocomplete + Button + Button Toggle',
            url: 'autocomplete',
            authorities: [ADMIN, '002003004'],
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Components 2',
        url: 'components',
        icon: 'shield',
        authorities: [ADMIN, '002004'],
        dropdownLinks: [
          {
            name: 'Badge + Bottom Sheet + Card',
            url: 'badge',
            authorities: [ADMIN, '002004001'],
          },
          {
            name: 'Checkbox + Chips + Divider',
            url: 'checkbox',
            authorities: [ADMIN, '002004002'],
          },
          {
            name: 'Datepicker + Dialog + Expansion Panel',
            url: 'datepicker',
            authorities: [ADMIN, '002004003'],
          },
          {
            name: 'Form field + Grid list + Icon + Input + List + Menu',
            url: 'form-field',
            authorities: [ADMIN, '002004004'],
          },
        ],
      },
    ],
  },
];
