import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatMenuModule } from '@kato-lee/material/menu';
import { TakOriginLayoutModule } from '@kato-lee/components/layouts/origin';

@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, FooterComponent],
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, TakOriginLayoutModule],
})
export class AdminLayoutModule {}
