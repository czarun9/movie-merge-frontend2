import { Component } from '@angular/core';
import {UserListsComponent} from '../../user-lists/user-lists.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [UserListsComponent],
  template: `<app-user-lists sectionName="favorites" />`
})
export class FavoritesPageComponent {}
