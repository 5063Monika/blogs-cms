import { TestBed } from '@angular/core/testing';

import { Blogger } from './blogger';

describe('Blogger', () => {
  let service: Blogger;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Blogger);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
