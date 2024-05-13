import { Component, OnInit } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { routesDashboard } from '@dashboard/dashboard-routing.module';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public routes:Route[] | Routes[] = [];
  constructor() {
    this.routes = routesDashboard.map( ( route ) => {
      if( !route.children )
        return [];
      return route.children.filter( ( child ) => child.path !== '**' );
    }).flat();
  }
  ngOnInit(): void {
    
  }
}
