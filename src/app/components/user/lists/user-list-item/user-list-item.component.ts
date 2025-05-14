import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, DatePipe, NgIf} from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import {RatingTileComponent} from '../../../movie/rating-tile/rating-tile.component';
import {ListItem} from '../../../../models/list.model';
import {environment} from '../../../../../environments/environment';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [CommonModule, NgIf, RatingTileComponent, RouterLink],
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css'],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'pl' }]
})
export class UserListItemComponent {
  @Input() item: ListItem | undefined;
  @Input() canRemove: boolean = false;
  @Output() remove = new EventEmitter<string>();

  protected imageBaseUrl = `${environment.imageBaseUrl}`;

  constructor(private datePipe: DatePipe) {}

  get formattedDate(): string | null {
    if (this.item?.release_date) {
      return this.datePipe.transform(this.item.release_date, 'longDate');
    }
    if (this.item?.date) {
      return this.datePipe.transform(this.item.date, 'longDate');
    }
    return null;
  }

  onRemoveClicked(id: string | undefined): void {
    console.log('Usuwany item.id:', id);
    if (id !== undefined) {
      this.remove.emit(id);
    } else {
      console.warn('Item nie ma ID, nie można usunąć.');
    }
  }

  get formattedAddedDate(): string | null {
    const created = this.item?.createdAt;

    if (Array.isArray(created)) {
      const [y, m, d, h = 0, min = 0, s = 0, nano = 0] = created;

      const millis = Math.floor(nano / 1_000_000);
      const parsedDate = new Date(y, m - 1, d, h, min, s, millis);

      return this.datePipe.transform(parsedDate, 'short');
    }

    if (typeof created === 'string') {
      return this.datePipe.transform(new Date(created), 'short');
    }

    return null;
  }


}
