import { NgModule } from '@angular/core';
import { FormFieldComponent } from './form-field.component';
import { FormFieldRouting } from './form-field.routing';
import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatIconModule } from '@takkion/material/icon';
import { MatInputModule } from '@takkion/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@takkion/material/grid-list';
import { MatListModule } from '@takkion/material/list';
import { MatButtonModule } from '@takkion/material/button';
import { MatMenuModule } from '@takkion/material/menu';

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
