import { DocumentChangeType } from "@angular/fire/firestore";
import { IcomeEgress } from "@models/ingreso-egreso.model";

export declare interface ResponseItems {
  change: 'added' | 'modified' | 'deleted' | DocumentChangeType,
  doc: IcomeEgress
}

