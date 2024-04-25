import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogsComponent {
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
  name = 'Enrique';

  constructor(
    public dialog: MatDialog,
    private _cd: ChangeDetectorRef
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.animal = `${result}`;
      this._cd.markForCheck();
    });
  }
}

@Component({
  selector: 'app-dialog-example-2',
  templateUrl: './dialog-example.html',
})
export class DialogExampleComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onNoClick(): void {
    this.dialogRef.close(false);
  }
  public onClick(): void {
    this.dialogRef.close(true);
  }
}
