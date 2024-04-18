import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TakOriginLayoutModule } from '@takkion/components/layouts/origin';

@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, FooterComponent],
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, TakOriginLayoutModule],
})
export class AdminLayoutModule {}
