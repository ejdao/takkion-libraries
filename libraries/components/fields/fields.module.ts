import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatSelectModule } from '@takkion/material/select';
import { MatButtonModule } from '@takkion/material/button';
import { MatNativeDateModule, MatOptionModule } from '@takkion/material/core';
import { MatInputModule } from '@takkion/material/input';
import { MatIconModule } from '@takkion/material/icon';
import { MatDatepickerModule } from '@takkion/material/datepicker';
import { MatTooltipModule } from '@takkion/material/tooltip';

import { TakSelectFieldComponent } from './select-field/select-field.component';
import { TakDateFieldComponent } from './date-field/date-field.component';

import { TakAutocompleteFieldComponent } from './autocomplete-field/autocomplete-field.component';
import { MatAutocompleteModule } from '@takkion/material/autocomplete';
import { TakErrorModule } from './error/error.module';
import { TakDateRangeFieldComponent } from './date-range-field/date-range-field.component';
import { TakMoneyFieldComponent } from './money-field/money-field.component';
import { TakGeneralFieldComponent } from './general-field/general-field.component';
import { MatProgressSpinnerModule } from '@takkion/material/progress-spinner';
import { TakNumberFieldComponent } from './number-field/number-field.component';
import { TakTextareaComponent } from './text-area/textarea.component';
import { MatMenuModule } from '@takkion/material/menu';

const components = [
  TakSelectFieldComponent,
  TakDateFieldComponent,
  TakAutocompleteFieldComponent,
  TakDateRangeFieldComponent,
  TakGeneralFieldComponent,
  TakMoneyFieldComponent,
  TakTextareaComponent,
  TakNumberFieldComponent,
];

@NgModule({
  declarations: components,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    TakErrorModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  exports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatNativeDateModule,
    ...components,
  ],
})
export class TakFieldsModule {}
