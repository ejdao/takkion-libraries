import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@takkion/ng-material/dialog';
import { MatAccordion } from '@takkion/ng-material/expansion';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  animal!: string;
  name!: string;

  constructor(
    public dialog: MatDialog,
    private _cd: ChangeDetectorRef
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      this._cd.markForCheck();
    });
  }
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.html',
})
export class DialogExampleComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
