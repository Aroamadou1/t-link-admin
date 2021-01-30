import { Injectable } from '@angular/core';
import { RecordingData, GenericResponse } from 'capacitor-voice-recorder';
import { Plugins } from "@capacitor/core";
import { BehaviorSubject } from 'rxjs';
const { VoiceRecorder } = Plugins


@Injectable({
  providedIn: 'root'
})
export class RecorderService {

  private static _timer = 0;
  private static _timerTextSubject = new BehaviorSubject<string>('00:00');
  private static _intervall: any;
  constructor() {
    
   }

   static get timer() {
     return this._timerTextSubject;
   }

   /** 
   * will prompt the user to give the required permission, after that
   * the function will print true / false based on the user response
   */
  static hasRecordPermission() {
    return VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => { console.log('has permissions :', result.value); return result.value })
  }

  static getRecordPermission() {
    return VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => { console.log('get permissions :', result.value); return result.value })
  }

  /**
   * decompte tous les secondes
   * @param _timer initialisateur
   */
  static startCompteurRecord(_timer: number, max?: number) {
    this._intervall = window.setInterval(() => {
       _timer++;
       this._timerTextSubject.next(this._timerToString(_timer));
    }, 1000);
  }

  /**
   * formate les tempstamps en chronos
   * @param time le temps en second
   */
  static _timerToString(time: number): string {
    return time > 9 ? time.toString() : '0' + time;
  }

  /**
   * enregistre un audio et retourne la decomte;
   */
  static startRecording(): Promise<any> {
    return VoiceRecorder.startRecording()
    .then((result: GenericResponse) => {
      console.log(result);
      this._timer = 0;
      this.startCompteurRecord(this._timer);
      return result.value;
    }).catch(error => console.log(error));    
    
  }

  /**
   * arrete l'enregistrement audio et retourne l'audio et la durée
   */
  static stopRecording():Promise<any> {
    return VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        this._timer = 0;
        this._timerTextSubject.next('0:00')
        window.clearInterval(this._intervall);
        return result.value;
      })
      .catch(error => console.log(error))
  }

}
