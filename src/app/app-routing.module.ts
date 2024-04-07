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
            data: { title: 'Autocomplete' },
          },
          {
            path: 'badge',
            loadChildren: () => import('./modules/components').then(m => m.BadgeModule),
            data: { title: 'Badge' },
          },
          {
            path: 'checkbox',
            loadChildren: () => import('./modules/components').then(m => m.CheckboxModule),
            data: { title: 'Checkbox' },
          },
          {
            path: 'datepicker',
            loadChildren: () => import('./modules/components').then(m => m.DatepickerModule),
            data: { title: 'Datepicker' },
          },
          {
            path: 'form-field',
            loadChildren: () => import('./modules/components').then(m => m.FormFieldModule),
            data: { title: 'Form field' },
          },
          {
            path: 'progress-bar',
            loadChildren: () => import('./modules/components').then(m => m.ProgressBarModule),
            data: { title: 'Progress bar' },
          },
          {
            path: 'tables',
            loadChildren: () => import('./modules/components').then(m => m.TablesModule),
            data: { title: 'Tables' },
          },
          {
            path: 'select',
            loadChildren: () => import('./modules/components').then(m => m.SelectModule),
            data: { title: 'Select' },
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
