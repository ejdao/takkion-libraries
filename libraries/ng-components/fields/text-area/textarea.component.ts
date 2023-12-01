import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Optional,
  OnInit,
  Input,
  Self,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TAK_DEFAULT_APPEARANCE_FORM } from '../fields.common';
import { FloatLabelType, TakFormFieldAppearance } from '@takkion/ng-material/form-field';
import { ThemePalette } from '@takkion/ng-material/core';

@Component({
  selector: 'tak-textarea',
  templateUrl: './textarea.component.html',
})
export class TakTextareaComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() autocomplete: 'off' | 'on' = 'off';

  @Input() appearance: TakFormFieldAppearance = TAK_DEFAULT_APPEARANCE_FORM;
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() color: ThemePalette = 'primary';
  @Input() actionIcon = 'search';

  @Input() defaultFilterStyle = true;
  @Input() hasActionButton = false;
  @Input() hasClearButton = false;
  @Input() countCaracters = false;
  @Input() isTextArea = false;
  @Input() placeholder = '';
  @Input() heightInPx = 60;

  @Input() minLength!: number;
  @Input() maxLength!: number;

  @Output() onExecuteAction = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  public _isSubmitted = false;
  public _isInvalid = false;
  public _required = false;
  public _value = '';

  private _subscription!: Subscription;
  private _decrypted = false;

  constructor(
    @Self() @Optional() private _ngControl: NgControl,
    @Optional() private _formGroupDirective: FormGroupDirective,
    private _cd: ChangeDetectorRef
  ) {
    if (_ngControl) this._ngControl.valueAccessor = this;

    if (_formGroupDirective) {
      this._subscription = _formGroupDirective.ngSubmit.subscribe(() => {
        this._isSubmitted = true;
        _cd.markForCheck();
      });
    }
  }

  public ngOnInit(): void {
    const form: any = this.control;

    if (form?._rawValidators) {
      form._rawValidators.forEach((r: any) => {
        if (r.name.includes('required')) this._required = true;
      });
    }
  }

  public writeValue(value: string): void {
    if (value === null) {
      this._isInvalid = false;
    }
    this._value = value;
    this._isSubmitted = false;
    this._cd.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  public onChange(event: any): void {
    this._value = event.target.value;
    this.onChangeFn(event.target.value);
    if (this.control.touched) this._onValidate();
  }

  public onFocusOut(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  private _onValidate(): void {
    if (this.control.invalid) this._isInvalid = true;
    else this._isInvalid = false;
  }

  public onClearControl(): void {
    if (['', null, undefined].indexOf(this.control.value) >= 0) {
      this.control.setValue('', { emitEvent: false });
    } else {
      this.control.setValue('');
    }

    this._value = '';
  }

  public ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

  get control(): FormControl {
    return this._ngControl.control as FormControl;
  }

  get directive(): FormGroupDirective {
    return this._formGroupDirective as FormGroupDirective;
  }

  get decrypted() {
    return this._decrypted;
  }

  get disabled() {
    return this._ngControl.disabled;
  }

  get isSubmitted() {
    return this._isSubmitted;
  }

  get isInvalid() {
    return this._isInvalid;
  }

  get required() {
    return this._required;
  }

  get value() {
    return this._value;
  }
}
