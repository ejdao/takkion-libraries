import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TakModal } from '@kato-lee/components/modal';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatDialogModule } from '@kato-lee/material/dialog';
import { MatButtonModule } from '@kato-lee/material/button';
import { DefaultLayoutComponent } from '@kato-lee/admin-layout';
import { SIDE_NAV } from './app.snav';

@Component({
  standalone: true,
  imports: [DefaultLayoutComponent, MatButtonModule, MatDialogModule, MatIconModule, RouterModule],
  selector: 'gcm-admin-layout',
  template: `
    @if (resourcesLoaded()) {
      <app-admin-layout
        appTitle="{{ appTitle }}"
        appSidebarTitle="{{ sidebarTitle }}"
        appSidebarSubtitle="{{ sidebarSubtitle }}"
        [navigation]="navigation"
        [authorities]="authorities"
        [context]="context!"
        [isDinamicSidebar]="true"
        [sidebarDebounceTime]="200"
        [accordionInCollections]="accordionInCollections"
        [disableHiddenCollections]="disableHiddenCollections"
        [hasFooter]="false"
        [mdWidth]="900"
      >
        <section tak-custom-header>
          <div class="gcm-admin-layout__header--container">
            <b class="app__header__user-full-name" [title]="userFullName">{{
              userFullNameSliced
            }}</b>

            @if (wasOpenedOnMobile) {
              <button mat-icon-button (click)="clickOnChangeVersion('mobile')">
                <mat-icon>phone_iphone</mat-icon>
              </button>
            }

            <button mat-icon-button (click)="clickOnLogout()">
              <mat-icon>logout</mat-icon>
            </button>
            <button mat-icon-button (click)="toggleMode()"><mat-icon>dark_mode</mat-icon></button>
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
  public appTitle = 'Eklipse GCM';
  public sidebarTitle = 'Grupo Clínica Médicos';
  public sidebarSubtitle = 'Alta complejidad / Medicos Centro';
  public tabName = 'Home';
  public accordionInCollections = true;
  public disableHiddenCollections = false;

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
    private _router: Router,
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
    const body = document.getElementsByTagName('html')[0];
    if (body.classList.contains(this._darkThemeClassName)) {
      body.classList.remove(this._darkThemeClassName);
      localStorage.removeItem(this._localStorageThemeKey);
    } else {
      localStorage.setItem(this._localStorageThemeKey, 'true');
      body.classList.add(this._darkThemeClassName);
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

  public async clickOnChangeVersion(version: 'mobile' | 'web'): Promise<void> {
    if (version === 'web') {
      this._modal
        .confirm(
          '¿Está segur@ que desea ir a la versión de escritorio?',
          'Cambiar a versión de escritorio'
        )
        .subscribe(result => {
          if (result) {
            location.reload();
          }
        });
    } else {
      this._modal
        .confirm('¿Está segur@ que desea ir a la versión movil?', 'Cambiar a versión movil')
        .subscribe(result => {
          if (result) {
            location.reload();
          }
        });
    }
  }

  get wasOpenedOnMobile() {
    return window.matchMedia(`(max-width:640px)`).matches;
  }
}
