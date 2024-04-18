import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TakModalComponent } from './modal.component';
import { MatDividerModule } from '@angular/material/divider';
import { TakDialogModule } from '@takkion/components/dialogs';

@NgModule({
  declarations: [TakModalComponent],
  imports: [MatButtonModule, TakDialogModule, MatDividerModule, MatIconModule],
  exports: [TakModalComponent],
})
export class TakModalModule {}
