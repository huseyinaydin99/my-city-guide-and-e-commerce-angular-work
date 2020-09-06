import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterUser } from '../models/RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  registerForm: FormGroup;
  registerUser: RegisterUser = new RegisterUser();
  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ["", Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get("confirmPassword").value ? null : { mismatch: true };
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerUser);
    }
  }

}
