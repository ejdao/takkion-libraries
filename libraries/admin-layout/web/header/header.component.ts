import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { LAYOUT_CONTAINER } from '../services/toggle-sidebar';
import {
  LucideAngularModule,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  LayoutGrid,
  LogOutIcon,
  Activity,
} from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [LucideAngularModule],
  selector: 'tak-header',
  templateUrl: './header.component.html',
  styles: `
    .topbar-left-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .home-link {
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: background var(--transition);
      &:hover {
        background: rgba(255, 255, 255, 0.28);
      }
    }
    button.home-link {
      border: none;
    }

    .topbar-right-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .topbar-btn {
      background: rgba(255, 255, 255, 0.12);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background var(--transition);
      position: relative;
    }

    .topbar-btn:hover {
      background: rgba(255, 255, 255, 0.22);
    }
    .menu-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.12);
      border: none;
      color: white;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 10px;
      cursor: pointer;
      transition: background var(--transition);
      text-decoration: none;

      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    }
    .topbar-left-group,
    .topbar-right-group {
      padding: 0 32px;
    }
    @media (max-width: 768px) {
      .topbar-left-group,
      .topbar-right-group {
        padding: 0 16px;
      }
    }
    .topbar-breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0;
    }
    .topbar-bc-segment {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .topbar-bc-link {
      color: rgba(255, 255, 255, 0.75);
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      padding: 4px 8px;
      border-radius: 6px;
      transition:
        background var(--transition),
        color var(--transition);
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        color: white;
      }
    }
    .topbar-bc-current {
      color: white;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 8px;
    }
    .topbar-bc-sep {
      color: rgba(255, 255, 255, 0.35);
      flex-shrink: 0;
      margin: 0 2px;
    }
    .topbar-divider {
      width: 1px;
      height: 28px;
      background: rgba(255, 255, 255, 0.2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakHeaderComponent implements AfterViewInit, OnDestroy {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() backToMenu: EventEmitter<any> = new EventEmitter();

  @Input() mdWidth = 640;
  @Input() isActionButton = false;

  module = signal('Modulo');
  subModule = signal('SubModulo');
  route = signal('Ruta');

  private _routerSubs!: Subscription;

  public isScreenMd = false;

  readonly icons = {
    Search,
    Bell,
    Settings,
    LogOut,
    Menu,
    ChevronRight,
    LayoutGrid,
    LogOutIcon,
    Activity,
  };

  constructor(
    private _cd: ChangeDetectorRef,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}

  @HostListener('window:resize')
  public onResize() {
    this.isScreenMd = window.matchMedia(`(max-width:${this.mdWidth}px)`).matches;
    this._cd.markForCheck();
  }

  public onToggleSidebar(): void {
    const isOpen = document
      .getElementsByClassName(LAYOUT_CONTAINER)[0]
      .classList.contains('compact');

    if (isOpen) {
      this.toggleSidebar.emit(false);
    } else {
      this.toggleSidebar.emit(true);
    }
  }

  private _execute() {
    try {
      let count = 0;
      let current = this._activeRoute;

      while (current.firstChild) {
        current = current.firstChild;
      }

      if (!count) {
        const splitted = (current.snapshot.data['title'] as string).split('|');
        if (splitted[0]) this.module.set(splitted[0]);
        if (splitted[1]) this.subModule.set(splitted[1]);
        if (splitted[2]) this.route.set(splitted[2]);
        count++;
      }
    } catch (error) {}
  }

  public ngAfterViewInit(): void {
    this.onResize();

    this._execute();

    this._routerSubs = this._router.events.subscribe(() => {
      this._execute();
    });
  }

  ngOnDestroy(): void {
    if (this._routerSubs) this._routerSubs.unsubscribe();
  }
}
