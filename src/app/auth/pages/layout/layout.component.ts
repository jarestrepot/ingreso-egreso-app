import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SwalHelpers } from '@auth/services/SwalHelpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {

  #subscriptions:Subscription[] = [];
  constructor(
    private authService: AuthService,
    private route: Router,
  ){
    const swal = new SwalHelpers();
    swal.showAlertEmptyOptions();
    const subAuth = this.authService.initAuthListener()
    .subscribe(
      {
        next: (data) => {
          if( data ){
            this.route.navigateByUrl('/dashboard/stadistic');
          }
          swal.closeSwal()
        },
      }
    );
    this.#subscriptions.push(subAuth);
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.#subscriptions.forEach( s => s.unsubscribe() );
  }

}
