import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseEmailAuthService {



  constructor(
    public afAuth: AngularFireAuth,
  ) {

  }

  authState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  registrer(email: string) {
    let randPass = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
    randPass += possible.charAt(Math.floor(Math.random() * possible.length));
    return this.afAuth.createUserWithEmailAndPassword(email, randPass).then(
      res => { return {id: res.user.uid, password: randPass}}
    );
  }

  async logout() {
    await this.afAuth.signOut();
  }
}
