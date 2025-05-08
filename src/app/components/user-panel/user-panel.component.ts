import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  profileForm = new FormGroup({
    nome: new FormControl('João Silva', Validators.required),
    email: new FormControl('joao@exemplo.com', [Validators.required, Validators.email]),
    telefone: new FormControl('(11) 99999-9999', Validators.required)
  });

  appointments = [
    { service: 'Corte', date: '2023-11-15', status: 'Confirmado', actions: ['Cancelar'] },
    { service: 'Barba', date: '2023-11-20', status: 'Agendado', actions: ['Cancelar', 'Reagendar'] }
  ];

  onSubmitProfile() {
    if (this.profileForm.valid) {
      console.log('Dados do perfil:', this.profileForm.value);
      // Adicione aqui a lógica para salvar os dados
    }
  }
}