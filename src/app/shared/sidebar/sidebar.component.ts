import { Component, OnInit } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { routesDashboard } from '@dashboard/dashboard-routing.module';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public routes:Route[] | Routes[] = [];
  constructor(
    private authService:AuthService,
    private router:Router
  ) {
    this.routes = routesDashboard.map( ( route ) => {
      if( !route.children )
        return [];
      return route.children.filter( ( child ) => child.path !== '**' );
    }).flat();
  }
  ngOnInit(): void {

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
