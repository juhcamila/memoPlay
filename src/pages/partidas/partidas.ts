import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jogos } from '../../models/jogos';
import { JogosService } from '../../provides/jogos.service';
import { Observable } from 'rxjs/Observable';
import {Pessoa} from "../../models/pessoa";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import {QrCodePage} from "../qr-code/qr-code";
import {Login} from "../../models/login";
import {Partidas} from "../../models/partidas";

@IonicPage()
@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html',
})
export class PartidasPage {

  public lista: Observable<Partidas[]>;
   public resultado: Observable<Login[]>;
  jogo : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public db: AngularFirestore,
              public afAuth: AngularFireAuth,
              private jogoService: JogosService) {



    this.jogo =this.afAuth.auth.currentUser.uid;
    this.lista = db.collection<Partidas>('partidas', ref => ref.where(("jogador1")||("jogador2"), "==", this.jogo )).valueChanges();

  }


}
