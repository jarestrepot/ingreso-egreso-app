import { Injectable } from '@angular/core';
import { IcomeEgress } from '@models/ingreso-egreso.model';
import { Firestore, doc, deleteDoc, getDoc, setDoc, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from '@auth/services/auth.service';
import { DashboardModule } from '@dashboard/dashboard.module';
import { IcomeEgressInterface } from 'src/app/utils/interfaces/icomeEgress.interface';

@Injectable({
  providedIn: DashboardModule
})
export class IcomeEgressService {

  constructor(
    private fireStore: Firestore,
    private authService: AuthService,
  ) {

  }

  async createIcomeEgress(icomeEgressInteface: IcomeEgressInterface): Promise<boolean> {
    // ** Añadir un documento **//
    const id = this.authService.user.id;
    const docRef = doc(this.fireStore, this.authService.collectionsNames.ICOME_EGRESS, id);
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
}
