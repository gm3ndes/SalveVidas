import { Injectable } from '@angular/core';
import { Usuario } from './entidades/usuario';
import { Instituicao } from './entidades/instituicao';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuarioLogado?: Usuario;
  public instituicao?: Instituicao

  constructor() { }

  public registrarLogin(u: Usuario, i?: Instituicao) {
    this.usuarioLogado = u;
    this.instituicao = i;
  }

  public estaLogado() : boolean {
    return this.usuarioLogado ? true : false;
  }

  public dadosLogado() : {nome: string, nome_instituicao: string} {
    return {nome: this.usuarioLogado?.nome ?? '', nome_instituicao: this.instituicao?.nome ?? '' }
  }

  public dadosInstituicaoVinculada() {
    return this.instituicao;
  }

  public deslogarUsuario(){
    this.usuarioLogado = undefined;
    this.instituicao = undefined;
  }
}
