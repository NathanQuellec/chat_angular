import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';


import { Message } from '../model/Message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocketEndPoint: string = 'http://localhost:8080/chat';
  responseSubject = new Subject<Message>();
  topic: string = "/topic/messages";
  stompClient: any;

  public msg = [];

  
  constructor() { }

  connect() {
    let socket = SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({}, function(frame:any) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe(_this.topic, function(message: any) {
        console.log(message);
        _this.onMessageReceived(message);
      })
    })

  }

  disconnect(){
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  send(message: Message){
    this.stompClient.send("/app/chat", {}, JSON.stringify(message));
  }

  onMessageReceived(message: any){
    console.log("Message received");
    const obj = JSON.parse(message.body) as Message;
    this.responseSubject.next(obj);
  }

 
  
}
