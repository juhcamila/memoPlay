import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {TelaLogin} from "../TelaLogin/TelaLogin";

/**
 * Generated class for the ResetarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetar-senha',
  templateUrl: 'resetar-senha.html',
})
export class ResetarSenhaPage {
  public email: string;
  constructor(public navCtrl: NavController,
              public afAfuth: AngularFireAuth,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetarSenhaPage');
  }

  sendResetePasswordEmail(){
    this.afAfuth.auth.sendPasswordResetEmail(this.email);
    this.navCtrl.push(TelaLogin);
  }
}
