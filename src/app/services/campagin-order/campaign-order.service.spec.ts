import { TestBed } from '@angular/core/testing';

import { CampaignOrderService } from './campaign-order.service';

describe('CampaignOrderService', () => {
  let service: CampaignOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
