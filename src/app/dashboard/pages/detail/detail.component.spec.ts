import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { Store, StoreModule } from '@ngrx/store';
import { appReducers, AppState } from 'src/app/store/app.reducer';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let store: Store<AppState>;
  let icomeEgressService: IcomeEgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        StoreModule.forRoot(appReducers)
      ],
      providers: [
        Store,
        IcomeEgressService
      ]
    });
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    icomeEgressService = TestBed.inject(IcomeEgressService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
