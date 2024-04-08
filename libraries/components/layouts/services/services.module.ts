import { NgModule } from '@angular/core';
import { RoutePartsService } from './route-parts.service';
import { ValidateAccessPipe } from './validate-access.pipe';

@NgModule({
  declarations: [ValidateAccessPipe],
  providers: [RoutePartsService],
})
export class TakLayoutServicesModule {}
