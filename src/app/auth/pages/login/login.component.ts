import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AuthError } from '@auth/services/errorSevrice.class';

//NgRx Store
import { Store } from '@ngrx/store';
import * as ui from '@shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { ValidatorsCustom } from 'src/app/utils/validators/ValidatorsClass';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  #uiSubcriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, ValidatorsCustom.emailAddress()]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    const subUi = this.store.select('ui').subscribe({
      next: ({ isLoading }) => this.isLoading = isLoading
    });

    this.#uiSubcriptions.push( subUi );
  }

  async loginFormUser(){
    if( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return;
    };

    // Dispatch state
    this.store.dispatch( ui.isLoading() );
    try {
      await this.authService.loginUser( {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      });
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      const errorAuth = new AuthError('Not Found', 'User not Found', undefined, { message: error.message });
      this.loginForm.reset();
      this.loginForm.markAllAsTouched();
      await errorAuth.getSwalModalError();
    }finally{
      this.store.dispatch(ui.stopLoading());
    }
  }

  ngOnDestroy(): void {
    this.#uiSubcriptions.forEach( sub => sub.unsubscribe() );
  }
}
