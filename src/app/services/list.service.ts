import { Injectable } from '@angular/core';
import { List } from 'src/models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public lists: List[] = [
    {
      id: 1,
      name: 'churrasco',
      itens: [],
    },
    {
      id: 2,
      name: 'vinagrete',
      itens: [],
    },
  ];


  constructor() { }

  public create(list: List): void {
    this.lists.push(list);
 }
  public getAll(): List[]{
    return this.lists;
 }
 public delete(id: number): void{
  const value = this.lists.findIndex(obj => obj.id === id );
  this.lists.splice(value,1);
}

public update(newList: List) {
  let listEdit=
  this.lists.find(obj => obj.id === newList.id );
  listEdit = newList;
}



}
