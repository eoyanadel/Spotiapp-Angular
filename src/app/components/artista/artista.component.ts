import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista: any = {};
  toptracks: any[] = [];
  loading: boolean;

  constructor(private activatedroute: ActivatedRoute,
              private spotify: SpotifyService) {

    this.loading = true;
    this.activatedroute.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {

    this.loading = true;
    this.spotify.getArtista(id)
        .subscribe(data => {
          console.log(data);
          this.artista = data;
          this.loading = false;
        });
  }

  getTopTracks(id: string) {
    this.spotify.getToptracks(id)
        .subscribe(data => {
          console.log(data);
          this.toptracks = data;
        });
  }

}
