import { TestBed } from '@angular/core/testing';

import { GeolocalizacionServicioService } from './geolocalizacion-servicio.service';

describe('GeolocalizacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocalizacionServicioService = TestBed.get(GeolocalizacionServicioService);
    expect(service).toBeTruthy();
  });
});
