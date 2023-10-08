import { FormControl } from '@angular/forms';

export type TakModalType = 'confirm' | 'alert';

export interface TakModalConfig {
  confirmButton?: string;
  deniedButton?: string;
  okButton?: string;
  hasTopCloseButton?: boolean;
}

export const TAK_MODAL_CONFIG = new FormControl<TakModalConfig | null>(null);
