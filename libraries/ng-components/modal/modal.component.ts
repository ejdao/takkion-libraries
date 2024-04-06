import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@takkion/ng-material/dialog';
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
  private _hasTextArea = false;
  private _textAreaLabel = '';
  private _textAreaLength = 500;

  public textArea = '';

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
    this._hasTextArea = this.data.options?.hasTextArea || false;
    this._textAreaLabel = this.data.options?.textAreaLabel || 'Observaciones';
    this._textAreaLength = this.data.options?.textAreaLength || 500;
  }

  public onConfirm(): void {
    this._dialogRef.close({ success: true, textArea: this.textArea });
  }

  public onClose(): void {
    this._dialogRef.close({ success: false, textArea: this.textArea });
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

  get textAreaLabel(): string {
    return this._textAreaLabel;
  }

  get textAreaLength(): number {
    return this._textAreaLength;
  }

  get hasTopCloseButton(): boolean {
    return this._hasTopCloseButton;
  }

  get hasTextArea(): boolean {
    return this._hasTextArea;
  }
}
