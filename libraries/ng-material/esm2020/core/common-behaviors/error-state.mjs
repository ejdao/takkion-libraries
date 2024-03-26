/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export function mixinErrorState(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      /** Whether the component is in an error state. */
      this.errorState = false;
    }
    /** Updates the error state based on the provided error state matcher. */
    updateErrorState() {
      const oldState = this.errorState;
      const parent = this._parentFormGroup || this._parentForm;
      const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
      const control = this.ngControl ? this.ngControl.control : null;
      const newState = matcher.isErrorState(control, parent);
      if (newState !== oldState) {
        this.errorState = newState;
        this.stateChanges.next();
      }
    }
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY29yZS9jb21tb24tYmVoYXZpb3JzL2Vycm9yLXN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQXdDSCxNQUFNLFVBQVUsZUFBZSxDQUM3QixJQUFPO0lBRVAsT0FBTyxLQUFNLFNBQVEsSUFBSTtRQXFCdkIsWUFBWSxHQUFHLElBQVc7WUFDeEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFyQmpCLGtEQUFrRDtZQUNsRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBcUI1QixDQUFDO1FBaEJELHlFQUF5RTtRQUN6RSxnQkFBZ0I7WUFDZCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3pELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMseUJBQXlCLENBQUM7WUFDekUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUEyQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDcEYsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFdkQsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUM7S0FLRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7RXJyb3JTdGF0ZU1hdGNoZXJ9IGZyb20gJy4uL2Vycm9yL2Vycm9yLW9wdGlvbnMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnN0cnVjdG9yLCBDb25zdHJ1Y3Rvcn0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIENhblVwZGF0ZUVycm9yU3RhdGUge1xuICAvKiogVXBkYXRlcyB0aGUgZXJyb3Igc3RhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGVycm9yIHN0YXRlIG1hdGNoZXIuICovXG4gIHVwZGF0ZUVycm9yU3RhdGUoKTogdm9pZDtcbiAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBpbiBhbiBlcnJvciBzdGF0ZS4gKi9cbiAgZXJyb3JTdGF0ZTogYm9vbGVhbjtcbiAgLyoqIEFuIG9iamVjdCB1c2VkIHRvIGNvbnRyb2wgdGhlIGVycm9yIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuICovXG4gIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcbn1cblxudHlwZSBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciA9IENvbnN0cnVjdG9yPENhblVwZGF0ZUVycm9yU3RhdGU+ICZcbiAgQWJzdHJhY3RDb25zdHJ1Y3RvcjxDYW5VcGRhdGVFcnJvclN0YXRlPjtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSGFzRXJyb3JTdGF0ZSB7XG4gIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZTtcbiAgX3BhcmVudEZvcm06IE5nRm9ybTtcbiAgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgLy8gVGhlc2UgcHJvcGVydGllcyBhcmUgZGVmaW5lZCBhcyBwZXIgdGhlIGBNYXRGb3JtRmllbGRDb250cm9sYCBpbnRlcmZhY2UuIFNpbmNlXG4gIC8vIHRoaXMgbWl4aW4gaXMgY29tbW9ubHkgdXNlZCB3aXRoIGN1c3RvbSBmb3JtLWZpZWxkIGNvbnRyb2xzLCB3ZSByZXNwZWN0IHRoZVxuICAvLyBwcm9wZXJ0aWVzIChhbHNvIHdpdGggdGhlIHB1YmxpYyBuYW1lIHRoZXkgbmVlZCBhY2NvcmRpbmcgdG8gYE1hdEZvcm1GaWVsZENvbnRyb2xgKS5cbiAgbmdDb250cm9sOiBOZ0NvbnRyb2w7XG4gIHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPjtcbn1cblxuLyoqXG4gKiBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggdXBkYXRlRXJyb3JTdGF0ZSBtZXRob2QuXG4gKiBGb3IgY29tcG9uZW50IHdpdGggYGVycm9yU3RhdGVgIGFuZCBuZWVkIHRvIHVwZGF0ZSBgZXJyb3JTdGF0ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbkVycm9yU3RhdGU8VCBleHRlbmRzIEFic3RyYWN0Q29uc3RydWN0b3I8SGFzRXJyb3JTdGF0ZT4+KFxuICBiYXNlOiBULFxuKTogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiBUO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluRXJyb3JTdGF0ZTxUIGV4dGVuZHMgQ29uc3RydWN0b3I8SGFzRXJyb3JTdGF0ZT4+KFxuICBiYXNlOiBULFxuKTogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiBUIHtcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBpbiBhbiBlcnJvciBzdGF0ZS4gKi9cbiAgICBlcnJvclN0YXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB0aGUgZXJyb3Igc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gKi9cbiAgICBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgZXJyb3Igc3RhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGVycm9yIHN0YXRlIG1hdGNoZXIuICovXG4gICAgdXBkYXRlRXJyb3JTdGF0ZSgpIHtcbiAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5lcnJvclN0YXRlO1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5fcGFyZW50Rm9ybUdyb3VwIHx8IHRoaXMuX3BhcmVudEZvcm07XG4gICAgICBjb25zdCBtYXRjaGVyID0gdGhpcy5lcnJvclN0YXRlTWF0Y2hlciB8fCB0aGlzLl9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI7XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5uZ0NvbnRyb2wgPyAodGhpcy5uZ0NvbnRyb2wuY29udHJvbCBhcyBBYnN0cmFjdENvbnRyb2wpIDogbnVsbDtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gbWF0Y2hlci5pc0Vycm9yU3RhdGUoY29udHJvbCwgcGFyZW50KTtcblxuICAgICAgaWYgKG5ld1N0YXRlICE9PSBvbGRTdGF0ZSkge1xuICAgICAgICB0aGlzLmVycm9yU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBzdXBlciguLi5hcmdzKTtcbiAgICB9XG4gIH07XG59XG4iXX0=
