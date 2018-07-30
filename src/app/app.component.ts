import {AngularFireAuth} from 'angularfire2/auth'
import {TelaLogin} from '../pages/TelaLogin/TelaLogin';
// import {Menu} from "../pages/menu/menu";
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {HomePage} from "../pages/home/home";
import {ListarFamiliasPage} from "../pages/listar-familias/listar-familias";
import {PartidasPage} from "../pages/partidas/partidas";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;


  constructor (platform: Platform,
               private afAuth: AngularFireAuth
  ) {
    platform.ready().then(() => {
      afAuth.authState.subscribe((state) => {
        if (state == null) {
          this.rootPage = TelaLogin;
        } else {
          this.rootPage = HomePage;

        }
      })
    });
  }

  irHome(): void {
    this.rootPage = HomePage;
  }

  listarPessoas() : void {
    this.rootPage = ListarFamiliasPage;
  }

  partidas(): void {
    this.rootPage = PartidasPage;
  }

  logout () {
    this.afAuth.auth.signOut();
  }

}

