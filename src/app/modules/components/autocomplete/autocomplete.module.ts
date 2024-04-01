import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteRouting } from './autocomplete.routing';
import { MatButtonToggleModule } from '@takkion/ng-material/button-toggle';
import { MatAutocompleteModule } from '@takkion/ng-material/autocomplete';
import { MatFormFieldModule } from '@takkion/ng-material/form-field';
import { MatDividerModule } from '@takkion/ng-material/divider';
import { MatButtonModule } from '@takkion/ng-material/button';
import { MatInputModule } from '@takkion/ng-material/input';
import { MatIconModule } from '@takkion/ng-material/icon';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    AsyncPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    AutocompleteRouting,
  ],
})
export class AutocompleteModule {}
