import { NgModule } from '@angular/core';
import { TakDismissDialogButtonComponent } from './dismiss-dialog-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

const components = [TakDismissDialogButtonComponent];

@NgModule({
  declarations: components,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
  exports: [...components, MatDialogModule],
})
export class TakDialogModule {}
