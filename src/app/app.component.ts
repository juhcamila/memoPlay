import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth'
import {TelaLogin} from '../pages/TelaLogin/TelaLogin';
// import {Menu} from "../pages/menu/menu";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor (platform: Platform,
               afAuth: AngularFireAuth) {
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
}

