import { NgModule } from '@angular/core';
import { TakCardModule } from '@takkion/ng-material/card';
import { TakBoxFormComponent } from './box-form.component';
import { TakIconModule } from '@takkion/ng-material/icon';
import { TakProgressBarModule } from '@takkion/ng-material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { TakButtonModule } from '@takkion/ng-material/button';
import { TakDividerModule } from '@takkion/ng-material/divider';

@NgModule({
  declarations: [TakBoxFormComponent],
  imports: [
    TakCardModule,
    ReactiveFormsModule,
    TakIconModule,
    TakButtonModule,
    TakDividerModule,
    TakProgressBarModule,
  ],
  exports: [TakBoxFormComponent],
})
export class TakBoxFormModule {}
