import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LerCodigoPage } from './ler-codigo';

@NgModule({
  declarations: [
    LerCodigoPage,
  ],
  imports: [
    IonicPageModule.forChild(LerCodigoPage),
  ],
})
export class LerCodigoPageModule {}
