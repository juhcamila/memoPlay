import { Component } from '@angular/core';
import {
  ActionSheetController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import {Notifica} from "../../models/notifica";
import {ListarFamiliasPage} from "../listar-familias/listar-familias";

/**
 * Generated class for the SolicitacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacao',
  templateUrl: 'solicitacao.html',
})
export class SolicitacaoPage {
  public lista: Observable<Notifica[]>;
  public familiaId;

  constructor(public nvCtrl: NavController,
              public params: NavParams,
              public db: AngularFirestore,
              public afAuth: AngularFireAuth,
              public asCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              private toastCtrl: ToastController) {

    this.familiaId = params.get('familiaId');
    console.log(this.familiaId);
    this.lista = db.collection<Notifica>('notifica', ref => ref.where("familia", "==", this.familiaId)).valueChanges();

  }

  excluir(id: string) {
    this.db.collection("notifica").doc(id).delete();
  }

  add(id:string, uid: string, nome: string){


    this.db.collection("membros").add({
      uid: uid,
      nome: nome,
      familia: this.familiaId

    }).then((ref) => {
      this.db.collection('membros').doc(ref.id).update({id: ref.id}).then(() => {
        this.db.collection("notifica").doc(id).delete();
        this.toastCtrl.create({
          message: "Adicionado com sucesso.",
          duration: 3000
        }).present();
        this.nvCtrl.push(ListarFamiliasPage);
      })


    })

  }

}
