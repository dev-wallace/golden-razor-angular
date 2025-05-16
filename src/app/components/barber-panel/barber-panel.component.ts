import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-barber-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './barber-panel.component.html',
  styleUrls: ['./barber-panel.component.scss'] 
})
export class BarberPanelComponent {
  // Dados iniciais
  clients = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 9999-8888' },
    { id: 2, nome: 'Maria Souza', email: 'maria@email.com', telefone: '(11) 7777-6666' }
  ];

  barbers = [
    { id: 1, nome: 'Carlos Barbosa' },
    { id: 2, nome: 'Pedro Almeida' }
  ];

  // Formulários
  barberForm: FormGroup;
  editForm: FormGroup;

  // Controles de UI
  showEditModal = false;
  currentBarber: any = null;

  constructor(private fb: FormBuilder) {
    this.barberForm = this.fb.group({
      nome: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required]
    });
  }

  // Operações CRUD
  addBarber() {
    if (this.barberForm.valid) {
      const newBarber = {
        id: this.generateNewId(),
        ...this.barberForm.value
      };
      this.barbers = [...this.barbers, newBarber];
      this.barberForm.reset();
    }
  }

  deleteBarber(id: number) {
    this.barbers = this.barbers.filter(b => b.id !== id);
  }

  deleteClient(id: number) {
    this.clients = this.clients.filter(c => c.id !== id);
  }

  openEditModal(barber: any) {
    this.currentBarber = barber;
    this.editForm.patchValue(barber);
    this.showEditModal = true;
  }

  updateBarber() {
    if (this.editForm.valid) {
      this.barbers = this.barbers.map(b => 
        b.id === this.currentBarber.id ? this.editForm.value : b
      );
      this.closeModal();
    }
  }

  // Utilitários
  private generateNewId(): number {
    return this.barbers.length > 0 ? 
      Math.max(...this.barbers.map(b => b.id)) + 1 : 1;
  }

  closeModal() {
    this.showEditModal = false;
    this.currentBarber = null;
    this.editForm.reset();
  }
}