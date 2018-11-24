import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChatsService} from '@services/chats/chats.service';
import {first} from 'rxjs/operators';
import Message from '@models/message';

@Component({
	selector: 'app-click-menu',
	templateUrl: './click-menu.component.html',
	styleUrls: ['./click-menu.component.css']
})
export class ClickMenuComponent implements OnInit {
	@Input() Message: Message;
	@Output() MessageChange = new EventEmitter<Message>();
	@ViewChild('main') Main: ElementRef;

	constructor(private chatsService: ChatsService) { }

	ngOnInit() {
	}

	ShowMenu() {
		this.Main.nativeElement.style.display = 'initial';
	}

	delete() {
		this.close();
		this.chatsService.deleteMessage(this.Message.id).pipe(first()).subscribe(
			data => {
				this.Message.deleted = true;
				this.MessageChange.emit(this.Message);
			},
			error => {
				console.log('failure');
			}
		);
	}

	close() {
		this.Main.nativeElement.style.display = 'none';
	}
}
