import { TestBed } from '@angular/core/testing';

import { IcomeEgressService } from './icome-egress.service';

describe('IcomeEgressService', () => {
  let service: IcomeEgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcomeEgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
