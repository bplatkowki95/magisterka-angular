import { CarsService } from './../../services/cars.service';
import { Component, OnInit, Output } from '@angular/core';
import { Car } from '../../models/car.type';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public cars: Car[];
  dialogVisible = false;
  carToEdit: Car;
  filters: {};
  constructor(private carService: CarsService) { }

  ngOnInit() {
    this.getCars();
  }
  private async getCars() {
    this.cars = await this.carService.getCarsSmall();
  }
  public showDialog() {
    this.dialogVisible = true;
  }
  public editCar(car) {
    this.carToEdit = car;
    this.dialogVisible = true;
  }
  public dialogClosedEvent() {
    this.dialogVisible = false;
    this.carToEdit = undefined;
  }

  public saveCarEvent(car: Car) {
    const carIndex = this.cars.findIndex(d => d.vin === car.vin);
    carIndex !== -1 ? (this.cars[carIndex] = car) : this.cars.push(car);
    this.cars = this.cars.slice();
  }

  public removeCar(vin: string) {
    const indexOfRemovedCar = this.cars.findIndex(d => d.vin === vin);
    if (indexOfRemovedCar !== -1) {
      this.cars.splice(indexOfRemovedCar, 1);
    }
  }

}
