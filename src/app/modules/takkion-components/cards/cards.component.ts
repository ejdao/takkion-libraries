import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({standalone:false,
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {}
