import { MatDialogConfig } from '@takkion/ng-material/dialog';

export type TakModalType = 'confirm' | 'alert';

export interface TakModalConfig {
  confirmButton?: string;
  deniedButton?: string;
  okButton?: string;
  hasTopCloseButton?: boolean;
  dialogOptions?: MatDialogConfig;
  hasTextArea?: boolean;
  textAreaLabel?: string;
  textAreaLength?: number;
}
