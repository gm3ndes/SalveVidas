import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './entidades/usuario';
import { CadastroUsuarioInput } from './dtos/cadastro-usuario-input';
import { LoginInput } from './dtos/login-input';
import { createRequestOptions } from './http-utils';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private apiUrl = 'http://localhost:5000/api/';
    private paramsConfig = createRequestOptions()

    constructor(private http: HttpClient) {}

    listarUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl + "listar-usuarios");
    }

    cadastrarNovoUsuario(inputDto: CadastroUsuarioInput): Observable<any> {
        const body = JSON.stringify(inputDto);
        return this.http.post(this.apiUrl + "cadastrar-novo-usuario", body, this.paramsConfig);
    }

    loginUsuario(inputDto: LoginInput): Observable<any> {
        const body = JSON.stringify(inputDto);
        return this.http.post(this.apiUrl + "login-usuario", body, this.paramsConfig);
    }
}