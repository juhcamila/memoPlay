import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitacaoPage } from './solicitacao';

@NgModule({
  declarations: [
    SolicitacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitacaoPage),
  ],
})
export class SolicitacaoPageModule {}
