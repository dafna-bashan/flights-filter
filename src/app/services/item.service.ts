import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { FilterBy } from '../models/filter-by';
import { Flight } from '../models/flight';
import { LoadingItems } from '../store/actions/item.actions';
import { ItemState } from '../store/reducers/item.reducer';
import { storageService } from './async-storage.service'

const ENTITY = 'item'
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private store: Store<ItemState>) {
    // If empty - load test data to storage
    const items = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!items || items.length === 0) {
      console.log('creating items');
      localStorage.setItem(ENTITY, JSON.stringify(this.createItems()))
    }
  }
  query(filterBy : FilterBy): Observable<Flight[]> {
    this.store.dispatch(new LoadingItems());
    console.log('ItemService: Return Items ===> effect');
    return from(storageService.query(ENTITY, filterBy) as Promise<Flight[]>)
    // return new Observable((observer) => observer.next(items));
  }
  getById(itemId: string): Observable<Flight> {
    console.log('ItemService: Return Item ===> effect');
    return from(storageService.get(ENTITY, itemId) as Promise<Flight>)
  }
  remove(itemId: string): Observable<boolean> {
    console.log('ItemService: Removing Items ===> effect');
    return from(storageService.remove(ENTITY, itemId))
  }

  save(item: Flight): Observable<Flight> {
    const method = (item.id) ? 'put' : 'post'
    const prmSavedItem = storageService[method](ENTITY, item)
    console.log('ItemService: Saving Item ===> effect');
    return from(prmSavedItem) as Observable<Flight>
  }

  private createItems(): Flight[] {
    return [{
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
      .map(flight => ({ id: storageService.makeId(), ...flight }))
  }
  //   get emptyItem(): Flight {
  //     return {
  //       id: '',
  //       txt: ''
  //     }
  //   }
}
