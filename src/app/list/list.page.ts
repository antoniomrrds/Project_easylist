import { Component, OnInit } from '@angular/core';
import { CreateListModalComponent } from '../components/create-list-modal/create-list-modal.component';
import { ModalController } from '@ionic/angular';

import { List } from 'src/models/list.model';
import { ListService } from '../services/list.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public lists: List[] = [];

  constructor(
     private modalController: ModalController
    ,private listServ: ListService) {}

  ngOnInit() {
    this.lists = this.listServ.getAll();
  }

  async openModal(lists) {
    const modal = await this.modalController.create({
      component: CreateListModalComponent,
      componentProps: { list: [lists] },
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    const value = data.data;
    if(data.role === 'value'){
      const obj  = {...value , items:[]};
      this.listServ.create(obj);
    }
  }

  update(list: List){
    this.listServ.update(list);
  }
  delete(id: number){
    this.listServ.delete(id);
  }
}
