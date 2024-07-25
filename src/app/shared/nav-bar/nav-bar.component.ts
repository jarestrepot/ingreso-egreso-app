import { Component, OnDestroy } from '@angular/core';
import { UserEntity } from '@models/usuario.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnDestroy{

  public userEntity?: UserEntity;
  #unsubCribe: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ){
    const sub = this.store.select('user').subscribe({
      next: ({ user }) => {
        if (user) this.userEntity = user;
      },
      error: (err) => console.log(err)
    })
    this.#unsubCribe.push(sub)
  }

  ngOnDestroy(): void {
    this.#unsubCribe.forEach(sub => sub.unsubscribe());
  }
}
