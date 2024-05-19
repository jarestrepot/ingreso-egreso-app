import { Injectable, NgZone } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthError } from './errorSevrice.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData!: any | undefined;
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private firebaseAuthenticationService: AngularFireAuth // Service to Fire
  ) {
    //Observa Setear el localStorage con los datos del usuario
    this.firebaseAuthenticationService.authState.subscribe({
      next: (user) => {
        if(user){
          this.userData = user;
          localStorage.setItem('userData', JSON.stringify(this.userData));
        }else{
          localStorage.setItem('userData', 'null');
        }
      }
    })
  }
  createUser({ email, password }: User){
    this.firebaseAuthenticationService.createUserWithEmailAndPassword( email, password )
      .then( (userCredentials) => {
        this.userData = userCredentials.user
        // this.router.navigate(['/dashboard'])
      }).catch( (error) => {
        const errorAuth = new AuthError('User creation error', 'Please check if the form fields are correct', undefined, { message: error.message });
        errorAuth.getSwalModalError();
      });
  }

  get userInfo(){
    return this.userData;
  }

  loginUser({ email, password}: User){
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password);
  }

}

