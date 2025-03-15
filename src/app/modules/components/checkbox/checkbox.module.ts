import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxRouting } from './checkbox.routing';
import { CheckboxComponent } from './checkbox.component';
import { MatCheckboxModule } from '@kato-lee/material/checkbox';
import { MatDividerModule } from '@kato-lee/material/divider';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatChipsModule } from '@kato-lee/material/chips';
import { MatIconModule } from '@kato-lee/material/icon';

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
