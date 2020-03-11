import { TestBed } from '@angular/core/testing';

import { ServicioimagenesService } from './servicioimagenes.service';

describe('ServicioimagenesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioimagenesService = TestBed.get(ServicioimagenesService);
    expect(service).toBeTruthy();
  });
});
