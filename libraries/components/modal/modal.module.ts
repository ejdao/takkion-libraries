import { NgModule } from '@angular/core';
import { MatButtonModule } from '@takkion/material/button';
import { MatIconModule } from '@takkion/material/icon';
import { TakModalComponent } from './modal.component';
import { MatDividerModule } from '@takkion/material/divider';
import { TakDialogModule } from '@takkion/components/dialogs';

@NgModule({
  declarations: [TakModalComponent],
  imports: [MatButtonModule, TakDialogModule, MatDividerModule, MatIconModule],
  exports: [TakModalComponent],
})
export class TakModalModule {}
