import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TakBoxFormComponent } from './box-form.component';
import { MatCardModule } from '@kato-lee/material/card';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatProgressBarModule } from '@kato-lee/material/progress-bar';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatDividerModule } from '@kato-lee/material/divider';

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
