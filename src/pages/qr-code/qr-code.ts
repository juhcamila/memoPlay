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
import {Jogo} from "../jogo/jogo";

@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})
export class QrCodePage {
  public lista: Observable<Familia[]>;
  qrData = null;
  public jogoid: string;
  id: string;



  constructor (public nvCtrl: NavController,
               public db: AngularFirestore,
               public afAuth: AngularFireAuth,
               public asCtrl: ActionSheetController,
               public params: NavParams,
               public modalCtrl: ModalController,
               public alertCtrl: AlertController) {

     this.id = params.get('id');
     this.jogoid = params.get('jogoid');

     let sub = this.db.collection('jogos').doc<any>(this.jogoid).valueChanges().subscribe((jogo) => {
       if(jogo.jogador2 != null) {
         this.nvCtrl.push(Jogo, { id: this.id, jogoid: this.jogoid}).then(() => {
           sub.unsubscribe();
         })

       }
     })

  }


}
