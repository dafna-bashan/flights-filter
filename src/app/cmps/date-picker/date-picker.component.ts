import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import {FormGroup, FormControl} from '@angular/forms';
import { FilterBy } from 'src/app/models/filter-by';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() filterBy: FilterBy
  @Output() onFilter = new EventEmitter<FilterBy>()

  filterByCopy: FilterBy

  constructor() {
    this.filterByCopy = { ...this.filterBy }
  }

  ngOnInit(): void {
  }

}
