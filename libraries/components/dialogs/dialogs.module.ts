import { NgModule } from '@angular/core';
import { TakDismissDialogButtonComponent } from './dismiss-dialog-button.component';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatDialogModule } from '@kato-lee/material/dialog';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatDividerModule } from '@kato-lee/material/divider';

const components = [TakDismissDialogButtonComponent];

@NgModule({
  declarations: components,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
  exports: [...components, MatDialogModule],
})
export class TakDialogModule {}
