import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TakModal } from '@takkion/ng-components/modal';
import { TakToast, TakToastType } from '@takkion/ng-components/toast';
import { FieldsForm, PRODUCTOS } from './fields.form';
import { TakAutocompleteFieldComponent } from '@takkion/ng-components/fields';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime, firstValueFrom, map, distinctUntilChanged, takeUntil } from 'rxjs';

export interface ProductoResponse {
  id: number;
  clase: {
    code: number;
    forHumans: string;
  };
  codigo: string;
  descripcion: string;
  precioSugerido: number;
  nombreCompleto: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  @ViewChild('autocomplete') autocomplete!: TakAutocompleteFieldComponent;

  isLoading = false;

  fieldsForm = new FieldsForm();
  private _unsubscribe$ = new Subject<void>();
  public suggestions = PRODUCTOS;
  nowDate = new Date();
  endDate = new Date(new Date().getTime() + 432000000);

  enable = true;

  constructor(
    private _cd: ChangeDetectorRef,
    private _toast: TakToast,
    private _modal: TakModal,
    private _http: HttpClient
  ) {}

  toggleEnable() {
    if (this.enable) this.fieldsForm.enableAll();
    else this.fieldsForm.disableAll();
  }

  ngOnInit(): void {
    /*  setTimeout(() => {
      this.autocomplete.onUpdateSuggestions(PRODUCTOS);
    }, 100); */
  }

  onSubmit() {
    this.isLoading = true;
    // setTimeout(() => {
    this.isLoading = false;
    console.log(this.fieldsForm.model);
    this._toast.notification('Submitted correctly!');
    this._cd.markForCheck();
    //}, 500);
  }

  onSelect(event: any) {
    console.log(event);
  }

  onQuery(event: any) {
    console.log(event);
  }

  onBack() {
    this._toast.notification('back to previous component');
  }

  openToast(message: string, type: TakToastType) {
    type === 'notification'
      ? this._toast.notification(message, { verticalPosition: 'top' })
      : type === 'danger'
      ? this._toast.danger(message, { horizontalPosition: 'end' })
      : this._toast.success(message, { horizontalPosition: 'left' });
  }

  openModal() {
    this._modal.confirm('Desea cerrar esta sesión?', 'Seguro?').subscribe(el => {
      console.log(el);
    });
  }

  async onChange(el: any) {
    this.isLoading = true;
    try {
      const values = await this.execute(el);

      values.map(el => {
        el.nombreCompleto = `${el.codigo} - ${el.descripcion}`;
      });

      this.autocomplete.onUpdateSuggestions(values);
    } catch (error: any) {
      this._toast.danger(error.error.message);
    }

    this.isLoading = false;
    this._cd.markForCheck();
  }

  public execute(pattern: string): Promise<ProductoResponse[]> {
    return firstValueFrom(
      this._http.get<any[]>(`https://eklipse.grupoclinicamedicos.com:4000/v10/inn/ctc/productos`, {
        params: {
          tipos: [0],
          pattern,
          context: 'ALTACENTRO',
        },
      })
    );
  }
}
