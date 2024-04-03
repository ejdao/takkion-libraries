import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProgressBarMode } from '@takkion/ng-material/progress-bar';
import { ThemePalette } from '@takkion/ng-material/core';
import { ProgressSpinnerMode } from '@takkion/ng-material/progress-spinner';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  color2: ThemePalette = 'primary';
  mode2: ProgressSpinnerMode = 'determinate';
  value2 = 50;

  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  centered = false;
  disabled = false;
  unbounded = false;
  radius!: number;
  color3!: string;

  color4: ThemePalette = 'accent';
  checked = false;
  disabled4 = false;

  disabled5 = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value5 = 0;
}
