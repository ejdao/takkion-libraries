import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressBarRouting } from './progress-bar.routing';
import { ProgressBarComponent } from './progress-bar.component';
import { MatProgressBarModule } from '@takkion/ng-material/progress-bar';
import { MatSliderModule } from '@takkion/ng-material/slider';
import { MatRadioModule } from '@takkion/ng-material/radio';
import { MatCardModule } from '@takkion/ng-material/card';
import { MatProgressSpinnerModule } from '@takkion/ng-material/progress-spinner';
import { MatRippleModule } from '@takkion/ng-material/core';
import { MatInputModule } from '@takkion/ng-material/input';
import { MatFormFieldModule } from '@takkion/ng-material/form-field';
import { MatSlideToggleModule } from '@takkion/ng-material/slide-toggle';
import { MatCheckboxModule } from '@takkion/ng-material/checkbox';

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
