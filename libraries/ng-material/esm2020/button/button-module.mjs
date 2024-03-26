/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { TakCommonModule, TakRippleModule } from '@takkion/ng-material/core';
import { TakAnchor, TakButton } from './button';
import * as i0 from '@angular/core';
export class TakButtonModule {}
TakButtonModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  declarations: [TakButton, TakAnchor],
  imports: [TakRippleModule, TakCommonModule],
  exports: [TakButton, TakAnchor, TakCommonModule],
});
TakButtonModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  imports: [TakRippleModule, TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakButtonModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakRippleModule, TakCommonModule],
          exports: [TakButton, TakAnchor, TakCommonModule],
          declarations: [TakButton, TakAnchor],
        },
      ],
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9idXR0b24vYnV0dG9uLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBTzlDLE1BQU0sT0FBTyxlQUFlOzs0R0FBZixlQUFlOzZHQUFmLGVBQWUsaUJBRlgsU0FBUyxFQUFFLFNBQVMsYUFGekIsZUFBZSxFQUFFLGVBQWUsYUFDaEMsU0FBUyxFQUFFLFNBQVMsRUFBRSxlQUFlOzZHQUdwQyxlQUFlLFlBSmhCLGVBQWUsRUFBRSxlQUFlLEVBQ1YsZUFBZTsyRkFHcEMsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUMzQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQztvQkFDaEQsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztpQkFDckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0QW5jaG9yLCBNYXRCdXR0b259IGZyb20gJy4vYnV0dG9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdFJpcHBsZU1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdEJ1dHRvbiwgTWF0QW5jaG9yLCBNYXRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRCdXR0b24sIE1hdEFuY2hvcl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEJ1dHRvbk1vZHVsZSB7fVxuIl19
