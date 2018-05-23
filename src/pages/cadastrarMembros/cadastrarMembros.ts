import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FotoService} from '../../provides/foto.service';
import { NgForm } from '@angular/forms';
import { Pessoa } from '../../models/Pessoa';
import { AngularFireAuth } from 'angularfire2/auth';//import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cadastrarMembros',
  templateUrl: './cadastrarMembros.html'
})
export class CadastrarMembros {

  imagem : string;
  public ref: any;
  id;
  public photo: any;


  constructor (public crtl: NavController, public foto: FotoService, public db: AngularFirestore,
               public navCtrl: NavController,
               public afAuth: AngularFireAuth,
               public params: NavParams, ){

    this.id = params.get('id');
  }

  public selecionarFoto(){
    this.photo = this.foto.tirarFoto();
  }

  async salvar(form: NgForm){


    let nome : string = form.value.nome;
    let grauParentesco : string = form.value.grauParentesco;
    let uid = await this.afAuth.auth.currentUser.uid;

    const obj = {


      'nome':  nome,
      'grauParentesco' : grauParentesco,
      'id': this.id
    }

    this.db.collection('pessoa').add(obj).then((ref)=> {
      this.db.collection('pessoa').doc(ref.id).update({uid: ref.id}).then(() =>
      {
        this.navCtrl.pop();
      })

    });
  }



}
