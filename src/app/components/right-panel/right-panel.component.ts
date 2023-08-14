// right-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css'],
})
export class RightPanelComponent implements OnInit {
  selectedItemId: number | null = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.selectedItemIdSubject.subscribe(selectedItemId => {
      this.selectedItemId = selectedItemId;
    });
  }
}
