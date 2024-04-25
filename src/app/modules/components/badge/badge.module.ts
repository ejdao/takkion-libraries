import { NgModule } from '@angular/core';
import { BadgeRouting } from './badge.routing';
import { BadgeComponent, BottomSheetExampleComponent } from './badge.component';
import { MatBottomSheetModule } from '@takkion/material/bottom-sheet';
import { MatDividerModule } from '@takkion/material/divider';
import { MatButtonModule } from '@takkion/material/button';
import { MatBadgeModule } from '@takkion/material/badge';
import { MatIconModule } from '@takkion/material/icon';
import { MatListModule } from '@takkion/material/list';
import { MatCardModule } from '@takkion/material/card';
import { MatTreeModule } from '@takkion/material/tree';

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
    MatBottomSheetModule,
    BadgeRouting,
  ],
})
export class BadgeModule {}
