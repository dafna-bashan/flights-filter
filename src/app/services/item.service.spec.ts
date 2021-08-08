import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { StoreModule } from '@ngrx/store';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should load items', () => {
  //   const flights = service.query(null)
  //   expect(flights).toContain({
  //     departure: 1627468100392,
  //     landing: 1627477288361,
  //     origin: 'Tel Aviv',
  //     destination: 'Athens',
  //     price: 150,
  //     connections: []
  //   })
  // })
});
