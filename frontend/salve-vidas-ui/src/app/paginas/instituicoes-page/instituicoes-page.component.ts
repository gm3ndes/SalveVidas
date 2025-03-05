import { Component } from '@angular/core';
import { Instituicao } from 'src/services/entidades/instituicao';
import { InstituicaoService } from 'src/services/instituicao.service';

@Component({
  selector: 'app-instituicoes-page',
  templateUrl: './instituicoes-page.component.html',
  styleUrls: ['./instituicoes-page.component.scss']
})
export class InstituicoesPageComponent {
  public dadosInstituicoes?: Instituicao[]

  constructor(private instituicaoService: InstituicaoService) {
  }

  ngOnInit(): void {
    this.instituicaoService.listarInstituicoes().subscribe(data => {
      this.dadosInstituicoes = data
      console.log(data);
    });
  }
}
