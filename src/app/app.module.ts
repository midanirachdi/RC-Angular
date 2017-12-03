import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { LoginComponent } from './login/login.component';
import {UserService} from './services/user.service';
//Security
import {AuthService} from './services/auth.service';
import {jwtInterceptor} from './security/jwt.interceptor';
import { FacebookModule } from 'ngx-facebook';




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
    JobOffersComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(tabRoute),
    ButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: jwtInterceptor,
      multi: true
    },
    AuthService,
    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
