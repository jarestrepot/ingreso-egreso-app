import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/layaout-page/dashboard.component";
import { IcomeEgressComponent } from "./pages/icome-egress/icome-egress.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { StadisticComponent } from "./pages/stadistic/stadistic.component";
import { NgModule } from "@angular/core";


export const routesDashboard: Routes= [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'stadistic',
        component: StadisticComponent,
        title: 'Stadistic',
        data: {
          class: 'menu-icon fa fa-tachometer-alt'
        }
      },
      {
        path: 'icome-egress',
        component: IcomeEgressComponent,
        title: 'Icome Egress',
        data: {
          class: 'menu-icon fa fa-clipboard-list'
        }
      },
      {
        path: 'detail',
        component: DetailComponent,
        title: 'Detail',
        data: {
          class: 'menu-icon fa fa-table'
        }
      },
      {
        path: '**',
        redirectTo: 'stadistic',
        pathMatch: 'full'
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routesDashboard)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
