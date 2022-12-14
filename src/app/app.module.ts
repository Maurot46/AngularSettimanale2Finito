import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DettagliUtenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
