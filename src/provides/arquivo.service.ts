import {Injectable} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";


/*
  Generated class for the ArquivoService provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArquivoService {

  constructor(private storage: AngularFireStorage) {
  }

  public async upload(caminho: string, arquivo: any): Promise<string> {
    return await this.storage.upload(caminho, arquivo).downloadURL().toPromise();
  }

  public async blob(arquivo: any): Promise<Blob> {
    return await fetch(arquivo).then(async blob => {
      return await blob.blob();
    });
  }

  public delete(caminho: string) {
    return this.storage.ref(caminho).delete().subscribe();
  }
}
