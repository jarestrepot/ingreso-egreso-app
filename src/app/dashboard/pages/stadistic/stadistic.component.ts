import { Component, OnDestroy, signal } from '@angular/core';
import { SwalHelpers } from '@auth/services/SwalHelpers';
import { Store } from '@ngrx/store';
import { Subscription, delay, map } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.css']
})
export class StadisticComponent implements OnDestroy{

  #unsubscribe:Subscription[] = [];
  icomeStore = signal<number>(0);
  egressStore = signal<number>(0);
  swalSignal = signal<SwalHelpers>(new SwalHelpers());
  constructor( private store:Store<AppState> ){
    // Empezar modal de espera
    this.swalSignal().showAlertEmptyOptions();
    const subIE = this.store.select('icomeEgress')
    .pipe(
      map( ({ icomeEgress }) => {
        const { sumI, sumE } = icomeEgress.reduce(
          (acc, { type, amount }) => {
            type === 'Egress' ? acc.sumE += amount : acc.sumI += amount
            return acc;
          },
          { sumI: 0, sumE: 0 }
        );
        return {
          'icome': sumI,
          'egress': sumE,
        }
      }),
    )
    .subscribe({
      next: ({ icome, egress }) => {
        this.egressStore.set( egress );
        this.icomeStore.set( icome );
      },
    });
    this.#unsubscribe.push( subIE );
    this.swalSignal().closeSwal();
  }

  loadingDataInit(){

  }

  ngOnDestroy(): void {
    this.#unsubscribe.forEach( sub => sub.unsubscribe() );
  }


}
