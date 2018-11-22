import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthenticationService} from '@services/authentication/authentication.service';
import {environment} from '@env/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
	constructor(private auth: AuthenticationService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const request = {};
		request['url'] = `${environment.API}${req.url}`;
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			request['headers'] = req.headers.set('Authorization', user.token);
		} else if (req.url !== '/Login') {
			this.auth.logout();
			return;
		}

		const apiReq = req.clone(request);

		return next.handle(apiReq).pipe(tap((event: HttpEvent<any>) => {
			if (event instanceof HttpResponse) {
				// Response
			}
		}, (err: any) => {
			console.log(err);
			if (err instanceof HttpErrorResponse) {
				if (err.status === 401) {
					this.auth.logout();
				}
			}
		}));
	}
}
