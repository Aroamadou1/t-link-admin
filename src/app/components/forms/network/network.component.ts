import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiFirebaseService, UploadFirebaseService, DataFirestoreService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {

  form: FormGroup;
  @Input('id') id: string;
  data: any;
  oldPhoto: string;
  newPhoto: string | ArrayBuffer;
  file: any;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private api: ApiFirebaseService,
    private upload: UploadFirebaseService
  ) { }

  ngOnInit() {
    this.initForm();
    if (this.id) {
      DataFirestoreService.networks.subscribe(
        res => {
          if (res.length > 0) {
            let network = res.find(item => item.id === this.id);
            if (network) {
              this.data = network.data;
              this.form.patchValue(this.data);
              this.newPhoto = this.oldPhoto = this.data.photo;

            }
          }
        }
      )
    }
  }

  initForm() {
    this.form = new FormGroup({
      carrierName: new FormControl('', Validators.required),
      mcc: new FormControl('', Validators.required),
      mnc: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      countryCode: new FormControl(''),
      displayName: new FormControl('', Validators.required),
    });
  }

  onDeletePhoto() {

  }

  onSubmit() {
    let data = this.form.value;
    if (this.oldPhoto != this.newPhoto) {
     this.uploadPhoto().then(
        res => {
          console.log(res.ref.fullPath);
        res.ref.getDownloadURL().then(
            res => {
              console.log(res);
              data.photo = res;
              this.save(data);
            }
          );
        }
      );
    } else {
      this.save(data);
    }
    
  }

  save(data) {
    if (!this.id) {
          this.api.post('networks', data).then(
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
      this.api.put('networks', this.id, data).then(
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

  setBlob(event) {
    let me = this;
     this.file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = function () {
      console.log(reader.result);
      me.newPhoto =reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  uploadPhoto() {
    return this.upload.post('img/networks',this.file);
  }

  onClose() {
    this.modalController.dismiss();
  }
}
