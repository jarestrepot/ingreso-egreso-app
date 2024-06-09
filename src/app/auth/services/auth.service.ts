import { Injectable, NgZone } from '@angular/core';
import * as User from '@auth/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, collectionData, doc, deleteDoc, getDoc, setDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';

// NgRx Store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as UserStore from '@auth/authStore/auth.actions';
import * as IcomeEgress from '@dashboard/store/icome-egress.actions';

import { AuthError } from './errorSevrice.class';
import { Observable, Subscription, map, tap } from 'rxjs';
import { UserEntity } from 'src/app/models/usuario.model';
import { UserR } from '@auth/interfaces/user.response.interface';
import { environments } from 'src/environments/environmets';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSubcription!: Subscription;
  private userData!: any | undefined;
  public usersCollection: CollectionReference<DocumentData>;
  public collectionsNames = environments.collections;

  get user(){
    return { ...this.userData }
  }
  constructor(
    private ngZone: NgZone,
    private firebaseAuthenticationService: AngularFireAuth, // Service to Fire
    private fireStore: Firestore,
    private store: Store<AppState>
  ) {
    //Observa Setear el localStorage con los datos del usuario
    this.initAuthListener();
    this.usersCollection = collection(this.fireStore,this.collectionsNames.USERS);
  }

  initAuthListener(){
    return this.firebaseAuthenticationService.authState
      .pipe(
        tap((user) => this.userData = user ),
        tap( async (user) => {
          if (user) {
            localStorage.setItem('userData', JSON.stringify(this.userData));
            try {
              const firebaseData:User.UserDatabase = await this.getUser(user.uid);
              const userEntity:UserEntity = UserEntity.fromFirebase(firebaseData); // Instancia static
              this.store.dispatch(UserStore.setUser({ userEntity }));
            } catch (error) {
              localStorage.setItem('userData', 'null');
              // Hacer en unset del usuario.
              this.store.dispatch(UserStore.unSetuser());
              this.store.dispatch( IcomeEgress.unSetItems() );
            }
          } else {
            localStorage.setItem('userData', 'null');
            // Hacer en unset del usuario.
            this.store.dispatch( UserStore.unSetuser() );
            this.store.dispatch(IcomeEgress.unSetItems());
          }
        })
      );
  }

  async createUser({ email, name, password }: User.UserRegister){
    try {
      const { user } = await this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password);
      if( user ){
        this.userData = user;
        const newUser = new UserEntity( user.uid, name , email );
        const userDocRef = doc(this.fireStore, this.collectionsNames.USERS, user.uid); // Add uid the path. Ensure the creation of the route with the firebase id
        await setDoc(userDocRef, { ...newUser });
        return this.userData;
      }
    } catch (error: any) {
      const errorAuth = new AuthError('User creation error', 'Please check if the form fields are correct', undefined, { message: error.message });
      await errorAuth.getSwalModalError();
      return errorAuth;
    }
  }

  getUsers(): Observable<User.UserDatabase[]> {
    const usersFirebase = collection(this.fireStore, this.collectionsNames.USERS);
    return collectionData( usersFirebase, { idField: 'id' } ) as Observable<User.UserDatabase[]>;
  }

  deleteUsers( user: User.UserDatabase ){
    const userDocRef = doc(this.fireStore, `${this.collectionsNames.USERS}/${user.id}`);
    return deleteDoc( userDocRef );
  }

  async getUser( id: string ): Promise<User.UserDatabase>{
    const userDocRef = (await getDoc(doc(this.fireStore, `/${this.collectionsNames.USERS}/${id}`))).data() as User.UserDatabase;
    this.userData = userDocRef;
    return userDocRef;
  }

  getuserInfo(){
    return this.userData;
  }

  async logOut() {
    // Desactivar el guard y cerrar sesion
    try {
      localStorage.setItem('userData', 'null');
      this.userData = null;
      return await this.firebaseAuthenticationService.signOut();
    } catch (error: any) {
      const errorAuth = new AuthError('Error when trying to log out', 'Please check your connection', undefined, { message: error.message });
      await errorAuth.getSwalModalError();
    }
  }

  loginUser({ email, password }: User.UserLogin){
    // User?
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password);
  }

  isAuthenticated(){
    return this.firebaseAuthenticationService.authState.pipe(
      map( fUser => fUser !== null ),
    )
  }

  initAuth(){
    const userJson = JSON.parse(localStorage.getItem('userData') ?? '') as UserR;
    this.userData = userJson;
    return userJson;
  }

}

