import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import authgear, { Page } from '@authgear/web';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  greetingMessage: string = '';

  constructor(public user: UserService) {}

  async updateGreetingMessage() {
    this.isLoading = true;
    try {
      if (this.user.isLoggedIn) {
        const userInfo = await authgear.fetchUserInfo();
        this.greetingMessage = 'The current User sub: ' + userInfo.sub;
      }
    } finally {
      this.isLoading = false;
    }
  }

  ngOnInit(): void {
    this.updateGreetingMessage().catch((e) => {
      console.error(e);
    });
  }

  startLogin(): void {
    authgear
      .startAuthentication({
        redirectURI: 'http://localhost:4000/auth-redirect',
        prompt: 'login',
      })
      .then(
        () => {
          // started authorization, user should be redirected to Authgear
        },
        (err) => {
          // failed to start authorization
          console.error(err);
        }
      );
  }

  logout(): void {
    authgear
      .logout({
        redirectURI: 'http://localhost:4000/',
      })
      .then(
        () => {
          this.greetingMessage = '';
        },
        (err) => {
          console.error(err);
        }
      );
  }

  async userSetting(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    await authgear.open(Page.Settings);
  }
}
