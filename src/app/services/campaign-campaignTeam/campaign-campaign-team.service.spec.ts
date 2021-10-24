import { TestBed } from '@angular/core/testing';

import { CampaignCampaignTeamService } from './campaign-campaign-team.service';

describe('CampaignCampaignTeamService', () => {
  let service: CampaignCampaignTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignCampaignTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
