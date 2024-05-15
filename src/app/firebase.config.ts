import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environments } from "src/environments/environmets";



const firebaseProviderFrom:EnvironmentProviders =
  importProvidersFrom(
    provideFirebaseApp(() =>
      initializeApp(
        environments.firebase
      ),
    ),
    provideFirestore(() => getFirestore()),// Store
    provideAuth( () => getAuth()), // Auth
  );
export { firebaseProviderFrom }
