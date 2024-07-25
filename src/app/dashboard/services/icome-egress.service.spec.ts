import { TestBed } from '@angular/core/testing';
import { IcomeEgressService } from './icome-egress.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environments } from 'src/environments/environmets';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';

describe('IcomeEgressService', () => {
  let service: IcomeEgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environments.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule
      ],
      providers: [
        IcomeEgressService,
        // Firestore
      ],
    });
    service = TestBed.inject(IcomeEgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
