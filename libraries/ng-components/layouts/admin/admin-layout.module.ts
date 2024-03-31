import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { MatSlideToggleModule } from '@takkion/ng-material/slide-toggle';
import { MatExpansionModule } from '@takkion/ng-material/expansion';
import { MatDividerModule } from '@takkion/ng-material/divider';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatIconModule } from '@takkion/ng-material/icon';
import { AdminLayoutLinkComponent } from './link.component';

@NgModule({
  declarations: [AdminLayoutComponent, AdminLayoutLinkComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  exports: [AdminLayoutComponent],
})
export class TakAdminLayoutModule {}
