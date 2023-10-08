import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { TAK_BOX_FORM_CONFIG } from '@takkion/ng-components/box-form';

TAK_BOX_FORM_CONFIG.setValue({
  submitButton: 'ENVIAR',
  resetButton: 'REINICIAR',
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
