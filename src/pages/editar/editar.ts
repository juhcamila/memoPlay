import { Component, OnInit } from '@angular/core';
import {ListarFamiliasPage} from '../listar-familias/listar-familias';
import { NgForm } from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {Pessoa} from '../../models/pessoa';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.html'
})
export class Editar {
  public Pessoa: any = {};

  constructor(
    private db: AngularFirestore,
    private navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private navParams: NavParams  ) {

    let id = navParams.get('id');
    db.collection("pessoa").doc(id).valueChanges().subscribe((dados) => {
      this.Pessoa = dados;
    })
  }

  salvar(form: NgForm){

    let imagem : string = form.value.imagem;
    let nome : string = form.value.nome;
    let grauParentesco : string = form.value.grauParentesco;

    const obj = {
      'imagem' : imagem,
      'nome' : nome,
      'grauParentesco' : grauParentesco
    }
    let id=this.navParams.get('id');

    this.db.collection('pessoa').doc(id).update(obj).then(() =>
    {
      this.navCtrl.pop();
    })


  }

}
