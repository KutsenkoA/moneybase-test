import { Stock, StockUpdate } from '../stock.model';

export const stocksMock: Stock[] = [
  {
    name: 'AAPL',
    price: 130.15,
    highPrice: 133.41,
    lowPrice: 129.89,
    high52WeekPrice: 179.61,
    low52WeekPrice: 124.17,
  },
  {
    name: 'BTC-USD',
    price: 17239,
    highPrice: 17389,
    lowPrice: 17188,
    high52WeekPrice: 48086,
    low52WeekPrice: 15599,
  },
  {
    name: 'SOFI',
    price: 4.82,
    highPrice: 5.00,
    lowPrice: 4.67,
    high52WeekPrice: 16.47,
    low52WeekPrice: 4.24,
  },
  {
    name: 'M',
    price: 22.13,
    highPrice: 20.00,
    lowPrice: 21.26,
    high52WeekPrice: 15.10,
    low52WeekPrice: 28.21,
  }
];

export const generateStockUpdate = (name: string): StockUpdate => {
  const stock = stocksMock.find(stock => stock.name === name);
  if (!stock) {
    throw new Error(`Stock with code ${name} not found`);
  }

  const priceChange = Math.random() * 10 - 5;
  const price = stock.price + priceChange;

  return {
    name,
    price,
    /* Update the high/low prices if needed */
    ...(price > stock.highPrice ? { highPrice: price } : {}),
    ...(price < stock.lowPrice ? { lowPrice: price } : {}),
    ...(price > stock.high52WeekPrice ? { high52WeekPrice: price } : {}),
    ...(price < stock.low52WeekPrice ? { low52WeekPrice: price } : {}),
  }
}
