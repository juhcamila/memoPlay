import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Storage } from '@ionic/storage';

@Injectable()
export class LoginService {

  private db : Array<Login> = new Array<Login>();

  constructor(private storage: Storage) { 
    storage.get('db').then((dados) => {
      this.db = dados;
    })
  }

  // Métodos do CRUD
  public create(pessoas: Login) : void {
    this.db.push(pessoas);
    this.storage.set('db', this.db);
  }

  public read() : Array<Login> {
    return this.db;
  }

  public update(pessoas: Login) : void {

  }

  public delete(id: number) : void {

  }

}