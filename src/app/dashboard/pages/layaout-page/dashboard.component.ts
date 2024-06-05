import { Component, OnDestroy } from '@angular/core';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

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
      }
    });
    this.#unSubcibe.push( subUserStore );
  }

  ngOnDestroy(): void {
    this.#unSubcibe.forEach(sub => sub.unsubscribe());
  }



}
