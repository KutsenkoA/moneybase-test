import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Stock } from '../../stock.model';

@Component({
  selector: 'mb-stock-card-view',
  templateUrl: './stock-card-view.component.html',
  styleUrls: ['./stock-card-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockCardViewComponent {
  @Input() public stock!: Stock;

  @Output() public disabled = new EventEmitter<boolean>();

  /* Note: The growth and fall of the stock colors logic is just an example */
  @HostBinding('class.stock-growth-color') get isStockGrowing() {
    return this.stock.price !== this.stock.lowPrice;
  }

  @HostBinding('class.stock-falls-color') get isStockFalling() {
    return this.stock.price === this.stock.lowPrice;
  }

  @Input() @HostBinding('class.stock-disabled-color') public isDisabled = false;
}
