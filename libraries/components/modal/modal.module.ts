import { NgModule } from '@angular/core';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatIconModule } from '@kato-lee/material/icon';
import { TakModalComponent } from './modal.component';
import { MatDividerModule } from '@kato-lee/material/divider';
import { TakDialogModule } from '@kato-lee/components/dialogs';

@NgModule({
  declarations: [TakModalComponent],
  imports: [MatButtonModule, TakDialogModule, MatDividerModule, MatIconModule],
  exports: [TakModalComponent],
})
export class TakModalModule {}
