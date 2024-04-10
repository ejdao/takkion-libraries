import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { PrettyBoxComponent } from './pretty-box/pretty-box.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cards',
        component: CardsComponent,
        data: { title: 'Cards' },
      },
      {
        path: 'dialogs',
        component: DialogsComponent,
        data: { title: 'Dialogs' },
      },
      {
        path: 'pretty-box',
        component: PrettyBoxComponent,
        data: { title: 'Pretty box' },
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: { title: 'Tables' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakkionComponentsRouting {}
