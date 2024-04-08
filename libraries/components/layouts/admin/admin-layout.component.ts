import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
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
import { Subscription, filter } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@takkion/cdk/layout';
import { TakAdminLayoutConfig } from './interfaces';
import { RoutePartsService } from '../services';

@Component({
  selector: 'tak-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLElement>;
  @ViewChild('container') container!: ElementRef<HTMLElement>;

  @Input() config: TakAdminLayoutConfig = {
    topSegmentTitle: 'Generic Name S.A',
    topSegmentSubtitle: 'Generic Location',
    topSegmentIconUrl: 'favicon.ico',
    mobileResolution: '900px',
    hasFooter: true,
    contexts: undefined,
    authorities: undefined,
    navigation: [],
    multiDropdowns: false,
    disableAppLoader: false,
    disableChangePageTitle: false,
  };

  private _mediaQuery!: MediaQueryList;
  private _routerSubs!: Subscription;
  private _routerChangeTitleSubs!: Subscription;
  private _pageTitle = '';

  public sidebarIsFixed = false;
  public isModuleLoading = false;

  constructor(
    media: MediaMatcher,
    href: ElementRef<HTMLElement>,
    private _title: Title,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _routePartsService: RoutePartsService,
    private _cd: ChangeDetectorRef
  ) {
    href.nativeElement.classList.add('tak-admin-layout');
    this._mediaQuery = media.matchMedia(`(min-width: ${this.config.mobileResolution})`);
  }

  public ngOnInit(): void {
    this._isModuleLoading();
    if (!this.config.disableChangePageTitle) this._changePageTitle();
  }

  private _changePageTitle(): void {
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
          this._pageTitle = `${this.config.topSegmentTitle} | ${this._pageTitle}`;
          this._title.setTitle(this._pageTitle);
        }
      });
  }

  private _isModuleLoading(): void {
    this._routerSubs = this._router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        if (!this.config.disableAppLoader) this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        if (!this.config.disableAppLoader) this.isModuleLoading = false;
        this.scrollToTop();
      }
      this._cd.markForCheck();
    });
  }

  public mouseOnSidebar(action: 'over' | 'leave'): void {
    if (!this.sidebar.nativeElement.classList.contains('fixed') && this._mediaQuery.matches) {
      if (action === 'over') {
        this.sidebar.nativeElement.classList.add('opened');
      } else {
        this.sidebar.nativeElement.classList.remove('opened');
      }
    }
  }

  public clickOnSetSidebar(): void {
    if (!this.sidebar.nativeElement.classList.contains('fixed')) {
      this.sidebar.nativeElement.classList.add('opened');
      this.sidebar.nativeElement.classList.add('fixed');
      this.container.nativeElement.classList.add('fixed');
      this.sidebarIsFixed = true;
    } else {
      this.sidebar.nativeElement.classList.remove('opened');
      this.sidebar.nativeElement.classList.remove('fixed');
      this.container.nativeElement.classList.remove('fixed');
      this.sidebarIsFixed = false;
    }
  }

  public scrollToTop(): void {
    if (this.container) this.container.nativeElement.scrollTo({ top: 0 });
  }

  public ngOnDestroy(): void {
    if (this._routerSubs) this._routerSubs.unsubscribe();
    if (this._routerChangeTitleSubs) this._routerChangeTitleSubs.unsubscribe();
  }
}
