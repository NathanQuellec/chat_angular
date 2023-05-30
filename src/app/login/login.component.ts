import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from '../service/websocket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';

  constructor(private route: Router) {}

  login(loginForm: any) {
    let data = loginForm.value;
    console.log("Pseudo: ", data.username);
    this.route.navigate(['chat'], {queryParams: {username: data.username}});
 }

}
