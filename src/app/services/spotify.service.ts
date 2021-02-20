import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  /* ProvidedIn evita tener que incluir el servicio en el archivo de app.module.ts */
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers  = new HttpHeaders({
      'Authorization': 'Bearer BQBOCr81Wv5G5K4-wpMR0wGmo_BFefLY_hpjMxrlUcQnYlUoP6ktdbaEYnxJtZgtolRxRd8ZY3qb9T0aEYw'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
                .pipe(map(data => data['albums'].items));
  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {

    return this.getQuery(`artists/${ id }`);
                /* .pipe(map(data => data['artists'].items)); */
  }

  getToptracks(id: string) {

    return this.getQuery(`artists/${ id }/top-tracks?market=ES`)
              .pipe(map(data => data['tracks']));
  }
}
