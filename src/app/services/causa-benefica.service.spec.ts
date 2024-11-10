import { TestBed } from '@angular/core/testing';

import { CausaBeneficaService } from './causa-benefica.service';

describe('CausaBeneficaService', () => {
  let service: CausaBeneficaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CausaBeneficaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
