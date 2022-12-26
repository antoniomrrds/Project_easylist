import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private loading: any;
  //navController
  constructor(
    private router: Router,
    private userServ: UserService,
    private toastController: ToastController,
    private menu: MenuController,
    private nav: NavController
  ) { }
  public async logout() {
    try {
      const resposta = await this.userServ.logout();
      console.log(resposta);
      this.menu.close();
      // this.router.navigate(['/home']);
      //destroi a pagina
      this.nav.navigateRoot('/home');
    } catch (err) {
      this.presentToast(err.message);
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    await toast.present();
  }
}
