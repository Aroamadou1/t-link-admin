import { Injectable } from '@angular/core';
import { LivraisonModel, ClientModel, ScriptModel, EmplacementModel, AdminModel, CoursierModel } from 'src/app/models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataFirestoreService {
  private static _user              : Observable<{ id: string, data: AdminModel }>;
  private static _poids             : Observable<{ id: string, data: any               }[]>;
  private static _tailles             : Observable<{ id: string, data: any               }[]>;
  private static _distances             : Observable<{ id: string, data: any               }[]>;
  private static _categories        : Observable<{ id: string, data: any               }[]>;
  private static _livraisons        : Observable<{ id: string, data: LivraisonModel    }[]>;
  private static _clients           : Observable<{ id: string, data: ClientModel      }[]>;
  private static _coursiers           : Observable<{ id: string, data: CoursierModel      }[]>;
  private static _admins          : Observable<{ id: string, data: AdminModel  }[]>;
  private static _networks           : Observable<{ id: string, data: any       }[]>;
  private static _scripts           : Observable<{ id: string, data: ScriptModel       }[]>;

  constructor(
  ) {
    
   }


/*** ********************** Authenticate user *****************/

/**
 * Verifie la disponibilité du pseudo.
 * @param pseudo : le pseudo à verifié
 */
//  verifyPseudo(pseudo:string){ 
//   this.afs.collection(this.userCollection,  ref => ref.where('pseudo', '==', pseudo)).valueChanges().subscribe(
//     res => {
//       if (res.length===0) DataFirestoreService.disponibilitePseudo.next(true);
//       else DataFirestoreService.disponibilitePseudo.next(false); 
//     }
//   );
// }


/**
 * Ajouter les informations du client.
 * @param data : informations du client
 */
// addUserCredentials(data: any, id: string) {
//   data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
//   return this.afs.collection(this.userCollection).doc(id).set(data).then(
//     () => {
//       DataFirestoreService.user.data = data;
//       return; 
//     }
//   );
// }

/**
 * Modifier les informations du client.
 * @param data : information du client.
 */
//  updateUserCredentials(id: string, data: any) {
//   data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
//   return this.afs.collection(this.userCollection).doc(id).update(data).then(
//     () => {
//       DataFirestoreService.user.data = data;
//       return; 
//     }
//   );
// }


/**
 * Charger les information de l'utilisateur.
 */
// static loadUser() {
//   console.log('loading user')
//   var docRef = AuthService.afs.collection(this.userCollection).doc(AuthService.id);
//   return docRef.get().pipe(map(function (doc) {
//     return doc.data();
//   }));
// }


  static get user():  Observable<{id: string, data: AdminModel}> {
    return this._user
  }

  static set user(val: Observable<{id: string, data: AdminModel}>) {
    this._user = val;
  }

  /**************************** CATGORIES  *******************/

  /**
   * 
   */
  static get categories(): Observable<{ id: string, data: any }[]> {
    return DataFirestoreService._categories;
  }

  /**
   * 
   */
  static set categories(data: Observable<{ id: string, data: any }[]>) {
    this._categories = data;
  }

    /**************************** POIDS  *******************/

  /**
   * 
   */
  static get poids(): Observable<{ id: string, data: any }[]> {
    return DataFirestoreService._poids;
  }

  /**
   * 
   */
  static set poids(data: Observable<{ id: string, data: any }[]>) {
    DataFirestoreService._poids = data;
  }



    /**************************** DisstanceS  *******************/

  /**
   * 
   */
  static get distances(): Observable<{ id: string, data: any }[]> {
    return DataFirestoreService._distances;
  }

  /**
   * 
   */
  static set distances(data: Observable<{ id: string, data: any }[]>) {
    DataFirestoreService._distances = data;
  }



    /**************************** TailleS  *******************/

  /**
   * 
   */
  static get tailles(): Observable<{ id: string, data: any }[]> {
    return DataFirestoreService._tailles;
  }

  /**
   * 
   */
  static set tailles(data: Observable<{ id: string, data: any }[]>) {
    DataFirestoreService._tailles = data;
  }

  /**************************** LIVRAISONS  *******************/

  /**
   * 
   */
  static get livraisons(): Observable<{ id: string, data: LivraisonModel }[]> {
    return DataFirestoreService._livraisons;
  }

  /**
   * 
   */
  static set livraisons(data: Observable<{ id: string, data: LivraisonModel }[]>) {
    DataFirestoreService._livraisons = data;
  }


  /*********************************** AdminS ********************/
  /**
   * 
   */
  static get admins(): Observable<{ id: string, data: AdminModel }[]> {
    return DataFirestoreService._admins;
  }

  /**
   * 
   */
  static set admins(data: Observable<{ id: string, data: AdminModel }[]>) {
    DataFirestoreService._admins = data;
  }

 
  



  /*********************************** CLIENTS ********************/
  /**
   * 
   */
  static get clients(): Observable<{ id: string, data: ClientModel }[]> {
    return DataFirestoreService._clients;
  }

  /**
   * 
   */
  static set clients(data: Observable<{ id: string, data: ClientModel }[]>) {
    DataFirestoreService._clients = data;
  }

 

  /*********************************** CoursierS ********************/
  /**
   * 
   */
  static get coursiers(): Observable<{ id: string, data: CoursierModel }[]> {
    return DataFirestoreService._coursiers;
  }

  /**
   * 
   */
  static set coursiers(data: Observable<{ id: string, data: CoursierModel }[]>) {
    DataFirestoreService._coursiers = data;
  }

   /*********************************** NetworkS ********************/
   static get networks(): Observable<{ id: string, data: any }[]> {
    return DataFirestoreService._networks;
  }

  /**
   * 
   */
  static set networks(data: Observable<{ id: string, data: any }[]>) {
    DataFirestoreService._networks = data;
  }


  /*********************************** Scripts ********************/
  static get scripts(): Observable<{ id: string, data: ScriptModel }[]> {
    return DataFirestoreService._scripts;
  }

  /**
   * 
   */
  static set scripts(data: Observable<{ id: string, data: ScriptModel }[]>) {
    DataFirestoreService._scripts = data;
  }

}
