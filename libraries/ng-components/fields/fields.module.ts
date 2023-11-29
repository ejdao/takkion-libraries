import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TakFormFieldModule } from '@takkion/ng-material/form-field';
import { TakSelectModule } from '@takkion/ng-material/select';
import { TakButtonModule } from '@takkion/ng-material/button';
import { TakNativeDateModule, TakOptionModule } from '@takkion/ng-material/core';
import { TakInputModule } from '@takkion/ng-material/input';
import { TakIconModule } from '@takkion/ng-material/icon';
import { TakDatepickerModule } from '@takkion/ng-material/datepicker';

import { TakSelectFieldComponent } from './select-field/select-field.component';
import { TakDateFieldComponent } from './date-field/date-field.component';

import { TakAutocompleteFieldComponent } from './autocomplete-field/autocomplete-field.component';
import { TakAutocompleteModule } from '@takkion/ng-material/autocomplete';
import { TakErrorModule } from './error/error.module';
import { TakDateRangeFieldComponent } from './date-range-field/date-range-field.component';
import { TakMoneyFieldComponent } from './money-field/money-field.component';
import { TakGeneralFieldComponent } from './general-field/general-field.component';
import { TakProgressSpinnerModule } from '@takkion/ng-material/progress-spinner';
import { TakNumberFieldComponent } from './number-field/number-field.component';
import { TakTextareaComponent } from './text-area/textarea.component';

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
    TakProgressSpinnerModule,
    TakFormFieldModule,
    TakButtonModule,
    TakDatepickerModule,
    TakAutocompleteModule,
    TakErrorModule,
    TakIconModule,
    TakInputModule,
    TakOptionModule,
    TakSelectModule,
  ],
  exports: [
    ReactiveFormsModule,
    TakAutocompleteModule,
    FormsModule,
    TakNativeDateModule,
    ...components,
  ],
})
export class TakFieldsModule {}
