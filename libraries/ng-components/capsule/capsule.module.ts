import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakCapsuleComponent } from './capsule.component';

@NgModule({
  declarations: [TakCapsuleComponent],
  imports: [CommonModule],
  exports: [TakCapsuleComponent],
})
export class TakCapsuleModule {}
