import { Component, OnDestroy } from '@angular/core';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';
import * as IcomeEgressActions from '@dashboard/store/icome-egress.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription, filter } from 'rxjs';
import { IcomeEgress } from '@models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  #unSubcibe:Subscription[] = [];
  constructor(private store: Store<AppState>, private icomeEgressService: IcomeEgressService ){
    const subUserStore = this.store.select('user')
    .pipe(
      filter( ({ user }) => user !== null )
    )
    .subscribe({
      next: ({ user }) => {
        if( !user ) return;
        this.icomeEgressService.initIcomesEgressListeners( user.getId() );
        const sub = this.icomeEgressService.getDataRefObservable()
          .subscribe((data) => {
            const newData = data.map( ({ doc, change }) =>{
              return {
                ...doc,
              }
            }) as IcomeEgress[];
            this.store.dispatch(IcomeEgressActions.setItems({ items: newData }) );
          });
        this.#unSubcibe.push( sub );
      }
    });
    this.#unSubcibe.push( subUserStore );
  }

  ngOnDestroy(): void {
    this.#unSubcibe.forEach(sub => sub.unsubscribe());
    this.icomeEgressService.unsubscribeService();
  }



}
