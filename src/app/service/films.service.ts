import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films } from '../models/films';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }


  getFilms(): Observable<Films[]> {
    return this.http.get<Films[]>('http://localhost:4201/movies-popular');
  }
}
