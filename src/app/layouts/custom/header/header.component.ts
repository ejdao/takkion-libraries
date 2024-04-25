import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(href: ElementRef<HTMLElement>) {
    href.nativeElement.classList.add('app-header');
  }

  public toggleMode() {
    const body = document.getElementsByTagName('html')[0];
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('default-theme');
    } else {
      body.classList.add('dark-theme');
      body.classList.remove('default-theme');
    }
  }
}
