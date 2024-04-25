import { ElementRef, Component, ViewChild, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'tak-error',
  templateUrl: './error.component.html',
})
export class TakErrorComponent {
  @ViewChild('error') error: ElementRef | undefined;

  @Input() control!: FormControl;

  @Input() start!: FormControl;

  @Input() end!: FormControl;

  @Input() isDateField: boolean = false;

  @Input() isNumberField: boolean = false;

  @Input() marginTop = -20;

  public hasPatternError: boolean = false;

  get required(): ValidationErrors {
    return this.control?.errors?.['required'];
  }

  get pattern(): ValidationErrors {
    return this.control?.errors?.['pattern'];
  }

  get max() {
    return this.control?.errors?.['max'];
  }

  get min() {
    return this.control?.errors?.['min'];
  }

  get maxlength() {
    return this.control?.errors?.['maxlength'];
  }

  get minlength() {
    return this.control?.errors?.['minlength'];
  }

  get email(): ValidationErrors {
    return this.control?.errors?.['email'];
  }
}
