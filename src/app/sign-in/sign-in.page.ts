/* eslint-disable @typescript-eslint/member-ordering */

import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoadingController, ToastController } from '@ionic/angular';

import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public user: User = new User();
  public loginForm!: FormGroup;
  private loading: any;

  constructor(
    private router: Router,
    private userServ: UserService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(/\S+@\w+\.\w{3,6}(\.\w{3,})?/g),
        ]),
      ]),
      password: new FormControl('', [
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]),
      ]),
    });

  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async signin() {


    try {
      if (this.loginForm.invalid) {
        return;
      }

      const { value } = this.loginForm;

      await this.showLoading();
      await this.userServ.login(value);

      return this.router.navigate(['/list']);

    } catch (err) {
      this.presentToast(err.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...',
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
