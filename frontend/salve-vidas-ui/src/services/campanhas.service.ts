import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campanha, CampanhaComInstituicao } from './entidades/campanha';
import { createRequestOptions } from './http-utils';
import { CadastroAtualizaCampanhaInput } from './dtos/cadastro-atualiza-campanha-input';

@Injectable({
    providedIn: 'root'
})
export class CampanhaService {
    private apiUrl = 'http://localhost:5000/api/';
    private paramsConfig = createRequestOptions()

    constructor(private http: HttpClient) {}

    listarCampanhas(): Observable<Campanha[]> {
        return this.http.get<Campanha[]>(this.apiUrl + "listar-campanhas");
    }

    listarCampanhasComInstituicao(): Observable<CampanhaComInstituicao[]> {
        return this.http.get<CampanhaComInstituicao[]>(this.apiUrl + "listar-campanhas-com-instituicao")
    }

    apagarCampanha(inputDto: number): Observable<any>{
        return this.http.delete<number>(this.apiUrl + "apagar-campanha/" + inputDto, this.paramsConfig)
    }

    cadastraAtualizaCampanha(inputDto: CadastroAtualizaCampanhaInput): Observable<any> {
        return this.http.post<any>(this.apiUrl + "cadastra-atualiza-campanha", inputDto, this.paramsConfig)
    }
}