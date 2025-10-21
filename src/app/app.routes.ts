import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { Dashboard } from './dashboard/dashboard';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'dashboard', component: Dashboard},
    { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos-routing-module').then(m => m.LancamentosRoutingModule) },
    { path: 'relatorio-despesas', loadComponent: () => import('./relatorios/despesas/despesas').then(c => c.Despesas) },
    { path: 'relatorio-receitas', loadComponent: () => import('./relatorios/receitas/receitas').then(c => c.Receitas) },
    { path: '**', component: PageNotFound },
];
