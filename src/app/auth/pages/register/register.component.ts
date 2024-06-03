import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as User from '@auth/interfaces/user.interface';
import { AuthService } from '@auth/services/auth.service';
import { AuthError } from '@auth/services/errorSevrice.class';
import { Store } from '@ngrx/store';
import * as ui from '@shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { ValidatorsCustom } from 'src/app/utils/validators/ValidatorsClass';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm!:FormGroup;
  private fb:FormBuilder = inject(FormBuilder);
  private serviceAuth = inject(AuthService);
  private router = inject(Router);
  #store = inject<Store<AppState>>(Store);
  #uiSubscription: Subscription[] = [];
  public isLoadingUi:boolean = false;

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, ValidatorsCustom.emailAddress()]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: ValidatorsCustom.mustBeEquals(
          'password',
          'confirmPassword'
        )
      }
  );
    const uiSub = this.#store.select('ui').subscribe({
      next: ({ isLoading }) => this.isLoadingUi = isLoading
    });
    this.#uiSubscription.push( uiSub );
  }

  async createUser(){
    // TODO: Crear un service de errores. + confirmación de password
    if( this.registerForm.errors ) {
      this.registerForm.markAllAsTouched()
      return;
    }

    this.#store.dispatch( ui.isLoading() )
    const user:User.UserRegister = {
      email: this.registerForm.controls['email'].value as string,
      name: this.registerForm.controls['name'].value as string,
      password: this.registerForm.controls['password'].value as string,
      confirmPassword: this.registerForm.controls['confirmPassword'].value as string
    }
    try {
      const response = await this.serviceAuth.createUser( user );
      if ( response instanceof AuthError ){
        this.registerForm.reset();
        this.registerForm.markAllAsTouched();
        return;
      }
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      this.registerForm.markAllAsTouched();
      this.registerForm.reset();
    }finally{
      this.#store.dispatch( ui.stopLoading() );
    }
  }

  ngOnDestroy(): void {
    this.#uiSubscription.forEach( uiSub => uiSub.unsubscribe() );
  }

}
