import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
               public afAuth: AngularFireAuth ){ }

  public selecionarFoto(){
    this.foto.tirarFoto().then()
  }



  async salvar(form: NgForm){

    let sobrenome : string = form.value.sobrenome;
    let uid = await this.afAuth.auth.currentUser.uid;

    const obj = {

      'sobrenome' : sobrenome,
      'uid' : uid
    }

    this.db.collection('familia').add(obj).then((ref)=> {
      this.db.collection('familia').doc(ref.id).update({id: ref.id}).then(() =>
      {
        this.navCtrl.pop();
      })

    });
  }



}
