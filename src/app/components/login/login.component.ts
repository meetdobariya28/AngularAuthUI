import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, 
    private auth: AuthService,//11. Add AuthService
    private rout: Router, //Add Router to route from one page to another.
    private toast: NgToastService
    ) { } 
  
  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  OnLogin() {
    if (this.form.valid) {
      //sending data to DB
      this.auth.login(this.form.value) //12. Add the services
      .subscribe({
        next:(res)=>{
          this.auth.storeToken(res.token); //--Ang-Token--2 this will store token --next create guard auth.guard
          this.toast.success({detail:"Success!!", summary:res.message, duration: 5000});
          this.rout.navigate(['dashbrd']); //navigate to Dashboard after Login
        },
        error:(err)=>{
          this.toast.error({detail:"Error!!", summary:"Invalid Username or Password", duration: 5000})
          //alert(err?.err.message) ///error messg 
        }
      })
      }
    else {
      ValidateForm.validateAllForm(this.form)
      alert("your form is Invalid")
    }
  }

}

