import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../../../services/user/user.service';
import {UserListItemComponent} from '../user-list-item/user-list-item.component';
import {ListItem, CustomList} from '../../../../models/list.model';

@Component({
  selector: 'app-user-lists',
  standalone: true,
  imports: [CommonModule, UserListItemComponent],
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {
  @Input() sectionName!: 'favorites' | 'watchlist' | 'ratings' | 'watched' | 'customLists';
  @Input() listId?: string;

  title = '';
  items: (ListItem | CustomList)[] = [];
  canRemove = true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pageSize = 10;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    switch (this.sectionName) {
      case 'favorites':
        this.title = 'Ulubione';
        this.userService.getUserFavorites(this.currentPage, this.pageSize).subscribe(response => {
          this.items = response.content;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalElements;
        });
        break;
      case 'watchlist':
        this.title = 'Watchlista';
        this.userService.getUserWatchlist(this.currentPage, this.pageSize).subscribe(response => {
          this.items = response.content;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalElements;
        });
        break;
      case 'ratings':
        this.title = 'Oceny';
        this.userService.getUserRatings(this.currentPage, this.pageSize).subscribe(response => {
          this.items = response.content;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalElements;
        });
        break;
      case 'watched':
        this.title = 'Obejrzane';
        this.userService.getUserWatched(this.currentPage, this.pageSize).subscribe(response => {
          this.items = response.content;
          console.log(this.items);
          this.totalPages = response.totalPages;
          this.totalItems = response.totalElements;
        });
        break;
      case 'customLists':
        if (this.listId) {
          this.userService.getUserMovieList(this.listId).subscribe(response => {
            this.title = response.name;
          })
          this.userService.getUserMovieListItems(this.listId, this.currentPage, this.pageSize).subscribe(response => {
            this.items = response.content;
            this.totalPages = response.totalPages;
            this.totalItems = response.totalElements;
          });
        } else {
          this.title = 'Moje listy';
          this.userService.getUserMovieLists().subscribe(response => {
            this.items = response;
            this.totalPages = 1;
            this.totalItems = response.length;
          });
        }
        break;
    }
  }

  removeItem(item: ListItem | CustomList) {
    if (this.sectionName === 'customLists') {
      if (this.listId) {
        const movieItem = item as ListItem;
        this.userService.removeMovieFromCustomList(this.listId, movieItem.movieTmdbId).subscribe(() => {
          this.items = this.items.filter(i => i.id !== item.id);
        });
      } else {
        const listItem = item as CustomList;
        this.userService.removeItemFromSection("lists", listItem.id).subscribe(() => {
          this.items = this.items.filter(i => i.id !== item.id);
        });
      }
    } else {
      const movieItem = item as ListItem;
      this.userService.removeItemFromSection(this.sectionName, movieItem.id).subscribe(() => {
        this.items = this.items.filter(i => i.id !== item.id);
      });
    }
  }



  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }
}
