import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false, navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  profileData: any;
  constructor(
    private router: Router,
    private dataService: DataService,
  ) {
  }
  ngOnInit(): void {
    this.getUserData();
  }

  selectImage(item: any) {
    this.router.navigate(['profile', item.id]);
  }

  sendDataToDataService(data: object) {
    this.router.navigate(['profile']);
  }


  getUserData(): void {
    this.dataService.getData().subscribe((response) => {
      this.profileData = response;
    });
  }
}
