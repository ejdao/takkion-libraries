import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@takkion/material/dialog';
import { TakModalConfig, TakModalType } from './config';

@Component({
  selector: 'tak-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TakModalComponent implements OnInit {
  private _isAlert = false;

  private _confirmButton = '';
  private _deniedButton = '';
  private _okButton = '';
  private _hasTopCloseButton = true;

  constructor(
    href: ElementRef<HTMLElement>,
    private _dialogRef: MatDialogRef<TakModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { content: string; title: string; options?: TakModalConfig; type: TakModalType }
  ) {
    href.nativeElement.classList.add('tak-modal');
  }

  public ngOnInit(): void {
    if (this.data.type === 'alert') this._isAlert = true;
    else this._isAlert = false;

    this._confirmButton = this.data.options?.confirmButton || 'SI';
    this._deniedButton = this.data.options?.deniedButton || 'NO';
    this._okButton = this.data.options?.okButton || 'OK';
    this._hasTopCloseButton = this.data.options?.hasTopCloseButton || true;
  }

  public onConfirm(): void {
    this._dialogRef.close(true);
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onCloseFromButton(): void {
    this._dialogRef.close(undefined);
  }

  get isAlert(): boolean {
    return this._isAlert;
  }

  get confirmButton(): string {
    return this._confirmButton;
  }

  get deniedButton(): string {
    return this._deniedButton;
  }

  get okButton(): string {
    return this._okButton;
  }

  get hasTopCloseButton(): boolean {
    return this._hasTopCloseButton;
  }
}
