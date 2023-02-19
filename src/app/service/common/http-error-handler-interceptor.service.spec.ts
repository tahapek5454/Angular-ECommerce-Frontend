import { TestBed } from '@angular/core/testing';

import { HttpErrorHandlerInterceptorService } from './http-error-handler-interceptor.service';

describe('HttpErrorHandlerInterceptorService', () => {
  let service: HttpErrorHandlerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorHandlerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
