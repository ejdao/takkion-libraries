import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatIconModule } from '@takkion/ng-material/icon';
import { MatMenuModule } from '@takkion/ng-material/menu';
import { TakAdminLayoutModule } from '@takkion/ng-components/layouts/admin';

@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, FooterComponent],
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, TakAdminLayoutModule],
})
export class AdminLayoutModule {}
