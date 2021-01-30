import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AlertService, FirebaseEmailAuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup
  constructor(
    private auth: FirebaseEmailAuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form =  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
   this.auth.login(this.form.value.email, this.form.value.password).then(
    res => {
      AlertService.presentToast('Vous êtes connecté!', 'success');
    }, err =>{
      let message = 'l\' opération a échoué!';
      if (err.code === "auth/wrong-password") message = "Mot de passe incorrect!";
      if (err.code === "auth/user-not-found") message = "Email incorrect!";
      
      AlertService.presentToast(message, 'danger')
    }
    );
  }

}
