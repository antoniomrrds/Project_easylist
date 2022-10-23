/* eslint-disable @typescript-eslint/member-ordering */
import { ModalController } from '@ionic/angular';
import { Component, OnInit ,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from 'src/models/list.model';


@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
})
export class CreateListModalComponent implements OnInit {
  @Input() list: List;
  public createUseList!: FormGroup;

  listExample: List = {
    name: 'antoniomarcos',
  };

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {
    console.log(this.listExample.name);
    this.createUseList = new FormGroup({
     name: new FormControl('', [
        Validators.compose([
         Validators.required,
         Validators.minLength(3)
       ]),
     ])
 });
};





  get name() {
    return this.createUseList.get('name');
  }
  dismissModal() {
    this.modalController.dismiss(this.createUseList.value, 'cancel');
  }
  onCreateList() {

    this.modalController.dismiss(this.createUseList.value, 'value');
  }
}
