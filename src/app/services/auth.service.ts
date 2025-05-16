import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn() {
        throw new Error('Method not implemented.');
    }
  private currentUser: User | null = null;

  constructor(private router: Router) {
    // Carrega usuário logado do localStorage ao iniciar
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  register(userData: Omit<User, 'id'>): Observable<AuthResponse> {
    return of(this.handleRegister(userData)).pipe(
      delay(500), // Simula delay de rede
      tap(response => {
        if (response.success && response.user) {
          this.currentUser = response.user;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
      })
    );
  }

  private handleRegister(userData: Omit<User, 'id'>): AuthResponse {
    const users = this.getUsers();
    
    // Verifica se email já existe
    if (users.some(u => u.email === userData.email)) {
      return {
        success: false,
        message: 'Este e-mail já está cadastrado'
      };
    }

    // Cria novo usuário
    const newUser: User = {
      id: this.generateId(users),
      ...userData
    };

    // Salva no localStorage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
    return {
      success: true,
      user: newUser
    };
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return of(this.handleLogin(email, password)).pipe(
      delay(500), // Simula delay de rede
      tap(response => {
        if (response.success && response.user) {
          this.currentUser = response.user;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
      })
    );
  }

  private handleLogin(email: string, password: string): AuthResponse {
    const user = this.getUsers().find(u => 
      u.email === email && u.password === password
    );

    if (!user) {
      return {
        success: false,
        message: 'Email ou senha incorretos'
      };
    }

    return {
      success: true,
      user
    };
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

// ... (outros métodos existentes)

getCurrentUser(): User | null {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

updateUser(updatedUser: User): Observable<AuthResponse> {
  const users = this.getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return of({
      success: true,
      user: updatedUser
    }).pipe(delay(500));
  }
  
  return of({
    success: false,
    message: 'Usuário não encontrado'
  }).pipe(delay(500));
}

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  

  private generateId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }
}