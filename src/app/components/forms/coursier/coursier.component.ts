import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CoursierModel } from 'src/app/models';
import { ApiFirebaseService, FirebaseEmailAuthService, UploadFirebaseService, DataFirestoreService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-coursier',
  templateUrl: './coursier.component.html',
  styleUrls: ['./coursier.component.scss'],
})
export class CoursierComponent implements OnInit {
  form: FormGroup;
  @Input('id') id: string;
  data: CoursierModel;
  oldPhoto: string;
  newPhoto: string | ArrayBuffer;
  file: any;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private api: ApiFirebaseService,
    private auth: FirebaseEmailAuthService,
    private upload: UploadFirebaseService
  ) { }

  ngOnInit() {
    this.initForm();
    if (this.id) {
      DataFirestoreService.coursiers.subscribe(
        res => {
          if (res.length > 0) {
            let coursier = res.find(item => item.id === this.id);
            if (coursier) {
              this.data = coursier.data;
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
      nom: new FormControl('', Validators.required),
      prenom: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required)
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
      this.auth.registrer(data.email).then(
        res => {
          this.api.set('coursiers', res.id, data).then(
            res2 => {
              window.alert('Le mot de passe est : ' + res.password);
              this.onClose();
              AlertService.presentToast('Opération effectuée!', 'success');
             },
             err => {
              console.warn(err);
              AlertService.presentToast('Opération échouée!', 'danger');     
            }
          );
        },
        err => {
          console.warn(err);
          AlertService.presentToast('Opération échouée!', 'danger');     
        }
      );
    } else {
      this.api.put('coursiers', this.id, data).then(
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
    return this.upload.post('img/coursiers',this.file);
  }

  onClose() {
    this.modalController.dismiss();
  }
}
