import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AdminComponent } from 'src/app/components/forms/admin/admin.component';
import { NetworkComponent } from 'src/app/components/forms/network/network.component';
import { ScriptComponent } from 'src/app/components/forms/script/script.component';
import { NetworkDetailsComponent } from 'src/app/components/profil/network-details/network-details.component';
import { ScriptModel } from 'src/app/models';
import { ApiFirebaseService, DataFirestoreService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.page.html',
  styleUrls: ['./scripts.page.scss'],
})
export class ScriptsPage implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  scripts: {id: string, data: ScriptModel }[] = [];
  networks: {id: string, data: any}[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private api: ApiFirebaseService
  ) { }

  ngOnInit() {
   this.sub1 =  DataFirestoreService.networks.subscribe(
      res => this.networks = res
    );

    this.sub2 =  DataFirestoreService.scripts.subscribe(
      res => this.scripts = res
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  async onShow(id: string) {
    const modal = await this.modalController.create({
    component: NetworkDetailsComponent,
    componentProps: { id }
    });
    await modal.present();
  }

async onAddNetwork() {
  const modal = await this.modalController.create({
  component: NetworkComponent
  });
  await modal.present();
}

async onEditNetwork(id: string) {
  const modal = await this.modalController.create({
  component: NetworkComponent,
  componentProps: { id }
  });
  await modal.present();
}


  async onDeleteNetwork(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
           this.api.delete('networks', id).then(
             () => {
              AlertService.presentToast('Opération effectuée!', 'success')
             },
             err => {
              AlertService.presentToast('Opération échouée!', 'danger')
             }
           );
          }
        }
      ]
    });
  
    await alert.present();
  }



}

