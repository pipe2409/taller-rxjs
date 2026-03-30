
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent {
  @Output() search = new EventEmitter<string>();
  username = '';

  onSearch(): void {
    const trimmed = this.username.trim();
    if (trimmed) {
      this.search.emit(trimmed);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
