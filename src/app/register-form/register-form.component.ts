import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {User,Admin,CampChef,DistrictChef,Volunteer} from '../entities/User';
import {UserService} from '../services/user.service';
import {userWrapper} from '../Utils/UserMapper';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  model:any={
        firstName:"",
        lastName:"",
        email:"",
        password:""
  };
  loading = false;
  
  constructor(private us:UserService) { }

  ngOnInit() {
  }

  register(){
    console.log(userWrapper("Volunteer",this.model))
    this.us.postUser(userWrapper("Volunteer",this.model))
  }

}
