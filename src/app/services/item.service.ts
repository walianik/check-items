import { Action } from './../enums/Action';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../interfaces/item/IItem';
import { IPanelItem } from '../interfaces/panel/IPanel';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: IItem[] = [];
  private selectedItemId: number | null = null;

  itemsSubject: BehaviorSubject<IPanelItem[]> = new BehaviorSubject<IPanelItem[]>([]);
  selectedItemIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor() {
    // adding initial one item to show
    this.items = [
      { id: 1, name: 'Item 1' },
    ];
    this.notifyItemsUpdate();
  }

  getItems(): IItem[] {
    return this.items;
  }

  getSelectedItem(): IItem | null {
    if (this.selectedItemId !== null) {
      return this.items.find(item => item.id === this.selectedItemId) || null;
    }
    return null;
  }

  setSelectedItemId(id: number): void {
    this.selectedItemId = id;
    this.notifySelectedItemIdUpdate();
  }

  performAction(action: Action): void {
    switch (action) {
      case Action.Add:
        const newItemId = this.items.length + 1;
        const newItem: IItem = { id: newItemId, name: `Item ${newItemId}` };
        this.items.push(newItem);
        this.setSelectedItemId(newItemId);
        this.notifyItemsUpdate();
        break;
      case Action.Previous:
        if (this.selectedItemId !== null && this.selectedItemId > 1) {
          this.setSelectedItemId(this.selectedItemId - 1);
        }
        break;
      case Action.Next:
        if (this.selectedItemId !== null && this.selectedItemId < this.items.length) {
          this.setSelectedItemId(this.selectedItemId + 1);
        }
        break;
      case Action.Delete:
        if (this.selectedItemId !== null) {
          const index = this.items.findIndex(item => item.id === this.selectedItemId);
          if (index !== -1) {
            this.items.splice(index, 1);
            if (this.items.length === 0) {
              this.selectedItemId = null;
            } else if (index === this.items.length) {
              this.setSelectedItemId(this.items[index - 1].id);
            } else {
              this.setSelectedItemId(this.items[index].id);
            }
            this.notifyItemsUpdate();
          }
        }
        break;
    }
  }

  private notifyItemsUpdate(): void {
    this.itemsSubject.next(this.items.map(item => ({ item, isSelected: item.id === this.selectedItemId })));
  }

  private notifySelectedItemIdUpdate(): void {
    this.selectedItemIdSubject.next(this.selectedItemId);
  }
}
