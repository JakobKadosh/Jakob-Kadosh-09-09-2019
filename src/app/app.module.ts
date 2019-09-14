import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { TempUnitPipe } from './pipes/temp-unit.pipe';

import {
  MatAutocompleteModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatToolbarModule,
  MatChipsModule ,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatTableModule
} from "@angular/material";
import { ForcastsPipe } from './pipes/forcasts.pipe';

const routes: Routes = [
  { path: "",redirectTo:"home", pathMatch:"full"},
  { path: "home/:cityKey", component: HomeComponent},
  { path: "favorites", component: FavoritesComponent },
  { path: "home", component: HomeComponent  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    TemperaturePipe,
    TempUnitPipe,
    ForcastsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule ,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTableModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
