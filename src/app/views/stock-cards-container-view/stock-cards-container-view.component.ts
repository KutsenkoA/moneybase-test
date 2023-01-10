import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mb-stock-cards-container-view',
  template: '<ng-content></ng-content>',
  styleUrls: ['./stock-cards-container-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCardsContainerViewComponent {}
