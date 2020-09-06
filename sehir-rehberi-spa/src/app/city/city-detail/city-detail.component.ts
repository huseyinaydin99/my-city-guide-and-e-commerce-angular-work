import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/City';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Photo } from 'src/app/models/Photo';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cityService: CityService) { }
  city: City;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  photos: Photo[] = [];
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCityById(params["cityId"]);
      //alert('selam')
      this.getPhotosByCityId(params["cityId"]);
    });
  }

  getCityById(cityId) {
    this.cityService.getCityById(cityId).subscribe(data => {
      this.city = data;
    });
  }

  getPhotosByCityId(cityId) {
    this.cityService.getPhotosByCityId(cityId).subscribe(data => {
      this.photos = data;
      this.setGallery();
    })
  }

  getImages() {
    let imageUrls = [];
    this.photos.forEach(element => {
      imageUrls.push({
        small: element.url,
        medium: element.url,
        big: element.url
      });
    });
    return imageUrls;
  }

  setGallery(): void {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true
      }
    ];

    this.galleryImages = this.getImages();
  }

}
