import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {EmailValidator, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from "angularfire2/auth";
import {EmailValidation, PasswordValidation} from "../../validators/validators";

@Component({
  selector: 'app-cadastroLogin',
  templateUrl: './cadastroLogin.html'

})
export class CadastroLogin {

  public ref: any;
  formCadastro: FormGroup;
  nome: string = "";
  email: string = "";
  dataNascimento: string = "";
  senha: string = "";
  confirmaSenha: string = "";

  constructor(public db: AngularFirestore,
              public navCtrl: NavController,
              public loadCtrl: LoadingController,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public afAuth: AngularFireAuth,
              public formBuilder: FormBuilder) {

    this.formCadastro = this.formBuilder.group({

      nome: ['', [Validators.required]],
      email: ['', [Validators.required, EmailValidation.isValid]],
      dataNascimento: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async salvar() {

    if(this.senha != this.confirmaSenha){
      this.toastCtrl.create({
        message: "Senhas não conferem",
        duration: 3000
      }).present();
      return;
    }
    const obj = {
      'nome': this.nome,
      'email': this.email,
      'dataNascimento': this.dataNascimento,
      'uid': null
    };

    let progress = this.loadCtrl.create();
    progress.present();
    try {

      await
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.senha)
          .then((user) => {
            console.log(user);
            obj.uid = user.uid;
            this.db.collection('login').doc(user.uid).set(obj);
          })

    } catch (error) {
      this.alertCtrl.create({
        title: "Erro",
        subTitle: error.message,
        buttons: ['OK']
      }).present();
    } finally {
      progress.dismiss();
    }

  }
}
