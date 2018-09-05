import { Component } from '@angular/core';
import {NavController, ActionSheetController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Pessoa } from '../../models/pessoa';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import {ListarFamiliasPage} from "../listar-familias/listar-familias";


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.html'
})
export class Jogo {

  public familiares: Observable<Pessoa[]>;
  // public jogo

  public jogador1: any;
  public jogador2: any;
  public jogoid: string;

  public tipo: string;

  constructor(public nvCtrl: NavController,
              public db: AngularFirestore,
              public afAuth: AngularFireAuth,
              public asCtrl: ActionSheetController,
              public params: NavParams,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController) {

    let familiaid = params.get('id');
    this.jogoid = params.get('jogoid');


    this.familiares = db.collection<Pessoa>('pessoa', ref => ref.where('id', '==', familiaid)).valueChanges();

    db.collection("jogos").doc<any>(this.jogoid).valueChanges().subscribe((jogo => {

      this.jogador1 = jogo.jogador1_membro;
      this.jogador2 = jogo.jogador2_membro;

      if (jogo.ganhador == null) {
        if (jogo.jogador1 == afAuth.auth.currentUser.uid) {
          this.tipo = "jogador1";
        }
        else {
          this.tipo = "jogador2";
        }
      }
      else {
        if (jogo.ganhador == afAuth.auth.currentUser.uid) {

          this.toastCtrl.create({
            message: "Parabéns, você acertou.",
            duration: 3000
          }).present();
            this.nvCtrl.push(ListarFamiliasPage);
        }
        else {
          this.toastCtrl.create({
            message: "Fim do jogo, infelizmente você não acertou.",
            duration: 3000
          }).present();
          this.nvCtrl.push(ListarFamiliasPage);
        }

      }

    }));
  }

  selecionar(id: string) {


    if ((this.tipo == "jogador1" && this.jogador2.uid == id) || (this.tipo == "jogador2" && this.jogador1.uid == id)) {

      this.db.collection("jogos").doc(this.jogoid).update({
        ganhador: this.afAuth.auth.currentUser.uid
      });

      // removo da lista
      // this.familiares.forEach(value =>
      //                         {value.splice(index, 1)});
    }
    else {
      this.toastCtrl.create({
        message: "Você errou, o personagem não é este",
        duration: 3000
      }).present();
    }
  }
}
