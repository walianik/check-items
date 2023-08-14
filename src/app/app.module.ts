import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    RightPanelComponent,
    LeftPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
