import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, AlertController } from 'ionic-angular';
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
              public alertCtrl: AlertController) {

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

          let alert = this.alertCtrl.create({
            title: 'Parabéns',
            subTitle: 'Você acertou!!',
            buttons: ['OK']
          });
          alert.present().then(() => {
            this.nvCtrl.push(ListarFamiliasPage);
          })
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Fim do jogo',
            subTitle: 'Você perdeu!!',
            buttons: ['OK']
          });
          alert.present().then(() => {
            this.nvCtrl.push(ListarFamiliasPage);
          })
        }

      }

    }));
  }

  selecionar(index: number) {
    let id = this.familiares[index].uid;

    if ((this.tipo == "jogador1" && this.jogador2.uid == id) || (this.tipo == "jogador2" && this.jogador1.uid == id)) {

      this.db.collection("jogos").doc(this.jogoid).update({
        ganhador: this.afAuth.auth.currentUser.uid
      });

      // removo da lista
      this.familiares.splice(index, 1);
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Errou',
        subTitle: 'Você errou!!',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
