import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CarService } from './car.service';
import { Car } from './car';

@Component({
  selector: 'app-cars',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {

  // Component properties
  allCars: Car[];
  statusCode: number;
  requestProcessing = false;
  processValidation = false;

  // Create form
  carForm = new FormGroup({
    type: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getCars()
      .subscribe(
        data => this.allCars = data,
        errorCode => this.statusCode = errorCode
      );
  }

  // Handle create car
  onCarFormSubmit() {
    this.processValidation = true;
    if (this.carForm.invalid) {
      return;
    }

    this.preProcessConfigurations()
    let type = this.carForm.get('type').value.trim();
    let price = this.carForm.get('price').value.trim();

    let car = new Car(null, type, price);
    this.carService.addCar(car)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllCars();

      },
      errorCode => this.statusCode = errorCode);
  }

  // Delete car
  deleteCar(carId: string) {
    this.preProcessConfigurations();
    this.carService.deleteCarById(carId)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllCars();
      },
      errorCode => this.statusCode = errorCode);
  }

  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

}
