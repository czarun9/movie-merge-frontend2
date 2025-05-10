import { Component } from '@angular/core';
import {UserListsComponent} from '../../user-lists/user-lists.component';

@Component({
  selector: 'app-watched-page',
  standalone: true,
  imports: [
    UserListsComponent
  ],
  template: `<app-user-lists sectionName="watched" />`
})
export class WatchedPageComponent {}
