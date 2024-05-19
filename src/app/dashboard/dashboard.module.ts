import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { IcomeEgressComponent } from './pages/icome-egress/icome-egress.component';
import { StadisticComponent } from './pages/stadistic/stadistic.component';
import { DashboardComponent } from './pages/layaout-page/dashboard.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }