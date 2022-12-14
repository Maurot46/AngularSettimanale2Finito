import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid mx-lg-4">
            <img src="../../assets/img/Netflix-logo.png" alt="logo netflix" id="logo">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
                aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <h3 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Netflix</h3>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link active" [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" >Movies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mb-3" [routerLink]="['/dettagli-utente']" routerLinkActive="active">Profilo</a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <button type="button" class="btn btn-danger" (click)="logOut()">Log out</button>
                    </span>
                </div>
            </div>
        </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
  }
  logOut() {
    this.authSrv.logout();
}

}
