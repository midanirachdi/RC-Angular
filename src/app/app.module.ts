import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppHeaderComponent } from './template/app-header/app-header.component';
import { SliderComponent } from './template/homepage/slider/slider.component';
import { ImageboxComponent } from './template/homepage/imagebox/imagebox.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { VideosectionComponent } from './template/homepage/videosection/videosection.component';
import { EventsectionComponent } from './template/homepage/eventsection/eventsection.component';
import { CallforactionsectionComponent } from './template/homepage/callforactionsection/callforactionsection.component';
import { BlogsectionComponent } from './template/homepage/blogsection/blogsection.component';
import { TestimonialsectionComponent } from './template/homepage/testimonialsection/testimonialsection.component';
import { FooterComponent } from './template/footer/footer.component';
import { VolunteersectionComponent } from './template/homepage/volunteersection/volunteersection.component';
import {RouterModule, Routes} from "@angular/router";
import {ButtonModule} from "primeng/primeng";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { JobOffersComponent } from './job-offers/job-offers.component';
import { HomepageComponent } from './template/homepage/homepage.component';
import { ProfileComponent } from './template/profile/profile.component';

const tabRoute:Routes=[
  {path:"",component:HomepageComponent},
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
    JobOffersComponent,
    HomepageComponent,
    ProfileComponent
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
