import { NgModule } from '@angular/core';
import { TablesRouting } from './tables.routing';
import { TablesComponent } from './tables.component';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatPaginatorModule } from '@kato-lee/material/paginator';
import { MatInputModule } from '@kato-lee/material/input';
import { MatTableModule } from '@kato-lee/material/table';
import { MatSortModule } from '@kato-lee/material/sort';

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
