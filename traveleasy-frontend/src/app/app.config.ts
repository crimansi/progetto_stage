import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MY_DATE_FORMATS } from './utils/Const';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { provideHttpClient, withInterceptors, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
  const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`),
  });

  return next(modifiedReq);
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync('noop'), provideMomentDateAdapter(MY_DATE_FORMATS), provideHttpClient(withInterceptors([authenticationInterceptor]))]
};


