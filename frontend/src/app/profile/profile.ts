import { Component } from '@angular/core';
import {ActiveUser, AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  activeUser$: Observable<ActiveUser | undefined>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.activeUser$ = authService.activeUser$;
    this.activeUser$.subscribe(activeUser => {
      if (!activeUser) {
        router.navigate(['/']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
