import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  profileForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', Validators.required)
  });

  appointments = [
    { service: 'Corte de Cabelo', date: new Date(), status: 'Confirmado' },
    { service: 'Barba', date: new Date(), status: 'Pendente' }
  ];

  serviceTypes = [
    { value: 'corte', label: 'Corte de Cabelo' },
    { value: 'barba', label: 'Barba' },
    { value: 'corte-barba', label: 'Corte e Barba' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileForm.patchValue({
      nome: currentUser.name,
      email: currentUser.email,
      telefone: currentUser.phone || ''
    });
  }

  onSubmitProfile() {
    if (this.profileForm.valid) {
      // Atualizar dados do usuário
      const updatedUser = {
        ...this.authService.getCurrentUser(),
        name: this.profileForm.value.nome!,
        email: this.profileForm.value.email!,
        phone: this.profileForm.value.telefone || undefined
      };

      // Aqui você implementaria a atualização no AuthService
      console.log('Perfil atualizado:', updatedUser);
    }
  }

  onSubmitPreferences() {
    console.log('Preferências atualizadas');
  }

  logout() {
    this.authService.logout();
  }
}