import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcomeEgressComponent } from './icome-egress.component';
import { FormBuilder } from '@angular/forms';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';
import { Store, StoreModule } from '@ngrx/store';
import { appReducers, AppState } from 'src/app/store/app.reducer';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environments } from 'src/environments/environmets';

describe('IcomeEgressComponent', () => {
  let component: IcomeEgressComponent;
  let fixture: ComponentFixture<IcomeEgressComponent>;
  let store: Store<AppState>;
  let service: IcomeEgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IcomeEgressComponent],
      imports: [
        AngularFireModule.initializeApp(environments.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        StoreModule.forRoot(appReducers)
      ],
      providers: [FormBuilder, IcomeEgressService, Store]
    });
    fixture = TestBed.createComponent(IcomeEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
