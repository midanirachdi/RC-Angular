import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User,Admin,CampChef,DistrictChef,Volunteer} from '../../entities/User'
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  userSub:Subscription;
  user:User;
  role:string;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe((u)=>{
      this.user=u;
    })
    this.role=localStorage.getItem('role');
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
