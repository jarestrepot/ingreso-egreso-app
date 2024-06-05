import { Injectable } from '@angular/core';
import { IcomeEgress } from '@models/ingreso-egreso.model';
import { Firestore, doc, deleteDoc, getDoc, setDoc, addDoc, collection, CollectionReference, DocumentData, collectionData } from '@angular/fire/firestore';
import { AuthService } from '@auth/services/auth.service';
import { DashboardModule } from '@dashboard/dashboard.module';
import { IcomeEgressInterface } from 'src/app/utils/interfaces/icomeEgress.interface';
import { environments } from 'src/environments/environmets';

@Injectable({
  providedIn: DashboardModule
})
export class IcomeEgressService {

  private uid?:string;
  constructor(
    private fireStore: Firestore,
  ) {

  }

  async createIcomeEgress(icomeEgressInteface: IcomeEgressInterface):Promise<boolean> {
    // ** Añadir un documento **//
    if( !this.uid ) return false;
    const id = this.uid;
    const docRef = doc(this.fireStore, environments.collections.ICOME_EGRESS, id);
    const subCollectionRef = collection(docRef, 'items');
    const newDocRef = doc(subCollectionRef);
    let icomeEgressClass = IcomeEgress.fromFirebase(icomeEgressInteface, id);
    try {
      await setDoc(newDocRef, { ...icomeEgressClass });
      // Activar modal.
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * @param uid 
   */
  initIcomesEgressListeners(uid: string) {
    this.uid = uid;
    const path:string = `${environments.collections.ICOME_EGRESS}/${uid}/items`;
    const itemsIcomeEgress:CollectionReference<DocumentData, DocumentData> = collection(this.fireStore, path);
    // Subcription firebaseData
    collectionData(itemsIcomeEgress).subscribe({
      next: (data) => console.log( data ),
      error: (err) => console.log( err )
    });
  }
}
