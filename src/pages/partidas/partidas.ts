import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jogo } from '../../models/jogo';
import { JogoService } from '../../provides/jogo.service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html',
})
export class PartidasPage {

  jogos: Observable<Jogo[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jogoService: JogoService) {
    this.jogos = jogoService.listar();

    jogoService.listar().subscribe(value =>{
      console.log(value);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartidasPage');
  }
}
