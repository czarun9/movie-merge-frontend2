import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { RatingTileComponent } from '../../../movie/rating-tile/rating-tile.component';
import { ListItem, CustomList } from '../../../../models/list.model';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [CommonModule, NgIf, RatingTileComponent, RouterLink],
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css'],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'pl' }]
})
export class UserListItemComponent {
  @Input() item: ListItem | CustomList | undefined;
  @Input() canRemove = false;
  @Output() remove = new EventEmitter<string>();

  protected imageBaseUrl = environment.imageBaseUrl;

  constructor(private datePipe: DatePipe) {}

  get isMovie(): boolean {
    return !!(this.item && 'movieTmdbId' in this.item);
  }

  get isCustomList(): boolean {
    return !!(this.item && 'createdAt' in this.item && !('movieTmdbId' in this.item));
  }

  get movie(): ListItem | undefined {
    return this.isMovie ? this.item as ListItem : undefined;
  }

  get customList(): CustomList | undefined {
    return this.isCustomList ? this.item as CustomList : undefined;
  }

  get formattedReleaseDate(): string | null {
    return this.movie?.release_date
      ? this.datePipe.transform(this.movie.release_date, 'longDate')
      : null;
  }

  get formattedCreatedAt(): string | null {
    const created = this.item?.createdAt;

    if (!created) return null;

    if (Array.isArray(created)) {
      const [y, m, d, h = 0, min = 0, s = 0, nano = 0] = created;
      const millis = Math.floor(nano / 1_000_000);
      const date = new Date(y, m - 1, d, h, min, s, millis);
      return this.datePipe.transform(date, 'short');
    }

    return this.datePipe.transform(new Date(created), 'short');
  }


  onRemoveClicked(id: string | undefined): void {
    if (id) {
      this.remove.emit(id);
    } else {
      console.warn('Brak ID – nie można usunąć elementu.');
    }
  }
}
