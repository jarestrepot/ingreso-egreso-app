import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import { SwalHelpers } from '@auth/services/SwalHelpers';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import Chart, { ChartType } from 'chart.js/auto';
import { AppStateWhithEgress } from 'src/app/store/appStateWhitEgress.reducer';


@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.css']
})
export class StadisticComponent implements OnInit, OnDestroy{

  #unsubscribe:Subscription[] = [];
  icomeStore = signal<number>(0);
  egressStore = signal<number>(0);
  swalSignal = signal<SwalHelpers>(new SwalHelpers());
  public chart!: Chart;
  constructor( private store:Store<AppStateWhithEgress> ){
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

    effect( () => {
      if ( this.icomeStore() === 0 && this.icomeStore() === 0 ) return;
      const data = {
        labels: [
          'Icome',
          'Egress',
        ],
        datasets: [{
          label: 'Values',
          data: [this.icomeStore(), this.egressStore()],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 2
        }]
      };
      // Creamos la gráfica
      this.chart = new Chart("chart", {
        type: 'pie' as ChartType, // tipo de la gráfica
        data // datos
      });
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.#unsubscribe.forEach( sub => sub.unsubscribe() );
  }


}
