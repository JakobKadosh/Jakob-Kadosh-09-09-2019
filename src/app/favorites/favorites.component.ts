import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { CrudService } from 'src/shared/services/crud.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCities = JSON.parse(window.localStorage.getItem("favorites"));
  favoriteLength = window.localStorage.length;
  favoriteCitiesConditions = [];
  isMetric:boolean;
  constructor(private router: Router, private service: CrudService) { }


  ngOnInit() {
    this.isMetric=JSON.parse(window.localStorage.getItem("isMetric"));
    this.getFavoritesCondoitions();
  }


  public getFavoritesCondoitions() {
    let observables = [];

    for (let i in this.favoriteCities) {
      observables.push(this.service.getCurrentConditions(this.favoriteCities[i].Key));
      this.favoriteCitiesConditions[i] = ({
        city: this.favoriteCities[i],
        currentConditions: {}
      });
    }
    forkJoin(
      observables
    ).subscribe(
      res => {
        for (let i in res) {
          this.favoriteCitiesConditions[i].currentConditions = res[i][0]
        }
      },
      err => {
        console.error("ERROR occured when fetching favorite cities conditions")
      }
    )
  }

 public showCurrentConditions(cityKey) {
    this.router.navigate(['home',cityKey]);
  }

}
