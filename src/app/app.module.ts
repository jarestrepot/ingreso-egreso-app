import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth/auth.module';
import { firebaseProviderFrom } from './firebase.config';
import { environments } from 'src/environments/environmets';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environments.firebase) // injection NullErrorInjection
  ],
  providers: [
    firebaseProviderFrom
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
