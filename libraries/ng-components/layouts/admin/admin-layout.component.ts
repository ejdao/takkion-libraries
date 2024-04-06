import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MediaMatcher } from '@takkion/ng-cdk/layout';
import { TakAdminLayoutConfig } from './interfaces';

@Component({
  selector: 'tak-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  };

  public sidebarIsFixed = false;

  private _mediaQuery!: MediaQueryList;

  constructor(href: ElementRef<HTMLElement>, media: MediaMatcher) {
    href.nativeElement.classList.add('tak-admin-layout');
    this._mediaQuery = media.matchMedia(`(min-width: ${this.config.mobileResolution})`);
  }
  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }
  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  public mouseOnSidebar(action: 'over' | 'leave') {
    if (!this.sidebar.nativeElement.classList.contains('fixed') && this._mediaQuery.matches) {
      if (action === 'over') {
        this.sidebar.nativeElement.classList.add('opened');
      } else {
        this.sidebar.nativeElement.classList.remove('opened');
      }
    }
  }

  public clickOnSetSidebar() {
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
}
