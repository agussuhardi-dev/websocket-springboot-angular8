import {Component, OnInit} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as SocketJS from "sockjs-client";
import {Pesan} from './pesan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  wsBackend: string = "http://localhost:8080/gs-guide-websocket";
  topic: string = "/topic/greetings";
  sendMapping :string = "/app/hello";

  stompClient;
  contents:Pesan[]=[];

  ngOnInit(): void {
    this._connect();
  }

  _connect() {

    let ws = new SocketJS(this.wsBackend);
    this.stompClient = Stomp.over(ws);
    let _this = this;
    _this.stompClient.connect({},
      function() {
        _this.stompClient.subscribe(_this.topic,
          function(sdkEvent) {
            _this.onMessageReceived(sdkEvent.body);
          });

        console.log("connected...");

      }, this.errorCallBack)
  }

  _disconnect() {
    if (this.stompClient !== null) this.stompClient.disconnect();
  }

  _sendMsg(msg) {

    let obj = new Pesan();
    obj.name = "agus";
    obj.message=msg;

    console.log(JSON.stringify(obj));

    this.stompClient.send(this.sendMapping, {}, JSON.stringify(obj));
  }

  onMessageReceived(msg) {
    this.contents.push(JSON.parse(msg));
  }

  errorCallBack(error) {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }


}
