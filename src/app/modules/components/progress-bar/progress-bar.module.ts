import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressBarRouting } from './progress-bar.routing';
import { ProgressBarComponent } from './progress-bar.component';
import { MatProgressBarModule } from '@kato-lee/material/progress-bar';
import { MatSliderModule } from '@kato-lee/material/slider';
import { MatRadioModule } from '@kato-lee/material/radio';
import { MatCardModule } from '@kato-lee/material/card';
import { MatProgressSpinnerModule } from '@kato-lee/material/progress-spinner';
import { MatRippleModule } from '@kato-lee/material/core';
import { MatInputModule } from '@kato-lee/material/input';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatSlideToggleModule } from '@kato-lee/material/slide-toggle';
import { MatCheckboxModule } from '@kato-lee/material/checkbox';

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
