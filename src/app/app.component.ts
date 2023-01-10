import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StocksService } from './da/stocks.service';
import { Stock } from './stock.model';

@Component({
  selector: 'mb-root',
  template: `
    <mb-stock-cards-container-view>
      <mb-stock-card-view
        *ngFor="let stock of stocks$ | async"
        [stock]="stock"
        [isDisabled]="disabledStocks.includes(stock.name)"
        (disabled)="toggleDisabledStock(stock.name, $event)"></mb-stock-card-view>
    </mb-stock-cards-container-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public stocks$ = new BehaviorSubject<Stock[]>([]);

  /* Codes of the disabled stocks */
  public disabledStocks: string[] = [];

  private stocksUpdateSubscription?: Subscription;

  constructor(private stocksService: StocksService) {}

  public ngOnInit() {
    this.stocksService.getStocks$()
      .subscribe(stocks => {
        this.stocks$.next(stocks);
        this.subscribeToStocksUpdates(stocks);
      });
  }

  public toggleDisabledStock(stockCode: string, disabled: boolean) {
    this.disabledStocks = disabled ? [...this.disabledStocks, stockCode] : this.disabledStocks.filter(code => code !== stockCode);

    this.subscribeToStocksUpdates(this.stocks$.value);
  }

  private get enabledStocks() {
    return this.stocks$.value.filter(stock => !this.disabledStocks.includes(stock.name));
  }

  private subscribeToStocksUpdates(stocks: Stock[]) {
    if (this.stocksUpdateSubscription) {
      this.stocksUpdateSubscription.unsubscribe();
    }

    /* Subscribe to the stocks updates only if there are enabled stocks */
    if (!this.enabledStocks.length) {
      return;
    }

    const enabledStockCodes = this.enabledStocks.map(stock => stock.name);

    this.stocksUpdateSubscription = this.stocksService.stocksUpdates$(enabledStockCodes).subscribe(stocksUpdates => {
      this.stocks$.next(stocks.map(stock => {
        const stockUpdate = stocksUpdates.find(stockUpdate => stockUpdate.name === stock.name) ?? {};
        return { ...stock, ...stockUpdate };
      }));
    });
  }
}
