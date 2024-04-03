import { NgModule } from '@angular/core';
import { BadgeRouting } from './badge.routing';
import { BadgeComponent, BottomSheetExampleComponent } from './badge.component';
import { MatDividerModule } from '@takkion/ng-material/divider';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatBadgeModule } from '@takkion/ng-material/badge';
import { MatIconModule } from '@takkion/ng-material/icon';
import { MatListModule } from '@takkion/ng-material/list';
import { MatCardModule } from '@takkion/ng-material/card';
import { MatTreeModule } from '@takkion/ng-material/tree';

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
