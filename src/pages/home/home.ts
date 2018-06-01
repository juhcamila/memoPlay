import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {CadastrarMembrosPage} from "../cadastrar-membros/cadastrar-membros";
import {ListarFamiliasPage} from "../listar-familias/listar-familias";
import {PartidasPage} from "../partidas/partidas";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor (public navCtrl: NavController,
               private afAuth: AngularFireAuth) {

  }

  logout () {
    this.afAuth.auth.signOut();
  }

  public add(): void {
    this.navCtrl.push(ListarFamiliasPage);
  }

  public partidas() : void {
    this.navCtrl.push(PartidasPage);
  }
}
