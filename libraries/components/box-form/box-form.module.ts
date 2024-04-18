import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TakBoxFormComponent } from './box-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [TakBoxFormComponent],
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
  ],
  exports: [TakBoxFormComponent],
})
export class TakBoxFormModule {}
