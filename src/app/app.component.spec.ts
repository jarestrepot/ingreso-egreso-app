import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { environments } from 'src/environments/environmets';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from '@auth/services/auth.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseProviderFrom } from './firebase.config';
import { Store, StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      AngularFireModule.initializeApp(environments.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      StoreModule.forRoot(appReducers)
    ],
    declarations: [AppComponent],
    providers: [
      AuthService,
      firebaseProviderFrom,
      Store
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
