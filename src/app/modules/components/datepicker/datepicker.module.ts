import { NgModule } from '@angular/core';
import { DatepickerRouting } from './datepicker.routing';
import { DatepickerComponent, DialogExampleComponent } from './datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
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
