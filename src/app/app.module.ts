import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppHeaderComponent} from './template/app-header/app-header.component';
import {SliderComponent} from './template/homepage/slider/slider.component';
import {ImageboxComponent} from './template/homepage/imagebox/imagebox.component';
import {NavbarComponent} from './template/navbar/navbar.component';
import {VideosectionComponent} from './template/homepage/videosection/videosection.component';
import {EventsectionComponent} from './template/homepage/eventsection/eventsection.component';
import {CallforactionsectionComponent} from './template/homepage/callforactionsection/callforactionsection.component';
import {BlogsectionComponent} from './template/homepage/blogsection/blogsection.component';
import {TestimonialsectionComponent} from './template/homepage/testimonialsection/testimonialsection.component';
import {FooterComponent} from './template/footer/footer.component';
import {VolunteersectionComponent} from './template/homepage/volunteersection/volunteersection.component';
import {RouterModule, Routes} from "@angular/router";
import {ButtonModule, CalendarModule, DialogModule} from "primeng/primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JobOffersComponent} from './template/profile/job-offers/job-offers.component';
import {HomepageComponent} from './template/homepage/homepage.component';
import {ProfileComponent} from './template/profile/profile.component';
import {LoginComponent} from './login/login.component';
import {UserService} from './services/user.service';
//Security
import {AuthService} from './services/auth.service';
import {jwtInterceptor} from './security/jwt.interceptor';
import {FacebookModule} from 'ngx-facebook';

import {UserInfoComponent} from './template/profile/user-info/user-info.component';

import {JobofferService} from "./services/joboffer.service";
import {JobOffersListComponent} from './template/profile/job-offers/job-offers-list/job-offers-list.component';
import {JobOffersItemComponent} from './template/profile/job-offers/job-offers-list/job-offers-item/job-offers-item.component';
import {JobOffersDetailComponent} from './template/profile/job-offers/job-offers-detail/job-offers-detail.component';
import { SearchJobOffersByTitlePipe} from './pipes/search-job-offers-by-title.pipe';
import {SpeechService} from "./services/speech.service";



const tabRoute: Routes = [
  {path: "", component: HomepageComponent, pathMatch: 'full'},
  {
    path: "profile", component: ProfileComponent,
    children: [
      {path: "", component: UserInfoComponent, pathMatch: 'full'},
      {path: "joboffers", component: JobOffersComponent}
    ]
  }

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
    HomepageComponent,
    ProfileComponent,
    UserInfoComponent,
    JobOffersListComponent,
    JobOffersItemComponent,
    JobOffersDetailComponent,
    SearchJobOffersByTitlePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(tabRoute),
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: jwtInterceptor,
      multi: true
    },
    AuthService,
    UserService,
    JobofferService,
    SpeechService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
