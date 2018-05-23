import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { Storage } from '@ionic/storage';

@Injectable()
export class PessoaService {

  private db : Array<Pessoa> = new Array<Pessoa>();

  constructor(private storage: Storage) { 
    storage.get('db').then((dados) => {
      this.db = dados;
    })
  }

  // Métodos do CRUD
  public create(Pessoa: Pessoa) : void {
    this.db.push(Pessoa);
    this.storage.set('db', this.db);
  }

  public read() : Array<Pessoa> {
    return this.db;
  }

  public update(pessoas: Pessoa) : void {

  }

  public delete(id: number) : void {

  }

}