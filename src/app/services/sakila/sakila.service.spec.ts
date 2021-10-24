import { TestBed } from '@angular/core/testing';

import { SakilaService } from './sakila.service';

describe('SakilaService', () => {
  let service: SakilaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SakilaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
