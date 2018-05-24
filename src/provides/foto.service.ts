import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";

@Injectable()
export class FotoService {
  constructor(private camera: Camera) {

  }

  public async tirarFoto() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    return 'data:image/jpeg;base64,' + await this.camera.getPicture(cameraOptions);
  }

  public galeria() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    return this.camera.getPicture(cameraOptions).then((imageData) => {
      return 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      alert("Erro galeria");
    });
  }

}
