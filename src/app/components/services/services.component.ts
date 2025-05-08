import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {
      title: 'CORTE',
      price: 'R$ 110.00',
      image: 'assets/cabelo-homem-corte.avif'
    },
    {
      title: 'BARBA',
      price: 'R$ 40.00',
      image: 'assets/cortador-de-barba.avif'
    },
    {
      title: 'CORTE + BARBA',
      price: 'R$ 140.00',
      image: 'assets/cabeloEbarba.avif'
    }
  ];
}