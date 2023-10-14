import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ToggleSidebar } from '../../services/toggle-sidebar';
import { TakSnav } from '../../navigation-interfaces';

@Component({
  selector: 'tak-sidenav',
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakSidenav implements OnInit {
  @Input() navigation: TakSnav = {
    typeSnavIcons: 'material-icon',
    items: [],
  };
  @Input() authorities: any[] = [];
  @Input() context: any;
  @Input() mdWidth = 640;
  @Input() accordionInCollections = true;
  @Input() disableHiddenCollections = false;

  private _isMobile = false;

  constructor(
    private _toggleSidebar: ToggleSidebar,
    private _cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.navigation.items.map(item => {
      if (item.showContent === undefined) item.showContent = false;
    });
  }

  public onCloseSidebar() {
    const matches = window.matchMedia(`(max-width:${this.mdWidth}px)`).matches;
    if (matches) this._toggleSidebar.closeSidebar();
    else this._isMobile = false;

    this._cd.markForCheck();
  }

  public toggleModule(index: number) {
    if (!this.disableHiddenCollections)
      this.navigation.items.map((item, i) => {
        if (index === i && item.showContent === false) item.showContent = true;
        else if (index === i && item.showContent === true) {
          item.showContent = false;
        } else if (this.accordionInCollections) {
          item.showContent = false;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.onCloseSidebar();
  }

  get isMobile() {
    return this._isMobile;
  }
}
