import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { FlightFilterComponent } from './flight-filter.component';

describe('FlightFilterComponent', () => {
  let component: FlightFilterComponent;
  let fixture: ComponentFixture<FlightFilterComponent>;
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
      declarations: [ FlightFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the search dates to null', ()=>{
    component.resetDates()
    expect(component.filterByCopy.fromDate).toBe(null)
    expect(component.filterByCopy.toDate).toBe(null)
  })

  // it('should filter list', fakeAsync(()=>{
  // expect(component.filterByCopy).isNot()
  // }))
});
