import { TestBed } from '@angular/core/testing';

import { UnsubcribeService } from './unsubcribe.service';

describe('UnsubcribeService', () => {
  let service: UnsubcribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsubcribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
