import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(diff: number, ...args: unknown[]): string {
    // get total seconds between the times
    var delta = Math.abs(diff) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;

    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    if(days > 0) hours += 24
    // what's left is seconds
    // var seconds = delta % 60;  // in theory the modulus is not required
    return `${hours}h ${minutes}m`;
  }

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

}
