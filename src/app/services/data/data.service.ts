import { Injectable } from '@angular/core';
import { ContactModel, SimModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static _contacts          : { id: string, data: ContactModel      }[] = [];
  private static _sims              : { id: string, data: SimModel          }[] = [];

  constructor() { }

  /*********************************** CONTACTS ********************/
  /**
   * 
   */
  static get contacts(): { id: string, data: ContactModel }[] {
    return this._contacts;
  }

  /**
   * 
   * @param start 
   * @param end 
   * @param arg 
   */
  static getContacts(start: number, end: number, arg?: string) {
    if (this.contacts.length>0) {
      if(!arg) return this.contacts.slice(start, end)
      return this.contacts
        .filter(item => 
          item.data.displayName.toLowerCase()
            .includes(arg.toLowerCase()) || item.data.phoneNumber.toLowerCase().includes(arg.toLowerCase())
        ).slice(start, end);
    }
    return [];
  }
  /**
   * 
   */
  static set contacts(data: { id: string, data: ContactModel }[]) {
    this._contacts = data;
  }


   /*********************************** SIMS ********************/
   static get sims(): { id: string, data: SimModel }[] {
    return this._sims;
  }

  /**
   * 
   */
  static set sims(data: { id: string, data: SimModel }[]) {
    this._sims = data;
  }

}
