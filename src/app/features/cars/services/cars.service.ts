import { Injectable } from '@angular/core';
import { Car } from '../models/car.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  public async getCarsSmall(): Promise<Car[]> {
    const res = await this.http.get<any>('assets/cars-small.json')
      .toPromise();
    const data = (res.data as Car[]);
    return data;
  }

}
