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
  private mockBarbers: User[] = [
    {
      id: 1,
      name: 'Carlos Barbeiro',
      email: 'barber1@example.com',
      password: '123456',
      phone: '(11) 9999-8888',
      role: 'barber'
    },
    {
      id: 2,
      name: 'João Barbeiro',
      email: 'barber2@example.com',
      password: '123456',
      phone: '(11) 7777-6666',
      role: 'barber'
    }
  ];

  constructor(private router: Router) {
    this.initializeMockData();
    this.loadUserFromStorage();
  }

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
      const mockUsers = [
        ...this.mockBarbers,
        {
          id: 3,
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
    const users = this.getUsers();
    const user = users.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === 'barber'
    );

    return user 
      ? { success: true, user }
      : { success: false, message: 'Credenciais inválidas ou acesso não autorizado' };
  }

  private redirectBasedOnRole(role: 'client' | 'barber'): void {
    role === 'barber'
      ? this.router.navigate(['/barber'])
      : this.router.navigate(['/user']);
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;
  }
}