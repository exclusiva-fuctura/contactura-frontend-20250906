import { Component } from '@angular/core';
import { MaterialModule } from '../material/material-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../shared/models/login.interface';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onLogon(): void {
    const login: ILogin = this.formulario.value;
    
    this.loginService.autenticador(login).subscribe({
      next: (response) => {
        if (response.status === 201){
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.log(error.status)
        if (error.status === HttpStatusCode.InternalServerError) {
          Swal.fire({
            title: "Erro no Servidor",
            text: "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
            icon: "error"
          });
          return;
        } 

        Swal.fire({
          title: "Acesso Negado",
          text: error.error?.mensagem || "Erro ao tentar efetuar o login.",
          icon: "warning"
        });
      }
    });
  }
}
