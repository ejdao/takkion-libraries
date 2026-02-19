import { NgModule } from '@angular/core';
import { TakkionComponentsRouting } from './takkion-components.routing';
import { TablesComponent } from './tables/tables.component';
import { CardsComponent } from './cards/cards.component';
import { DialogExampleComponent, DialogsComponent } from './dialogs/dialogs.component';
import { PrettyBoxComponent } from './pretty-box/pretty-box.component';
import { TakTablesModule, getSpanishMatPaginatorIntl } from '@kato-lee/components/tables';
import { MatPaginatorIntl } from '@kato-lee/material/paginator';
import { MatIconModule } from '@kato-lee/material/icon';
import { MatButtonModule } from '@kato-lee/material/button';
import { TakPrettyBoxModule } from '@kato-lee/components/pretty-box';
import { TakCardsModule } from '@kato-lee/components/cards';
import { TakDialogModule } from '@kato-lee/components/dialogs';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatInputModule } from '@kato-lee/material/input';
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
