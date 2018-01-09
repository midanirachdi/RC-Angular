import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User,Admin,CampChef,DistrictChef,Volunteer} from '../../../../entities/User'
import {AuthService} from '../../../../services/auth.service';
import {UserService} from '../../../../services/User.service';
import {NgForm} from '@angular/forms';
import {userWrapper} from '../../../../Utils/UserMapper';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers: [UserService]
})
export class EditFormComponent implements OnInit {
  userSub:Subscription;
  user:User;
  updateUser:User=new User();
  
  constructor(private authService:AuthService,private userService:UserService) { }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe((u)=>{
      this.user=u;});
  }

  onSubmit(f: NgForm) {
    this.user.lastName=f.value.lastName;
    this.user.firstName=f.value.firstName;
    this.user.email=f.value.email;
    console.log(userWrapper(localStorage.getItem('role'),this.user));
   this.userService.putUser(userWrapper(localStorage.getItem('role'),this.user))
    
  }
}
