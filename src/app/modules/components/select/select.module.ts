import { NgModule } from '@angular/core';
import { SelectRouting } from './select.routing';
import { SelectComponent } from './select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatSelectModule } from '@kato-lee/material/select';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatSidenavModule } from '@kato-lee/material/sidenav';
import { MatSnackBarModule } from '@kato-lee/material/snack-bar';
import { MatInputModule } from '@kato-lee/material/input';
import { MatStepperModule } from '@kato-lee/material/stepper';
import { MatTabsModule } from '@kato-lee/material/tabs';
import { MatToolbarModule } from '@kato-lee/material/toolbar';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatTooltipModule } from '@kato-lee/material/tooltip';

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
