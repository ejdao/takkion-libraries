import { NgModule } from '@angular/core';
import { TakDismissDialogButtonComponent } from './dismiss-dialog-button.component';
import { MatButtonModule } from '@takkion/material/button';
import { MatDialogModule } from '@takkion/material/dialog';
import { MatIconModule } from '@takkion/material/icon';
import { MatDividerModule } from '@takkion/material/divider';

const components = [TakDismissDialogButtonComponent];

@NgModule({
  declarations: components,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
  exports: [...components, MatDialogModule],
})
export class TakDialogModule {}
