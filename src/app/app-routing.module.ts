import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dettagli-utente',
        component: DettagliUtenteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AuthModule,
    HttpClientModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
