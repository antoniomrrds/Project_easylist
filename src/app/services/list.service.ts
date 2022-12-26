import { Injectable } from '@angular/core';
import {
  Firestore, collection, collectionData,
  doc, addDoc, updateDoc, deleteDoc, docSnapshots,
  query, where, getDocs
} from '@angular/fire/firestore';
import { List } from 'src/models/list.model';

import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private firestore: Firestore,
    private afs: AngularFirestore
  ) { }

  public getAll() {
    const listCollection = collection(
      this.firestore, 'lists',

    );
    return collectionData(listCollection,
      { idField: 'id' });
  }

  public async create(newList: List) {
    const listCollection = collection(
      this.firestore, 'lists');
    delete newList.id;
    return await addDoc(listCollection, {
      ...newList
    });
  }

  public get(id: string) {
    const listDoc = doc(this.firestore,
      `lists/${id}`);
    return docSnapshots(listDoc);
  }
  public findByUID(uid: string) {
    console.log(uid);
    // const q = query(collection(this.firestore, 'lists').where('capital', '==', true));
    return this.afs.collection('lists',
      ref => ref.where('userId', '==', uid)
    ).snapshotChanges();
  }

  public async update(newLists: List) {
    const listDoc = doc(this.firestore, `lists/${newLists.id}`);
    return await updateDoc(listDoc, {
      ...newLists
    });
  }

  public async delete(id: string) {
    const listDoc = doc(this.firestore, `lists/${id}`);
    return await deleteDoc(listDoc);
  }



}
