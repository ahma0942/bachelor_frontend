import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
	Log(from: string, message: string) {
		console.log(`[${from}]: ${message}`);
	}
}
