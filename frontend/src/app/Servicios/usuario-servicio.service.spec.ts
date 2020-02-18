import { TestBed } from '@angular/core/testing';

import { UsuarioServicioService } from './usuario-servicio.service';

describe('UsuarioServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioServicioService = TestBed.get(UsuarioServicioService);
    expect(service).toBeTruthy();
  });
});
