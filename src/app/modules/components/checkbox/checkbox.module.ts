import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxRouting } from './checkbox.routing';
import { CheckboxComponent } from './checkbox.component';
import { MatCheckboxModule } from '@takkion/ng-material/checkbox';
import { MatDividerModule } from '@takkion/ng-material/divider';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatFormFieldModule } from '@takkion/ng-material/form-field';
import { MatChipsModule } from '@takkion/ng-material/chips';
import { MatIconModule } from '@takkion/ng-material/icon';

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
