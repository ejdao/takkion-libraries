import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@kato-lee/material/paginator';
import { MatSortModule } from '@kato-lee/material/sort';
import { MatTableModule } from '@kato-lee/material/table';

const modules = [MatTableModule, MatSortModule, MatPaginatorModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class TakTablesModule {}
