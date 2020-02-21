import { TestBed, async, inject } from '@angular/core/testing';

import { GLoginUsuarioGuard } from './g-login-usuario.guard';

describe('GLoginUsuarioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GLoginUsuarioGuard]
    });
  });

  it('should ...', inject([GLoginUsuarioGuard], (guard: GLoginUsuarioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
