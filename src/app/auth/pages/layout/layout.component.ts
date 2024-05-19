import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor( private authService: AuthService, private route: Router){

  }
  ngOnInit(): void {
    const user:string = this.authService.initAuth();
    console.log( user )
    if( user ){
      this.route.navigateByUrl('/dashboard')
    }
  }

}
