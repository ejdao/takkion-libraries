import { TakSnav } from '@takkion/ng-components/admin-layout';

export const SIDE_NAV: TakSnav = {
  typeSnavIcons: 'material-icon',
  items: [
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
      icon: 'shield',
      dropdownLinks: [
        {
          name: 'Autocomplete + Button + Button Toggle',
          url: 'autocomplete',
        },
        {
          name: 'Badge + Bottom Sheet + Card',
          url: 'badge',
        },
      ],
    },
    {
      type: 'collection',
      name: 'Material Components',
      url: '',
      objects: [
        {
          type: 'link',
          name: 'Datepicker + Dialog + Expansion Panel',
          url: 'components/datepicker',
          icon: 'format_color_fill',
        },
        {
          type: 'link',
          name: 'Form field + Grid list + Icon + Input + List + Menu',
          url: 'components/form-field',
          icon: 'format_color_fill',
        },

        {
          type: 'dropdown',
          name: 'Components',
          url: 'components',
          icon: 'shield',
          dropdownLinks: [
            {
              name: 'Progress bar + Progress spinner + Radio button + Ripples + Slide toggle + Slider',
              url: 'progress-bar',
            },
            {
              name: 'Paginator + Sort header + Table',
              url: 'tables',
            },
            {
              name: 'Select + Sidenav + Snackbar + Stepper + Tabs + Toolbar + Tooltip',
              url: 'select',
            },
            {
              name: 'Autocomplete + Button + Button Toggle',
              url: 'autocomplete',
            },
            {
              name: 'Badge + Bottom Sheet + Card',
              url: 'badge',
            },
            {
              name: 'Checkbox + Chips + Divider',
              url: 'checkbox',
            },
            {
              name: 'Datepicker + Dialog + Expansion Panel',
              url: 'datepicker',
            },
            {
              name: 'Form field + Grid list + Icon + Input + List + Menu',
              url: 'form-field',
            },
          ],
        },

        {
          type: 'dropdown',
          name: 'Components',
          url: 'components',
          icon: 'shield',
          dropdownLinks: [
            {
              name: 'Progress bar + Progress spinner + Radio button + Ripples + Slide toggle + Slider',
              url: 'progress-bar',
            },
            {
              name: 'Paginator + Sort header + Table',
              url: 'tables',
            },
            {
              name: 'Select + Sidenav + Snackbar + Stepper + Tabs + Toolbar + Tooltip',
              url: 'select',
            },
            {
              name: 'Autocomplete + Button + Button Toggle',
              url: 'autocomplete',
            },
            {
              name: 'Badge + Bottom Sheet + Card',
              url: 'badge',
            },
            {
              name: 'Checkbox + Chips + Divider',
              url: 'checkbox',
            },
            {
              name: 'Datepicker + Dialog + Expansion Panel',
              url: 'datepicker',
            },
            {
              name: 'Form field + Grid list + Icon + Input + List + Menu',
              url: 'form-field',
            },
            {
              name: 'Progress bar + Progress spinner + Radio button + Ripples + Slide toggle + Slider',
              url: 'progress-bar',
            },
            {
              name: 'Paginator + Sort header + Table',
              url: 'tables',
            },
            {
              name: 'Select + Sidenav + Snackbar + Stepper + Tabs + Toolbar + Tooltip',
              url: 'select',
            },
          ],
        },
      ],
    },
  ],
};
