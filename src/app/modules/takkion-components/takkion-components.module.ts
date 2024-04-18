import { NgModule } from '@angular/core';
import { TakkionComponentsRouting } from './takkion-components.routing';
import { TablesComponent } from './tables/tables.component';
import { CardsComponent } from './cards/cards.component';
import { DialogExampleComponent, DialogsComponent } from './dialogs/dialogs.component';
import { PrettyBoxComponent } from './pretty-box/pretty-box.component';
import { TakTablesModule, getSpanishMatPaginatorIntl } from '@takkion/components/tables';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TakPrettyBoxModule } from '@takkion/components/pretty-box';
import { TakCardsModule } from '@takkion/components/cards';
import { TakDialogModule } from '@takkion/components/dialogs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TablesComponent,
    CardsComponent,
    DialogsComponent,
    PrettyBoxComponent,
    DialogExampleComponent,
  ],
  imports: [
    TakTablesModule,
    MatIconModule,
    MatButtonModule,
    TakPrettyBoxModule,
    TakCardsModule,
    TakDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    TakkionComponentsRouting,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishMatPaginatorIntl() }],
})
export class TakkionComponentsModule {}
