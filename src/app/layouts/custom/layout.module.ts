import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@takkion/material/button';
import { MatIconModule } from '@takkion/material/icon';
import { MatMenuModule } from '@takkion/material/menu';
import { TakOriginLayoutModule } from '@takkion/components/layouts/origin';

@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, FooterComponent],
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, TakOriginLayoutModule],
})
export class AdminLayoutModule {}
