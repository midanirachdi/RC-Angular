import { Component, OnInit, OnDestroy,ChangeDetectorRef } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User,Admin,CampChef,DistrictChef,Volunteer} from '../entities/User'
import {AuthService} from '../services/auth.service';
import {Router} from "@angular/router";

declare const gapi: any;


@Component({
  selector: 'cmp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  login:string;
  password:string;
  submitted = false;
  subscription:Subscription;
  connected:boolean;
  userSub:Subscription;
  user:User;



  constructor(private authService:AuthService,private router:Router,private cdRef:ChangeDetectorRef) {
    gapi.load('auth2', function () {
      gapi.auth2.init()
    
   });
   }

  ngOnInit() {
    this.subscription=this.authService.userLogged.subscribe(isConnected=>{
      this.connected=isConnected;
      this.cdRef.detectChanges();
      }
    );

    this.userSub=this.authService.user.subscribe((u:User)=>{this.user=u;
  
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
  }



  onSubmit() { this.submitted = true;
      this.authService.BasicAuth(this.login,this.password);
    }

  onFacebook(){
    this.authService.FaceBookAuth();
  }





  onGoogle(){
    this.authService.GoogleAuth();
 }


 onLogOut(){
   this.authService.LogOut();
   console.log("dec btn" +this.connected);
 }

}
