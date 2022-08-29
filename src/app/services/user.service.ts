import { Injectable } from '@angular/core';
import authgear from '@authgear/web';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // By default the user is not logged in
  isLoggedIn: boolean = false;

  constructor() {
    // When the sessionState changed, logged in state will also be changed
    authgear.delegate = {
      onSessionStateChange: (container) => {
        // sessionState is now up to date
        // value of sessionState can be "NO_SESSION" or "AUTHENTICATED"
        const sessionState = container.sessionState;
        if (sessionState === 'AUTHENTICATED') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
    };
  }
}
