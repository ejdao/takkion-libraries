import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TakAdminLayoutConfig } from '@takkion/ng-components/layouts/admin';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  public config: TakAdminLayoutConfig = {
    topSegmentTitle: 'ejdao Dev S.A',
    topSegmentSubtitle: 'ejdao Location',
    topSegmentIconUrl: 'favicon.ico',
    mobileResolution: '900px',
    hasFooter: true,
    contexts: undefined,
    authorities: undefined,
    navigation: [
      {
        type: 'link',
        name: 'home',
        url: 'home',
        icon: 'home',
      },
      {
        type: 'collection',
        name: 'Material Components',
        url: 'components',
        objects: [
          {
            type: 'link',
            name: 'Autocomplete + Button + Button Toggle',
            url: 'autocomplete',
            icon: 'format_color_fill',
          },
          {
            type: 'link',
            name: 'Badge + Bottom Sheet + Card',
            url: 'badge',
            icon: 'format_color_fill',
          },
          {
            type: 'link',
            name: 'Checkbox + Chips + Divider',
            url: 'checkbox',
            icon: 'format_color_fill',
          },
          {
            type: 'link',
            name: 'Datepicker + Dialog + Expansion Panel',
            url: 'datepicker',
            icon: 'format_color_fill',
          },
          {
            type: 'link',
            name: 'Form field + Grid list + Icon + Input + List + Menu',
            url: 'form-field',
            icon: 'format_color_fill',
          },
          {
            type: 'link',
            name: 'Progress bar + Progress spinner + Radio button + Ripples + Slide toggle + Slider',
            url: 'progress-bar',
            icon: 'format_color_fill',
          },
          {
            type: 'link',
            name: 'Paginator + Sort header + Table',
            url: 'tables',
            icon: 'format_color_fill',
          },
          {
            type: 'link',
            name: 'Select + Sidenav + Snackbar + Stepper + Tabs + Toolbar + Tooltip',
            url: 'select',
            icon: 'format_color_fill',
          },
        ],
      },
    ],
  };
}
