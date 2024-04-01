import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/custom/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'components',
        children: [
          {
            path: 'autocomplete',
            loadChildren: () => import('./modules/components').then(m => m.AutocompleteModule),
          },
          {
            path: 'badge',
            loadChildren: () => import('./modules/components').then(m => m.BadgeModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
