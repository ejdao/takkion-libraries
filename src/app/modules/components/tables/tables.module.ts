import { NgModule } from '@angular/core';
import { TablesRouting } from './tables.routing';
import { TablesComponent } from './tables.component';
import { MatFormFieldModule } from '@takkion/ng-material/form-field';
import { MatPaginatorModule } from '@takkion/ng-material/paginator';
import { MatInputModule } from '@takkion/ng-material/input';
import { MatTableModule } from '@takkion/ng-material/table';
import { MatSortModule } from '@takkion/ng-material/sort';

@NgModule({
  declarations: [TablesComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TablesRouting,
  ],
})
export class TablesModule {}
