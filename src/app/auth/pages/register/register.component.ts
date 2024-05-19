import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@auth/interfaces/user.interface';
import { SwalHelpers } from '@auth/services/SwalHelpers';
import { AuthService } from '@auth/services/auth.service';
import { AuthError } from '@auth/services/errorSevrice.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!:FormGroup;
  private fb:FormBuilder = inject(FormBuilder);
  private serviceAuth = inject(AuthService);
  private router = inject(Router);
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]], // TODO: Validator password
    })
  }

  async createUser(){
    // TODO: Crear un service de errores. + confirmación de password
    if( this.registerForm.errors ) {
      this.registerForm.markAllAsTouched()
      return;
    }
    const swal = new SwalHelpers();
    swal.showAlertEmptyOptions();
    const user:User = {
      email: this.registerForm.controls['name'].value as string,
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
    }

    swal.closeSwal();
  }
}
