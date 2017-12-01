import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppHeaderComponent } from './template/app-header/app-header.component';
import { SliderComponent } from './template/slider/slider.component';
import { ImageboxComponent } from './template/imagebox/imagebox.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { VideosectionComponent } from './template/videosection/videosection.component';
import { EventsectionComponent } from './template/eventsection/eventsection.component';
import { CallforactionsectionComponent } from './template/callforactionsection/callforactionsection.component';
import { BlogsectionComponent } from './template/blogsection/blogsection.component';
import { TestimonialsectionComponent } from './template/testimonialsection/testimonialsection.component';
import { FooterComponent } from './template/footer/footer.component';
import { VolunteersectionComponent } from './template/volunteersection/volunteersection.component';
import {RouterModule, Routes} from "@angular/router";
import {ButtonModule} from "primeng/primeng";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { JobOffersComponent } from './job-offers/job-offers.component';

const tabRoute:Routes=[
  {path:"jobOffers",component:JobOffersComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SliderComponent,
    ImageboxComponent,
    NavbarComponent,
    VideosectionComponent,
    EventsectionComponent,
    CallforactionsectionComponent,
    BlogsectionComponent,
    TestimonialsectionComponent,
    FooterComponent,
    VolunteersectionComponent,
    JobOffersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(tabRoute),
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
