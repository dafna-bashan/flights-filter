import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'flight-preview',
  templateUrl: './flight-preview.component.html',
  styleUrls: ['./flight-preview.component.scss']
})
export class FlightPreviewComponent implements OnInit {

  @Input() flight: Flight

  constructor() { }

  ngOnInit(): void {
  }

  // getFormattedDate(timestamp: number) {
  //   return new Date(timestamp).toString().substr(0,21)
  // }
}
