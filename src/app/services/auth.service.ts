import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'client' | 'barber';
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
  private currentUser: User | null = null;

  constructor(private router: Router) {
    this.initializeMockData();
    this.loadUserFromStorage();
  }

  // Método de login
  login(email: string, password: string): Observable<AuthResponse> {
    const response = this.handleLogin(email, password);
    return of(response).pipe(
      delay(500),
      tap(res => {
        if (res.success && res.user) {
          this.currentUser = res.user;
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          this.redirectBasedOnRole(res.user.role);
        }
      })
    );
  }

  // Método de registro
  register(userData: Omit<User, 'id' | 'role'>): Observable<AuthResponse> {
    return of(this.handleRegister(userData)).pipe(
      delay(500),
      tap(response => {
        if (response.success && response.user) {
          this.currentUser = response.user;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.redirectBasedOnRole(response.user.role);
        }
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  isBarber(): boolean {
    return this.currentUser?.role === 'barber';
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  private initializeMockData(): void {
    if (!localStorage.getItem('users')) {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'Carlos Barbeiro',
          email: 'adm@adm',
          password: '@teste@TESTE1234',
          phone: '(11) 9999-8888',
          role: 'barber'
        },
        {
          id: 2,
          name: 'Cliente Teste',
          email: 'client@example.com',
          password: '123456',
          phone: '(11) 5555-4444',
          role: 'client'
        }
      ];
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
  }

private handleLogin(email: string, password: string): AuthResponse {
  if (email === 'adm@adm' && password === '@teste@TESTE1234') {
    const tempAdmin: User = {
      id: 999,
      name: 'Administrador Temporário',
      email: 'adm@adm',
      password: '@teste@TESTE1234',
      role: 'barber' // Força o role como barbeiro
    };
    return { success: true, user: tempAdmin };
  }

  const users = this.getUsers();
  const user = users.find(u => 
    u.email === email && 
    u.password === password
  );

  if (!user) {
    return { success: false, message: 'Credenciais inválidas' };
  }

  return { success: true, user };
}



private getUsers(): User[] {
  // Garantir que os barbeiros mockados estão sendo carregados
  return JSON.parse(localStorage.getItem('users') || '[]');
}

  private handleRegister(userData: Omit<User, 'id' | 'role'>): AuthResponse {
    const users = this.getUsers();
    
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Este e-mail já está cadastrado' };
    }

    const newUser: User = {
      id: this.generateId(users),
      ...userData,
      role: 'client' // Todos os novos registros são clientes por padrão
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
    return { success: true, user: newUser };
  }

  private redirectBasedOnRole(role: 'client' | 'barber'): void {
    const targetRoute = role === 'barber' ? '/barber' : '/user';
    this.router.navigate([targetRoute]);
  }

  

  private generateId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;
  }

  // Método para ADMIN criar barbeiros (apenas para desenvolvimento)
  createBarber(barberData: Omit<User, 'id'>): Observable<AuthResponse> {
    const users = this.getUsers();
    const newBarber: User = {
      id: this.generateId(users),
      ...barberData,
      role: 'barber'
    };

    localStorage.setItem('users', JSON.stringify([...users, newBarber]));
    
    return of({ success: true, user: newBarber }).pipe(delay(500));
  }
  
}