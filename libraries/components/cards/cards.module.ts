import { NgModule } from '@angular/core';
import { TakSimpleCardComponent } from './simple-card.component';

const components = [TakSimpleCardComponent];

@NgModule({
  declarations: components,
  exports: components,
})
export class TakCardsModule {}
