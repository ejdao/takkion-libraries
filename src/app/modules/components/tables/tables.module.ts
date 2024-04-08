import { NgModule } from '@angular/core';
import { TablesRouting } from './tables.routing';
import { TablesComponent } from './tables.component';
import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatPaginatorModule } from '@takkion/material/paginator';
import { MatInputModule } from '@takkion/material/input';
import { MatTableModule } from '@takkion/material/table';
import { MatSortModule } from '@takkion/material/sort';

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
