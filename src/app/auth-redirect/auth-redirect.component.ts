import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import authgear from '@authgear/web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.css'],
})
export class AuthRedirectComponent implements OnInit {
  constructor(private router: Router, private user: UserService) {}

  ngOnInit(): void {
    authgear
      .finishAuthentication()
      .catch((e) => console.error(e))
      .then(() => {
        this.router.navigate(['']);
      });
  }
}
