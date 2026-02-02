import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  Component,
  Input,
  ElementRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { ToggleSidebar, ValidateAccessPipe } from '../../services';
import { AdminLayoutConfig, CtmSnavItems } from '../../../navigation-interfaces';
import { TakExpansionPanelHeaderComponent } from './expansion/expansion-panel-header.component';
import { TakExpansionPanelComponent } from './expansion/expansion-panel.component';
import { TakAccordionComponent } from './expansion/accordion.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    ValidateAccessPipe,
    TakExpansionPanelHeaderComponent,
    TakExpansionPanelComponent,
    TakAccordionComponent,
  ],
  selector: 'tak-sidenav',
  templateUrl: './sidenav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakSidenavComponent {
  @Input() config!: AdminLayoutConfig;

  @Output() onLogout = new EventEmitter();
  @Output() onSetDarkMode = new EventEmitter();

  private _isMobile = false;

  constructor(
    href: ElementRef<HTMLElement>,
    private _toggleSidebar: ToggleSidebar,
    private _cd: ChangeDetectorRef
  ) {
    href.nativeElement.classList.add('app-default-admin-layout');
  }

  public onCloseSidebar() {
    const matches = window.matchMedia(`(max-width:${this.config.mdWidth}px)`).matches;
    if (matches) this._toggleSidebar.closeSidebar();
    else this._isMobile = false;

    this._cd.markForCheck();
  }

  public toggleModule(index: number) {
    if (!this.config.disableHiddenCollections) {
      this.config.navigation.map((item, i) => {
        if (index === i) {
          if (item.showCollectionContent) item.showCollectionContent = false;
          else item.showCollectionContent = true;
        } else {
          if (this.config.accordionInCollections) item.showCollectionContent = false;
        }
      });
    }
  }

  @HostListener('window:resize')
  public onResize() {
    this.onCloseSidebar();
  }

  get isMobile() {
    return this._isMobile;
  }
}
