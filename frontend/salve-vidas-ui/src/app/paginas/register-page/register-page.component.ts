import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { CadastroUsuarioInput } from 'src/services/dtos/cadastro-usuario-input';
import { UsuariosService } from 'src/services/usuarios.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private usuarioService: UsuariosService
  ) { 
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      tipoSanguinio: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const input = {
        nome: this.registerForm.get('nome')?.value,
        sobrenome: this.registerForm.get('sobrenome')?.value,
        email: this.registerForm.get('email')?.value,
        senha: this.registerForm.get('senha')?.value,
        tipoSanguinio: this.registerForm.get('tipoSanguinio')?.value,
      } as CadastroUsuarioInput

      this.usuarioService.cadastrarNovoUsuario(input)
      .pipe(
        map(response => {
          alert(response.message);
          this.router.navigate(['login']);
        }),
        catchError(error => {
          alert(error.error.message)
          return of()
        }))
      .subscribe()
    }
  }
}
