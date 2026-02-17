import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  AfterViewInit,
  EventEmitter,
  HostListener,
  Component,
  Output,
  Input,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'tak-header',
  templateUrl: './component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakHeaderComponent implements AfterViewInit {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  @Input() mdWidth = 5000;
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
