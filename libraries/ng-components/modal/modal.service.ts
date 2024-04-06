import { Injectable } from '@angular/core';
import { MatDialog } from '@takkion/ng-material/dialog';
import { TakModalComponent } from './modal.component';
import { TakModalConfig, TakModalType } from './config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TakModal {
  constructor(private dialog: MatDialog) {}

  public alert(
    content: string,
    title: string = '',
    options?: TakModalConfig
  ): Observable<{ success: boolean; textArea: string }> {
    return this._generateDialog(content, title, 'alert', options);
  }

  public confirm(
    content: string,
    title: string = '',
    options?: TakModalConfig
  ): Observable<{ success: boolean; textArea: string }> {
    return this._generateDialog(content, title, 'confirm', options);
  }

  private _generateDialog(
    content: string,
    title: string,
    type: TakModalType,
    options?: TakModalConfig
  ) {
    if (options && !options.textAreaLabel) options.textAreaLabel = 'Observaciones';
    if (options && !options.textAreaLength) options.textAreaLength = 500;

    const dialog = this.dialog.open(TakModalComponent, {
      data: {
        content,
        title,
        options,
        type,
      },
    });
    return dialog.afterClosed();
  }
}
