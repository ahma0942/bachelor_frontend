import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ChatsService} from '@services/chats/chats.service';
import {FormBuilder, Validators} from '@angular/forms';
import {environment} from '@env/environment';
import Message from '@models/message';

class ImageSnippet {
	constructor(public src: string, public file: File) {}
}

@Component({
	selector: 'app-chats',
	templateUrl: './chats.component.html',
	styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {
	@ViewChild('upload') upload: ElementRef;
	@ViewChild('capture') capture: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;
	@ViewChild('box') box: ElementRef;
	@ViewChild('messagesField') messagesField: ElementRef;

	public myid = JSON.parse(localStorage.getItem('user')).id;
	public url = environment.URL;
	public messageForm = this.fb.group({
		message: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!\s*$).+/)])],
		project_id: [this.route.snapshot.paramMap.get('id'), Validators.compose([Validators.required])],
	});
	public showEmojis = false;
	public messages: Message[] = [];
	public chatname = '';
	public moreOldMessages = true;
	public selectedFile: ImageSnippet;
	public autoScroll = true;
	private page = 1;
	private timestamp = Math.floor(Date.now() / 1000);
	private newtimestamp = Math.floor(Date.now() / 1000);
	private user = JSON.parse(localStorage.getItem('user'));
	private delay = 3;
	private timer;

	constructor(private chatsService: ChatsService,
				private router: Router,
				public route: ActivatedRoute,
				private fb: FormBuilder) { }

	ngOnInit() {
		this.getChatName();
		this.loadMessages(true);
		this.timer = setInterval(() => {
			this.getNewMessages();
			this.newtimestamp += this.delay;
		}, this.delay * 1000);
		this.messagesField.nativeElement.addEventListener('scroll', this.scrolling, true);
	}

	ngOnDestroy() {
		clearInterval(this.timer);
		this.messagesField.nativeElement.removeEventListener('scroll', this.scrolling, true);
	}

	uploadFile(imageInput: any) {
		const file: File = imageInput.files[0];
		const reader = new FileReader();

		reader.addEventListener('load', (event: any) => {
			this.selectedFile = new ImageSnippet(event.target.result, file);
			console.log(this.selectedFile);
		});
		reader.readAsDataURL(file);
	}

	clearUpload() {
		this.selectedFile = null;
		this.upload.nativeElement.value = '';
		this.capture.nativeElement.value = '';
	}

	scrolling = () => {
		const msg = this.messagesField.nativeElement;
		if (msg.scrollTop === 0) {
			msg.removeEventListener('scroll', this.scrolling, true);
			this.loadMessages();
		}
		this.autoScroll = (msg.scrollTop + 100 > msg.scrollHeight - msg.offsetHeight);
	}

	emojiSelected(event) {
		this.messageForm.patchValue({
			message: this.messageForm.get('message').value + event.emoji.native
		});
		this.sanitize();
	}

	emojiStyles() {
		return {
			position: 'fixed',
			height: '100%',
			'max-width' : '100%',
			top: '50px'
		};
	}

	getNewMessages() {
		this.chatsService.getNewMessages(this.route.snapshot.paramMap.get('id'), this.newtimestamp).pipe(first()).subscribe(
			data => {
				for (const i in data) {
					if (!data.hasOwnProperty(i)) {
						continue;
					}

					if (data[i].timestamp > data[i].changed) {
						this.messages.push(data[i]);
					} else {
						for (const m in this.messages) {
							if (this.messages[m].id === data[i].id) {
								if (data[i].deleted) {
									this.messages.splice(parseInt(m, 10), 1);
								} else {
									this.messages[m] = data[i];
								}
							}
						}
					}
				}
				if (this.autoScroll) {
					setTimeout(() => {
						this.messages.concat(data);
						this.messagesField.nativeElement.scrollTop = this.messagesField.nativeElement.scrollHeight;
					}, 10);
				} else {
					this.messages.concat(data);
				}
			},
			error => {
				console.log('failure');
			}
		);
	}

	sanitize() {
		const txt = this.textarea.nativeElement;
		const oldH = parseInt(txt.style.height.split('px')[0], 10);
		txt.style.height = 'auto';
		txt.style.height = txt.scrollHeight + 'px';
		const newH = parseInt(txt.style.height.split('px')[0], 10);

		if (oldH !== newH) {
			let scrolldown = false;
			const msg = this.messagesField.nativeElement;
			if (msg.scrollHeight - msg.scrollTop <= msg.clientHeight + 40) {
				scrolldown = true;
			}

			msg.style.height = (screen.height - 50 - this.box.nativeElement.offsetHeight) + 'px';
			if (scrolldown) {
				msg.scrollTop = msg.scrollHeight;
			}
		}
		this.messageForm.patchValue({
			message: this.messageForm.get('message').value.replace(/^\s+/g, '')
		});
	}

	sendMessage(event: Event) {
		event.preventDefault();
		this.showEmojis = false;
		this.messageForm.patchValue({
			message: this.messageForm.get('message').value.trim()
		});

		const msg = this.messagesField.nativeElement;
		let scrolldown = false;
		if (msg.scrollHeight - msg.scrollTop <= msg.clientHeight + 40) {
			scrolldown = true;
		}

		const message = {
			message: this.messageForm.get('message').value,
			timestamp: Math.floor(Date.now() / 1000),
			number: (this.messages.length ? this.messages[this.messages.length - 1].number + 1 : 1),
			user_id: {
				id: this.user.id,
				name: this.user.name,
				role_id: this.user.role_id,
				avatar: this.user.avatar
			}
		};
		if (!this.selectedFile) {
			message['type'] = 1;
		} else {
			message['created'] = true;
			if (this.selectedFile.file.type.split('/')[0] === 'image') {
				message['type'] = 2;
				message['src'] = this.selectedFile.src;
			}
		}
		this.messages.push(message);

		setTimeout(() => {
			if (scrolldown) {
				msg.scrollTop = msg.scrollHeight;
			}
		}, 10);

		this.chatsService.sendMessage(this.messageForm.value, this.selectedFile).pipe(first()).subscribe(
			data => {
				this.messages[this.messages.length - 1].id = data;
			},
			error => {
				console.log('failure');
				this.messages.pop();
			}
		);

		this.messageForm.patchValue({
			message: ''
		});
		this.clearUpload();

		this.textarea.nativeElement.focus();
	}

	loadMessages(scrollbottom = false) {
		this.chatsService.getMessages(this.route.snapshot.paramMap.get('id'), this.page, this.timestamp).pipe(first()).subscribe(
			data => {
				let scrollTop, height;
				if (!scrollbottom) {
					scrollTop = this.messagesField.nativeElement.scrollTop;
					height = this.messagesField.nativeElement.scrollHeight;
				}
				this.messages.splice(0, 0, ...data.reverse());
				this.page++;

				setTimeout(() => {
					if (scrollbottom) {
						this.messagesField.nativeElement.scrollTop = this.messagesField.nativeElement.scrollHeight;
					} else {
						this.messagesField.nativeElement.scrollTop = scrollTop + this.messagesField.nativeElement.scrollHeight - height;
					}
				}, 50);

				if (data.length === 30) {
					this.messagesField.nativeElement.addEventListener('scroll', this.scrolling, true);
				} else {
					this.moreOldMessages = false;
				}
			},
			error => {
				console.log('failure');
			}
		);
	}

	getChatName() {
		this.chatsService.getChatName(this.route.snapshot.paramMap.get('id')).pipe(first()).subscribe(
			data => {
				this.chatname = data[0].name;
			},
			error => {
				console.log('failure');
			}
		);
	}
}
