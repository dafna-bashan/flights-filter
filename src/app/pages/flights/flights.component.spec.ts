import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FlightsComponent } from './flights.component';
import { StoreModule } from '@ngrx/store';
import { ItemService } from 'src/app/services/item.service';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';


describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let itemService: ItemService
  let flightMockList = [{
    departure: 1627307000392,
    landing: 1627319019361,
    origin: 'Tel Aviv',
    destination: 'london',
    price: 500,
    connections: [
      {
        departure: 1627307000392,
        landing: 1627319059361,
        origin: 'Tel Aviv',
        destination: 'Paris'
      },
      {
        departure: 1627319059361,
        landing: 1627307019361,
        origin: 'Paris',
        destination: 'London'
      }
    ]
  },
  {
    departure: 1627407000392,
    landing: 1627447019361,
    origin: 'Bangkok',
    destination: 'New York',
    price: 300,
    connections: [
      // {
      //   departure: 1627307000392,
      //   landing: 1627307110330,
      //   origin: 'Bangkok',
      //   destination: 'Beijing'
      // },
      // {
      //   departure: 1627307215330,
      //   landing: 1627447019361,
      //   origin: 'Beijing',
      //   destination: 'New York'
      // }
    ]
  },
  {
    departure: 1627468100392,
    landing: 1627477288361,
    origin: 'Tel Aviv',
    destination: 'Athens',
    price: 150,
    connections: []
  },
  {
    departure: 1627707000392,
    landing: 1627807019361,
    origin: 'Tel Aviv',
    destination: 'Melbourne',
    price: 1300,
    connections: [
      {
        departure: 1627707000392,
        landing: 1627717000392,
        origin: 'Tel Aviv',
        destination: 'Mumbai'
      },
      {
        departure: 1627727000392,
        landing: 1627747000392,
        origin: 'Mumbai',
        destination: 'Bangkok'
      },
      {
        departure: 1627847000392,
        landing: 1627807019361,
        origin: 'Bangkok',
        destination: 'Melbourne'
      }
    ]
  }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [FlightsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    itemService = TestBed.get(ItemService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould have been called', fakeAsync(() => {
    const spy = spyOn(itemService, 'query').and.returnValue(of(flightMockList))
    const subSpy = spyOn(itemService.query(null), 'subscribe')
    // component.ngOnInit()
    // tick()
    // expect(spy).toHaveBeenCalledBefore(subSpy)
    // expect(subSpy).toHaveBeenCalled()
  }))

  it('flight list should be defined', fakeAsync(() => {
    component.ngOnInit()
    expect(component.flights$).toBeDefined()
    // expect(component.flights$.)
  }))

  it('should filter list', fakeAsync(() => {
    component.ngOnInit()
    component.onSetFilter({
      origin: '',
      destination: 'london',
      minPrice: -Infinity,
      maxPrice: Infinity,
      connections: 'all',
      fromDate: '',
      toDate: '',
      sortBy: 'fastest'
    })
    component.flights$.subscribe(flights => {
      expect(flights).toEqual([flightMockList[0]])
    })
  }))
});
