import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { HttpResponse } from '@angular/common/http';
import { Lancamento } from '../models/lancamento.model';
import { Observable } from 'rxjs';
import { IDespesa } from '../models/despesa.interface';
import { IReceita } from '../models/receita.interface';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {
  
  constructor(
    private daoService: DaoService
  ) { }

  getLancamentos(): Observable<HttpResponse<Lancamento[]>>{
    return this.daoService.get<Lancamento[]>('/api/lancamento', DaoService.MEDIA_TYPE_APP_JSON);
  }

  salvarLancamento(lancamento: Lancamento): Observable<HttpResponse<Lancamento>> {
    return this.daoService.post<Lancamento>('/api/lancamento', lancamento, DaoService.MEDIA_TYPE_APP_JSON);
  }

  removerLancamento(id: number): Observable<HttpResponse<Lancamento>> {
    return this.daoService.delete<Lancamento>(`/api/lancamento/${id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  static despesaParaLancamento(despesa: IDespesa): Lancamento {
    const lancamento = new Lancamento(despesa);
    lancamento.setDespesa();
    return lancamento;
  }

  static receitaParaLancamento(receita: IReceita): Lancamento {
    const lancamento = new Lancamento(receita);
    lancamento.setReceita();
    return lancamento;
  }




}
