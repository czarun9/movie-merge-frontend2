import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() placeholder = '';
  @Output() search = new EventEmitter<string>();

  emitSearch(value: string) {
    this.search.emit(value.trim());
  }
}
