import { ESCAPE } from '@takkion/ng-cdk/keycodes';
import { MatFormFieldAppearance } from '@takkion/ng-material/form-field';

export const TAK_DEFAULT_APPEARANCE_FORM: MatFormFieldAppearance = 'fill';

export type TakGeneralFieldType = 'text' | 'password' | 'filter';
export type TakAutocompleteFieldType = 'off' | 'on';

export const TAK_PRESS_ESC_KEY = new KeyboardEvent('keydown', {
  bubbles: true,
  cancelable: true,
  keyCode: ESCAPE,
});
