import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserListsComponent } from '../../user-lists/user-lists.component';

@Component({
  selector: 'app-custom-list-view-page',
  standalone: true,
  imports: [UserListsComponent],
  template: `<app-user-lists [sectionName]="'customLists'" [listId]="listId"></app-user-lists>`,
})
export class CustomListViewPageComponent implements OnInit {
  listId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('id')!;
  }
}
