import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulário válido:', this.registerForm.value);
      // Lógica de cadastro aqui
    }
  }
}