import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, DatePipe, NgIf} from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import {RatingTileComponent} from '../../../movie/rating-tile/rating-tile.component';
import {ListItem} from '../../../../models/list.model';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [CommonModule, NgIf, RatingTileComponent],
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

}
