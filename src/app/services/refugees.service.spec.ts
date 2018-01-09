import { TestBed, inject } from '@angular/core/testing';

import { RefugeesService } from './refugees.service';

describe('RefugeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefugeesService]
    });
  });

  it('should be created', inject([RefugeesService], (service: RefugeesService) => {
    expect(service).toBeTruthy();
  }));
});
