import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteRouting } from './autocomplete.routing';
import { MatButtonToggleModule } from '@takkion/material/button-toggle';
import { MatAutocompleteModule } from '@takkion/material/autocomplete';
import { MatFormFieldModule } from '@takkion/material/form-field';
import { MatDividerModule } from '@takkion/material/divider';
import { MatButtonModule } from '@takkion/material/button';
import { MatInputModule } from '@takkion/material/input';
import { MatIconModule } from '@takkion/material/icon';

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
