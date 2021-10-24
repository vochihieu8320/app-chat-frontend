import { TestBed } from '@angular/core/testing';

import { OrderQuickAccessService } from './order-quick-access.service';

describe('OrderQuickAccessService', () => {
  let service: OrderQuickAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderQuickAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
