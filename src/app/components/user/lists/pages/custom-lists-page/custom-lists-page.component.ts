import { Component } from '@angular/core';
import {UserListsComponent} from '../../user-lists/user-lists.component';

@Component({
  selector: 'app-custom-lists-page',
  standalone: true,
  imports: [
    UserListsComponent
  ],
  template: `<app-user-lists sectionName="customLists" />`
})
export class CustomListsPageComponent {}
