import { ESCAPE } from '@kato-lee/cdk/keycodes';
import { MatFormFieldAppearance } from '@kato-lee/material/form-field';

export const TAK_DEFAULT_APPEARANCE_FORM: MatFormFieldAppearance = 'standard';

export type TakGeneralFieldType = 'text' | 'password' | 'filter';
export type TakAutocompleteFieldType = 'off' | 'on';

export const TAK_PRESS_ESC_KEY = new KeyboardEvent('keydown', {
  bubbles: true,
  cancelable: true,
  keyCode: ESCAPE,
});

export const TAK_PTRN_EMAIL = '^[^@]+@[^@]+.[a-zA-Z]{2,}$';
export const TAK_PTRN_NUMRC = /^[0-9.]+$/;
export const TAK_PTRN_NONSP = /^[^\s]+$/;
