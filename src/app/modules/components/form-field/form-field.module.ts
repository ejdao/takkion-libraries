import { NgModule } from '@angular/core';
import { FormFieldComponent } from './form-field.component';
import { FormFieldRouting } from './form-field.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [FormFieldComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    FormFieldRouting,
  ],
})
export class FormFieldModule {}
