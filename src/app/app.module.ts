import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './app.preloading';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddTokenInterceptor } from './interceptors/add-token';
import { AdminLayoutModule } from './layouts/custom/layout.module';
import { MatSnackBarModule } from '@takkion/ng-material/snack-bar';
import { MatDialogModule } from '@takkion/ng-material/dialog';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@takkion/ng-material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([], {
      preloadingStrategy: CustomPreloadingStrategy,
      scrollPositionRestoration: 'enabled',
    }),
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    MatNativeDateModule,
    AdminLayoutModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
