import { Component } from '@angular/core';
import {UserListsComponent} from '../../user-lists/user-lists.component';

@Component({
  selector: 'app-ratings-page',
  standalone: true,
  imports: [UserListsComponent],
  template: `<app-user-lists sectionName="ratings" />`
})
export class RatingsPageComponent {}
