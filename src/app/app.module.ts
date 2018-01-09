import { EvenementService } from './services/evenement.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


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
import {RouterModule, Routes,CanActivate} from "@angular/router";
import { ButtonModule, CalendarModule, DialogModule, ChartModule , RatingModule } from "primeng/primeng";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JobOffersComponent } from './template/profile/job-offers/job-offers.component';
import { HomepageComponent } from './template/homepage/homepage.component';
import { ProfileComponent } from './template/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';

//Security
import { AuthService } from './services/auth.service';
import { jwtInterceptor } from './security/jwt.interceptor';
import { FacebookModule } from 'ngx-facebook';

import { UserInfoComponent } from './template/profile/user-info/user-info.component';

import { JobofferService } from "./services/joboffer.service";
import { JobOffersListComponent } from './template/profile/job-offers/job-offers-list/job-offers-list.component';
import { JobOffersItemComponent } from './template/profile/job-offers/job-offers-list/job-offers-item/job-offers-item.component';
import { JobOffersDetailComponent } from './template/profile/job-offers/job-offers-detail/job-offers-detail.component';
import { SearchJobOffersByTitlePipe } from './pipes/search-job-offers-by-title.pipe';
import { SpeechService } from "./services/speech.service";


import { NewsComponent } from './news/news.component';
import { SinglepostfullComponent } from './news/singlepostfull/singlepostfull.component';
import { Error404Component } from './template/errors/error404/error404.component';
import { NgxPaginationModule } from 'ngx-pagination';


import {AuthGuardService as AuthGuard} from './services/AuthGuardService';
//import { CandidateComponent } from './template/profile/job-offers/job-offers-detail/candidate/candidate.component';
import { Jsonp, JsonpModule } from "@angular/http";
import { ManagenewsComponent } from './template/profile/managenews/managenews.component';
import { AddnewsComponent } from './template/profile/managenews/addnews/addnews.component';
import { TrumbowygModule } from 'ng2-lazy-trumbowyg';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { HtmlSlicePipe } from './pipes/html-slice.pipe';
import { HtmlremovehrPipe } from './pipes/htmlremovehr.pipe';
import { EditnewsComponent } from './template/profile/managenews/editnews/editnews.component';
import { RefugeesComponent } from './template/profile/refugees/refugees.component';
import { RefugeesService } from './services/refugees.service';
import { DonationService } from './services/donation.service';
import { StatisticsComponent } from './template/homepage/statistics/statistics.component';
import { StatisticsAgeComponent } from './template/homepage/statistics-age/statistics-age.component';

import { EditFormComponent } from './template/profile/user-info/edit-form/edit-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';


import { EvenementlistingComponent } from './evenementlisting/evenementlisting.component';
import { EvenementdetailsComponent } from './evenementdetails/evenementdetails.component';
import { DonationComponent } from './donation/donation.component';
import { EvenementadminComponent } from './template/profile/evenementadmin/evenementadmin.component';
import { ResumePipe } from './pipes/resume.pipe';
import {CoursesComponent} from "./template/profile/courses/courses.component";
import {CourseService} from "./services/course.service";

const tabRoute: Routes = [
  {path: "", component: HomepageComponent, pathMatch: 'full'},
  {path: "home", component: HomepageComponent, pathMatch: 'full'},
  {path: "register", component: RegisterFormComponent, pathMatch: 'full'},
  { path: 'news', component: NewsComponent },
  {path: 'evenements', component: EvenementlistingComponent},
  {path: 'donate', component: DonationComponent},
  {path: 'evenement-details/:id', component: EvenementdetailsComponent},
  { path: 'news/:id', component: SinglepostfullComponent },
  { path: 'error404', component: Error404Component },
  {
    path: "profile", component: ProfileComponent,canActivate: [AuthGuard],
    children: [
      { path: "home", component: UserInfoComponent, pathMatch: 'full' },
      { path: "joboffers", component: JobOffersComponent },
      { path: "managenews", component: ManagenewsComponent },
      { path: "managenews/addnews", component: AddnewsComponent },
      { path: 'refugees', component: RefugeesComponent },
      { path: 'eventadmin', component: EvenementadminComponent },
      { path: "courses", component: CoursesComponent }
    ]
  }]



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
    SearchJobOffersByTitlePipe,
    NewsComponent,
    SinglepostfullComponent,
    Error404Component,
    ManagenewsComponent,
    AddnewsComponent,
    NoSanitizePipe,
    HtmlSlicePipe,
    HtmlremovehrPipe,
    EditnewsComponent,
    RefugeesComponent,
    StatisticsComponent,
    StatisticsAgeComponent,
    EditFormComponent,
    RegisterFormComponent,
    EvenementlistingComponent,
    EvenementdetailsComponent,
    DonationComponent,
    EvenementadminComponent,
    CoursesComponent,
    ResumePipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(tabRoute),
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
    NgxPaginationModule,
    TrumbowygModule.forRoot({ plugins: ['colors', 'noembed', 'preformatted', 'pasteimage', 'upload'], version: '2.8.0' }), //Optional config : plug-ins and version
    JsonpModule,
    ChartModule,
    RatingModule,
    BrowserAnimationsModule

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
    SpeechService,
    AuthGuard,
    RefugeesService,
    DonationService,
    EvenementService,
    CourseService



  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
