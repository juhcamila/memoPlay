import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Jogos } from "../models/jogos";
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

@Injectable()
export class JogosService {

  jogador1Jogos: BehaviorSubject<Jogos[]|null>;
  jogador2Jogos: BehaviorSubject<Jogos[]|null>;
  result: Observable<Jogos[]>;
  constructor(public db: AngularFirestore,
  private afAuth: AngularFireAuth) {
    console.log('Hello JogoProvider Provider');
  }

  listar(): Observable<Jogos[]>{
    let jogos1 = this.db.
    collection<Jogos>('jogos',ref => ref.where('jogador1', '==', this.afAuth.auth.currentUser.uid ))
    .valueChanges();

    let jogos2 = this.db.
    collection<Jogos>('jogos',ref => ref.where('jogador2', '==', this.afAuth.auth.currentUser.uid ))
    .valueChanges();

    return merge(jogos1, jogos2);
  }
}
