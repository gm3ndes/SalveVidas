import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosPageComponent } from './paginas/usuarios-page/usuarios-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DoacoesPageComponent } from './paginas/doacoes-page/doacoes-page.component';
import { InstituicoesPageComponent } from './paginas/instituicoes-page/instituicoes-page.component';
import { CampanhasPageComponent } from './paginas/campanhas-page/campanhas-page.component';
import { HeaderGeralComponent } from './componentes/header-geral/header-geral.component';
import { SobreNosPageComponent } from './paginas/sobre-nos-page/sobre-nos-page.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { RegisterPageComponent } from './paginas/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosPageComponent,
    DoacoesPageComponent,
    InstituicoesPageComponent,
    CampanhasPageComponent,
    HeaderGeralComponent,
    SobreNosPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
