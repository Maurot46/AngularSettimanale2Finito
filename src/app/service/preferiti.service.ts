import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferiti } from '../models/preferiti';

@Injectable({
    providedIn: 'root'
})
export class PreferitiService {

    constructor(private http: HttpClient) { }

    getpreferiti(): Observable<Preferiti[]> {
        return this.http.get<Preferiti[]>('http://localhost:4201/favorites');
    }
    postPreferiti(newFavorite: Partial<Preferiti>) {
        return this.http.post<Preferiti>('http://localhost:4201/favorites', newFavorite);
    }
    deletePreferiti(id: number) {
        return this.http.delete(`http://localhost:4201/favorites/${id}`);
    }

}
