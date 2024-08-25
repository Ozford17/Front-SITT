import { TestBed } from '@angular/core/testing';

import { ApiDynamicService } from './api-dynamic.service';

describe('ApiDynamicService', () => {
  let service: ApiDynamicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDynamicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
