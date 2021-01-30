import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LivraisonComponent } from 'src/app/components/profil/livraison/livraison.component';
import { ApiFirebaseService, DataFirestoreService } from 'src/app/services';

@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.page.html',
  styleUrls: ['./livraisons.page.scss'],
})
export class LivraisonsPage implements OnInit, OnDestroy {

  livraisons: {id: string, data: any}[];
  sub: Subscription;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private api: ApiFirebaseService
  ) { }

  ngOnInit() {
    this.sub =  DataFirestoreService.livraisons.subscribe(
      res => this.livraisons = res
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onShow(id: string) {
    const modal = await this.modalController.create({
    component: LivraisonComponent,
    componentProps: { id }
    });
    await modal.present();
  }

}
