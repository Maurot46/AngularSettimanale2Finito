import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div id="login" class="container-fluid" [ngStyle]="{'background' : 'url(././assets/img/netflix-ultime-uscite.webp)'}">
        <div class="container d-flex justify-content-center">
            <div class="container text-center" id="card-login">
                <h3 class="text-dark mb-4">Registrati</h3>
                <form #form="ngForm" (ngSubmit)="onsubmit(form)">
                    <div class="mb-3 form-group">
                        <label for="name" class="form-label text-dark mb-3">Nome</label>
                        <input name="name" type="text" class="form-control" id="name" required ngModel>
                    </div>
                    <div class="mb-3 form-group">
                        <label for="email" class="form-label text-dark mb-3">Email</label>
                        <input type="email" name="email" class="form-control" id="email" required ngModel>
                    </div>
                    <div class="mb-3 form-group">
                        <label for="password" class="form-label text-dark mb-3">Password</label>
                        <input name="password" type="password" class="form-control" id="password" required ngModel>
                    </div>
                    <button type="submit" class="btn btn-danger mb-4 mt-3" [disabled]="form.invalid">Registrati</button>
                </form>
                <div class="text-dark">
                    <p>Sei già registrato? Effettua il <a [routerLink]="['/login']" class="text-danger">Login</a></p>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
    isLoading = false;


  constructor(private authSrv: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: NgForm) {
    this.isLoading = true
    console.log(form.value)
    try {
        await this.authSrv.registration(form.value).toPromise()
        this.router.navigate(['/login']);
    } catch (error) {
        this.isLoading = false
        console.error(error)
    }
}

}
