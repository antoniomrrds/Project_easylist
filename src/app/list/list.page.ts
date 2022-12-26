/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { CreateListModalComponent } from '../components/create-list-modal/create-list-modal.component';
import { ModalController, ToastController, LoadingController, AnimationController } from '@ionic/angular';

import { List } from 'src/models/list.model';
import { ListService } from '../services/list.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public lists: List[] = [];
  private loading: any;
  private idUser: any;
  constructor(
    private modalController: ModalController,
    private listServ: ListService,
    private userServ: UserService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
  ) {
    console.log('teste');
    this.userLogged().then((user) => {
      console.log(user.uid);
      this.idUser = user.uid;
      console.log(this.idUser);
      this.listServ.findByUID(this.idUser).subscribe((lists) => {
        // this.lists = lists;
        console.log(lists);
        // for (const iterator of lists) {
        //   const idData = iterator.payload.doc.id;
        //   const listData = iterator.payload.doc.data()['name'];
        //   const userIdData = iterator.payload.doc.data()['userId'];
        //   console.log(idData);
        //   console.log(listData);


        // }

        this.lists = lists.map(iterator => ({
          id: iterator.payload.doc.id,
          name: iterator.payload.doc.data()['name'],
          userId: iterator.payload.doc.data()['userId']
        }));
        console.log(this.lists);
      });
    });

   }
  ngOnInit() {

  }

  async userLogged() {
    console.log('qualquer coisa');
    // this.idUser = (await this.userServ.getAuth().currentUser).uid;
    return await this.userServ.getAuth().currentUser;

  }

  async openModal(lists) {
    const modal = await this.modalController.create({
      component: CreateListModalComponent,
      componentProps: { list: [lists] },
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    const value = data.data;
    value.userId = this.idUser;
    if (data.role === 'create') {
      try {
        await this.showLoading();
        await this.listServ.create(value);
        await this.loading.dismiss();
      } catch (err) {
        this.presentToast(err.message);
      } finally {
        this.loading.dismiss();
      }
    }

    if (data.role === 'edit') {
      try {
        await this.showLoading();
        await this.listServ.update(value);
        await this.loading.dismiss();
      } catch (err) {
        this.presentToast(err.message);
      } finally {
        this.loading.dismiss();
      }
    }
  }

  async delete(id: string) {
    try {
      await this.showLoading();
      await this.listServ.delete(id);
      await this.loading.dismiss();
    } catch (err) {
      this.presentToast(err.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'aguarde...',
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
