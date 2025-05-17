

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

 onSubmit() {
  if (this.loginForm.valid) {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.user) {
          // Redirecionar baseado no tipo de usuário
          if (response.user.role === 'barber') {
            this.router.navigate(['/barber']);
          } else {
            this.router.navigate(['/user']);
          }
        } else {
          this.showError(response.message || 'Credenciais inválidas');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.showError('Erro ao tentar fazer login');
        console.error('Login error:', err);
      }
    });
  }
}

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}