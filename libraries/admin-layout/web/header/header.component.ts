import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
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
    .alert {
      font-size: 0.875rem;
      color: #856404;
      margin: 3px 5px;
    }
    .alert-content {
      background: #fff3cd;
      max-height: 40px;
      display: flex;
      align-items: center;
      border: 1px solid #ffc1074d;
      border-radius: 10px;
      max-width: 530px;
    }
    .mobile-alert {
      display: none;
    }

    @media (max-width: 920px) {
      .alert-content {
        max-width: 450px;
      }
    }

    @media (max-width: 920px) {
      .web-alert {
        display: none !important;
      }
      .mobile-alert {
        display: block !important;
      }
    }

    @media (max-width: 768px) {
      .topbar-left-group,
      .topbar-right-group {
        padding: 0 16px;
      }
    }

    @media (max-width: 660px) {
      .alert-content {
        max-width: 270px;
      }
    }

    @media (max-width: 595px) {
      .alert-content {
        max-width: 205px;
      }
    }

    @media (max-width: 530px) {
      .alert-content {
        display: none !important;
      }
    }

    .topbar-divider {
      width: 1px;
      height: 28px;
      background: rgba(255, 255, 255, 0.2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakHeaderComponent implements AfterViewInit {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() backToMenu: EventEmitter<any> = new EventEmitter();

  @Input() mdWidth = 640;
  @Input() isActionButton = false;

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

  constructor(private _cd: ChangeDetectorRef) {}

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

  public ngAfterViewInit(): void {
    this.onResize();
  }
}
