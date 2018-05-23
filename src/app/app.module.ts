import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TelaLogin} from '../pages/TelaLogin/TelaLogin';
import {AngularFireModule} from 'angularfire2'
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FotoService} from "../provides/foto.service";
import {Camera} from '@ionic-native/camera';
import {Menu} from '../pages/menu/menu';
import {Jogo} from "../pages/jogo/jogo";
import {CadastroFamilia} from '../pages/cadastroFamilia/cadastroFamilia';
import {CadastroLogin} from '../pages/cadastroLogin/cadastroLogin';
import {ListarPessoas} from '../pages/listarPessoas/listarPessoas';
import {Editar} from '../pages/editar/editar';
import {CadastrarMembros} from '../pages/cadastrarMembros/cadastrarMembros';
import {ListarMembros} from '../pages/listarMembros/listarMembros';


const config = {
  apiKey: "AIzaSyALy6TdgRCkYPs6hSYXHvt-Es8lRDKkpXg",
  authDomain: "alzheimermemory-10e14.firebaseapp.com",
  databaseURL: "https://alzheimermemory-10e14.firebaseio.com",
  projectId: "alzheimermemory-10e14",
  storageBucket: "alzheimermemory-10e14.appspot.com",
  messagingSenderId: "705114889372"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TelaLogin,
    Menu,
    CadastroFamilia,
    Jogo,
    ListarPessoas,
    CadastroLogin,
    Editar,
    CadastrarMembros,
    ListarMembros

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TelaLogin,
    Menu,
    CadastroFamilia,
    Jogo,
    ListarPessoas,
    CadastroLogin,
    Editar,
    CadastrarMembros,
    ListarMembros
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FotoService,
    Camera
  ]
})
export class AppModule {
}
