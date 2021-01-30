import { Injectable } from '@angular/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { PayService } from '..';

const { PushNotifications, StatusBar, SplashScreen } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FCMService {
  private static _key: string;

  constructor() { }

  static set key(val) {
    this._key = val;
  }

  static get key(): string {
    return this._key;
  }

  static getPermissions() {
    return PushNotifications.requestPermission().then(
      result => {
        if (result.granted) {
          console.log(result)
          PushNotifications.register();
          return true;
        }
      }
    );
  }

  static loadKey() {
    this.getPermissions().then(
      res => {
        if (res) {
          PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
              //  alert('Push registration success, token: ' + token.value);
              // this.data.fcmKey = token.value;
              this.key = token.value;
              console.log('Push registration success, token: ' + token.value);
              this.get();
            }
          );
        } else {
          window.alert('Vous ne pouvez pas de recevoir de notifications, Veuillez l\'activer dans les paramètres de votre appareil!');
        }
      }
    )


    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        //  alert('Error on registration: ' + JSON.stringify(error));
      }
    );
  }

  static get() {
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        console.log('Push received: ', notification);
        let title = notification.title,
          subtiltle = notification.subtitle,
          message = notification.body,
          data = notification.data,
          event = data.event,
          montant = +data.montant,
          id = data.id;
        if (event === "livraison:start" || event === "livraison:validation") {
          this.presentConfirm({ id, event, title, subtiltle, message, montant });
        } else {
          // this.presentShow({ title, subtiltle, message });
        }
      }
    );
  }

   static open() {
    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (res: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + res);
        let data = res.notification.data,
          title = data.title,
          subtiltle = data.subtitle,
          message = data.message,
          event = data.event,
          montant = +data.montant,
          id = data.id;

        // if (event === "livraison:start" || event === "livraison:validation") {
        //   this.presentConfirm({ id, event, title, subtiltle, message, montant });
        // } else {
        //   this.presentShow({ title, subtiltle, message });
        // }
      }
    );
  }


   static async presentConfirm({ id, event, title, subtiltle, message, montant }) {
    let  alertController =  new AlertController();
    const alert = await alertController.create({
      header: title,
      subHeader: subtiltle,
      message: message,
      backdropDismiss: false,
      mode: "ios",
      translucent: true,
      buttons: [
        {
          text: 'Rejeter',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            // if (event === 'livraison:start') this.livraisonService.delete(id);
            // else if (event === 'livraison:validation') this.api.postSocket('livraison:payement', { livraisonId: id, response: false });
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Accepter',
          handler: () => {
            if (event === 'livraison:start') PayService.do(id, montant, 'togocel');
            // else if (event === 'livraison:validation') this.livraisonService.pay(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // On succcess, we should be able to receive notifications


  // Show us the notification payload if the app is open on our device




}
