import { NgModule } from '@angular/core';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatIconModule } from '@takkion/ng-material/icon';
import { TakModalComponent } from './modal.component';
import { MatDialogModule } from '@takkion/ng-material/dialog';
import { MatDividerModule } from '@takkion/ng-material/divider';
import { TakFieldsModule } from '@takkion/ng-components/fields';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TakModalComponent],
  imports: [
    MatButtonModule,
    MatDialogModule,
    TakFieldsModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [TakModalComponent],
})
export class TakModalModule {}
