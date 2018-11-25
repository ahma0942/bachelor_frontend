import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {Http} from '@angular/http';
import {AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
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
				public http: Http,
				platform: Platform,
				statusBar: StatusBar,
				splashScreen: SplashScreen,
				private push: Push,
				public alertCtrl: AlertController,
				private appService: AppService) {
		this.sub = this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.url = val.url;
			}
		});

		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
			this.initPushNotification();
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

	initPushNotification() {
		// to check if we have permission
		this.push.hasPermission().then((res: any) => {
			if (res.isEnabled) {
				console.log('We have permission to send push notifications');
			} else {
				console.log('We don\'t have permission to send push notifications');
			}

		});

		// to initialize push notifications
		const options: PushOptions = {
			android: {
				senderID: 'XXXXXXXXXXXXX'
			},
			ios: {
				alert: 'true',
				badge: true,
				sound: 'false'
			},
			windows: {}
		};

		const pushObject: PushObject = this.push.init(options);
		pushObject.on('notification').subscribe((notification: any) => {
			console.log('Received a notification', notification);

			// Notification Display Section
			const confirmAlert = this.alertCtrl.create({
				title: 'New Notification',
				message: JSON.stringify(notification),
				buttons: [{
					text: 'Ignore',
					role: 'cancel'
				}, {
					text: 'View',
					handler: () => {
						// TODO: Your logic here
						// self.nav.push(DetailsPage, {message: data.message});
					}
				}]
			});
			confirmAlert.present();
		});

		pushObject.on('registration').subscribe((registration: any) => {
			console.log('Device registered', registration);
			alert(JSON.stringify(registration));
			this.saveDeviceToken( registration.registrationId);
		});

		pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
