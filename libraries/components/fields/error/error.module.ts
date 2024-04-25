import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TakErrorEqualsPipe } from './error-equals.pipe';
import { TakErrorMsgPipe } from './error.msg.pipe';
import { TakErrorComponent } from './error.component';

@NgModule({
  declarations: [TakErrorEqualsPipe, TakErrorMsgPipe, TakErrorComponent],
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  exports: [TakErrorComponent],
})
export class TakErrorModule {}
