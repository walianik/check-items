import { Component } from '@angular/core';
import { ItemService } from './services/item.service';
import { Action } from './enums/Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Action = Action;

  constructor(private itemService: ItemService) {}

  performAction(action: Action): void {
    this.itemService.performAction(action);
  }
}
