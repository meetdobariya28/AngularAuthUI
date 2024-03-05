import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private rout: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken = this.auth.getToken();

    if(myToken) {
      request = request.clone({
       setHeaders: {Authorization:`Bearer ${myToken}`}
      })
    }  
   
    return next.handle(request).pipe(
      catchError((err: any)=>{
       
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.toast.warning({detail:"Error!!", summary:"Token is Expired!! Please login again.."});
            this.rout.navigate(['login']);
          }
        }
        return throwError(()=> new Error("Something is wrong!!"));
      })
    );
  }
}
