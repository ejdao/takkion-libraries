import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@takkion/ng-material/bottom-sheet';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BadgeComponent {
  public hidden = false;

  constructor(
    private _bottomSheet: MatBottomSheet,
    href: ElementRef<HTMLElement>
  ) {
    href.nativeElement.classList.add('app-badge');
  }

  public toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  public openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetExampleComponent);
  }
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetExampleComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetExampleComponent>) {}

  public openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
