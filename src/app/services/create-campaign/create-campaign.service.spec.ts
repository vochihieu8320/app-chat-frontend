import { TestBed } from '@angular/core/testing';

import { CreateCampaignService } from './create-campaign.service';

describe('CreateCampaignService', () => {
  let service: CreateCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
