import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Familia} from "../../models/familia";
import {AngularFireAuth} from "angularfire2/auth";
import {NgForm} from "@angular/forms";
import {Pessoa} from "../../models/pessoa";

/**
 * Generated class for the QrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})
export class QrCodePage {
  public lista: Observable<Familia[]>;
  qrData = null;
  createdCode = null;



  constructor (public nvCtrl: NavController,
               public db: AngularFirestore,
               public afAuth: AngularFireAuth,
               public asCtrl: ActionSheetController,
               public modalCtrl: ModalController,
               public alertCtrl: AlertController) {

    this.lista = db.collection<Familia>('familia').valueChanges();


  }
  gerar(){
    this.db.collection("jogos").add({
      jogador1: this.afAuth.auth.currentUser.uid,
      jogador2: null,
      ganhador: null

    }).then((ref) => {
      this.db.collection("jogos").doc(ref.id).update({id: ref.id});

      this.sorteia(ref.id, "jogador1_membro");
      this.qrData = ref.id;


    });


  }

  sorteia ( jogo: string, jogador: string) {

    this.db.collection<Pessoa>('pessoa').valueChanges()
      .subscribe(value => {

        let pessoas: Pessoa[] = value;

        let idSorteado;

        let min = 0;
        let max = pessoas.length - 1;
        let posicaoAleatoria = Math.floor(Math.random() * (max - min + 1) + min);

        let membro = pessoas[posicaoAleatoria];


        this.db.collection("jogos").doc(jogo).update(
          {[jogador]: membro}
        );
      });
  }

}
