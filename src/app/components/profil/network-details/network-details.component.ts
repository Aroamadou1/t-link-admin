import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService, ApiFirebaseService } from 'src/app/services';
import { ScriptComponent } from '../../forms/script/script.component';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.scss'],
})
export class NetworkDetailsComponent implements OnInit, OnDestroy {

  @Input('id') id: string;
  scripts: any[] = [];
  sub: Subscription;

  constructor(
    private api: ApiFirebaseService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.sub = this.api.getInCollection('networks', this.id, 'scripts').subscribe(
      res => {
        console.log(res);
        this.scripts = res;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onAddScript() {
    const modal = await this.modalController.create({
      component: ScriptComponent,
      componentProps: { networkId: this.id }
    });
    await modal.present();
  }

  async onEditScript(id: string) {
    const modal = await this.modalController.create({
      component: ScriptComponent,
      componentProps: { id , networkId: this.id }
    });
    await modal.present();
  }


  async onDeleteScript(id: string) {
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
            this.api.delete('scripts', id).then(
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
