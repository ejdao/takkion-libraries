import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminLayoutConfig } from '../navigation-interfaces';
import { TakSidenavComponent } from './sidenav/sidenav.component';

@Component({
  standalone: true,
  imports: [TakSidenavComponent],
  selector: 'tak-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakSidebarComponent implements AfterViewInit {
  @ViewChild('checkbox') checkbox!: ElementRef;

  @Output() blockSidebar: EventEmitter<any> = new EventEmitter();
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  @Output() onLogout = new EventEmitter();
  @Output() onSetDarkMode = new EventEmitter();

  @Input() config!: AdminLayoutConfig;

  @Input() isToggleShow = false;
  @Input() isCompact = false;
  @Input() isMd = false;

  hideSidebar = new FormControl(true);

  public ngAfterViewInit(): void {
    if (this.isCompact) this.onBlockSidebar(true);
  }

  public onToggleSidebar(): void {
    this.toggleSidebar.emit(true);
  }

  public onBlockSidebar(checked?: boolean): void {
    const isChecked = checked || this.checkbox.nativeElement.checked;

    localStorage.setItem('tak-sidebar-is-compact', isChecked);
    this.blockSidebar.emit(isChecked);
  }
}
