import { NgModule } from '@angular/core';
import { DatepickerRouting } from './datepicker.routing';
import { DatepickerComponent, DialogExampleComponent } from './datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@kato-lee/material/datepicker';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatInputModule } from '@kato-lee/material/input';
import { MatExpansionModule } from '@kato-lee/material/expansion';
import { MatIconModule } from '@kato-lee/material/icon';
import { TakDialogModule } from '@kato-lee/components/dialogs';

@NgModule({
  declarations: [DatepickerComponent, DialogExampleComponent],
  imports: [
    TakDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    DatepickerRouting,
    MatExpansionModule,
    MatIconModule,
  ],
})
export class DatepickerModule {}
