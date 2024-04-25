import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TakBoxFormComponent } from './box-form.component';
import { MatCardModule } from '@takkion/material/card';
import { MatIconModule } from '@takkion/material/icon';
import { MatProgressBarModule } from '@takkion/material/progress-bar';
import { MatButtonModule } from '@takkion/material/button';
import { MatDividerModule } from '@takkion/material/divider';

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
