import { Component } from '@angular/core';
import {UserListsComponent} from '../../user-lists/user-lists.component';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [
    UserListsComponent
  ],
  template: `<app-user-lists sectionName="watchlist" />`
})
export class WatchlistPageComponent {
}
