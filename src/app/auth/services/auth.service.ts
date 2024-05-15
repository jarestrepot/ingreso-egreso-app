import { Injectable, NgZone } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData!: any;
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
        this.router.navigate(['/dashboard'])
      }).catch( (error) => {
        alert(error.message)
      });
  }

  get userInfo(){
    return this.userData;
  }


}

