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
import {ListarFamiliasPage} from '../pages/listar-familias/listar-familias';
import {Editar} from '../pages/editar/editar';

import {ListarMembrosPage} from '../pages/listar-membros/listar-membros';
import {ArquivoService} from '../provides/arquivo.service';
import {CadastrarMembrosPage} from "../pages/cadastrar-membros/cadastrar-membros";
import {AngularFireStorageModule} from "angularfire2/storage";

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
    ListarFamiliasPage,
    CadastroLogin,
    Editar,
    ListarMembrosPage,
    CadastrarMembrosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TelaLogin,
    Menu,
    CadastroFamilia,
    Jogo,
    ListarFamiliasPage,
    CadastroLogin,
    Editar,
    ListarMembrosPage,
    CadastrarMembrosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FotoService,
    Camera,
    ArquivoService
  ]
})
export class AppModule {
}
