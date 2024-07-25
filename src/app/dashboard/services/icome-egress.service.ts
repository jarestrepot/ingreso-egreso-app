import { Injectable } from '@angular/core';
import { IcomeEgress } from '@models/ingreso-egreso.model';
import { Firestore, doc, deleteDoc, setDoc, collection, CollectionReference, DocumentData, onSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { IcomeEgressInterface } from 'src/app/utils/interfaces/icomeEgress.interface';
import { environments } from 'src/environments/environmets';
import { Unsubscribe } from '@angular/fire/auth';
import { UnsubscribeInterface } from 'src/app/utils/interfaces/unsibcribeService.interface';
import { Observable, Subject } from 'rxjs';
import { ResponseItems } from 'src/app/utils/interfaces/responseItems.iterface';

@Injectable({
  providedIn: 'root'
})
export class IcomeEgressService implements UnsubscribeInterface {

  private uid?:string;
  #unsubscribe: Unsubscribe[] = [];
  #dataRefSubject: Subject<ResponseItems[]> = new Subject();
  constructor(
    private fireStore: Firestore,
  ){

  }

  async createIcomeEgress(icomeEgressInteface: IcomeEgressInterface):Promise<boolean> {
    // ** Add the document **//
    if( !this.uid ) return false;
    const id = this.uid;
    const docRef = doc(this.fireStore, environments.collections.ICOME_EGRESS, id);
    const subCollectionRef = collection(docRef, 'items');
    const newDocRef = doc(subCollectionRef);
    let icomeEgressClass = IcomeEgress.fromFirebase(icomeEgressInteface, newDocRef.id);
    try {
      await setDoc(newDocRef, { ...icomeEgressClass });
      // Activar modal.
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  }

  /**
   *
   * @param uid
   */
  initIcomesEgressListeners(uid: string) {
    this.uid = uid;
    const path:string = `${environments.collections.ICOME_EGRESS}/${uid}/${ environments.collections.ITEMS }`;
    const itemsIcomeEgress:CollectionReference<DocumentData, DocumentData> = collection(this.fireStore, path);
    const dataRef:ResponseItems[] = [];
    // Query Snapshot, Extract the document id
    const unSub = onSnapshot(
      itemsIcomeEgress,
      (snapshot: QuerySnapshot<DocumentData>) => {
        snapshot.docChanges().forEach((change) => {
          const docData = { ...change.doc.data() } as IcomeEgress;
          if( change.type === 'added' ){
            dataRef.push({
              change: change.type,
              doc: {
                ...change.doc.data()
              } as IcomeEgress
            });
          } else if (change.type === 'modified') {
            const index = dataRef.findIndex(item => item.doc.uid === change.doc.id);
            if( index !== -1 ) {
              dataRef[index] = { change: change.type, doc: docData }
            }
          } else if (change.type === 'removed'){
            const index = dataRef.findIndex(item => item.doc.uid === change.doc.id);
            if (index !== -1) {
              dataRef.splice(index, 1);
            }
          }
        });
        this.#dataRefSubject.next(dataRef);
      },
      (error) => {
        // TODO: Mensaje de error
        console.log(error);
      }
    );

    this.#unsubscribe.push( unSub );
  }

  getDataRefObservable(): Observable<ResponseItems[]> {
    return this.#dataRefSubject.asObservable();
  }

  /**
   * Function to stop transmitting the data string, it is no longer subscribed to the subscriptions
   */
  unsubscribeService(){
    try{
      this.#unsubscribe.forEach( (unSub, index) => {
        unSub();
      });
    }catch(e){
      console.error(e)
    }
  }

  async deleteIcomeEgress(idItem: string): Promise<void>{
    const path: string = `${environments.collections.ICOME_EGRESS}/${this.uid}/${environments.collections.ITEMS}/${idItem}`;
    const docRef = doc(this.fireStore, path);
    return await deleteDoc( docRef );
  }
}
