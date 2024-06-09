import { Component, OnDestroy, OnInit } from '@angular/core';
import { IcomeEgress } from '@models/ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  icomeEgress:IcomeEgress[] = [];
  #unSubscribeItems!: Subscription;
  constructor( private store: Store<AppState>){}

  ngOnInit(): void {
    this.#unSubscribeItems = this.store.select('icomeEgress')
      .subscribe({
        next: ({ icomeEgress }) => this.icomeEgress = icomeEgress,
        error: ( error ) => console.error( error )// Lanzar error
      })
  }

  deleteItem(id: string){
    console.log( id )
  }

  ngOnDestroy(): void {
    this.#unSubscribeItems.unsubscribe();
  }
}
