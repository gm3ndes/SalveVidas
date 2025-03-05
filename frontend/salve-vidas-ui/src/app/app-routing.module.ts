import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosPageComponent } from './paginas/usuarios-page/usuarios-page.component';
import { CampanhasPageComponent } from './paginas/campanhas-page/campanhas-page.component';
import { InstituicoesPageComponent } from './paginas/instituicoes-page/instituicoes-page.component';
import { DoacoesPageComponent } from './paginas/doacoes-page/doacoes-page.component';
import { SobreNosPageComponent } from './paginas/sobre-nos-page/sobre-nos-page.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { RegisterPageComponent } from './paginas/register-page/register-page.component';

const routes: Routes = [
  { path: "", component: SobreNosPageComponent},
  { path: "sobre-nos", component: SobreNosPageComponent},
  { path: "usuarios", component: UsuariosPageComponent},
  { path: "campanhas", component: CampanhasPageComponent},
  { path: "instituicoes", component: InstituicoesPageComponent},
  { path: "doacoes", component: DoacoesPageComponent},

  { path: "login", component: LoginPageComponent},
  { path: "cadastro", component: RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
