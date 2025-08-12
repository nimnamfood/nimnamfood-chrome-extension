import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@/env';

export const apiProxyInterceptor: HttpInterceptorFn = (request, nextHandler) =>
  nextHandler(request.clone({ url: request.url.replace(/^\/api/, environment.apiUrl) }));
