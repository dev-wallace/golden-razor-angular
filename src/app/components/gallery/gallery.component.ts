import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Swiper } from 'swiper';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  imports: [CommonModule] 
})
export class GalleryComponent implements AfterViewInit {
  galleryImages: string[] = [
    'assets/images/corte-1.jpg',
    'assets/images/corte-2.jpg',
    'assets/images/corte-3.jpg',
    'assets/images/corte-4.jpg',
    'assets/images/corte-5.jpg',
    'assets/images/corte-6.jpg',
    'assets/images/corte-7.jpg',
    'assets/images/corte-8.jpg',
  ];

  trackByFn(index: number, item: string) {
    return item;
  }

  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}