import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy{
  title = 'icome-egress-app';
  #subcriptions: Subscription[] = [];
  constructor( private authService: AuthService ){
    // Listener User.
    const sub = this.authService.initAuthListener().subscribe();
    this.#subcriptions.push( sub );
  }
  ngOnDestroy(): void {
    this.#subcriptions.forEach( (sub: Subscription) => sub.unsubscribe() );
  }
}
