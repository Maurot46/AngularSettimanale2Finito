import { NgModule } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'registration',
      component: RegisterComponent,
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class AuthRoutingModule { }
