import { Component } from '@angular/core';
import {ActiveUser, AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe,
    RouterLink
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
}
