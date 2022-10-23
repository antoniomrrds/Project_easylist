import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      email: 'antoniomarcos.amrrds@gmail.com',
      password: '12345',
      name: 'antonio',
      lastname: 'joao',
    },
  ];

  constructor() { }

  public get(id: number): User {
    return this.users.find(item => item.id === id);
}
  public login(email: string , password: string): User {
    return this.users.find(
      (item) => item.email === email && item.password === password
    );
}

  public create(user: User): void {
   this.users.push(user);
}




}
