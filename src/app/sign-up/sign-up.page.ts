/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { LoadingController, ToastController } from '@ionic/angular';

import { UserService } from '../services/user.service';
import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public createUserForm!: FormGroup;
  public user: User = new User();
  private loading: any;
  userExample: User = {
    name: 'antoniomarcos',
    lastname: 'reis',
    email: 'antoniomarcos.amrrds@gmail.com',
    password: 'reis_2310',
    confirmPassword: 'reis_2310',
  };

  constructor(
    private router: Router,
    private userServ: UserService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      name: new FormControl(this.userExample.name, [
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ]),
      ]),
      lastname: new FormControl(this.userExample.lastname, [
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
        ]),
      ]),
      email: new FormControl(this.userExample.email, [
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(/\S+@\w+\.\w{3,6}(\.\w{3,})?/g),
        ]),
      ]),
      password: new FormControl(this.userExample.password, [
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]),
      ]),
      confirmPassword: new FormControl(this.userExample.confirmPassword, [
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]),
      ]),
    });

  }

  get name() {
    return this.createUserForm.get('name');
  }
  get lastname() {
    return this.createUserForm.get('lastname');
  }
  get email() {
    return this.createUserForm.get('email');
  }
  get password() {
    return this.createUserForm.get('password');
  }
  get confirmPassword() {
    return this.createUserForm.get('confirmPassword');
  }

  passwordEquals(value: string, value2: string) {
    return value === value2;
  }


  async register() {
    try {
      if (this.createUserForm.invalid) {
        return;
      }

      const { value } = this.createUserForm;
      if (this.passwordEquals(value.password, value.confirmPassword)) {
        delete value.confirmPassword;
        await this.showLoading();
        await this.userServ.create(value);
        console.log(value);
        this.createUserForm.reset();
        return this.router.navigate(['/home']);
      }
    } catch (err) {
      this.presentToast(err.message);
    } finally {
      this.loading.dismiss();
    }
  }


  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor aguarde...',
      spinner: 'circles',
    });

    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    await toast.present();
  }
}
