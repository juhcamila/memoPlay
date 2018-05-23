import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {Login} from '../../models/login';
import { AngularFireAuth } from 'angularfire2/auth';//import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-cadastroLogin',
  templateUrl: './cadastroLogin.html'

})
export class CadastroLogin {

  public ref: any;


  constructor (public db: AngularFirestore,
               public navCtrl: NavController,
               public afAuth: AngularFireAuth) {
  }


  async salvar (form: NgForm) {

    let nome: string = form.value.nome;
    let email: string = form.value.email;
    let dataNascimento: Date = form.value.dataNascimento;
    let senha: string = form.value.senha;

    const obj = {
      'nome': nome,
      'email': email,
      'dataNascimento': dataNascimento,
      'uid': null
    }

    this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then((user) => {
        obj.uid = user.uid;
        this.db.collection('login').doc(user.uid).set(obj);
      })
  }
}
