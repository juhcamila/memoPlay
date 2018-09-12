import {Component} from '@angular/core';
import {NavController, ActionSheetController, NavParams, LoadingController, ToastController} from 'ionic-angular';

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
import {SolicitacaoPage} from "../solicitacao/solicitacao";
import {Membros} from "../../models/membros";


@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-familias.html'
})
export class ListarFamiliasPage {

  public lista: Observable<Familia[]>;
  public user = false;
  scannedCode: string;
  public uid: any;





  constructor (public nvCtrl: NavController,
               public db: AngularFirestore,
               public afAuth: AngularFireAuth,
               public asCtrl: ActionSheetController,
               public modalCtrl: ModalController,
               private loadingCrtl: LoadingController,
               public alertCtrl: AlertController,
               private barcodeScanner: BarcodeScanner,
               public params: NavParams,
               private toastCtrl: ToastController){


    this.lista = db.collection<Familia>('familia').valueChanges();



    // for (let Familia of f) {
    //   this.lista1 = db.collection<Pessoa>('pessoa', ref => ref.where("id", "==", Familia.id)).valueChanges();
    // }


  }




  presentActionSheet (id: string, uid: string) {

      this.db.collection<Membros>('membros', ref => ref.where('familia', '==', id)).valueChanges().subscribe(((logar: any) => {


       for (let num of logar) {
         if(this.afAuth.auth.currentUser.uid == num.uid) {
           this.user = true;
           console.log(this.afAuth.auth.currentUser.uid);
           console.log(num.uid);
         }

       }

      if (this.afAuth.auth.currentUser.uid == uid || this.user == true ) {
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
                  this.nvCtrl.push(QrCodePage, {id: id, jogoid: ref.id,});
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
                  this.sorteia(id, this.scannedCode, "jogador2_membro");

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
            }
            , {
              text: 'Solicitações',
              handler: () => {
                this.nvCtrl.push(SolicitacaoPage, {familiaId: id});
                console.log({familiaId: id});
              }

            },

            {
              text: 'Cancel',
              role: 'cancel',
            }
          ]
        });
        actionSheet.present();
      } else {
        let actionSheet = this.asCtrl.create({

          buttons: [
            {
              text: 'Entrar',
              handler: () => {


                this.db.collection("notifica").add({
                  uid: this.afAuth.auth.currentUser.uid,
                  nome: this.afAuth.auth.currentUser.displayName,
                  familia: id

                }).then((ref) => {
                  this.db.collection('notifica').doc(ref.id).update({id: ref.id}).then(() => {
                    this.toastCtrl.create({
                      message: "Solicitação enviada com sucesso.",
                      duration: 3000
                    }).present();
                    this.nvCtrl.push(ListarFamiliasPage);
                  })


                })
              }

            },
            {
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

    }));


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
