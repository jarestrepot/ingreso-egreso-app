import { Injectable, NgZone } from '@angular/core';
import * as User from '@auth/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, DocumentData, DocumentReference, Firestore, collection, collectionData, doc, deleteDoc, getDoc } from '@angular/fire/firestore';

import { AuthError } from './errorSevrice.class';
import { Observable, map } from 'rxjs';
import { UserEntity } from 'src/app/models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData!: any | undefined;
  #document!: DocumentReference<DocumentData, DocumentData>;
  constructor(
    private ngZone: NgZone,
    private firebaseAuthenticationService: AngularFireAuth, // Service to Fire
    private fireStore: Firestore
  ) {
    //Observa Setear el localStorage con los datos del usuario
    this.initAuthListener();
  }


  initAuthListener(){
    this.firebaseAuthenticationService.authState
      .subscribe({
        next: ( user ) => {
          if (user) {
            this.userData = user;
            localStorage.setItem('userData', JSON.stringify(this.userData));
          } else {
            localStorage.setItem('userData', 'null');
          }
        }
      })
  }
  async createUser({ email, name, password }: User.UserRegister){
    try {
      const { user } = await this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password);
      this.userData = user;
      if( user ){
        const newUser = new UserEntity( user?.uid, name , email );
        const userCollection = collection( this.fireStore, 'users' ); //Pasamos la Firebase, name collection
        addDoc(userCollection, { ...newUser }); //Collection, value( Don`t entity value ) AddDoc in the collection.
        return this.userData;
      }
      //!! ERROR
    } catch (error: any) {
      const errorAuth = new AuthError('User creation error', 'Please check if the form fields are correct', undefined, { message: error.message });
      await errorAuth.getSwalModalError();
      return errorAuth;
    }
  }

  getUsers(): Observable<User.UserDatabase[]> {
    const usersFirebase = collection( this.fireStore, 'users');
    return collectionData( usersFirebase, { idField: 'id' } ) as Observable<User.UserDatabase[]>;
  }

  deleteUsers( user: User.UserDatabase ){
    const userDocRef = doc( this.fireStore, `users/${user.id}`);
    return deleteDoc( userDocRef );
  }

  async getUser( id: string ){
    const userDocRef = (await getDoc(doc(this.fireStore, `users/${id}`))).data() as User.UserDatabase;
    this.userData = userDocRef;
    return this.userData;
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

  initAuth(): string{
    return JSON.parse(localStorage.getItem('userData') ?? '');
  }

}

