import {Component} from '@angular/core';
import {NavController, ActionSheetController} from 'ionic-angular';

import {CadastroFamilia} from '../cadastroFamilia/cadastroFamilia';

import {Familia} from '../../models/familia';
import {Pessoa} from '../../models/pessoa';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";


import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {ModalController, AlertController} from 'ionic-angular';
import {ListarMembrosPage} from '../listar-membros/listar-membros';
import {Jogo} from '../jogo/jogo';
import {QrCodePage} from "../qr-code/qr-code";
import {Login} from "../../models/login";


@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-familias.html'
})
export class ListarFamiliasPage {

  public lista: Observable<Familia[]>;
  scannedCode: string;




  constructor (public nvCtrl: NavController,
               public db: AngularFirestore,
               public afAuth: AngularFireAuth,
               public asCtrl: ActionSheetController,
               public modalCtrl: ModalController,
               public alertCtrl: AlertController,
               private barcodeScanner: BarcodeScanner) {

    this.lista = db.collection<Familia>('familia').valueChanges();

  }

  presentActionSheet (id: string) {
    let actionSheet = this.asCtrl.create({

      buttons: [
        {
          text: 'Criar jogo',
          handler: () => {
            this.db.collection("jogos").add({
              jogador1: this.afAuth.auth.currentUser.uid,
              jogador1nome: this.afAuth.auth.currentUser.displayName,
              jogador2: null,
              jogador2nome: null,
              ganhador: null,
              familia: id

            }).then((ref) => {
              this.db.collection("jogos").doc(ref.id).update({id: ref.id});

              this.sorteia(id, ref.id, "jogador1_membro");
              this.nvCtrl.push(QrCodePage, {id: id, jogoid: ref.id, });
            })
          }
        },
        {
          text: 'Participar do jogo',
          handler: () => {
                    this.scanCode();
                    this.db.collection("jogos").doc(this.scannedCode).update(
                      {
                        jogador2: this.afAuth.auth.currentUser.uid,
                        jogador2nome: this.afAuth.auth.currentUser.displayName
                      }
                    ).then(() => {
                      this.sorteia(id,this.scannedCode, "jogador2_membro");

                      this.nvCtrl.push(Jogo, {id: id, jogoid: this.scannedCode});

                    });
                  }
                }

        , {
          text: 'Membros',
          handler: () => {
            //git this.entrar(id);
            this.nvCtrl.push(ListarMembrosPage, {familiaId: id});

          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public add (): void {
    this.nvCtrl.push(CadastroFamilia);
  }

  public entrar (id: string) {
    this.nvCtrl.push(ListarMembrosPage, {id: id});
  }


  sorteia (id: string, jogo: string, jogador: string) {

    this.db.collection<Pessoa>('pessoa', ref => ref.where('id', '==', id)).valueChanges()
      .subscribe(value => {

        let pessoas: Pessoa[] = value;

        let idSorteado;

        let min = 0;
        let max = pessoas.length - 1;
        let posicaoAleatoria = Math.floor(Math.random() * (max - min + 1) + min);

        let membro = pessoas[posicaoAleatoria];

         console.log(membro);
        this.db.collection("jogos").doc(jogo).update(
          {[jogador]: membro}
        );
      });
  }
  partidas (id: string, jogo: string, jogador: string) {

    this.db.collection<Login>('login', ref => ref.where('id', '==', id)).valueChanges()
      .subscribe(value => {

        let login: Login[] = value;


        console.log();
        this.db.collection("partidas").doc(jogo).update(
          {[jogador]: login}
        );
      });
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    });
  }

}
