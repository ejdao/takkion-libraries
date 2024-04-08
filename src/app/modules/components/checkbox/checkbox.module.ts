import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxRouting } from './checkbox.routing';
import { CheckboxComponent } from './checkbox.component';
import { MatCheckboxModule } from '@takkion/material/checkbox';
import { MatDividerModule } from '@takkion/material/divider';
import { MatButtonModule } from '@takkion/material/button';
import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatChipsModule } from '@takkion/material/chips';
import { MatIconModule } from '@takkion/material/icon';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    CheckboxRouting,
  ],
})
export class CheckboxModule {}
