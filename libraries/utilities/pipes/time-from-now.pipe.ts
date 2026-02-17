import { Pipe, PipeTransform } from '@angular/core';
import { TimerService } from '@kato-lee/utilities/services';

@Pipe({ standalone: true, name: 'timeFromNow' })
export class TimeFromNowPipe implements PipeTransform {
  constructor(private _timer: TimerService) {}

  public transform(date: Date) {
    return this._timer.timeFromNow(date);
  }
}
