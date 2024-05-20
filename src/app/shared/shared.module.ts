import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { IsLoadingButtonComponent } from './components/is-loading-button/is-loading-button.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent,
    SidebarComponent,
    IsLoadingButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    NavBarComponent,
    SidebarComponent,
    IsLoadingButtonComponent,
  ]
})
export class SharedModule { }
