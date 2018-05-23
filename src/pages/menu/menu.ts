import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AngularFireAuth} from 'angularfire2/auth';
import {ListarPessoas} from "../listarPessoas/listarPessoas";
import {NavController} from "ionic-angular";


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

  public listarPessoas() {
    this.navCtrl.setRoot(ListarPessoas);
  }

  public irParaHomePage() {
    this.navCtrl.setRoot(HomePage);

  }
}
