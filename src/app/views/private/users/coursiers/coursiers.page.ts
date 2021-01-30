import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CoursierComponent } from 'src/app/components/forms/coursier/coursier.component';
import { CoursierModel } from 'src/app/models';
import { ApiFirebaseService, DataFirestoreService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-coursiers',
  templateUrl: './coursiers.page.html',
  styleUrls: ['./coursiers.page.scss'],
})
export class CoursiersPage implements OnInit {
  data: {id: string, data: CoursierModel}[];
  sub: Subscription;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private api: ApiFirebaseService
  ) { }

  ngOnInit() {
   this.sub =  DataFirestoreService.coursiers.subscribe(
      res => this.data = res
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

async onAdd() {
  const modal = await this.modalController.create({
  component: CoursierComponent
  });
  await modal.present();
}

async onEdit(id: string) {
  const modal = await this.modalController.create({
  component: CoursierComponent,
  componentProps: { id }
  });
  await modal.present();
}


async onShow(id: string) {
  const modal = await this.modalController.create({
  component: CoursierComponent,
  componentProps: { id }
  });
  await modal.present();
}

  async onDelete(id: string) {
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
           this.api.delete('coursiers', id).then(
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
