import { Component } from '@angular/core';
import { DoacoesService } from 'src/services/doacoes.service';
import { DoacaoDetalhadaComUsuarioEInstituicao } from 'src/services/entidades/doacao';

@Component({
  selector: 'app-doacoes-page',
  templateUrl: './doacoes-page.component.html',
  styleUrls: ['./doacoes-page.component.scss']
})
export class DoacoesPageComponent {
  public dadosDoacoesDetalhadas?: DoacaoDetalhadaComUsuarioEInstituicao[]

  constructor(private doacoesService: DoacoesService) {
  }

  ngOnInit(): void {
    this.doacoesService.listarDoacoesDetalhhadas().subscribe(data => {
      this.dadosDoacoesDetalhadas = data
      console.log(data);
    });
  }
}
