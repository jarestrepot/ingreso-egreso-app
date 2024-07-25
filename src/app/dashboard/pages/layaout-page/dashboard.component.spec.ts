import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { appReducers, AppState } from 'src/app/store/app.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store<AppState>;
  let service: IcomeEgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        StoreModule.forRoot(appReducers),
        AngularFirestoreModule
      ],
      providers: [Store, IcomeEgressService]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
