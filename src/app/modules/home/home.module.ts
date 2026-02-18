import { NgModule } from '@angular/core';
import { HomeRouting } from './home.routing';
import { HomeComponent } from './home.component';
import { TakCapsuleModule } from '@kato-lee/components/capsule';
import { TakBoxFormModule } from '@kato-lee/components/box-form';
import { TakFieldsModule } from '@kato-lee/components/fields';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [TakCapsuleModule, TakBoxFormModule, TakFieldsModule, MatButtonModule, HomeRouting],
})
export class HomeModule {}
