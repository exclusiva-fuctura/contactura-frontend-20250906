import { Component } from '@angular/core';
import { Menu } from '../shared/components/menu/menu';
import { MaterialModule } from '../material/material-module';
import { MenuService } from '../shared/services/menu.service';
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';
import { IDespesa } from '../shared/models/despesa.interface';
import { IReceita } from '../shared/models/receita.interface';

@Component({
  selector: 'app-dashboard',
  imports: [
    Menu,
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
    private menuService: MenuService
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
  }
}
