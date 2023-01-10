import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToggleModule } from 'ng-toggle-button';

import { AppComponent } from './app.component';
import { StockCardViewComponent } from './views/stock-card-view/stock-card-view.component';
import { StockCardsContainerViewComponent } from './views/stock-cards-container-view/stock-cards-container-view.component';

@NgModule({
  declarations: [
    AppComponent,
    StockCardViewComponent,
    StockCardsContainerViewComponent,
  ],
  imports: [
    BrowserModule,
    NgToggleModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
