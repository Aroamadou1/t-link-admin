import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiFirebaseService, DataFirestoreService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss'],
})
export class ScriptComponent implements OnInit {


  form: FormGroup;
  @Input('networkId') networkId: string;
  @Input('id') id: string;
  data: any;
  networks: any[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private api: ApiFirebaseService
  ) { }

  ngOnInit() {
    console.log(this.networkId);
    this.initForm();
    if (this.id) {
      this.api.getByIdInCollection('networks', this.networkId, 'scripts', this.id).subscribe(
        res => {
          console.log(res);
          this.data = res.data;
          this.form.patchValue(this.data);
        }
      );
    }
  }

  initForm() {
    this.form = new FormGroup({
      icon: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      labels: new FormArray([
      ]),
    });
  }

  get labels() {
    return this.form.get('labels') as FormArray;
  }

  onAddLabel() {
    this.labels.push(new FormGroup({ nom: new FormControl('', Validators.required), type: new FormControl('', Validators.required), scan: new FormControl(false, Validators.required) }));
    // this.form.updateValueAndValidity();
  }

  onRemoveLabel(i) {
    this.labels.removeAt(i);
  }

  onSubmit() {
    let data = this.form.value;
    this.save(data);
  }

  save(data) {
    if (!this.id) {
      this.api.addToCollection('networks', this.networkId, 'scripts', data).then(
        res2 => {
          this.onClose();
          AlertService.presentToast('Opération effectuée!', 'success');
        },
        err => {
          console.warn(err);
          AlertService.presentToast('Opération échouée!', 'danger');
        }
      );

    } else {
      this.api.editInCollection('networks',this.networkId,'scripts', this.id, data).then(
        res2 => {
          this.onClose();
          AlertService.presentToast('Opération effectuée!', 'success');
        },
        err => {
          console.warn(err);
          AlertService.presentToast('Opération échouée!', 'danger');
        }
      );
    }
  }

  onClose() {
    this.modalController.dismiss();
  }

}