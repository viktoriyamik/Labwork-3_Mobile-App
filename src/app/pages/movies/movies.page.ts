import { MovieService, ApiResult } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  public movies: any[] = [];
 // movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private MovieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
    }

async loadMovies(event?: InfiniteScrollCustomEvent) {
  const loading = await this.loadingCtrl.create({
    message: 'Loading..',
    spinner: 'bubbles',
    });
  await loading.present();

  this.MovieService.getTopRateMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
     // this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
    },
    (err) => {
      console.log(err);
      loading.dismiss();
    }
  );
}

loadMore(event: InfiniteScrollCustomEvent) {
  this.currentPage++;
  this.loadMovies(event);
}
}


 

