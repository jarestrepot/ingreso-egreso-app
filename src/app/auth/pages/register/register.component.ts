import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth/interfaces/user.interface';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!:FormGroup;
  private fb:FormBuilder = inject(FormBuilder);
  private serviceAuth = inject(AuthService);
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]], // TODO: Validator password
    })
  }

  createUser(){
    // TODO: Crear un service de errores. + confirmación de password
    if( this.registerForm.errors ) {
      this.registerForm.markAllAsTouched()
      return;
    }
    const user:User = {
      email: this.registerForm.controls['name'].value as string,
      password: this.registerForm.controls['password'].value as string,
      confirmPassword: this.registerForm.controls['confirmPassword'].value as string
    }
    this.serviceAuth.createUser( user )
    this.registerForm.reset()
  }
}
