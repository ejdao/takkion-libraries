import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteComponent {
  public myControl1 = new FormControl('');
  public myControl2 = new FormControl('');
  public myControl3 = new FormControl('');

  public filteredOptions1!: Observable<string[]>;
  public filteredOptions2!: Observable<string[]>;
  public filteredOptions3!: Observable<string[]>;

  public options: string[] = ['One', 'Two', 'Three'];

  constructor(href: ElementRef<HTMLElement>) {
    href.nativeElement.classList.add('app-autocomplete');
  }

  public ngOnInit() {
    this.filteredOptions1 = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
