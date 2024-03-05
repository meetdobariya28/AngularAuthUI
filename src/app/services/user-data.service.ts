import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {//Role-based-auth--1
//Create aervice name UserDataService and make getter and setter for fullanem and role
//install package name JWt for decripting the token ---npm i @auth0/angular-jwt
//auth.service import the package and write few methods
//call all the created method in dashboard.ts file and add functin in .html file

  private fullName$ = new BehaviorSubject<string>("");//$ sign for observable and type is string with empty value and 
  private role$ = new BehaviorSubject<string>("");  //then make getter and setter for both this.

  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable(); //whenever data will be set this asObservable will get it 
  }

  public setRoleForStore(role: string){//get value
    return this.role$.next(role);//this will set the role 
  }

  public getFullNameFromStore(){//getter for fullNAme
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname: string){//Setter for FullName
    return this.fullName$.next(fullname);
  }
}
