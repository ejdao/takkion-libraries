import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 22, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 25, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 31, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 32, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 33, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 34, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 35, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 36, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 37, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 38, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 39, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 40, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 41, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 42, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 43, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 44, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 45, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 46, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 47, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 48, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 49, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 50, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablesComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  expandedElement!: PeriodicElement | null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this._instanceDataSource();
  }

  private _instanceDataSource(): void {
    this.paginator.pageIndex = 0;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
