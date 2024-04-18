import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tak-dismiss-dialog-button',
  host: {
    directive: 'tak-dialog-title',
  },
  template: `
    <div class="tak-modal__top-container--custom">
      <h1 class="tak-modal__top-container--custom--title">
        <ng-content></ng-content>
      </h1>
      <button mat-icon-button (click)="dialogRef.close()"><mat-icon>close</mat-icon></button>
    </div>
    <mat-divider></mat-divider>
    <input style="display: none !important;" cdkFocusInitial />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakDismissDialogButtonComponent {
  constructor(public dialogRef: MatDialogRef<TakDismissDialogButtonComponent>) {}
}
