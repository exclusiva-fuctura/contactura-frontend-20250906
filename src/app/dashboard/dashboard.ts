import { Component } from '@angular/core';
import { Menu } from '../shared/components/menu/menu';
import { MaterialModule } from '../material/material-module';
import { MenuService } from '../shared/services/menu.service';
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';
import { IDespesa } from '../shared/models/despesa.interface';
import { IReceita } from '../shared/models/receita.interface';
import { Logout } from '../shared/components/logout/logout';
import { LancamentosService } from '../shared/services/lancamentos';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [
    Menu,
    Logout,
    MaterialModule,
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  dataSourceDespesas: IDespesa[] = [];
  dataSourceReceitas: IReceita[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
  
  constructor(
    private menuService: MenuService,
    private lancamentosService: LancamentosService
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
    this.obterLancamentos();
  }

  private obterLancamentos(): void {
    this.lancamentosService.getLancamentos().subscribe({
      next: (response) => {
        const lancamentos = response.body || [];
        this.dataSourceDespesas = lancamentos.filter(l => l.ehReceita === false);
        this.dataSourceReceitas = lancamentos.filter(l => l.ehReceita === true);
      },
      error: (error) => {
        console.error('Erro ao obter lançamentos:', error);
      }
    });
  }

  private removerLancamento(despesa: IDespesa): void {
    const lancamento = LancamentosService.despesaParaLancamento(despesa);
    this.lancamentosService.removerLancamento(lancamento.id!).subscribe({
      next: () => {
        this.obterLancamentos();
        Swal.fire({
          title: "Removido!",
          text: "Despesa removida com sucesso.",
          icon: "success"
        });
      },
      error: (error) => {
        Swal.fire({
          title: "Ocorreru um erro!",
          text: error.error?.mensagem || 'Não foi possível remover a despesa.',
          icon: "warning"
        });
      }
    });
  }

  onRemover(lancamento: IDespesa | IReceita): void {
    Swal.fire({
      title: "Remover Despesa",
      text: `Deseja Remover a Despesa ${lancamento.descricao}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {
        this.removerLancamento(lancamento as IDespesa);
      }
    });


    
  }
}
