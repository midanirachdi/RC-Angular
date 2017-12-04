import { Injectable,OnDestroy } from '@angular/core';
import { FacebookService, InitParams,LoginResponse } from 'ngx-facebook';
import { HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject } from 'rxjs/BehaviorSubject'

import { JwtHelper } from 'angular2-jwt';
import {LOGIN_URL} from './java.urls';
import{UserService } from './user.service';
import {User,Admin,CampChef,DistrictChef,Volunteer} from '../entities/User'
import {UserMapper} from '../Utils/UserMapper';
import { Object } from 'core-js/library/web/timers';

declare const gapi: any;


@Injectable()
export class AuthService implements OnDestroy {

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }

  userLogged:BehaviorSubject <boolean>=new BehaviorSubject(false);
  user:BehaviorSubject<User>=new BehaviorSubject<User>(null);
  subscr:Subscription;

  constructor(public http: HttpClient,private userService:UserService,private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '170197633567661',
      xfbml: true,
      version: 'v2.8'
    };
 
    fb.init(initParams);

    gapi.load('auth2', function () {
      gapi.auth2.init()
   });
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }




  public BasicAuth(login:string,psd:string){

    this.http.get(LOGIN_URL,{
      headers: new HttpHeaders().set('Authorization',"Basic "+btoa(login+':'+psd)),
      observe: 'response',
      responseType:'text' 
    }
    )
    .subscribe(
      (data) => {
        let barear=data.headers.get('Authorization');
        localStorage.setItem('token',barear);
        localStorage.setItem('cmode','Basic')
        let paylod:{
            id:number;
            role:string;}=JwtHelper.prototype.decodeToken(barear);
            localStorage.setItem('role',paylod.role)
            this.userLogged.next(true);
            this.userService.getMe().subscribe((u:User)=>{
              let temp=JSON.stringify(u);
              let myuser:User=UserMapper(temp);
              this.user.next(myuser);
            });
            
        }
    );
  }


  public FaceBookAuth():void{
    this.fb.login({ scope: 'email,public_profile,user_photos,user_birthday' })
    .then((response: LoginResponse) =>{ 
      console.log(response.authResponse.accessToken)
       this.http.get(LOGIN_URL,{
       headers: new HttpHeaders().set('Authorization',"ftoken "+response.authResponse.accessToken),
       observe: 'response',
       responseType:'text' 
     }
     ).subscribe(data => {
      let barear=data.headers.get('Authorization');
      localStorage.setItem('token',barear);
      localStorage.setItem('cmode','ftoken')
      console.log(barear);
      this.userLogged.next(true);
      let paylod:{
        id:number;
        role:string;}=JwtHelper.prototype.decodeToken(barear);
        localStorage.setItem('role',paylod.role)
        this.userService.getMe().subscribe((u)=>{
          
           let jsonUser=JSON.stringify(u);
           jsonUser=jsonUser.substr(1,jsonUser.length -2);
          let type=jsonUser.substr(0,jsonUser.indexOf(':'));
          jsonUser=jsonUser.substr(jsonUser.indexOf(':')+1);
        
 
          let temp=JSON.stringify(u);
          let myuser:User=UserMapper(temp);
          console.log("facebook")
          console.log(myuser);
          this.user.next(myuser);
        
          
       
        });
     })
                  })
    .catch((error: any) => console.error(error));
  }


  public GoogleAuth():void{
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
       googleAuth.grantOfflineAccess().then((data:{code:string})=>{
   
      
        this.http.get(LOGIN_URL,{
          headers: new HttpHeaders().set('Authorization',"gtoken "+data.code),
          observe: 'response',
          responseType:'text' 
        }
        ).subscribe(data=>{
          let barear=data.headers.get('Authorization');
          localStorage.setItem('token',barear);
          localStorage.setItem('cmode','gtoken')
          let paylod:{
            id:number;
            role:string;}=JwtHelper.prototype.decodeToken(barear);
            localStorage.setItem('role',paylod.role)
              this.userLogged.next(true);
              this.userService.getMe().subscribe((u:User)=>{          
                let temp=JSON.stringify(u);
                let myuser:User=UserMapper(temp);
                this.user.next(myuser);
                });
        })
      
      
      });
    });
  }


  public LogOut():void{
    this.user.next(null);
    this.userLogged.next(false);
    localStorage.clear();
  }

}
