import { Injectable, NgZone } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthError } from './errorSevrice.class';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData!: any | undefined;
  constructor(
    private ngZone: NgZone,
    private firebaseAuthenticationService: AngularFireAuth // Service to Fire
  ) {
    //Observa Setear el localStorage con los datos del usuario
    this.initAuthListener()
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
  async createUser({ email, password }: User){
    try {
      const userCredentials = await this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password);
      this.userData = userCredentials.user;
      return this.userData;
    } catch (error: any) {
      const errorAuth = new AuthError('User creation error', 'Please check if the form fields are correct', undefined, { message: error.message });
      await errorAuth.getSwalModalError();
      return errorAuth;
    }
  }

  get userInfo(){
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

  loginUser({ email, password}: User){
    // User?
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password);
  }

  isAuthenticated(){
    return this.firebaseAuthenticationService.authState.pipe(
      map( fUser => fUser !== null ),
    )
  }

}

