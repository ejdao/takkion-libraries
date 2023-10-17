import { FormControl } from '@angular/forms';

export interface TakBoxFormConfig {
  submitButton: string;
  resetButton: string;
  hasBreadcrumbs?: boolean;
}

export const TAK_BOX_FORM_CONFIG = new FormControl<TakBoxFormConfig | null>(null);
