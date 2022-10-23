import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { CreateListModalComponent } from '../components/create-list-modal/create-list-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule,ReactiveFormsModule, ListPageRoutingModule],
  declarations: [ListPage, CreateListModalComponent],
  entryComponents: [CreateListModalComponent],
})
export class ListPageModule {}
