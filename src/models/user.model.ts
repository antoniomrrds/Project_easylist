
export class User {

  constructor()
  constructor(public id?: number,
              public name?: string,
              public lastname?: string,
              public email?: string,
              public password?: string,
              public confirmPassword?: string,
              public uid?: string,
             ) {}
}
