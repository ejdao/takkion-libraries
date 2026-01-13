import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CtmSnavItems } from '../navigation-interfaces';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ValidateAccessPipe } from '../validate-access.pipe';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonIcon,
    IonMenuButton,
    ValidateAccessPipe,
    RouterModule,
    IonRouterOutlet,
  ],
  selector: 'app-admin-layout--mobile',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLayoutMobileComponent {
  @Input() appTitle = 'Takkion Devs';
  @Input() sidebarTitle = 'Takkion (Sidebar)';
  @Input() sidebarSubtitle = 'Takkion (Sidebar)';
  @Input() navigation: CtmSnavItems[] = [];
  @Input() authorities: any[] = [];
  @Input() context: any;
  @Input() tabName = 'Home';

  @Output() clickOnChangeVersion = new EventEmitter<'web'>();
  @Output() clickOnLogout = new EventEmitter();
  @Output() toggleMode = new EventEmitter();
}
