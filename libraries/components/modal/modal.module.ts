import { NgModule } from '@angular/core';
import { MatButtonModule } from '@takkion/material/button';
import { MatIconModule } from '@takkion/material/icon';
import { TakModalComponent } from './modal.component';
import { MatDialogModule } from '@takkion/material/dialog';
import { MatDividerModule } from '@takkion/material/divider';

@NgModule({
  declarations: [TakModalComponent],
  imports: [MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule],
  exports: [TakModalComponent],
})
export class TakModalModule {}
