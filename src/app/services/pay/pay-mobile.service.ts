import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PayService {
  private static key = "c56d7d30-9d96-4b11-9b53-12e5dba25a8c";

  constructor() { }

  static do(id, montant, network) {
    Browser.open({
      url: 'https://paygateglobal.com/v1/page?token=c56d7d30-9d96-4b11-9b53-12e5dba25a8c&amount=' + montant + '&description=test&identifier=' + id + '&network=' + network
    });
  }
}
