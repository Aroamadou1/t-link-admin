import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private static  _timer = 0;
  private static  _timerTextSubject = new BehaviorSubject<string>('00:00');
  private static  _audioRef: any;
  private static  _intervall: any;
  constructor() {
    
  }
/**
 * 
 */
  static get timer() {
    return this._timerTextSubject
  }

   
  /**
   * decompte tous les secondes
   * @param timer initialisateur
   */
  static startCompteurAudio(timer: number, max?: number) {
    this._intervall = window.setInterval(() => {
      timer++;
      if (timer===max) this.stopAudio();
      this._timerTextSubject.next(this.timerToString(timer));
   }, 1000);
 }

  /**
   * formate les tempstamps en chronos
   * @param time le temps en second
   */
  static timerToString(time: number): string {
    return time > 9 ? time.toString() : '0' + time;
  }

  static playAudio(data: string, length: number) {
    this._audioRef = new Audio(`data:audio/aac;base64,${data}`)
    this._audioRef.oncanplaythrough = () => {
      this.startCompteurAudio(this._timer, length);
      this._audioRef.play();
    }
    this._audioRef.load()
  }

  static pauseAudio() {
    window.clearInterval(this._intervall);
    this._audioRef.pause();
  }

  static stopAudio() {
    window.clearInterval(this._intervall);
    this._timer = 0;
    this._timerTextSubject.next('0:00');
    this._audioRef.pause();
    this._audioRef = null;
  }
}
