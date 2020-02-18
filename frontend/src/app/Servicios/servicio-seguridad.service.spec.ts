import { TestBed } from '@angular/core/testing';

import { ServicioSeguridadService } from './servicio-seguridad.service';

describe('ServicioSeguridadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioSeguridadService = TestBed.get(ServicioSeguridadService);
    expect(service).toBeTruthy();
  });
});
