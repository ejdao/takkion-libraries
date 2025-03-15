import { NgModule } from '@angular/core';
import { BadgeRouting } from './badge.routing';
import { BadgeComponent, BottomSheetExampleComponent } from './badge.component';
import { MatBottomSheetModule } from '@kato-lee/material/bottom-sheet';
import { MatDividerModule } from '@kato-lee/material/divider';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatBadgeModule } from '@kato-lee/material/badge';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatListModule } from '@kato-lee/material/list';
import { MatCardModule } from '@kato-lee/material/card';
import { MatTreeModule } from '@kato-lee/material/tree';

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
