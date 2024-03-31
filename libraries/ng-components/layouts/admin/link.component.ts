import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tak-admin-layout-link',
  template: `
    @if (item.icon) {
      <div class="icon-container">
        <div
          attr.style="margin-right: {{ item.iconMarginRight || '5px' }}; {{
            item.iconMarginLeft ? 'margin-left: ' + item.iconMarginLeft : ''
          }}"
        >
          @if (item.iconType === 'img') {
            <img attr.style="width:  {{ item.iconWidth || '20px' }}" [src]="item.icon" />
          } @else {
            <mat-icon>{{ item.icon }}</mat-icon>
          }
        </div>
      </div>
    } @else if (isCollection) {
      <div class="icon-container">
        <div
          attr.style="margin-right: {{ item.iconMarginRight || '5px' }}; {{
            item.iconMarginLeft ? 'margin-left: ' + item.iconMarginLeft : ''
          }}"
        >
          @if (item.iconType === 'img') {
            <img
              attr.style="width:  {{ item.iconWidth || '20px' }}"
              [src]="item.iconCollectionOpened || 'favicon.ico'"
            />
          } @else {
            <mat-icon>{{ item.iconCollectionOpened || 'radio_button_checked' }}</mat-icon>
          }
        </div>
      </div>
    }
    <span class="link-name">{{ item.name }}</span>
  `,
  styleUrl: './admin-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutLinkComponent {
  @Input() item!: any;
  @Input() isCollection = false;

  constructor(href: ElementRef<HTMLElement>) {
    href.nativeElement.classList.add('tak-admin-layout-link');
  }
}
