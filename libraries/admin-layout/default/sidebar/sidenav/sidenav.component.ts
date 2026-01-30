import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  Component,
  Input,
} from '@angular/core';
import { ToggleSidebar, ValidateAccessPipe } from '../../services';
import { CtmSnavItems } from '../../../navigation-interfaces';
import { TakExpansionPanelHeaderComponent } from './expansion/expansion-panel-header.component';
import { TakExpansionPanelComponent } from './expansion/expansion-panel.component';
import { TakAccordionComponent } from './expansion/accordion.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    ValidateAccessPipe,
    RouterModule,
    TakExpansionPanelHeaderComponent,
    TakExpansionPanelComponent,
    TakAccordionComponent,
  ],
  selector: 'tak-sidenav',
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakSidenavComponent {
  @Input() navigation: CtmSnavItems[] = [];
  @Input() authorities: any[] = [];
  @Input() context!: any;
  @Input() mdWidth = 640;
  @Input() accordionInCollections = true;
  @Input() disableHiddenCollections = false;

  private _isMobile = false;

  constructor(
    private _toggleSidebar: ToggleSidebar,
    private _cd: ChangeDetectorRef
  ) {}

  public onCloseSidebar() {
    const matches = window.matchMedia(`(max-width:${this.mdWidth}px)`).matches;
    if (matches) this._toggleSidebar.closeSidebar();
    else this._isMobile = false;

    this._cd.markForCheck();
  }

  public toggleModule(index: number) {
    if (!this.disableHiddenCollections)
      this.navigation.map((item, i) => {
        if (index === i && item.showCollectionContent === false) item.showCollectionContent = true;
        else if (index === i && item.showCollectionContent === true) {
          item.showCollectionContent = false;
        } else if (this.accordionInCollections) {
          item.showCollectionContent = false;
        }
      });
  }

  @HostListener('window:resize')
  public onResize() {
    this.onCloseSidebar();
  }

  get isMobile() {
    return this._isMobile;
  }
}
