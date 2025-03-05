import { Component } from '@angular/core';
import { Campanha, CampanhaComInstituicao } from 'src/services/entidades/campanha'
import { CampanhaService } from 'src/services/campanhas.service';
import { LoginService } from 'src/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroAtualizaCampanhaInput } from 'src/services/dtos/cadastro-atualiza-campanha-input';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-campanhas-page',
  templateUrl: './campanhas-page.component.html',
  styleUrls: ['./campanhas-page.component.scss']
})
export class CampanhasPageComponent {
  public dadosCampanha?: CampanhaComInstituicao[];
  public exibirFormulario = false;
  public campanhaForm: FormGroup;

  public id_campanha_selecionado?: number;

  constructor(
    private campanhaService: CampanhaService,
    private loginService: LoginService
  ) {
    this.campanhaForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', Validators.required),
      data_inicio: new FormControl(new Date(), Validators.required),
      data_fim: new FormControl(new Date(), Validators.required),
    });
  }

  ngOnInit(): void {
    this.campanhaService.listarCampanhasComInstituicao().subscribe(data => {
      this.dadosCampanha = data
      console.log(data);
    });
  }

  public excluirCampanha(c: Campanha) {
    if(c.id_instituicao === this.loginService.dadosInstituicaoVinculada()?.id_instituicao) {
      if(confirm("Deseja realmente apagar essa campanha?"))
        this.campanhaService.apagarCampanha(c.id_campanha).subscribe(x => {
          this.campanhaService.listarCampanhasComInstituicao().subscribe(data => {
            this.dadosCampanha = data
          });
        });
    } else {
      alert("Voce nao pode apagar esta campanha.")
    }
  }

  public destacarBotaoClicacel(c: Campanha) {
    if(c.id_instituicao === this.loginService.dadosInstituicaoVinculada()?.id_instituicao){
      return ["botao-clicavel"]
    }
    return [""]
  }
  
  public destacarCampanhaSelecionada(c: Campanha) {
    if(c.id_campanha === this.id_campanha_selecionado)
      return ["campanha-selecionada"]
    return [""];
  }

  public onSubmit() {
    console.log(this.campanhaForm);
    if(this.campanhaForm.valid) {
      const input = {
        id_campanha: this.id_campanha_selecionado,
        id_instituicao: this.loginService.dadosInstituicaoVinculada()?.id_instituicao,
        nome: this.campanhaForm.get('nome')?.value,
        descricao: this.campanhaForm.get('descricao')?.value,
        data_inicio: this.campanhaForm.get('data_inicio')?.value,
        data_fim: this.campanhaForm.get('data_fim')?.value
      } as CadastroAtualizaCampanhaInput

      this.campanhaService.cadastraAtualizaCampanha(input).pipe(
        map(x => {
          console.log(x);
          alert(x.message)
          this.campanhaService.listarCampanhasComInstituicao().subscribe(data => {
            this.dadosCampanha = data
          });
          this.exibirFormulario = false;
          this.campanhaForm.reset();
        }), catchError(e => {
          console.log(e)
          return of();
        })
      ).subscribe();
    }
  }

  public novoCadastro() {
    this.id_campanha_selecionado = undefined;
    this.exibirFormulario = true;
    this.campanhaForm.reset();
  }

  public estaLogado() {
    return this.loginService.estaLogado();
  }

  public atualizarCadastro(c: Campanha) {
    if(c.id_instituicao !== this.loginService.dadosInstituicaoVinculada()?.id_instituicao){
      alert("Voce nao tem vinculo com a instituicao dessa campanha, entao nao podera atualiza-la.");
      return;
    }
    this.id_campanha_selecionado = c.id_campanha;
    this.campanhaForm.setValue({
      "nome": c.id_nome,
      "descricao": c.descricao,
      "data_inicio": new Date(c.data_inicio).toISOString().split('T')[0],
      "data_fim": new Date(c.data_fim).toISOString().split('T')[0]
    }
    )
    this.exibirFormulario = true;
  }

  public fecharFormulario(){
    this.exibirFormulario = false;
    this.id_campanha_selecionado = undefined;
  }
}
