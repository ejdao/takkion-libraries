import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TakLayoutServicesModule } from '../services';
import { AdminLayoutLinkComponent } from './link.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { MatSlideToggleModule } from '@takkion/material/slide-toggle';
import { MatExpansionModule } from '@takkion/material/expansion';
import { MatDividerModule } from '@takkion/material/divider';
import { MatButtonModule } from '@takkion/material/button';
import { MatIconModule } from '@takkion/material/icon';

@NgModule({
  declarations: [AdminLayoutComponent, AdminLayoutLinkComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
    TakLayoutServicesModule,
  ],
  exports: [AdminLayoutComponent],
})
export class TakAdminLayoutModule {}
