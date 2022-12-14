import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dettagli-utente',
  template: `
  <app-navbar></app-navbar>
  <div class="container text-center text-white">
        <h2 class="mb-4">Dettagli utente: </h2>
        <p class="mb-4">Nome: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
    </div>
  `,
  styles: [
  ]
})
export class DettagliUtenteComponent implements OnInit {

    user: any = []

    constructor() { }

    ngOnInit(): void {
        let userLogger: any = localStorage.getItem('user');
        this.user = JSON.parse(userLogger);
        console.log(userLogger);
    }

}
