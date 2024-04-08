import { NgModule } from '@angular/core';
import { MatButtonModule } from '@takkion/material/button';
import { MatIconModule } from '@takkion/material/icon';
import { TakModalComponent } from './modal.component';
import { MatDialogModule } from '@takkion/material/dialog';
import { MatDividerModule } from '@takkion/material/divider';
import { TakFieldsModule } from '@takkion/components/fields';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TakModalComponent],
  imports: [
    MatButtonModule,
    MatDialogModule,
    TakFieldsModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [TakModalComponent],
})
export class TakModalModule {}
