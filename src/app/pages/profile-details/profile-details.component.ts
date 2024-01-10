import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  selectedItemDetails: any;
  selectedItemId!: number;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,

  ) { };

  ngOnInit(): void {
    this.truncateFn()
    this.route.params.subscribe(params => {
      this.selectedItemId = +params['id'];
      this.fetchItemDetails();
    });
    this.calculateWindowHeight()
  }
  calculateWindowHeight() {
    let height = window.innerHeight * 0.01;
    let calcheight = 0;
    if (height > 9) {
      calcheight = 0.27
    } else if (height > 8.6) {
      calcheight = 0.25
    } else if (height > 8.4) {
      calcheight = 0.22
    } else if (height > 7) {
      calcheight = 0.10
    } else if (height > 6.6) {
      calcheight = 0.03
    }
    height = ((window.innerHeight) - ((window.innerHeight) * calcheight));
    height = height * 0.01;
    const vh = height;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateWindowHeight()
  }


  truncateFn() {
    const paragraph = document.getElementById('truncateText') as HTMLElement;
    if (paragraph) {
      const text = paragraph.textContent?.trim();
      if (text) {
        const words = text.split(' ');

        if (words.length > 5) {
          const truncatedText = words.slice(0, 5).join(' ');
          const readMoreSpan = document.createElement('span');
          readMoreSpan.textContent = '...Read More';
          readMoreSpan.style.color = '#f89801'; // Set the color

          paragraph.textContent = truncatedText + ' ';
          paragraph.appendChild(readMoreSpan);
        }
      }
    }
  }

  goBack() {
    this.router.navigate([''])
  }

  fetchItemDetails() {
    this.dataService.getDataById(this.selectedItemId).subscribe((response: any) => {
      this.selectedItemDetails = response;
    });
  }
}
