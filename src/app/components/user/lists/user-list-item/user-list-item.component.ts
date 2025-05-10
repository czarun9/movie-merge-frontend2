import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, DatePipe, NgIf} from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import {RatingTileComponent} from '../../../movie/rating-tile/rating-tile.component';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [CommonModule, NgIf, RatingTileComponent],
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css'],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'pl' }]
})
export class UserListItemComponent {
  @Input() item: any;
  @Input() canRemove: boolean = false;
  @Output() remove = new EventEmitter<number>();

  constructor(private datePipe: DatePipe) {}

  get formattedDate(): string | null {
    if (this.item.release_date) {
      return this.datePipe.transform(this.item.release_date, 'longDate');
    }
    if (this.item.date) {
      return this.datePipe.transform(this.item.date, 'longDate');
    }
    return null;
  }
}
