import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ApiSocketService {

  constructor(
    private socket: Socket
  ) { }

  /**
   * 
   * @param event 
   * @param data 
   */
   post(event: string, data: any) {
    return new Promise(
      (resolve, reject) => {
        this.socket.emit(event, data);
        this.socket.on(event,
          res => {
            if (res.data) resolve(res.data);
            // if (res.infos) this.alert.presentToast(res.infos);
          })
      }
    );
  }

   get(event) {
    return this.socket.fromEvent(event);
  }
}
