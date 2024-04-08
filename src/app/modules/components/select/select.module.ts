import { NgModule } from '@angular/core';
import { SelectRouting } from './select.routing';
import { SelectComponent } from './select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatSelectModule } from '@takkion/material/select';
import { MatButtonModule } from '@takkion/material/button';
import { MatSidenavModule } from '@takkion/material/sidenav';
import { MatSnackBarModule } from '@takkion/material/snack-bar';
import { MatInputModule } from '@takkion/material/input';
import { MatStepperModule } from '@takkion/material/stepper';
import { MatTabsModule } from '@takkion/material/tabs';
import { MatToolbarModule } from '@takkion/material/toolbar';
import { MatIconModule } from '@takkion/material/icon';
import { MatTooltipModule } from '@takkion/material/tooltip';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatStepperModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    SelectRouting,
  ],
})
export class SelectModule {}
