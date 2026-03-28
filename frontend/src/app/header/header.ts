import { Component } from '@angular/core';
import {ActiveUser, AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header {

  activeUser$: Observable<ActiveUser | undefined>;

  constructor(private readonly authService: AuthService) {
    this.activeUser$ = authService.activeUser$;
  }

  logout() {
    this.authService.logout();
  }
}
