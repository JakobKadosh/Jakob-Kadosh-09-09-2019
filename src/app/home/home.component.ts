import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/shared/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchCitiesCtrl = new FormControl();
  filteredCities: any;
  isLoading = false;
  errorMsg: string;
  currentConditions: any;
  favoritCity: number;
  cityKey: any;
  fiveDayForcasts: any = [];
  favorites = [];
  currentCity;
  isMetric: boolean;
  tempUnit;


  constructor(private service: CrudService, private route: ActivatedRoute) {
    this.isMetric = true;
  }

  public displayFn(city) {
    return city ? city.LocalizedName + ", " + city.Country.LocalizedName : "";
  }

  public returnFn(city): number {
    return city ? city.Key : "";
  }

  public onHumanSelected(option) {
    if (!option) {
      return;
    }
    this.currentCity = option.value;
    this.getCurrentConditions(option.value);
  }

  ngOnInit() {
    window.localStorage.setItem("isMetric", JSON.stringify(this.isMetric));
    this.route.paramMap
      .subscribe(params => {
        this.cityKey = params.get("cityKey")
        if (this.cityKey) {

          this.showCityConditions(this.cityKey)
        }
        else {
          this.currentCity = JSON.parse(window.localStorage.getItem('currentCity'));

          if (this.currentCity) {
            this.getCurrentConditions(this.currentCity)
          }
          else {
            this.showCityConditions(215854)
          }
        }
      });

    this.searchCitiesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredCities = [];
          this.isLoading = true;
        }),
        switchMap(value => this.service.autocompleteCity(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        this.filteredCities = data;
      },
        () => {
          console.error("ERROR autocompleting search")
        }
      );
  }

  public showCityConditions(cityKey) {
    this.service.getCityDetails(cityKey).subscribe(
      res => {
        this.currentCity = res

        this.getCurrentConditions(res)
      },
      err => {
        console.error("ERROR occured fetching city")
      }
    );
  }

  public addToFavorites(city) {
    this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    if (!this.favorites) {
      this.favorites = this.favorites || [];
      this.favorites.push(city);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
      return;
    }
    for (const i in this.favorites) {
      if (this.favorites[i].Key == city.Key) {
        return;
      }
    }
    this.favorites.push(city);
    window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  public getCurrentConditions(city) {
    window.localStorage.setItem('currentCity', JSON.stringify(city));
    this.service.getCurrentConditions(city.Key)
      .subscribe(
        res => {
          this.currentConditions = res[0];
          this.currentConditions.LocalObservationDateTime = new Date(this.currentConditions.EpochTime * 1000)
          this.get5DayForecasts(city.Key)
        },
        err => {
          console.error("ERROR occcured fetching currnet conditions")
        }
      )
  }


  public get5DayForecasts(cityKey) {
    this.service.get5DayForcasts(cityKey, this.isMetric)
      .subscribe(
        res => {
          this.fiveDayForcasts = res;
        },
        err => {
          console.error("ERROR occured fetching five day forecasts")
        }
      )
  }

  getDay(oldDate: string) {
    let stringDate = oldDate;
    let date = new Date(stringDate);
    return date;
  }

  changeTempSystem() {
    setTimeout(() => { window.localStorage.setItem("isMetric", JSON.stringify(this.isMetric)) }, 500);

  }


}
