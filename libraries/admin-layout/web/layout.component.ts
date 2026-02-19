import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { filter, Subscription } from 'rxjs';
import { RoutePartsService } from './services';
import { CtmSnavItems } from '../navigation-interfaces';
import { TakHeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  imports: [TakHeaderComponent],
  providers: [RoutePartsService],
  selector: 'app-admin-layout--web',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLayoutWebComponent implements OnInit, OnDestroy {
  @ViewChild('scrollLayout') scrollLayout!: ElementRef;

  private _routerSubs!: Subscription;
  private _routerChangeTitleSubs!: Subscription;
  private _sidebarStatus!: Subscription;

  @Input() navigation: CtmSnavItems[] = [];

  @Input() appIcon = 'favicon.ico';
  @Input() appTitle = 'Takkion Devs';
  @Input() appSidebarTitle = 'Takkion (Sidebar)';
  @Input() appSidebarSubtitle = 'Takkion (Sidebar)';
  @Input() sidebarDebounceTime = 250;
  @Input() mdWidth = 640;
  @Input() isDinamicSidebar = true;
  @Input() includeBreadcrumbs = false;

  @Input() accordionInCollections = true;
  @Input() disableHiddenCollections = false;

  @Input() hasFooter = true;

  @Input() authorities: any[] = [];
  @Input() context!: any;

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() backToMenu: EventEmitter<any> = new EventEmitter();

  private _isModuleLoading: boolean = false;

  private _pageTitle = '';

  private _isSidebarCompact: boolean =
    localStorage.getItem('tak-sidebar-is-compact') === 'true' ? true : false;
  public isSidebarFixed: boolean = false;

  public isMd: boolean = false;

  public sidebarRespForm = new FormControl();

  constructor(
    private _routePartsService: RoutePartsService,
    private _activeRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef,
    private _router: Router,
    private _title: Title
  ) {}

  public ngOnInit(): void {
    this._title.setTitle(this.appTitle);

    this._changePageTitle();

    this._routerSubs = this._router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this._isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this._isModuleLoading = false;
        this.scrollToTop();
      }
      this._cd.markForCheck();
    });
    document.getElementsByTagName('body')[0].classList.add('tak-layout');
  }

  public sidebarMouseEnter(): void {
    this.sidebarRespForm.setValue(true);
  }

  public onBlockSidebar(event: boolean): void {
    this.isSidebarFixed = event;
    if (event) this.sidebarMouseEnter();

    if (event) document.getElementsByClassName('tak__container')[0].classList.add('sidebar-fixed');
    else document.getElementsByClassName('tak__container')[0].classList.remove('sidebar-fixed');
  }

  public scrollToTop(): void {
    if (this.scrollLayout) this.scrollLayout.nativeElement.scrollTo({ top: 0 });
  }

  private _changePageTitle() {
    this._routerChangeTitleSubs = this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeParts = this._routePartsService.generateRouteParts(this._activeRoute.snapshot);
        if (routeParts.length) {
          this._pageTitle = routeParts
            .reverse()
            .map(part => part.title)
            .reduce((partA, partI) => {
              return `${partA} > ${partI}`;
            });
          this._pageTitle = `${this.appTitle} | ${this._pageTitle}`;
          this._title.setTitle(this._pageTitle);
        }
      });
  }

  public ngOnDestroy(): void {
    if (this._routerSubs) this._routerSubs.unsubscribe();
    if (this._routerChangeTitleSubs) this._routerChangeTitleSubs.unsubscribe();
    if (this._sidebarStatus) this._sidebarStatus.unsubscribe();
  }

  get isModuleLoading(): boolean {
    return this._isModuleLoading;
  }

  get isSidebarCompact(): boolean {
    return this._isSidebarCompact;
  }
}

@Component({
  standalone: true,
  selector: 'tak-loader',
  template: `<div class="app-loader">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakLoader {}
