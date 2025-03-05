import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doacao, DoacaoDetalhadaComUsuarioEInstituicao } from './entidades/doacao';

@Injectable({
    providedIn: 'root'
})
export class DoacoesService {
    private apiUrl = 'http://localhost:5000/api/';

    constructor(private http: HttpClient) {}

    listarDoacoes(): Observable<Doacao[]> {
        return this.http.get<Doacao[]>(this.apiUrl + "listar-doacoes");
    }

    listarDoacoesDetalhhadas(): Observable<DoacaoDetalhadaComUsuarioEInstituicao[]> {
        return this.http.get<DoacaoDetalhadaComUsuarioEInstituicao[]>(this.apiUrl + "listar-doacoes-detalhado")
    }
}