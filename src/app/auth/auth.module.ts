import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthRoutingsModule } from './auth-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent
  ],
  // providers: [ AuthService ], // Se provee el servicio de authService. solo en este modulo.
  imports: [
    CommonModule,
    AuthRoutingsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
