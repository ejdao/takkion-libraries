import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TakBoxFormComponent } from './box-form.component';
import { MatCardModule } from '@takkion/ng-material/card';
import { MatIconModule } from '@takkion/ng-material/icon';
import { MatProgressBarModule } from '@takkion/ng-material/progress-bar';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatDividerModule } from '@takkion/ng-material/divider';

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
