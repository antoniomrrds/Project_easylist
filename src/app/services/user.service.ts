import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afa: AngularFireAuth) { }

 public create(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  public login(user: User){
   return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }

  public logout() {
      return this.afa.signOut();
  }

  public getAuth(){
    return this.afa;
  }

}
