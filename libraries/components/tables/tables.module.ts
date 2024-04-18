import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

const modules = [MatTableModule, MatSortModule, MatPaginatorModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class TakTablesModule {}
