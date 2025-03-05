import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-header-geral',
  templateUrl: './header-geral.component.html',
  styleUrls: ['./header-geral.component.scss']
})
export class HeaderGeralComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
  }

  public estaLogado() {
    return this.loginService.estaLogado();
  }

  public deslogar() {
    this.loginService.deslogarUsuario();
  }

  public navegarParaPagina(pagina: string) {
    this.router.navigate([pagina])
  }

  public get dadosLogado() {
    return this.loginService.dadosLogado();
  }
}
