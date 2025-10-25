import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { HttpResponse } from '@angular/common/http';
import { Lancamento } from '../models/lancamento.model';
import { Observable } from 'rxjs';

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
}
