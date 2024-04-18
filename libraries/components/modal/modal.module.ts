import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TakModalComponent } from './modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [TakModalComponent],
  imports: [MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule],
  exports: [TakModalComponent],
})
export class TakModalModule {}
