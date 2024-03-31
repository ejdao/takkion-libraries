import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { MatSlideToggleModule } from '@takkion/ng-material/slide-toggle';
import { MatDividerModule } from '@takkion/ng-material/divider';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatIconModule } from '@takkion/ng-material/icon';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [MatButtonModule, MatIconModule, MatSlideToggleModule, MatDividerModule],
  exports: [AdminLayoutComponent],
})
export class TakAdminLayoutModule {}
