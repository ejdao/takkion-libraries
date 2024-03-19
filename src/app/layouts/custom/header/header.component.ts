import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TakModal } from '@takkion/ng-components/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private _modal: TakModal) {}

  public toggleTheme(): void {
    document.getElementsByTagName('body')[0].classList.toggle('tak-dark-theme');

    if (document.body.classList.contains('tak-dark-theme')) {
      localStorage.setItem('tak-dark-theme', 'true');
    } else {
      localStorage.removeItem('tak-dark-theme');
    }
  }

  public onLogout(): void {
    this._modal
      .confirm('¿Desea cerrar su sesión?', '¿Seguro?', {
        confirmButton: 'A',
        deniedButton: 'B',
        hasTextArea: true,
      })
      .subscribe(result => {
        console.log(result);
        if (result && result.success) {
          localStorage.clear();
          location.reload();
        }
      });
  }
}
