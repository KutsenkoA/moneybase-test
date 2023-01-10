import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stock, StockUpdate } from '../stock.model';
import { generateStockUpdate, stocksMock } from './stocks.mock';

const STOCKS_UPDATE_INTERVAL = 3000;

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  /**
   * Fetches the stocks from the server.
   */
  public getStocks$(): Observable<Stock[]> {
    return of(stocksMock);
  }

  /**
   * Subscribes to the WS and get an updates for the stocks.
   *
   * @param codes The codes of the stocks to subscribe to.
   */
  public stocksUpdates$(codes: string[]): Observable<StockUpdate[]> {
    return new Observable<StockUpdate[]>(subscriber => {
      const interval = setInterval(() => {
        subscriber.next(codes.map(code => generateStockUpdate(code)));
      }, STOCKS_UPDATE_INTERVAL);

      return () => clearInterval(interval);
    });
  }
}
