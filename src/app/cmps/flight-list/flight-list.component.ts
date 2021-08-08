import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {

  @Input() flights: Flight[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
