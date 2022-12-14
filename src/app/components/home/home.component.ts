import { Component, OnInit } from '@angular/core';
import { Films } from 'src/app/models/films';
import { Preferiti } from 'src/app/models/preferiti';
import { HttpClient } from '@angular/common/http';
import { FilmsService } from 'src/app/service/films.service';
import { PreferitiService } from 'src/app/service/preferiti.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    template: `
  <app-navbar></app-navbar>
  <div class="container-fluid" id="film">
        <div class="row justify-content-center">
            <div class="container d-flex flex-wrap justify-content-center mt-3">
                <div *ngFor="let film of films" class="card m-3" style="width: 19rem; background-color: black">
                    <img src="http://image.tmdb.org/t/p/w500/{{film.poster_path}}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-text text-white">{{film.title}}</h5>
                        <a class="btn {{film.like ? 'text-danger' : 'text-secondary'}} fs-5"  (click)="piaciuti(film.id, $event)"><i class="bi bi-heart-fill"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container d-flex justify-content-center mt-3" id="loading">
            <div class="spinner-border d-flex justify-content-center text-white" role="status" *ngIf="loading">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  `,
    styles: [
    ]
})
export class HomeComponent implements OnInit {
    sub!: Subscription
    films: Films[] | undefined
    loading = true;
    userdata: any = []
    preferiti: Preferiti[] | undefined

    constructor(private http: HttpClient, private filmSrv: FilmsService, private prefSrv: PreferitiService) { }

    ngOnInit() {
        this.getFilms();
        this.getUser();
        this.load();
    }
    load() {
        this.filmSrv.getFilms().subscribe(films => {
            this.films = films;
            if (this.userdata.user.id !== null) {
                this.prefSrv.getpreferiti().subscribe(pref => {
                    this.films = this.films!.map(films => {
                        if (pref.find(value => value.movieId === films.id && value.userId === this.userdata.user.id)) {
                            films.like = true;
                            films.userId = this.userdata.user.id;
                        }
                        return films;
                    });
                });
            }
        });
    }
    getFilms() {
        this.filmSrv.getFilms().subscribe(films => {
            this.films = films;
            this.loading = false;
        });
    }
    getUser() {
        let userLogger: any = localStorage.getItem('user');
        this.userdata = JSON.parse(userLogger);
    }
    piaciuti(id: number, event: any) {
        if (this.userdata.user.id !== null) {
            this.films = this.films!.map(films => {
                if (films.id === id) {
                    films.like = !films.like;
                    if (films.like) {
                        let newFavorite: {
                            movieId: number,
                            userId: number
                        } = {
                            movieId: films.id,
                            userId: this.userdata.user.id
                        }
                        this.prefSrv.postPreferiti(newFavorite).subscribe();
                    } else {
                        this.prefSrv.deletePreferiti(id).subscribe();
                    }
                }
                return films;
            });
        }
    }

}
