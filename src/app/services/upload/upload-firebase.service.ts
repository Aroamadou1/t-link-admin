import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFirebaseService {


  constructor(private afStorage: AngularFireStorage) { }

  post (path, file) {
    let downloadURL,
    ref: AngularFireStorageReference,
    task: AngularFireUploadTask,
    uploadProgress: Observable<number>;
  ;
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
   ref = this.afStorage.ref('/' + path + '/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    task = ref.put(file);

    // uploadProgress = task.snapshotChanges()
    // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

    uploadProgress = task.percentageChanges();

    // get notified when the download URL is available
    return task.snapshotChanges().pipe(
      finalize(() => downloadURL = ref.getDownloadURL())
    ).toPromise();
  }
}
