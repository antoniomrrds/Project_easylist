/* eslint-disable @typescript-eslint/member-ordering */
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from 'src/models/list.model';


@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
})
export class CreateListModalComponent implements OnInit {
  @Input() list: List;
  public title: string;
  public btnValue: string;
  public createUseList!: FormGroup;

  constructor(private modalController: ModalController) { }
  ngOnInit(): void {
    this.createUseList = new FormGroup({
      name: new FormControl(this.list[0]?.name, [
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ]),
      ]),
    });
    this.title = (this.list[0]?.name) ? 'Edição de Lista' : 'Criar lista';
    this.btnValue = (this.list[0]?.name) ? 'Editar' : 'Criar';
    console.log(this.list[0]);
  };





  get name() {
    return this.createUseList.get('name');
  }
  dismissModal() {
    this.modalController.dismiss(this.createUseList.value, 'cancel');
  }
  onCreateList() {
    if (this.list[0]?.name === undefined) {
      this.modalController.dismiss(this.createUseList.value, 'create');
    }
    this.createUseList.value.id = this.list[0]?.id;
    this.modalController.dismiss(this.createUseList.value, 'edit');
  }
}
