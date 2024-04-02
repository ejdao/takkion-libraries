import { NgModule } from '@angular/core';
import { FormFieldComponent } from './form-field.component';
import { FormFieldRouting } from './form-field.routing';
import { MatFormFieldModule } from '@takkion/ng-material/form-field';
import { MatIconModule } from '@takkion/ng-material/icon';
import { MatInputModule } from '@takkion/ng-material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@takkion/ng-material/grid-list';
import { MatListModule } from '@takkion/ng-material/list';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatMenuModule } from '@takkion/ng-material/menu';

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
