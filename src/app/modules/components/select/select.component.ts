import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@takkion/ng-material/snack-bar';
import { TooltipPosition } from '@takkion/ng-material/tooltip';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  public toppings = new FormControl('');
  public toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  public showFiller = false;

  public firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  public secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  public isLinear = false;

  public positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  public position = new FormControl(this.positionOptions[0]);

  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {}

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
