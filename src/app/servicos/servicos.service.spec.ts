import { TestBed } from '@angular/core/testing';

import { ServicosService } from './servicos/servicos.service';

describe('ServicosService', () => {
  let service: ServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
