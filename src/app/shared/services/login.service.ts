import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { ILogin } from '../models/login.interface';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(
    private daoService: DaoService,
  ) { }

  autenticador(login: ILogin): Observable<HttpResponse<ILogin>> {
    return this.daoService.post<ILogin>('/api/autenticador', login, DaoService.MEDIA_TYPE_APP_JSON);
  }

}
