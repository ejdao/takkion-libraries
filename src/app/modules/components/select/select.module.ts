import { NgModule } from '@angular/core';
import { SelectRouting } from './select.routing';
import { SelectComponent } from './select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@takkion/ng-material/form-field';
import { MatSelectModule } from '@takkion/ng-material/select';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatSidenavModule } from '@takkion/ng-material/sidenav';
import { MatSnackBarModule } from '@takkion/ng-material/snack-bar';
import { MatInputModule } from '@takkion/ng-material/input';
import { MatStepperModule } from '@takkion/ng-material/stepper';
import { MatTabsModule } from '@takkion/ng-material/tabs';
import { MatToolbarModule } from '@takkion/ng-material/toolbar';
import { MatIconModule } from '@takkion/ng-material/icon';
import { MatTooltipModule } from '@takkion/ng-material/tooltip';

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
