import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Adicione esta linha
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  profileForm = new FormGroup({
    nome: new FormControl('João Silva', Validators.required),
    email: new FormControl('joao@example.com', [Validators.required, Validators.email]),
    telefone: new FormControl('(11) 99999-9999', Validators.required)
  });

  appointments = [
    { service: 'Corte de Cabelo', date: '2023-12-15', status: 'Confirmado' },
    { service: 'Barba', date: '2023-12-20', status: 'Pendente' }
  ];

  serviceTypes = [
    { value: 'corte', label: 'Corte de Cabelo' },
    { value: 'barba', label: 'Barba' },
    { value: 'corte-barba', label: 'Corte e Barba' }
  ];

  onSubmitProfile() {
    if (this.profileForm.valid) {
      console.log('Perfil atualizado:', this.profileForm.value);
      // Adicione lógica de atualização aqui
    }
  }

  onSubmitPreferences() {
    console.log('Preferências atualizadas');
    // Adicione lógica de atualização aqui
  }
}