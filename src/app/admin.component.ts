import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TakModal } from '@kato-lee/components/modal';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AdminLayoutConfig, CustomLayoutComponent } from '@kato-lee/admin-layout';
import { SIDE_NAV } from './app.snav';

@Component({
  standalone: true,
  imports: [
    CustomLayoutComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
  ],
  selector: 'gcm-admin-layout',
  template: `
    @if (resourcesLoaded()) {
      <app-admin-layout
        [config]="config"
        (onLogout)="clickOnLogout()"
        (onSetDarkMode)="clickOnSetDarkMode()"
      >
        <section tak-custom-header>
          <div class="gcm-admin-layout__header--container">
            <div style="margin-right: 10px;">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="clickOnLogout()">
                  <mat-icon>logout</mat-icon>
                  <span>Cerrar sesión</span>
                </button>
              </mat-menu>
            </div>
          </div>
        </section>
        <router-outlet />
      </app-admin-layout>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  public config: AdminLayoutConfig = {
    showHeader: false,
    showSidebarDarkModeBtn: true,
    appIcon: 'assets/images/sidebar-icons/sidebar-branding.png',
    userImage: 'assets/images/generic-user-profile.jpg',
    userName: this.nombreFormateado,
    appTitle: 'Eklipse GCM',
    appSidebarTitle: 'Grupo Clínica Médicos',
    appSidebarSubtitle: 'clinica valledupar',
    disableHiddenCollections: false,
    navigation: SIDE_NAV,
    authorities: [],
    context: [],
    isDinamicSidebar: true,
    sidebarDebounceTime: 1,
    hasFooter: false,
    mdWidth: 900,
    accordionInCollections: true,
    includeBreadcrumbs: false,
  };

  public navigation = SIDE_NAV;

  public authorities: string[] = [];
  public context = undefined!;

  public userFullNameSliced = 'BIENVENIDO';
  public userFullName = 'BIENVENIDO';

  public resourcesLoaded = signal(false);

  constructor(
    href: ElementRef,
    private _modal: TakModal,
    private _cd: ChangeDetectorRef
  ) {
    href.nativeElement.classList.add('gcm-admin-layout');
  }

  public ngOnInit(): void {
    this._loadInitialResources();
  }

  public clickOnLogout(): void {
    this._modal.confirm('¿Desea cerrar su sesión?', '¿Segur@?').subscribe(success => {
      if (success) location.reload();
    });
  }

  public clickOnSetDarkMode(): void {
    document.getElementsByTagName('html')[0].classList.toggle('dark-theme');
  }

  private async _loadInitialResources(): Promise<any> {
    this.resourcesLoaded.set(true);
    this._cd.markForCheck();
  }

  get wasOpenedOnMobile() {
    return window.matchMedia(`(max-width:640px)`).matches;
  }

  get nombreFormateado() {
    const w = 'eNRIque JOse dE ARmAs OsIA';
    const splt = w.split(' ');
    const fw = splt[0];
    splt[0] = fw.length <= 2 ? fw.toLowerCase() : fw[0].toUpperCase() + fw.slice(1).toLowerCase();
    const wFt = splt.reduce(
      (a, b) =>
        a + ` ${b.length <= 2 ? b.toLowerCase() : b[0].toUpperCase() + b.slice(1).toLowerCase()}`
    );
    return wFt;
  }
}
