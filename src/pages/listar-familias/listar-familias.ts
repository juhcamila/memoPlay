import {Component} from '@angular/core';
import {NavController, ActionSheetController} from 'ionic-angular';

import {CadastroFamilia} from '../cadastroFamilia/cadastroFamilia';

import {Familia} from '../../models/familia';
import {Pessoa} from '../../models/pessoa';


import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {ModalController, AlertController} from 'ionic-angular';
import {ListarMembrosPage} from '../listar-membros/listar-membros';
import {Jogo} from '../jogo/jogo';


@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-falimias.html'
})
export class ListarFamiliasPage {

  public lista: Observable<Familia[]>;

  constructor (public nvCtrl: NavController,
               public db: AngularFirestore,
               public afAuth: AngularFireAuth,
               public asCtrl: ActionSheetController,
               public modalCtrl: ModalController,
               public alertCtrl: AlertController) {

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
              jogador2: null,
              ganhador: null,
              familia: id
            }).then((ref) => {
              this.db.collection("jogos").doc(ref.id).update({id: ref.id});

              this.sorteia(id, ref.id, "jogador1_membro");

              let alert = this.alertCtrl.create({
                title: 'Código do Jogo',
                subTitle: ref.id,
                buttons: [
                  {
                    text: 'Começar',
                    handler: () => {
                      this.nvCtrl.push(Jogo, {id: id, jogoid: ref.id});
                    }
                  },
                  {
                    text: 'Cancelar'
                  }
                ]
              });
              alert.present();

            })
          }
        },
        {
          text: 'Participar do jogo',
          handler: () => {
            let prompt = this.alertCtrl.create({
              title: 'Participar do Jogo',
              message: "Digite o código do jogo",
              inputs: [
                {
                  name: 'codigo',
                  placeholder: 'Código do Jogo'
                },
              ],
              buttons: [
                {
                  text: 'Cancelar'
                },
                {
                  text: 'Começar',
                  handler: data => {
                    this.db.collection("jogos").doc(data.codigo).update(
                      {jogador2: this.afAuth.auth.currentUser.uid}
                    ).then(() => {
                      this.sorteia(id, data.codigo, "jogador2_membro");
                      this.nvCtrl.push(Jogo, {id: id, jogoid: data.codigo});
                    });
                  }
                }
              ]
            });
            prompt.present();

          }
        }, {
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


        this.db.collection("jogos").doc(jogo).update(
          {[jogador]: membro}
        );
      });
  }

}
