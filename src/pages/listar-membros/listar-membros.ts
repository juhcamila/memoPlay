import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController, NavParams} from 'ionic-angular';
import {Pessoa} from '../../models/pessoa';

import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {CadastrarMembrosPage} from "../cadastrar-membros/cadastrar-membros";
import {Editar} from "../editar/editar";


@Component({
  selector: 'app-listar-membros',
  templateUrl: './listar-membros.html'
})
export class ListarMembrosPage {

  public lista: Observable<Pessoa[]>;
  public familiaId;

  constructor(public nvCtrl: NavController,
              public params: NavParams,
              public db: AngularFirestore,
              public afAuth: AngularFireAuth,
              public asCtrl: ActionSheetController,
              public modalCtrl: ModalController) {

    this.familiaId = params.get('familiaId');
    console.log(this.familiaId);
    this.lista = db.collection<Pessoa>('pessoa', ref => ref.where("id", "==", this.familiaId)).valueChanges();

  }

  public add(): void {
    this.nvCtrl.push(CadastrarMembrosPage, {familiaId: this.familiaId});
  }

  public editar( id: string) {
    this.nvCtrl.push(Editar ,{membroId: id});
  }


  public excluir( id: string) {
    this.db.collection("pessoa").doc(id).delete();
  }

}
