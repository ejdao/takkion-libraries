import { NgModule } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@kato-lee/material/paginator';
import { MatSortModule } from '@kato-lee/material/sort';
import { MatTableModule } from '@kato-lee/material/table';
import { getSpanishMatPaginatorIntl } from './mat-paginator.translation';

const modules = [MatTableModule, MatSortModule, MatPaginatorModule];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishMatPaginatorIntl() }],
})
export class TakTablesModule {}
