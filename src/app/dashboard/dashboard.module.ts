import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { IcomeEgressComponent } from './pages/icome-egress/icome-egress.component';
import { StadisticComponent } from './pages/stadistic/stadistic.component';
import { DashboardComponent } from './pages/layaout-page/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IcomeEgressService } from './services/icome-egress.service';
import { OrderIcomePipe } from './pipes/order-icome.pipe';
import { StoreModule } from '@ngrx/store';
import { icomeEgressReducer } from './store/icome-egress.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IcomeEgressComponent,
    StadisticComponent,
    DetailComponent,
    OrderIcomePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('icomeEgress', icomeEgressReducer)
  ],
  providers: [
    IcomeEgressService
  ]
})
export class DashboardModule { }
