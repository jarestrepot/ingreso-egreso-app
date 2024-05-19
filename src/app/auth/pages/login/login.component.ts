import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalHelpers } from '@auth/services/SwalHelpers';
import { AuthService } from '@auth/services/auth.service';
import { AuthError } from '@auth/services/errorSevrice.class';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async loginFormUser(){
    if( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return;
    };
    // await Swetter alert
    const swal = new SwalHelpers();
    swal.showAlertEmptyOptions();
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
    }
    swal.closeSwal();
  }
}
