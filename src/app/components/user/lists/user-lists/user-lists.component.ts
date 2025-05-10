import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user/user.service';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';

interface ListItem {
  id: number;
  title: string;
  release_date?: string;
  rating?: number;
  date?: string;
  content?: string;
  author?: string;
}

@Component({
  selector: 'app-user-lists',
  standalone: true,
  imports: [CommonModule, UserListItemComponent],
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {
  @Input() sectionName!: 'favorites' | 'watchlist' | 'ratings' | 'watched';
  title = '';
  items: ListItem[] = [];
  canRemove = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    switch (this.sectionName) {
      case 'favorites':
        this.title = 'Ulubione';
        this.userService.getUserFavorites().subscribe((data: ListItem[]) => this.items = data);
        break;
      case 'watchlist':
        this.title = 'Watchlista';
        this.userService.getUserWatchlist().subscribe((data: ListItem[]) => this.items = data);
        break;
      case 'ratings':
        this.title = 'Oceny';
        this.userService.getUserRatings().subscribe((data: ListItem[]) => this.items = data);
        break;
      case 'watched':
        this.title = 'Obejrzane';
        this.userService.getUserRatings().subscribe((data: ListItem[]) => this.items = data);
        break;
    }
  }

  removeItem(itemId: number) {
    this.userService.removeItemFromSection(this.sectionName, itemId).subscribe(() => {
      this.items = this.items.filter(item => item.id !== itemId);
    });
  }
}
