import { NgModule } from '@angular/core';
import { TakkionComponentsRouting } from './takkion-components.routing';
import { TablesComponent } from './tables/tables.component';
import { CardsComponent } from './cards/cards.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { PrettyBoxComponent } from './pretty-box/pretty-box.component';
import { TakTablesModule, getSpanishMatPaginatorIntl } from '@takkion/components/tables';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TakPrettyBoxModule } from '@takkion/components/pretty-box';

@NgModule({
  declarations: [TablesComponent, CardsComponent, DialogsComponent, PrettyBoxComponent],
  imports: [
    TakTablesModule,
    MatIconModule,
    MatButtonModule,
    TakPrettyBoxModule,
    TakkionComponentsRouting,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishMatPaginatorIntl() }],
})
export class TakkionComponentsModule {}
