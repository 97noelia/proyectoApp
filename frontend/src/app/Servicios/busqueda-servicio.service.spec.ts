import { TestBed } from '@angular/core/testing';

import { BusquedaServicioService } from './busqueda-servicio.service';

describe('BusquedaServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusquedaServicioService = TestBed.get(BusquedaServicioService);
    expect(service).toBeTruthy();
  });
});
