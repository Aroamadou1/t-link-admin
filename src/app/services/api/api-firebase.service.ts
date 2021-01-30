import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiFirebaseService {

  constructor(private afs: AngularFirestore) {
  }

  /**
 * 
 * @param path 
 */
  get(path: string, ref?: any) {
    return this.afs.collection(path, ref).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id: id, data: data };
      }))
    );
  }

  getById(path: string, id: string, ref?: any) {
    return this.afs.collection(path, ref).doc(id)
    .snapshotChanges()
      .pipe(
        map( a => {
          const data = a.payload.data() as any;
          const id = a.payload.id;
          return { id: id, data: data };
        })
      )
  }

  /**
   * 
   * @param collection 
   * @param path 
   * @param ref 
   */
  getInCollection(collection: string, id: string, path: string, ref?: any) {
    return this.afs.collection(collection).doc(id).collection(path, ref).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  getByIdInCollection(collection: string, collectionId: string, path: string, id: string, ref?: any) {
    return this.afs.collection(collection).doc(collectionId).collection(path, ref).doc(id)
    .snapshotChanges()
      .pipe(
        map( a => {
          const data = a.payload.data() as any;
          const id = a.payload.id;
          return { id: id, data: data };
        })
      )
  }


  /**
   * 
   * @param path 
   * @param data 
   */
  post(path: string, data: any) {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection(path).add(data);
  } 


/**
 * 
 * @param collection 
 * @param id 
 * @param path 
 * @param data 
 */
  addToCollection(collection: string, id: string, path: string, data: any) {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection(collection).doc(id).collection(path).add(data);
  }

  /**
   * 
   * @param path 
   * @param id 
   * @param data 
   */
  put(path: string, id: string, data: any) {
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection(path).doc(id).update(data);
  }

  editInCollection(collection, collectionId, path: string, id: string, data: any) {
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection(collection).doc(collectionId).collection(path).doc(id).update(data);
  }

  set(path: string, id: string, data: any) {
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection(path).doc(id).set(data);
  }


  softDelete(path: string, id: string) {
    let deletedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection(path).doc(id).update({ deletedAt: deletedAt });
  }


  /**
   * 
   * @param path 
   * @param id 
   */
  delete(path: string, id: string) {
    return this.afs.collection(path).doc(id).delete();
  }

  deleteInCollection(collection, collectionId, path: string, id: string) {
    return this.afs.collection(collection).doc(collectionId).collection(path).doc(id).delete();
  }

}
