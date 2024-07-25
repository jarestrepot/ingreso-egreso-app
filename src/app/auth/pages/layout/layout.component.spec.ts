import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { AuthService } from '@auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importar Firestore y AngularFirestoreModule
import { environments } from 'src/environments/environmets';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/store/app.reducer';
import { Firestore } from '@angular/fire/firestore';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environments.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule, // Asegurarse de importar AngularFirestoreModule
        StoreModule.forRoot(appReducers)
      ],
      providers: [
        AuthService,
        Firestore // Añadir Firestore como proveedor aquí
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService); // Inyectar AuthService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
