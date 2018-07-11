import { Component, OnInit } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FotoService} from '../../provides/foto.service';
import { NgForm } from '@angular/forms';
import { Pessoa } from '../../models/Pessoa';
import { AngularFireAuth } from 'angularfire2/auth';//import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cadastroFamilia',
  templateUrl: './cadastroFamilia.html'
})
export class CadastroFamilia {
  imagem : string;
  public ref: any;


  constructor (public crtl: NavController, public foto: FotoService, public db: AngularFirestore,
               public navCtrl: NavController,
               public afAuth: AngularFireAuth,
               private loadingCrtl: LoadingController,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController){ }

  public selecionarFoto(){
    this.foto.tirarFoto().then()
  }



  async salvar(form: NgForm) {

    let progress = this.loadingCrtl.create();
    progress.present();

    try {
      let sobrenome: string = form.value.sobrenome;
      let uid = await this.afAuth.auth.currentUser.uid;

      const obj = {

        'sobrenome': sobrenome,
        'uid': uid
      }

      this.db.collection('familia').add(obj).then((ref) => {
        this.db.collection('familia').doc(ref.id).update({id: ref.id}).then(() => {
          this.navCtrl.pop();
        })

      });
      this.toastCtrl.create({
        message: "Membro adicionado com sucesso.",
        duration: 3000
      }).present();
      this.navCtrl.pop();

    } catch (error) {
    this.alertCtrl.create({
      title: "Erro",
      message: error.message,
      buttons: ['ok']
    }).present();
  } finally {
  progress.dismiss();
}

}







}
