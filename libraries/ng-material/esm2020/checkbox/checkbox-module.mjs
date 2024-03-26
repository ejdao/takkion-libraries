/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@takkion/ng-cdk/observers';
import { NgModule } from '@angular/core';
import { TakCommonModule, TakRippleModule } from '@takkion/ng-material/core';
import { TakCheckbox } from './checkbox';
import { TakCheckboxRequiredValidator } from './checkbox-required-validator';
import * as i0 from '@angular/core';
/** This module is used by both original and MDC-based checkbox implementations. */
export class _TakCheckboxRequiredValidatorModule {}
_TakCheckboxRequiredValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
_TakCheckboxRequiredValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
  declarations: [TakCheckboxRequiredValidator],
  exports: [TakCheckboxRequiredValidator],
});
_TakCheckboxRequiredValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakCheckboxRequiredValidatorModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          exports: [TakCheckboxRequiredValidator],
          declarations: [TakCheckboxRequiredValidator],
        },
      ],
    },
  ],
});
export class TakCheckboxModule {}
TakCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  declarations: [TakCheckbox],
  imports: [TakRippleModule, TakCommonModule, ObserversModule, _TakCheckboxRequiredValidatorModule],
  exports: [TakCheckbox, TakCommonModule, _TakCheckboxRequiredValidatorModule],
});
TakCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  imports: [
    TakRippleModule,
    TakCommonModule,
    ObserversModule,
    _TakCheckboxRequiredValidatorModule,
    TakCommonModule,
    _TakCheckboxRequiredValidatorModule,
  ],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCheckboxModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [
            TakRippleModule,
            TakCommonModule,
            ObserversModule,
            _TakCheckboxRequiredValidatorModule,
          ],
          exports: [TakCheckbox, TakCommonModule, _TakCheckboxRequiredValidatorModule],
          declarations: [TakCheckbox],
        },
      ],
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2NoZWNrYm94L2NoZWNrYm94LW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdkMsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sK0JBQStCLENBQUM7O0FBRTNFLG1GQUFtRjtBQUtuRixNQUFNLE9BQU8sbUNBQW1DOztnSUFBbkMsbUNBQW1DO2lJQUFuQyxtQ0FBbUMsaUJBRi9CLDRCQUE0QixhQURqQyw0QkFBNEI7aUlBRzNCLG1DQUFtQzsyRkFBbkMsbUNBQW1DO2tCQUovQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUN2QyxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztpQkFDN0M7O0FBUUQsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQUZiLFdBQVcsYUFGaEIsZUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBSGhELG1DQUFtQyxhQUlwQyxXQUFXLEVBQUUsZUFBZSxFQUozQixtQ0FBbUM7K0dBT25DLGlCQUFpQixZQUpsQixlQUFlLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxtQ0FBbUMsRUFDekUsZUFBZSxFQUozQixtQ0FBbUM7MkZBT25DLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxtQ0FBbUMsQ0FBQztvQkFDakcsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxtQ0FBbUMsQ0FBQztvQkFDNUUsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge09ic2VydmVyc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRDaGVja2JveH0gZnJvbSAnLi9jaGVja2JveCc7XG5pbXBvcnQge01hdENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3J9IGZyb20gJy4vY2hlY2tib3gtcmVxdWlyZWQtdmFsaWRhdG9yJztcblxuLyoqIFRoaXMgbW9kdWxlIGlzIHVzZWQgYnkgYm90aCBvcmlnaW5hbCBhbmQgTURDLWJhc2VkIGNoZWNrYm94IGltcGxlbWVudGF0aW9ucy4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtNYXRDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvcl0sXG59KVxuZXhwb3J0IGNsYXNzIF9NYXRDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRSaXBwbGVNb2R1bGUsIE1hdENvbW1vbk1vZHVsZSwgT2JzZXJ2ZXJzTW9kdWxlLCBfTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvck1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRDaGVja2JveCwgTWF0Q29tbW9uTW9kdWxlLCBfTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvck1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdENoZWNrYm94XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hlY2tib3hNb2R1bGUge31cbiJdfQ==
