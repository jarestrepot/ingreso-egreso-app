import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StadisticComponent } from './stadistic.component';
import { Store, StoreModule } from '@ngrx/store';
import { appReducers, AppState } from 'src/app/store/app.reducer';
import { BasicComponent } from '@shared/components/graphics/basic/basic.component';




describe('StadisticComponent', () => {
  let component: StadisticComponent;
  let fixture: ComponentFixture<StadisticComponent>;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadisticComponent, BasicComponent],
      imports: [
        StoreModule.forRoot(appReducers)
      ],
      providers: [
        Store
      ]
    });
    fixture = TestBed.createComponent(StadisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
