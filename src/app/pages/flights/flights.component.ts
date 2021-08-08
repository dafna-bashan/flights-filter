import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { FilterBy } from 'src/app/models/filter-by';
import { Flight } from 'src/app/models/flight';
import { LoadItems } from 'src/app/store/actions/item.actions';
import { State } from 'src/app/store/store';

@Component({
  selector: 'flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  flights$: Observable<Flight[]>;
  flight$: Observable<Flight | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  filterBy: FilterBy = {
    origin: '',
    destination: '',
    minPrice: -Infinity,
    maxPrice: Infinity,
    connections: 'all',
    fromDate: '',
    toDate: '',
    sortBy:'fastest'
  }
  // sortBy: string

  constructor(private store: Store<State>) {
    this.flights$ = this.store.select('itemState').pipe(pluck('items'));
    this.flight$ = this.store.select('itemState').pipe(pluck('item'));
    this.isLoading$ = this.store.select('itemState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('itemState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    console.log('itemApp: dispatching LoadItems => effects');
    this.store.dispatch(new LoadItems(this.filterBy));
    // this.store.dispatch(new LoadItems());

  }

  onSetFilter(filterBy: FilterBy) {
    this.filterBy = { ...filterBy }
    console.log('itemApp: dispatching LoadItems => effects');
    this.store.dispatch(new LoadItems(this.filterBy));
  }

  // onSetSort(sortBy: string) {
  //   this.sortBy = sortBy
  //   console.log('itemApp: dispatching LoadItems => effects');
  //   this.store.dispatch(new LoadItems(this.filterBy));
  // }
}
