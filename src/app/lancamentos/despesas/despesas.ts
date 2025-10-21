import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material-module';
import { Menu } from '../../shared/components/menu/menu';
import { Logout } from '../../shared/components/logout/logout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-despesas',
  imports: [
    Menu,
    Logout,
    ReactiveFormsModule,
    MaterialModule,     
  ],
  templateUrl: './despesas.html',
  styleUrl: './despesas.scss'
})
export class Despesas {

  formulario!: FormGroup
  buttonLabel: string = 'Salvar';
  
  onLimpar(): void {
    this.formulario.reset();
  }

  onSalvar(): void {
    // Lógica para salvar a despesa
  }
}
