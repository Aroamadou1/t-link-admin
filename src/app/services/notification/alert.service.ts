import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
  ) { }

  static async presentToast(message: string , color: string) {
    const toast = await new ToastController().create({
      message: message,
      color: color,
      duration: 5000
    });
    toast.present();
  }

}
