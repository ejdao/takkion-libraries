import { NgModule } from '@angular/core';
import { TakButtonModule } from '@takkion/ng-material/button';
import { TakIconModule } from '@takkion/ng-material/icon';
import { TakModalComponent } from './modal.component';
import { TakDialogModule } from '@takkion/ng-material/dialog';
import { TakDividerModule } from '@takkion/ng-material/divider';
import { TakFieldsModule } from '@takkion/ng-components/fields';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TakModalComponent],
  imports: [
    TakButtonModule,
    TakDialogModule,
    TakFieldsModule,
    TakDividerModule,
    FormsModule,
    TakIconModule,
  ],
  exports: [TakModalComponent],
})
export class TakModalModule {}
