import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() idDisplay = true;
  @Output() private readonly menuClick = new EventEmitter<never>();

  handleMenuClick() {
    this.menuClick.emit();
  }
}
