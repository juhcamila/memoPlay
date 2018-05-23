import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController, NavParams} from 'ionic-angular';

import {Pessoa} from '../../models/pessoa';


import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {CadastrarMembros} from '../cadastrarMembros/cadastrarMembros';


@Component({
  selector: 'app-listarMembros',
  templateUrl: './listarMembros.html'
})
export class ListarMembros  {

  public lista: Observable<Pessoa[]>;
  public id ;

  constructor(public nvCtrl: NavController,
              public params: NavParams,
              public db: AngularFirestore,
              public afAuth: AngularFireAuth,
              public asCtrl: ActionSheetController,
              public modalCtrl: ModalController)
  {

    this.id = params.get('id');
    this.lista = db.collection<Pessoa>('pessoa', ref=>ref.where("id","==", this.id)).valueChanges();

    // db.collection<Pessoa>('pessoa').valueChanges().subscribe(value =>{
    //  console.log(value);
    //  });

  }

  public add() : void{
    this.nvCtrl.push(CadastrarMembros, {id: this.id});
  }

  public apagar(pessoa){
    delete this.lista[pessoa.id];
  }



}
