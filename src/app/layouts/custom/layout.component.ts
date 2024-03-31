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
  };
}
