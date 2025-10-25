import { Component } from '@angular/core';
import { Menu } from '../shared/components/menu/menu';
import { MaterialModule } from '../material/material-module';
import { MenuService } from '../shared/services/menu.service';
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';
import { IDespesa } from '../shared/models/despesa.interface';
import { IReceita } from '../shared/models/receita.interface';
import { Logout } from '../shared/components/logout/logout';
import { LancamentosService } from '../shared/services/lancamentos';

@Component({
  selector: 'app-dashboard',
  imports: [
    Menu,
    Logout,
    MaterialModule
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
}
