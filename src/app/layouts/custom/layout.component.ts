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
        url: 'home1',
        icon: 'home',
      },
      {
        type: 'dropdown',
        name: 'home',
        url: 'home3',
        icon: 'home',
        dropdownLinks: [
          {
            name: 'home',
            url: 'home1',
          },
        ],
      },
      {
        type: 'collection',
        name: 'home',
        objects: [
          {
            type: 'link',
            name: 'home',
            url: 'home2',
            icon: 'favicon.ico',
            iconType: 'img',
            iconMarginLeft: '2px',
            iconMarginRight: '7px',
          },
          {
            type: 'dropdown',
            name: 'home',
            url: 'home3',
            icon: 'home',
            dropdownLinks: [
              {
                name: 'home',
                url: 'home1',
              },
            ],
          },
        ],
      },
    ],
  };
}
