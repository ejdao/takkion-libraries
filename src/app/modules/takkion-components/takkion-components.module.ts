import { NgModule } from '@angular/core';
import { TakkionComponentsRouting } from './takkion-components.routing';
import { TablesComponent } from './tables/tables.component';
import { CardsComponent } from './cards/cards.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { PrettyBoxComponent } from './pretty-box/pretty-box.component';
import { TakTablesModule, getSpanishMatPaginatorIntl } from '@takkion/components/tables';
import { MatPaginatorIntl } from '@takkion/material/paginator';
import { MatIconModule } from '@takkion/material/icon';
import { MatButtonModule } from '@takkion/material/button';
import { TakPrettyBoxModule } from '@takkion/components/pretty-box';
import { TakCardsModule } from '@takkion/components/cards';

@NgModule({
  declarations: [TablesComponent, CardsComponent, DialogsComponent, PrettyBoxComponent],
  imports: [
    TakTablesModule,
    MatIconModule,
    MatButtonModule,
    TakPrettyBoxModule,
    TakCardsModule,
    TakkionComponentsRouting,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishMatPaginatorIntl() }],
})
export class TakkionComponentsModule {}
