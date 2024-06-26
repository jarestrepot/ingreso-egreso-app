import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

// NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';

// Devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Custom document firebase
import { firebaseProviderFrom } from './firebase.config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth/auth.module';
import { environments } from 'src/environments/environmets';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducers),
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environments.firebase),
    StoreDevtoolsModule.instrument({ maxAge: 50, logOnly: !isDevMode() }),
    // StoreModule.forRoot({}, {}) // injection NullErrorInjection
  ],
  providers: [
    firebaseProviderFrom
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
