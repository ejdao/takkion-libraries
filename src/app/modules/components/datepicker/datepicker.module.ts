import { NgModule } from '@angular/core';
import { DatepickerRouting } from './datepicker.routing';
import { DatepickerComponent, DialogExampleComponent } from './datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@takkion/ng-material/datepicker';
import { MatFormFieldModule } from '@takkion/ng-material/form-field';
import { MatButtonModule } from '@takkion/ng-material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@takkion/ng-material/dialog';
import { MatInputModule } from '@takkion/ng-material/input';
import { MatExpansionModule } from '@takkion/ng-material/expansion';
import { MatIconModule } from '@takkion/ng-material/icon';

@NgModule({
  declarations: [DatepickerComponent, DialogExampleComponent],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    DatepickerRouting,
    MatExpansionModule,
    MatIconModule,
  ],
})
export class DatepickerModule {}
