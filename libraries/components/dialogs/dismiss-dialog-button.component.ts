import { ChangeDetectionStrategy, ViewEncapsulation, Component } from '@angular/core';
import { MatDialogRef } from '@kato-lee/material/dialog';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatDividerModule } from '@kato-lee/material/divider';
import { MatDialogModule } from '@kato-lee/material/dialog';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
  selector: 'tak-dismiss-dialog-button',
  host: {
    directive: 'tak-dialog-title',
  },
  template: `
    <div class="tak-modal__top-container--custom">
      <h1 class="tak-modal__top-container--custom--title"><ng-content /></h1>
      <button mat-icon-button (click)="dialogRef.close()"><mat-icon>close</mat-icon></button>
    </div>
    <mat-divider />
    <input style="display: none !important;" cdkFocusInitial />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakDismissDialogButtonComponent {
  constructor(public dialogRef: MatDialogRef<TakDismissDialogButtonComponent>) {}
}
