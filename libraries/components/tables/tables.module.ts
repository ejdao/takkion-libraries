import { NgModule } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@kato-lee/material/paginator';
import { MatSortModule } from '@kato-lee/material/sort';
import { MatTableModule } from '@kato-lee/material/table';
import { getSpanishMatPaginatorIntl } from './mat-paginator.translation';
import { TakTableNoRecordsComponent } from './no-records.component';

const modules = [MatTableModule, MatSortModule, MatPaginatorModule, TakTableNoRecordsComponent];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishMatPaginatorIntl() }],
})
export class TakTablesModule {}
