import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material-module';
import { Menu } from '../../shared/components/menu/menu';
import { Logout } from '../../shared/components/logout/logout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../../shared/services/menu.service';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
import moment from 'moment';
import { MaiusculoDirective } from '../../shared/directives/maiusculo.directive';
import { DinheiroDirective } from '../../shared/directives/dinheiro.directive';
import { CommonModule } from '@angular/common';
import { IDespesa } from '../../shared/models/despesa.interface';
import { LancamentosService } from '../../shared/services/lancamentos';
import Swal from 'sweetalert2';
import convertToValueDB from '../../shared/functions/convert-value-db.function';
import convertToDateDB from '../../shared/functions/convert-date-db.function';

@Component({
  selector: 'app-despesas',
  imports: [
    Menu,
    Logout,
    MaiusculoDirective,
    DinheiroDirective,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,     
  ],
  templateUrl: './despesas.html',
  styleUrl: './despesas.scss'
})
export class Despesas {

  formulario!: FormGroup
  buttonLabel: string = 'Salvar';

  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private lancamentosService: LancamentosService
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.LANCAMENTO_DESPESA;
    this.initFormulario();
  }

  get tipos(): string[] {
    return ['Alimentação', 'Habitacão', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Outros'];
  }

  private initFormulario(): void {    
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      data: [ moment().format(), Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      descricao: ['', [Validators.required]],
      ehFixo: [false],
    });
  }

  private salvarFormulario(despesa: IDespesa): void {
    this.lancamentosService.salvarLancamento(
      LancamentosService.despesaParaLancamento(despesa)).subscribe({
      next: (response) => {
        if (!response.body) {
          Swal.fire({
            title: "Despesa",
            text: `Despesa salva com sucesso!`,
            icon: "success"       
          });

          return;
        } 
        const {id} = response.body;
        Swal.fire({
          title: "Despesa",
          text: `Despesa ${id} salva com sucesso!`,
          icon: "success"       
        });
        this.onLimpar();
      },
      error: (error) => {
        Swal.fire({
            title: "Ocorreu um error",
            text: error.error?.mensagem || 'Não foi possível salvar a despesa.',
            icon: "warning"       
          });
      }
    });
    
  }
  
  onLimpar(): void {
    this.formulario.reset();
  }

  onSalvar(): void {
    const despesa: IDespesa = this.formulario.value;    
    despesa.valor = convertToValueDB(despesa.valor);
    despesa.data = convertToDateDB(despesa.data);
    this.salvarFormulario(despesa);
  }
}
