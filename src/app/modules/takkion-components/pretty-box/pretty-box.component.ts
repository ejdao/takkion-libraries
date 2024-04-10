import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pretty-box',
  templateUrl: './pretty-box.component.html',
  styleUrl: './pretty-box.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrettyBoxComponent {

}
