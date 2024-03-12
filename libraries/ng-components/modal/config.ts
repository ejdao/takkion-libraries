import { TakDialogConfig } from '@takkion/ng-material/dialog';

export type TakModalType = 'confirm' | 'alert';

export interface TakModalConfig {
  confirmButton?: string;
  deniedButton?: string;
  okButton?: string;
  hasTopCloseButton?: boolean;
  dialogOptions?: TakDialogConfig;
}
