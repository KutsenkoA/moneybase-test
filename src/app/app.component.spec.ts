import { TestBed } from '@angular/core/testing';
import { NgToggleModule } from 'ng-toggle-button';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { stocksMock } from './da/stocks.mock';
import { StocksService } from './da/stocks.service';
import { StockCardViewComponent } from './views/stock-card-view/stock-card-view.component';
import {
  StockCardsContainerViewComponent
} from './views/stock-cards-container-view/stock-cards-container-view.component';

let mockStocksService: jasmine.SpyObj<StocksService>;

/* Note: tests are a bit simplified for the sake of brevity
 */
describe('AppComponent', () => {
  beforeEach(async () => {
    /* Note: In real project I would use shared mocks utility functions */
    mockStocksService = jasmine.createSpyObj('StockService', ['getStocks$', 'stocksUpdates$'], {
      getStocks$: jasmine.createSpy('getStocks$').and.returnValue(of(stocksMock)),
      stocksUpdates$: jasmine.createSpy('stocksUpdates$').and.returnValue(of(stocksMock))
    });

    await TestBed.configureTestingModule({
      imports: [NgToggleModule],
      declarations: [
        AppComponent,
        StockCardViewComponent,
        StockCardsContainerViewComponent,
      ],
      providers: [{
        provide: StocksService,
        useValue: mockStocksService
      }]
    }).compileComponents();
  });

  describe('after creating', () => {
    it('should have an empty stocks array', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.stocks$.value).toEqual([]);
    });

    it('should have an empty disabled stocks array', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.disabledStocks).toEqual([]);
    });
  });

  describe('after onInit', () => {
    it('should take stocks list from the service', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit()
      expect(app.stocks$.value.length).toEqual(stocksMock.length);
    });

    it('should subscribe to stocks updates', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit()
      expect(mockStocksService.stocksUpdates$).toHaveBeenCalled();
    });
  });

  describe('if one of the stocks is disabled', () => {
    const disabledStock = stocksMock[2];

    it('should add this stock to the list of disabled stocks', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      app.toggleDisabledStock(disabledStock.name, true);
      expect(app.disabledStocks).toEqual([disabledStock.name]);
    });

    it('should subscribe to the stock updates with new stocks list', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      app.toggleDisabledStock(disabledStock.name, true);
      expect(mockStocksService.stocksUpdates$).toHaveBeenCalledWith(stocksMock.map(stock => stock.name).filter(name => name !== disabledStock.name));
    });
  });

  it('should render all stocks cards', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mb-stock-card-view').length).toEqual(stocksMock.length);
  });
});
