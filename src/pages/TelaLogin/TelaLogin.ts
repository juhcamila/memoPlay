import { Component} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import {NavController, AlertController, Loading, ToastController, LoadingController} from 'ionic-angular';
import {CadastroLogin} from '../cadastroLogin/cadastroLogin';
import {ResetarSenhaPage} from "../resetar-senha/resetar-senha";


@Component({
  selector: 'app-TelaLogin',
  templateUrl: 'TelaLogin.html'
})
export class TelaLogin {

  formLogin: FormGroup;
  email: string = "";
  senha: string = "";

  constructor(private afAuth: AngularFireAuth,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {

    this.formLogin = new FormGroup({
      email: new FormControl(),
      senha: new FormControl()
    });
  }

  async entrar() {

    // todo colocar loading
    console.log('teste');
    let progress = this.loadingCtrl.create();
    progress.present();

    try{
      await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha);
    }catch(error){
      this.alertCtrl.create({
        title: 'Falha no login',
        subTitle: error.message,
        buttons: ["Ok"]
      }).present();
    }finally {
      progress.dismiss();
    }
  }

  private adicionarLogin(){
    this.navCtrl.push(CadastroLogin);
  }

  private esqueceuSenha(){
    this.navCtrl.push(ResetarSenhaPage);
  }

}


