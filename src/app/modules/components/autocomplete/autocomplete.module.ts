import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteRouting } from './autocomplete.routing';
import { MatButtonToggleModule } from '@kato-lee/material/button-toggle';
import { MatAutocompleteModule } from '@kato-lee/material/autocomplete';
import { MatFormFieldModule } from '@kato-lee/material/form-field';
import { MatDividerModule } from '@kato-lee/material/divider';
import { MatButtonModule } from '@kato-lee/material/button';
import { MatInputModule } from '@kato-lee/material/input';
import { MatIconModule } from '@kato-lee/material/icon';

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
