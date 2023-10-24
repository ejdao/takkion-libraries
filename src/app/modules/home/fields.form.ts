import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Producto {
  constructor(
    private _id: number,
    private _descripcion: string,
    private _precio: number
  ) {}

  get id(): number {
    return this._id;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  get precio(): number {
    return this._precio;
  }
}

export const PRODUCTOS = [
  new Producto(1, 'patilla', 10000),
  new Producto(2, 'melon', 20000),
  new Producto(3, 'sandia', 30000),
  new Producto(4, 'pera', 40000),
  new Producto(5, 'zapote', 50000),
  new Producto(6, 'mamon', 60000),
  new Producto(7, 'banano', 70000),
  new Producto(8, 'uva', 80000),
  new Producto(9, 'mora', 90000),
  new Producto(10, 'mango', 100000),
];

export class FieldsForm extends FormGroup {
  constructor() {
    super({
      text: new FormControl({ value: 'null', disabled: true }),
      textarea: new FormControl({ value: 'null', disabled: true }),
      filter: new FormControl({ value: 'null', disabled: true }),
      number: new FormControl({ value: 999, disabled: true }),
      select: new FormControl({ value: null, disabled: false }, [Validators.required]),
      money: new FormControl({ value: 3000, disabled: true }),
      date: new FormControl({ value: new Date(), disabled: true }),
      start: new FormControl({ value: new Date(), disabled: true }),
      end: new FormControl({ value: new Date(), disabled: true }),
      query: new FormControl({ value: 'null', disabled: true }),
      autocomplete: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }

  public get text(): FormControl {
    return this.get('text') as FormControl;
  }
  public get textarea(): FormControl {
    return this.get('textarea') as FormControl;
  }
  public get filter(): FormControl {
    return this.get('filter') as FormControl;
  }

  public get number(): FormControl {
    return this.get('number') as FormControl;
  }

  public get select(): FormControl {
    return this.get('select') as FormControl;
  }

  public get money(): FormControl {
    return this.get('money') as FormControl;
  }

  public get date(): FormControl {
    return this.get('date') as FormControl;
  }

  public get start(): FormControl {
    return this.get('start') as FormControl;
  }

  public get end(): FormControl {
    return this.get('end') as FormControl;
  }

  public get autocomplete(): FormControl {
    return this.get('autocomplete') as FormControl;
  }

  public enableAll() {
    this.text.enable();
    this.textarea.enable();
    this.filter.enable();
    this.number.enable();
    this.select.enable();
    this.money.enable();
    this.date.enable();
    this.start.enable();
    this.end.enable();
    this.autocomplete.enable();
  }

  public disableAll() {
    this.text.disable();
    this.textarea.disable();
    this.filter.disable();
    this.number.disable();
    this.select.disable();
    this.money.disable();
    this.date.disable();
    this.start.disable();
    this.end.disable();
    this.autocomplete.disable();
  }

  public get model() {
    return {
      text: this.text.value,
      textarea: this.textarea.value,
      filter: this.filter.value,
      number: this.number.value,
      select: this.select.value,
      money: this.money.value,
      date: this.date.value,
      start: this.start.value,
      end: this.end.value,
      autocomplete: this.autocomplete.value,
    };
  }
}
