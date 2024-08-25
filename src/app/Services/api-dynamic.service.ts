import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDynamicService {

  private URlapi='https://localhost:7273/api'
  private  Token:string  ;

  constructor(private http : HttpClient) {
    this.Token ='';
   }
  
  async login(username: string, password: string): Promise<Observable<any>> {
    const body = { username, password };
    return await this.http.post(this.URlapi+'/Auth/Login', body);
  }
  
  Get (url:string,fnOk: any, fnErr:any)
  {
    this.http.get(this.URlapi + "/" + url).subscribe(
      (cfg) => {
        
        fnOk(cfg);
      },
      (error) => {
        fnErr(error);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  callServiceAnyResponse (sentencia: string, params: any, fnOk: any, fnErr:any)   {
    this.Token= localStorage.getItem("token") as string;
    if (this.Token != null) {
       
     //let headers = new HttpHeaders().set("Authorization", this.Token);
     
      this.http.post(this.URlapi + "/" + sentencia, params/*,{headers}*/)
        .pipe(catchError(err=>this.handleError(err)))
        .subscribe(
          data=>{fnOk(data)} 
          
        );
    } else {
      fnErr("CREDENCIALES NO VALIDAS");
    }
  }
  callServiceGetAnyResponse (sentencia: string, fnOk: any, fnErr:any)   {
    this.Token= localStorage.getItem("token") as string;
    if (this.Token != null) {
       
     //let headers = new HttpHeaders().set("Authorization", 'Bearer '+this.Token);
     
      this.http.get(this.URlapi + "/" + sentencia/*,{headers}*/)
        .pipe(catchError(err=>this.handleError(err)))
        .subscribe(
          data=>{fnOk(data)} 
          
        );
    } else {
      fnErr("CREDENCIALES NO VALIDAS");
    }
  }

  callServicePutAnyResponse (sentencia: string,parametros: any,data:any,  fnOk: any, fnErr:any)   {
    this.Token= localStorage.getItem("token") as string;
    if (this.Token != null) {
       
      var  param = new HttpParams();
      for (let key in parametros) {
        if (parametros.hasOwnProperty(key)) {
          param = param.append(key, parametros[key]);
        }
      }
     
      this.http.put(this.URlapi + "/" + sentencia,data,{params:param})
        .pipe(catchError(err=>this.handleError(err)))
        .subscribe(
          data=>{fnOk(data)} 
          
        );
    } else {
      fnErr("CREDENCIALES NO VALIDAS");
    }
  }

  callServiceDeleteAnyResponse (sentencia: string, parameters: any, fnOk: any, fnErr:any)   {
    this.Token= localStorage.getItem("token") as string;
    if (this.Token != null) {
       
      let params = new HttpParams();
      for (let key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          params = params.append(key, parameters[key]);
        }
      }
     
      this.http.delete(this.URlapi + "/" + sentencia, {params})
        .pipe(catchError(err=>this.handleError(err)))
        .subscribe(
          data=>{fnOk(data)} 
          
        );
    } else {
      fnErr("CREDENCIALES NO VALIDAS");
    }
  }
  

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  deleteToken(): void {
    localStorage.removeItem('token');
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserData(userData: any): void {
    sessionStorage.setItem('user', JSON.stringify(userData));
  }
  deleteUserData(): void {
    sessionStorage.removeItem('user');
  }
  getUserData(): any {
    const data = sessionStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}
