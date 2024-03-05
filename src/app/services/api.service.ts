import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private baseURL: string = "https://localhost:44354/api/User/" //base URL for ALL 
  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<any>(this.baseURL);
  }

}
