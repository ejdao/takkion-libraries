import { NgModule } from '@angular/core';
import { DatepickerRouting } from './datepicker.routing';
import { DatepickerComponent, DialogExampleComponent } from './datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@takkion/material/datepicker';
import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatButtonModule } from '@takkion/material/button';
import { MatInputModule } from '@takkion/material/input';
import { MatExpansionModule } from '@takkion/material/expansion';
import { MatIconModule } from '@takkion/material/icon';
import { TakDialogModule } from '@takkion/components/dialogs';

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
