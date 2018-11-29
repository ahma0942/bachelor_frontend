import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {AppService} from '@services/app/app.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy {
	public url;
	private sub;

	constructor(private router: Router,
				// private push: Push,
				private appService: AppService) {
		this.sub = this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.url = val.url;
			}
		});
	}

	saveDeviceToken(t: string) {
		this.appService.SaveDeviceToken(t).pipe(first()).subscribe(
			data => {
				console.log(data);
			},
			error => {
				console.log('Failure: ' + error);
			}
		);
	}

	// initPushNotification() {
	// 	this.push.hasPermission()
	// 		.then((res: any) => {
	//
	// 			if (res.isEnabled) {
	// 				console.log('We have permission to send push notifications');
	// 			} else {
	// 				console.log('We do not have permission to send push notifications');
	// 			}
	//
	// 		});
	//
	// 	// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
	// 	this.push.createChannel({
	// 		id: 'testchannel1',
	// 		description: 'My first test channel',
	// 		// The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
	// 		importance: 3
	// 	}).then(() => console.log('Channel created'));
	//
	// 	// Delete a channel (Android O and above)
	// 	this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
	//
	// 	// Return a list of currently configured channels
	// 	this.push.listChannels().then((channels) => console.log('List of channels', channels))
	//
	// 	// to initialize push notifications
	//
	// 	const options: PushOptions = {
	// 		android: {},
	// 		ios: {
	// 			alert: 'true',
	// 			badge: true,
	// 			sound: 'false'
	// 		},
	// 		windows: {},
	// 		browser: {
	// 			pushServiceURL: 'http://push.api.phonegap.com/v1/push'
	// 		}
	// 	};
	//
	// 	const pushObject: PushObject = this.push.init(options);
	// 	pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
	// 	pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
	// 	pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
	// }

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
