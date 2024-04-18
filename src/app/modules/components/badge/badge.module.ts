import { NgModule } from '@angular/core';
import { BadgeRouting } from './badge.routing';
import { BadgeComponent, BottomSheetExampleComponent } from './badge.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [BadgeComponent, BottomSheetExampleComponent],
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatTreeModule,
    BadgeRouting,
  ],
})
export class BadgeModule {}
