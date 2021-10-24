import { TestBed } from '@angular/core/testing';

import { CampaignConversationsService } from './campaign-conversations.service';

describe('CampaignConversationsService', () => {
  let service: CampaignConversationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignConversationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
