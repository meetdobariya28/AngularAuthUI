import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{ 
  public users:any = []; //Arry of users
  public fullName: string = "";

  constructor(private auth: AuthService, private api: ApiService, private userData: UserDataService){ } //api Sevice

  ngOnInit() {//interceptors--2
    this.api.getUser()
    .subscribe(res =>{
      this.users = res; //storing all the res from api into array of users
    });
    debugger
    this.userData.getFullNameFromStore()
    .subscribe(val=>{
      let fullnameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullnameFromToken
    })
  }

logout(){//Method to signOut
  this.auth.signOut();
}
}
