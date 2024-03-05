import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Falsy } from 'rxjs';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements  OnInit {
  form!: FormGroup;
  isSubmit= false;
  constructor(private fb: FormBuilder, 
              private auth: AuthService,//11.ADD Authservice
              private rout: Router,
              private toast: NgToastService
              ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]],
      checkbox: ['', Validators.requiredTrue]
    })
  }
  Save() {
    if (this.form.valid) {
       //sending data to DB
       this.auth.signUp(this.form.value) //12. Add the services
       .subscribe({
         next:(res)=>{
           this.toast.success({detail:"Success!!", summary:res.message, duration: 5000});
           this.form.reset(); //TO reset after signUP success!!
           this.rout.navigate(['login']); //Navigate to login pager after signup
         },
         error:(err)=>{
           alert(err?.err.message) ///error messg 
         }
       })
      }
    else {
      ValidateForm.validateAllForm(this.form)
      alert("your form is Invalid")
    }
  }
}
