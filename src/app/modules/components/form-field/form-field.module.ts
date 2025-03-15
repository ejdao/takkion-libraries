import { NgModule } from '@angular/core';
import { FormFieldComponent } from './form-field.component';
import { FormFieldRouting } from './form-field.routing';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatInputModule } from '@kato-lee/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@kato-lee/material/grid-list';
import { MatListModule } from '@kato-lee/material/list';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatMenuModule } from '@kato-lee/material/menu';

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
