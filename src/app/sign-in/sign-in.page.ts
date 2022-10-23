import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public user: User = new User();
  public email = '';
  public password = '';
  public users: User[] = [];

  constructor(
    private router: Router,
    private userServ: UserService,
    ) {}

  ngOnInit() {}

  signin() {
   const value = this.userServ.login(this.email,this.password);

    if(value){
      return this.router.navigate(['/list']);
    }
  }
}
