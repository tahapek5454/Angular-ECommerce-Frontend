import { TestBed } from '@angular/core/testing';

import { DynamicLoadComponentService } from './dynamic-load-component.service';

describe('DynamicLoadComponentService', () => {
  let service: DynamicLoadComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicLoadComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
