import { Injectable,OnDestroy } from '@angular/core';
import { FacebookService, InitParams,LoginResponse } from 'ngx-facebook';
import { HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

import { JwtHelper } from 'angular2-jwt';
import {LOGIN_URL} from './java.urls';
import{UserService } from './user.service';
import {User,Admin,CampChef,DistrictChef,Volunteer} from '../entities/User'
import {UserMapper} from '../Utils/UserMapper';

declare const gapi: any;


@Injectable()
export class AuthService implements OnDestroy {

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }

  userLogged:Subject<boolean>=new Subject<false>();
  user:Subject<User>=new Subject<User>();
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
            this.userService.getMe().subscribe((u:User)=>this.user.next(u));
            
        }
    );
  }


  public FaceBookAuth():void{
    this.fb.login({ scope: 'email,public_profile,user_photos,user_birthday' })
    .then((response: LoginResponse) =>{ console.log(response.authResponse.accessToken)
     this.http.get(LOGIN_URL,{
       headers: new HttpHeaders().set('Authorization',"ftoken "+response.authResponse.accessToken),
       observe: 'response',
       responseType:'text' 
     }
     ).subscribe(data => {
      let barear=data.headers.get('Authorization');
      localStorage.setItem('token',barear);
      localStorage.setItem('cmode','ftoken')
      this.userLogged.next(true);
      let paylod:{
        id:number;
        role:string;}=JwtHelper.prototype.decodeToken(barear);
        localStorage.setItem('role',paylod.role)
        this.userService.getMe().subscribe((u)=>{
          
          
          let temp=JSON.stringify(u);
          let myuser:User=UserMapper(temp);
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
              this.userService.getMe().subscribe((u:User)=>this.user.next(u));
        })
      
      
      });
    });
  }

}
