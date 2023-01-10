export interface Stock {
  /* The stock's symbol, i.e. AAPL */
  name: string;
  /* Current price of the stock */
  price: number;
  /* Daily high price of the stock */
  highPrice: number;
  /* Daily low price of the stock */
  lowPrice: number;
  /* 52 weeks high price of the stock */
  high52WeekPrice: number;
  /* 52 weeks low price of the stock */
  low52WeekPrice: number;
}

/* Update for a stock must have name and price properties, other fields are optional */
export type StockUpdate = Pick<Stock, 'name' | 'price'> & Partial<Omit<Stock, 'name' | 'price'>>;
