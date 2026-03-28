import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css', '../../shared/styles/form-common.css'],
})
export class Login {
  username = "";
  password = "";

  errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
  errorMessage$: Observable<string | undefined> = this.errorMessageSubject.asObservable();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigateByUrl(''),
      error: err => {
        if (err instanceof HttpErrorResponse) {
          this.errorMessageSubject.next(err.error);
        }
      }
    });
  }
}
