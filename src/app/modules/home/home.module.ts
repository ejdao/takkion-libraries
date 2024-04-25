import { NgModule } from '@angular/core';
import { HomeRouting } from './home.routing';
import { HomeComponent } from './home.component';
import { TakCapsuleModule } from '@takkion/components/capsule';
import { TakBoxFormModule } from '@takkion/components/box-form';
import { TakFieldsModule } from '@takkion/components/fields';
import { MatButtonModule } from '@takkion/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [TakCapsuleModule, TakBoxFormModule, TakFieldsModule, MatButtonModule, HomeRouting],
})
export class HomeModule {}
