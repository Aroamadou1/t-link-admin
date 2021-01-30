import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { LoadingController } from '@ionic/angular';

const { Contacts } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private loadingController: LoadingController,
  ) {
  }

  static async get() {
    const loading = await new LoadingController().create({
      cssClass: 'my-custom-class',
      message: 'Chargement...',
      mode: 'ios',
      duration: 60000
    });

    loading.present();
    return this.canDo().then(                  
      res => {
        if (res) {
         return Contacts.getContacts().then(result => {
           return Promise.all(
              result.contacts.map(item => {
              
                  var regex1 = new RegExp(' ', 'g'), regex2 = new RegExp('-', 'g');

  
                  // ContactService.isTOTOExpressClient(phoneNumber).then(
                  //   res => {
                  //     // console.log(res[0]);
                  //   }
                  // );
                  return { id: item.contactId, data: { displayName: item.displayName, phoneNumber: item.phoneNumbers[0].trim().replace(regex1, '').replace(regex2, '') } };
                
              }).filter(item => item).sort(ContactService.compare)
            ).then(
              (res) => {
                console.log(res);
                loading.dismiss();
                return res;
              }
            );
          });
        }
      }
    );

  }


  static compare(a, b) {
    if (a.data.displayName < b.data.displayName) {
      return -1;
    }
    if (a.data.displayName > b.data.displayName) {
      return 1;
    }
    return 0;
  }

  static canDo() {
    return Contacts.getPermissions().then(
      (res) => {
        return res.granted;
      }
    )
  }

  static add(displayName: string, phoneNumber: string) {
    // let contact: any = ContactService.contact.create();
    // contact.displayName = displayName;
    // contact.phoneNumbers = [new ContactField('mobile', phoneNumber)];
    // return contact.save();
    return;
  }

  // async isTOTOExpressClient(phoneNumber: string) {
  //   let formatedPhone;
  //   if (phoneNumber.substring(0, 1) === '+') formatedPhone = phoneNumber;
  //   else if (phoneNumber.substring(0, 2) === '00') formatedPhone = '+' + phoneNumber.substring(2);
  //   else formatedPhone = '+228' + phoneNumber;
  //   ContactService.afs.collection('clients', ref => ref.where('phoneNumber', '==', formatedPhone).limit(1)).snapshotChanges().subscribe(res => {
  //     if (res.length > 0) {
  //       console.log("Match found.");
  //     }
  //     else {
  //       console.log("Does not exist.");
  //     }
  //   });
  // }
}