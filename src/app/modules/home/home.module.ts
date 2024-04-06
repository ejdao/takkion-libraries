import { NgModule } from '@angular/core';
import { HomeRouting } from './home.routing';
import { HomeComponent } from './home.component';
import { TakCapsuleModule } from '@takkion/ng-components/capsule';
import { TakBoxFormModule } from '@takkion/ng-components/box-form';
import { TakFieldsModule } from '@takkion/ng-components/fields';
import { MatButtonModule } from '@takkion/ng-material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [TakCapsuleModule, TakBoxFormModule, TakFieldsModule, MatButtonModule, HomeRouting],
})
export class HomeModule {}
