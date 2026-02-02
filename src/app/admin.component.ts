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
import { MatMenuModule } from '@kato-lee/material/menu';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatDialogModule } from '@kato-lee/material/dialog';
import { MatButtonModule } from '@kato-lee/material/button';
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
        (onSetDarkMode)="toggleMode()"
      >
        <section tak-custom-header>
          <div class="gcm-admin-layout__header--container">
            <div>
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

            <button mat-icon-button (click)="toggleMode()">
              <mat-icon>dark_mode</mat-icon>
            </button>
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
    appIcon: 'favicon.ico',
    userImage: 'assets/images/generic-user-profile.jpg',
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

  private readonly _darkThemeClassName = 'dark-theme';
  private readonly _localStorageThemeKey = 'ekl-dk-th';

  constructor(
    href: ElementRef<HTMLElement>,
    private _modal: TakModal,
    private _cd: ChangeDetectorRef
  ) {
    href.nativeElement.classList.add('gcm-admin-layout');
  }

  public ngOnInit(): void {
    this._setInitialTheme();
    this._loadInitialResources();
  }

  public toggleMode(): void {
    const html = document.getElementsByTagName('html')[0];
    if (html.classList.contains(this._darkThemeClassName)) {
      html.classList.remove(this._darkThemeClassName);
      localStorage.removeItem(this._localStorageThemeKey);
    } else {
      localStorage.setItem(this._localStorageThemeKey, 'true');
      html.classList.add(this._darkThemeClassName);
    }
  }

  public clickOnLogout(): void {
    this._modal.confirm('¿Desea cerrar su sesión?', '¿Segur@?').subscribe(success => {
      if (success) location.reload();
    });
  }

  private _setInitialTheme(): void {
    const isDarkModeActived = window.matchMedia('(prefers-color-scheme: dark)');

    if (
      localStorage.getItem(this._localStorageThemeKey) === 'true' ||
      (isDarkModeActived.matches && localStorage.getItem(this._localStorageThemeKey) !== 'false')
    ) {
      document.getElementsByTagName('html')[0].classList.add(this._darkThemeClassName);
    }
  }

  private async _loadInitialResources(): Promise<void> {
    this.resourcesLoaded.set(true);
    this._cd.markForCheck();
  }

  public ngOnDestroy(): void {
    document.getElementsByTagName('html')[0].classList.remove(this._darkThemeClassName);
  }

  get wasOpenedOnMobile() {
    return window.matchMedia(`(max-width:640px)`).matches;
  }
}
