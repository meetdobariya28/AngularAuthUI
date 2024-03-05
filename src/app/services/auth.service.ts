import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; //role-based-auth-2 //help to decode the token

@Injectable({
  providedIn: 'root'
})
export class AuthService { //9. Add Services to call API from VS and then add this services to login and signup .ts page

  private baseURL: string = "https://localhost:44354/api/User/"; //base URL for ALL 
  private payload: any; //declaration //role-based-auth-4
  constructor(private http: HttpClient, private router: Router)
               {this.payload = this.decodedToken()}//intialiizer for payload //role-based-auth-4

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseURL}register`,userObj); //API call for register
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseURL}authenticate`,loginObj);//API Call for Login
  }
  signOut() {
    this.clearLocalStorage();
    this.router.navigate(['login']);
  }

  storeToken(tokenVal: string) {
    this.getStorage()?.setItem('token', tokenVal);
  }

  getToken() {
    return this.getStorage()?.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getStorage()?.getItem('token');
  }

  private getStorage(): Storage | null {
    try {
      return localStorage;
    } catch (e) {
      console.error('localStorage is not available');
      return null;
    }
  }

  private clearLocalStorage() {
    const storage = this.getStorage();
    if (storage) {
      storage.clear();
    }
  }

  decodedToken(){ //role-based-auth-3  //it will help to get data of payload which can be found in jwttoken.Io Site 
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!; // !, because of undefined 
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){ //get fullname form token //role-based-auth-5
    if(this.payload){
      return this.payload.name;
    }
  }

  getRoleFromToken(){ //get role form token //role-based-auth-5
    if(this.payload){
      return this.payload.role;
    }
  }
}
  
