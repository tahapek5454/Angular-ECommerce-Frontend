import { TestBed } from '@angular/core/testing';

import { AuthorizationEndpointService } from './authorization-endpoint.service';

describe('AuthorizationEndpointService', () => {
  let service: AuthorizationEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
