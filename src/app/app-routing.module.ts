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
          {
            path: 'checkbox',
            loadChildren: () => import('./modules/components').then(m => m.CheckboxModule),
          },
          {
            path: 'datepicker',
            loadChildren: () => import('./modules/components').then(m => m.DatepickerModule),
          },
          {
            path: 'form-field',
            loadChildren: () => import('./modules/components').then(m => m.FormFieldModule),
          },
          {
            path: 'progress-bar',
            loadChildren: () => import('./modules/components').then(m => m.ProgressBarModule),
          },
          {
            path: 'tables',
            loadChildren: () => import('./modules/components').then(m => m.TablesModule),
          },
          {
            path: 'select',
            loadChildren: () => import('./modules/components').then(m => m.SelectModule),
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
