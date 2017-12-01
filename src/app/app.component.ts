import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private currentUser: User = {username: 'test', email: 'test@test.com'};

  private hideEmail = false;

  private toogle() {
    this.hideEmail = !this.hideEmail;
  }

  private changeEmail(newEmail: string) {
    this.currentUser.email = newEmail;
  }



}

 interface User {
    username: string;
    email: string;
  }
