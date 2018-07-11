import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public rootPage: any= HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController, private afAuth: AngularFireAuth) {
  }


}
