import { Injectable } from '@angular/core';
import { Notifica } from '../models/notifica';
import { Storage } from '@ionic/storage';

@Injectable()
export class PessoaService {

  private db : Array<Notifica> = new Array<Notifica>();

  constructor(private storage: Storage) {
    storage.get('db').then((dados) => {
      this.db = dados;
    })
  }

  // Métodos do CRUD
  public create(Notifica: Notifica) : void {
    this.db.push(Notifica);
    this.storage.set('db', this.db);
  }



}
