import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiFirebaseService } from 'src/app/services';
import { ApiHttpService } from 'src/app/services/api/api-http.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss'],
})
export class LivraisonComponent implements OnInit, OnDestroy {

  @Input('id') id: string;
  livraison: any;
  sub: Subscription;

  constructor(
    private api: ApiFirebaseService,
    private apiHttp: ApiHttpService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.sub = this.api.getById('livraisons', this.id).subscribe(
      res => this.livraison = res
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCall(coursierId?: string){
    this.apiHttp.post('livraison/call', {livraisonId: this.id, coursierId}).then(
      (res) => {
        console.log(res);
      }
    );
  }


  onClose() {
    this.modalController.dismiss();
  }

}
