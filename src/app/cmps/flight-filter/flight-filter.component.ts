import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterBy } from 'src/app/models/filter-by';

@Component({
  selector: 'flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss']
})
export class FlightFilterComponent implements OnInit {

  @Input() filterBy: FilterBy = {
    origin: '',
    destination: '',
    minPrice: -Infinity,
    maxPrice: Infinity,
    connections: 'all',
    fromDate: '',
    toDate: '',
    sortBy:'fastest'
  }
  @Output() onFilter = new EventEmitter<FilterBy>()

  filterByCopy: FilterBy

  constructor() {
    this.filterByCopy = { ...this.filterBy }
  }

  ngOnInit(): void {
  }

  resetDates() {
    this.filterByCopy.fromDate = null
    this.filterByCopy.toDate = null
    this.onFilter.emit(this.filterByCopy)
  }
}
