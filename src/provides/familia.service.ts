import { Injectable } from '@angular/core';
import { Familia } from '../models/familia';
import { Storage } from '@ionic/storage';

@Injectable()
export class FamiliaService {
 private db : Array<Familia> = new Array<Familia>();

  constructor(private storage: Storage) { 
    storage.get('db').then((dados) => {
      this.db = dados;
    })
  }

  // Métodos do CRUD
  public create(familia: Familia) : void {
    this.db.push(familia);
    this.storage.set('db', this.db);
  }

  public read() : Array<Familia> {
    return this.db;
  }

  public update(familia: Familia) : void {

  }

  public delete(id: number) : void {

  }


}