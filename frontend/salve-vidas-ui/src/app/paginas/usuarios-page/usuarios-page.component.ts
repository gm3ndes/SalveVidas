import { Component } from '@angular/core';
import { Usuario } from 'src/services/entidades/usuario';
import { UsuariosService } from 'src/services/usuarios.service';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss']
})
export class UsuariosPageComponent {
  public dadosUsuarios?: Usuario[]

  constructor(private usuariosService: UsuariosService) {
  }

  ngOnInit(): void {
    this.usuariosService.listarUsuarios().subscribe(data => {
      this.dadosUsuarios = data
      console.log(data);
    });
  }
}
