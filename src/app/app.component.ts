import { Component, OnInit } from '@angular/core';
import authgear from '@authgear/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // configure Authgear container instance
  initAuthgear(): Promise<void> {
    return authgear.configure({
      endpoint: '<your_app_endpoint>',
      clientID: '<your_client_id>',
      sessionType: 'refresh_token',
    });
  }

  ngOnInit(): void {
    this.initAuthgear().catch((e) => {
      // Error handling
      console.log(e);
    });
  }
}
