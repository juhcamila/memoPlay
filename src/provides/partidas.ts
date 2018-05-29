import { Injectable } from '@angular/core';
import { Partidas } from '../models/partidas';
import { Storage } from '@ionic/storage';

@Injectable()
export class PartidasService {

  private db : Array<Partidas> = new Array<Partidas>();

  constructor(private storage: Storage) {
    storage.get('db').then((dados) => {
      this.db = dados;
    })
  }

  // Métodos do CRUD
  public create(partidas: Partidas) : void {
    this.db.push(partidas);
    this.storage.set('db', this.db);
  }



  }

