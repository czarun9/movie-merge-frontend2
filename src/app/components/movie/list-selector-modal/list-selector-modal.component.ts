import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CustomList} from '../../../models/list.model';
import {UserService} from '../../../services/user/user.service';


@Component({
  selector: 'app-list-selector-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-selector-modal.component.html',
  styleUrls: ['./list-selector-modal.component.css']
})
export class ListSelectorModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() addToList = new EventEmitter<string>();
  @Output() createList = new EventEmitter<string>();


  lists: CustomList[] = [];
  selectedListId: string | null = null;
  showNewListForm = false;
  newListName = '';
  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists(): void {
    this.isLoading = true;
    this.userService.getUserMovieLists().subscribe({
      next: (lists) => {
        this.lists = lists;
        this.isLoading = false;
      },
      error: () => {
        this.lists = [];
        this.isLoading = false;
      }
    });
  }


  onCloseClick(): void {
    this.close.emit();
  }

  addToExistingList(): void {
    if (this.selectedListId) {
      this.addToList.emit(this.selectedListId);
    }
  }

  createNewList(): void {
    if (this.newListName.trim()) {
      this.createList.emit(this.newListName.trim());
    }
  }

  toggleNewListForm(): void {
    this.showNewListForm = !this.showNewListForm;
    if (this.showNewListForm) {
      this.selectedListId = null;
    }
  }

}
