import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instituicao } from './entidades/instituicao';

@Injectable({
    providedIn: 'root'
})
export class InstituicaoService {
    private apiUrl = 'http://localhost:5000/api/';

    constructor(private http: HttpClient) {}

    listarInstituicoes(): Observable<Instituicao[]> {
        return this.http.get<Instituicao[]>(this.apiUrl + "listar-instituicoes");
    }
}