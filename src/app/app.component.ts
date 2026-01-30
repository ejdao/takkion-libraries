import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    @if (sessionWasLoaded()) {
      <router-outlet />
    } @else {
      <div class="tak-view-loader">
        <div class="tak-spinner">
          <div class="tak-double-bounce1"></div>
          <div class="tak-double-bounce2"></div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  sessionWasLoaded = signal(false);

  async ngOnInit(): Promise<void> {
    this.sessionWasLoaded.set(true);
  }
}
