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

  }
  gerar(){

    this.qrData = this.jogoid;
  }
  entrar(){
    this.nvCtrl.push(Jogo, { id: this.id, jogoid: this.qrData});
  }


}
