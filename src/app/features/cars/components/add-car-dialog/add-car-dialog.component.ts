import { UtilsService } from './../../services/utils.service';
import { carBrands } from './../../constants/car-brands';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Car } from '../../models/car.type';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.scss']
})
export class AddCarDialogComponent implements OnInit, OnChanges {
  @Input() dialogVisible = false;
  @Input() editedCar: Car;
  @Input() cars: Car[];
  @Output() saveCarEvent = new EventEmitter<Car>();
  @Output() dialogClosedEvent = new EventEmitter<void>();
  public submitted = false;
  public car: Car = new Car();
  public selectedBrand: string;
  public isEditDialog = false;
  public vinValidationFailed = false;
  public carBrands: SelectItem[] = [];
  constructor(private utilsService: UtilsService) {
    carBrands.forEach(d => {
      this.carBrands.push({ label: d, value: d });
    });
  }
  ngOnChanges(): void {
    if (this.editedCar) {
      this.isEditDialog = true;
      this.selectedBrand = this.editedCar.brand;
      this.car = this.utilsService.deepCopy(this.editedCar);
    } else {
      this.car = new Car();
    }
  }

  ngOnInit() {
  }

  public sendDialogClosedEvent() {
    this.dialogClosedEvent.emit();
  }

  public saveCar() {
    this.submitted = true;
    this.car.brand = this.selectedBrand;
    const validationPassed = this.validateCarInputs();
    this.validateCarVin();
    if (
      validationPassed &&
      (!this.vinValidationFailed || this.isEditDialog)
    ) {
      this.saveCarEvent.emit(this.car);
      this.sendDialogClosedEvent();
    }
  }

  public onDialogHide() {
    this.selectedBrand = null;
    this.car = new Car();
    this.submitted = false;
    this.isEditDialog = false;
    this.vinValidationFailed = false;
  }

  private validateCarVin() {
    if (this.car.vin) {
      const indexOfCar = this.cars.findIndex(d => d.vin === this.car.vin);
      this.vinValidationFailed = indexOfCar !== -1;
    }
  }
  private validateCarInputs() {
    return (
      this.car.brand &&
      this.car.model &&
      this.car.vin &&
      this.car.price &&
      this.car.year
    );
  }

}
