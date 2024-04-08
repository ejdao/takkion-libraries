import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SIDE_NAV } from './navigation';
import { TakAdminLayoutConfig } from '@takkion/components/layouts/admin';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  public navigation = SIDE_NAV;

  public resourcesLoaded = false;

  public permissions = [
    //
    '000',
    '001',
    '001002',
    '002',
    //'002001',
    '002002',
    '002003',
    '002003001',
    '002003002',
  ];

  public config: TakAdminLayoutConfig = {
    topSegmentTitle: 'ejdao Dev S.A',
    topSegmentSubtitle: 'ejdao Location',
    topSegmentIconUrl: 'favicon.ico',
    mobileResolution: '900px',
    hasFooter: true,
    contexts: undefined,
    authorities: undefined,
    disableAppLoader: true,
    disableChangePageTitle: true,
    navigation: SIDE_NAV,
  };

  public context = 'BOGOTA';

  public accordionInCollections = true;
  public disableHiddenCollections = true;

  constructor(private _cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.resourcesLoaded = true;

    this._setTheme();
  }

  public ngOnDestroy(): void {
    document.getElementsByTagName('body')[0].classList.remove('dark-theme');
  }

  private _setTheme(): void {
    if (localStorage.getItem('dark-theme') !== null) {
      document.getElementsByTagName('body')[0].classList.add('dark-theme');
    }
  }
}
