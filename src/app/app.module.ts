import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakSidenavModule } from '@takkion/ng-material/sidenav';
import { TakToolbarModule } from '@takkion/ng-material/toolbar';
import { TakIconModule } from '@takkion/ng-material/icon';
import { TakButtonModule } from '@takkion/ng-material/button';
import { TakFormFieldModule } from '@takkion/ng-material/form-field';
import { TakAutocompleteModule } from '@takkion/ng-material/autocomplete';
import { TakInputModule } from '@takkion/ng-material/input';
import { TakBadgeModule } from '@takkion/ng-material/badge';
import { TakDividerModule } from '@takkion/ng-material/divider';
import { TakBottomSheetModule } from '@takkion/ng-material/bottom-sheet';
import { TakButtonToggleModule } from '@takkion/ng-material/button-toggle';
import { TakCardModule } from '@takkion/ng-material/card';
import { TakProgressBarModule } from '@takkion/ng-material/progress-bar';
import { TakCheckboxModule } from '@takkion/ng-material/checkbox';
import { TakChipsModule } from '@takkion/ng-material/chips';
import { TakDatepickerModule } from '@takkion/ng-material/datepicker';
import { TakNativeDateModule } from '@takkion/ng-material/core';
import { TAK_DATE_LOCALE } from '@takkion/ng-material/core';
import { TakPaginatorIntl } from '@takkion/ng-material/paginator';
import { getSpanishPaginatorIntl } from './translates.paginator';
import { TakDialogModule } from '@takkion/ng-material/dialog';
import { TakListModule } from '@takkion/ng-material/list';
import { TakExpansionModule } from '@takkion/ng-material/expansion';
import { TakGridListModule } from '@takkion/ng-material/grid-list';
import { TakMenuModule } from '@takkion/ng-material/menu';
import { TakRadioModule } from '@takkion/ng-material/radio';
import { TakSlideToggleModule } from '@takkion/ng-material/slide-toggle';
import { TakSliderModule } from '@takkion/ng-material/slider';
import { TakProgressSpinnerModule } from '@takkion/ng-material/progress-spinner';
import { TakRippleModule } from '@takkion/ng-material/core';
import { TakSelectModule } from '@takkion/ng-material/select';
import { TakSnackBarModule } from '@takkion/ng-material/snack-bar';
import { TakStepperModule } from '@takkion/ng-material/stepper';
import { TakTableModule } from '@takkion/ng-material/table';
import { TakPaginatorModule } from '@takkion/ng-material/paginator';
import { TakSortModule } from '@takkion/ng-material/sort';
import { TakTabsModule } from '@takkion/ng-material/tabs';
import { TakTooltipModule } from '@takkion/ng-material/tooltip';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TakTableModule,
    TakPaginatorModule,
    TakTabsModule,
    TakSortModule,
    TakRippleModule,
    TakStepperModule,
    TakSnackBarModule,
    TakInputModule,
    TakCardModule,
    TakSidenavModule,
    TakProgressSpinnerModule,
    TakRadioModule,
    TakSelectModule,
    TakGridListModule,
    TakMenuModule,
    TakCheckboxModule,
    TakSlideToggleModule,
    TakSliderModule,
    TakExpansionModule,
    TakListModule,
    TakDividerModule,
    TakFormFieldModule,
    TakChipsModule,
    TakDatepickerModule,
    TakBottomSheetModule,
    TakButtonToggleModule,
    TakAutocompleteModule,
    TakProgressBarModule,
    TakButtonModule,
    TakToolbarModule,
    TakTooltipModule,
    TakDividerModule,
    TakDialogModule,
    TakIconModule,
    TakBadgeModule,
    TakNativeDateModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: TAK_DATE_LOCALE, useValue: 'es-ES' },
    { provide: TakPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
