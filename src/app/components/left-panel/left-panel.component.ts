// left-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { IPanelItem } from '../../interfaces/panel/IPanel';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent implements OnInit {
  items: IPanelItem[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.itemsSubject.subscribe(panelItems => {
      this.items = panelItems;
    });
  }

  selectItem(index: number): void {
    this.itemService.setSelectedItemId(this.items[index].item.id);
  }
}
