import { Component, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { routesDashboard } from '@dashboard/dashboard-routing.module';
import { UserEntity } from '@models/usuario.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateWhithEgress } from 'src/app/store/appStateWhitEgress.reducer';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {

  public routes:Route[]  = [];
  public userEntity?: UserEntity;
  #unsubCribe: Subscription[] = [];


  constructor(
    private authService:AuthService,
    private router:Router,
    private store: Store<AppStateWhithEgress>
  ) {
    this.routes = routesDashboard.reduce((acc, route) => {
      if (route.children) {
        const filteredChildren = route.children.filter(child => child.path !== '**');
        return acc.concat(filteredChildren);
      }
      return acc;
    }, [] as Route[]);

    const sub = this.store.select('user').subscribe({
      next: ({ user }) => {
        if( user ) this.userEntity = user;
      },
      error: (err) => console.log(err)
    })

    this.#unsubCribe.push(sub)
  }

  ngOnDestroy(): void {
    this.#unsubCribe.forEach(sub => sub.unsubscribe());
  }

  async logout() {
    try {
      await this.authService.logOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
