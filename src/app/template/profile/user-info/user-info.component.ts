import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User,Admin,CampChef,DistrictChef,Volunteer} from '../../../entities/User'
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/User.service';
import {NgForm} from '@angular/forms';
import {userWrapper} from '../../../Utils/UserMapper';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [UserService]
})
export class UserInfoComponent implements OnInit,OnDestroy {

  userSub:Subscription;
  user:User;
  role:string;
  edit:boolean=true;
  updateUser:User=new User();

  constructor(private authService:AuthService,private userService:UserService) { }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe((u)=>{
      this.user=u;
    })
    this.role=localStorage.getItem('role');
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  
  onSubmit(f: NgForm) {
    this.user.lastName=f.value.lastName;
    this.user.firstName=f.value.firstName;
    this.user.email=f.value.email;
    console.log(userWrapper(localStorage.getItem('role'),this.user));
   this.userService.putUser(userWrapper(localStorage.getItem('role'),this.user))
    
  }
}
