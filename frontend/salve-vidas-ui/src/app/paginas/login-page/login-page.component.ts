import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LoginInput } from 'src/services/dtos/login-input';
import { Instituicao } from 'src/services/entidades/instituicao';
import { Usuario } from 'src/services/entidades/usuario';
import { LoginService } from 'src/services/login.service';
import { UsuariosService } from 'src/services/usuarios.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private loginService: LoginService
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const input = {
        login: this.loginForm.get('email')?.value,
        senha: this.loginForm.get('senha')?.value
      } as LoginInput

      this.usuarioService.loginUsuario(input).pipe(
        map(response => {
          console.log(response);
          alert(response.message);
          this.loginService.registrarLogin(
            response.cadastro as Usuario, 
            response.relacaoInstituicao as Instituicao
          );
          this.router.navigate(['']);
        }),
        catchError(error => {
          alert(error.error.message)
          return of()
        })
      ).subscribe();
    }
  }
}
