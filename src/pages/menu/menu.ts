import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AngularFireAuth} from 'angularfire2/auth';
import {ListarFamiliasPage} from "../listar-familias/listar-familias";
import {NavController} from "ionic-angular";
import {PartidasPage } from "../partidas/partidas"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html'
})
export class Menu {

  rootPage: any = HomePage;

  constructor(private afAuth: AngularFireAuth,
              private navCtrl: NavController) { }

  logout() {
    this.afAuth.auth.signOut();
  }

  public irParalistarFamiliasPage() {
    this.navCtrl.push(ListarFamiliasPage);
  }

  public irParaPartidasPage() {
    this.navCtrl.push(PartidasPage);
  }


}
