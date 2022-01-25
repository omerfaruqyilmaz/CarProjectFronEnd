import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService  } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {

  baseUrl:string = "https://localhost:44380/images/";
  images:CarImage[];
  constructor(
    private carImageService: CarImageService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
      console.log(this.images);
    });
  }

  getActiveImageClass(carImage: CarImage) {
    if (carImage === this.images[0]) {
      return 'active';
    } else {
      return '';
    }
  }

  getImageSource(carImage: CarImage): string {
    let url: string = this.baseUrl + carImage.imagePath;
    return url;
  }
}
