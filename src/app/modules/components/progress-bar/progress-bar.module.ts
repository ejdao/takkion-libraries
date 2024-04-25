import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressBarRouting } from './progress-bar.routing';
import { ProgressBarComponent } from './progress-bar.component';
import { MatProgressBarModule } from '@takkion/material/progress-bar';
import { MatSliderModule } from '@takkion/material/slider';
import { MatRadioModule } from '@takkion/material/radio';
import { MatCardModule } from '@takkion/material/card';
import { MatProgressSpinnerModule } from '@takkion/material/progress-spinner';
import { MatRippleModule } from '@takkion/material/core';
import { MatInputModule } from '@takkion/material/input';
import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatSlideToggleModule } from '@takkion/material/slide-toggle';
import { MatCheckboxModule } from '@takkion/material/checkbox';

@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    ProgressBarRouting,
  ],
})
export class ProgressBarModule {}
