import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SIDE_NAV } from './origin.navigation';

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

  public permissions = ['1', '2', '3'];

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

  public isLoading = true;
}
