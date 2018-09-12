import { Injectable } from '@angular/core';
import { Membros } from '../models/membros';
import { Storage } from '@ionic/storage';

@Injectable()
export class MembroService {

  private db : Array<Membros> = new Array<Membros>();

  constructor(private storage: Storage) {
    storage.get('db').then((dados) => {
      this.db = dados;
    })
  }

  // Métodos do CRUD
  public create(membros: Membros) : void {
    this.db.push(membros);
    this.storage.set('db', this.db);
  }


}
