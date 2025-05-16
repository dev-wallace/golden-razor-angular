import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: any;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoading = false;

  registerForm = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Zà-úÀ-Ú\s]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    telefone: new FormControl('', [
      Validators.pattern(/^\d{11}$/)
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/)
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      
      const userData = {
        name: this.registerForm.value.nome!,
        email: this.registerForm.value.email!,
        phone: this.registerForm.value.telefone || undefined,
        password: this.registerForm.value.senha!
      };

      this.authService.register(userData).subscribe({
        next: (response: RegisterResponse) => {
          this.isLoading = false;
          if (response.success) {
            this.showSuccess('Cadastro realizado com sucesso!');
            this.router.navigate(['/login']);
          } else {
            this.showError(response.message || 'Erro ao cadastrar');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.showError('Erro ao conectar com o servidor');
          console.error('Erro no registro:', error);
        }
      });
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}