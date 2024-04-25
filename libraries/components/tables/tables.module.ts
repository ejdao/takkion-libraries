import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@takkion/material/paginator';
import { MatSortModule } from '@takkion/material/sort';
import { MatTableModule } from '@takkion/material/table';

const modules = [MatTableModule, MatSortModule, MatPaginatorModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class TakTablesModule {}
