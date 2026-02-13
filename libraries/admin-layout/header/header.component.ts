import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LAYOUT_CONTAINER } from '../services/toggle-sidebar';

@Component({
  standalone: true,
  selector: 'tak-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakHeaderComponent implements AfterViewInit {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  @Input() mdWidth = 640;
  @Input() isActionButton = false;

  public isScreenMd = false;

  constructor(private _cd: ChangeDetectorRef) {}

  @HostListener('window:resize')
  public onResize() {
    this.isScreenMd = window.matchMedia(`(max-width:${this.mdWidth}px)`).matches;
    this._cd.markForCheck();
  }

  public ngAfterViewInit(): void {
    this.onResize();
  }
}
