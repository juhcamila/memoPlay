import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FotoService} from '../../provides/foto.service';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {ArquivoService} from "../../provides/arquivo.service";
import {e} from "@angular/core/src/render3";

@Component({
  selector: 'app-cadastrar-membros',
  templateUrl: './cadastrar-membros.html'
})
export class CadastrarMembrosPage {

  imagem: string;
  familiaId: string;
  photo: any;

  constructor(private foto: FotoService,
              private db: AngularFirestore,
              private navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private params: NavParams,
              private arquivoService: ArquivoService,
              private loadingCrtl: LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {

    this.familiaId = params.get('familiaId');
  }

  public async selecionarFoto() {
    this.photo = await this.foto.tirarFoto();
  }

  async salvar(form: NgForm) {

    let progress = this.loadingCrtl.create();
    progress.present();

    try {
      const obj = {
        nome: form.value.nome,
        grauParentesco: form.value.grauParentesco,
        id: this.familiaId
      };

      let uid = this.afAuth.auth.currentUser.uid;
      let ref = await this.db.collection('pessoa').add(obj);

      let caminho: string = `usuarios/${uid}/familias/${this.familiaId}/pessoas/${ref.id}/foto`;
      await this.db.collection('pessoa').doc(ref.id).update({uid: ref.id});

      let blob = await this.arquivoService.blob(this.photo);
      let url = await this.arquivoService.upload(caminho, blob);

      await this.db.collection('pessoa').doc(ref.id).update({
        uid: ref.id,
        fotoUrl: url
      });

      this.toastCtrl.create({
        message: "Membro adicionado com sucesso.",
        duration: 3000
      }).present();
      this.navCtrl.pop();
    } catch (error) {
      this.alertCtrl.create({
        title: "Erro",
        message: error.message,
        buttons: ['ok']
      }).present();
    } finally {
      progress.dismiss();
    }

  }


}
