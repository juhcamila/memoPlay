import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Jogo } from "../models/jogo";
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

@Injectable()
export class JogoService {

  jogador1Jogos: BehaviorSubject<Jogo[]|null>;
  jogador2Jogos: BehaviorSubject<Jogo[]|null>;
  result: Observable<Jogo[]>;
  constructor(public db: AngularFirestore,
  private afAuth: AngularFireAuth) {
    console.log('Hello JogoProvider Provider');
  }

  listar(): Observable<Jogo[]>{
    console.log(this.afAuth.auth.currentUser.uid);
    let jogos1 = this.db.
    collection<Jogo>('jogos',ref => ref.where('jogador1', '==', this.afAuth.auth.currentUser.uid ))
    .valueChanges();

    let jogos2 = this.db.
    collection<Jogo>('jogos',ref => ref.where('jogador2', '==', this.afAuth.auth.currentUser.uid ))
    .valueChanges();

    return merge(jogos1, jogos2);
  }
}
