import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-browse-pagination',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './browse-pagination.component.html',
  styleUrl: './browse-pagination.component.css'
})
export class BrowsePaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  visiblePages: number[] = [];

  ngOnChanges(): void {
    this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    const pages: number[] = [];

    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(this.totalPages, start + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    while (pages.length < 3 && pages[0] > 1) {
      pages.unshift(pages[0] - 1);
    }

    this.visiblePages = pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
}
