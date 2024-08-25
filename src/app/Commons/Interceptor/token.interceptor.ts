import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiDynamicService } from '../../Services/api-dynamic.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: ApiDynamicService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();  // Obtén el token del servicio de autenticación

    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
           'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest).pipe(
        tap((event: HttpEvent<any>) => {
          
            // Solo maneja eventos de tipo respuesta si es necesario
            if (event.type === HttpEventType.Response) {
              console.log('Solicitud exitosa:', event);
              next.handle(clonedRequest)
            }
          
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            // Redirigir al usuario a la página de login en caso de error 401 o 403
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
      

      
    } else {
      return next.handle(request);  // Si no hay token, sigue la petición sin modificarla
    }
  }
}
