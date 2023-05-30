import { Component } from '@angular/core';
import { Message } from '../../model/Message';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../service/websocket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent {
  
  messages: Message[] = [];
  responseSubject = new Subject<Message>();
  messageText: string = '';
  username: string = '';

  constructor(private route: ActivatedRoute, private webSocketService: WebsocketService) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      console.log("Username: ", this.username);
    });

    this.webSocketService.connect();

    this.webSocketService.responseSubject.subscribe((message: Message) => {
      console.log("Component receive a message : " + message.text);
      this.messages.push(message);
    })
    
  }

  

  sendMessage(text: string): void {
    const message: Message = {
      sender: this.username,
      time: new Date().toLocaleTimeString(),
      text: text
    };
    this.messageText = '';
    this.webSocketService.send(message);
  }

  clearInput(): void {
    this.messageText = ''; 
  }

}
