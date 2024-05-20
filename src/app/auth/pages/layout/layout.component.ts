import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import * as User from '@auth/interfaces/user.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {

  constructor( private authService: AuthService, private route: Router){
    const user = this.authService.initAuth();
    if( user ){
      this.route.navigateByUrl('/dashboard/stadistic');
    }
  }
  ngOnInit(): void {
  }

}
