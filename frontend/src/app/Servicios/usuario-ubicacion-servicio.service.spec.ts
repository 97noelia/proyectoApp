import { TestBed } from '@angular/core/testing';

import { UsuarioUbicacionServicioService } from './usuario-ubicacion-servicio.service';

describe('UsuarioUbicacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioUbicacionServicioService = TestBed.get(UsuarioUbicacionServicioService);
    expect(service).toBeTruthy();
  });
});
